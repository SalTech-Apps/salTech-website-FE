/* eslint-disable no-restricted-globals */
const VERSION = "v1";
const APP_SHELL_CACHE = `app-shell-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;

const APP_SHELL_URLS = ["/", "/offline.html", "/manifest.webmanifest", "/robots.txt"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== APP_SHELL_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

function isNavigationRequest(request) {
  return request.mode === "navigate" || request.destination === "document";
}

function isSameOrigin(request) {
  try {
    return new URL(request.url).origin === self.location.origin;
  } catch {
    return false;
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Only handle same-origin; let Firebase/CDNs go to network.
  if (!isSameOrigin(request)) return;

  // SSR navigations: network-first, fallback to cached page/offline.
  if (isNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, res.clone());
          return res;
        } catch {
          const cached = await caches.match(request);
          return cached || (await caches.match("/offline.html"));
        }
      })()
    );
    return;
  }

  // Static assets: cache-first with runtime fill.
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const res = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, res.clone());
        return res;
      } catch {
        return cached || Response.error();
      }
    })()
  );
});

