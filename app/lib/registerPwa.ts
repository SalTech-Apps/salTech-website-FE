/**
 * Registers the service worker in the browser only. Uses a dynamic import so
 * the SSR bundle does not tree-shake `@/lib/pwa.client` to an empty export
 * (which would make `initPwaClient` undefined in the server build output).
 */
export function registerPwaClient(): void {
  if (typeof window === "undefined") return;
  void import("./pwa.client").then((m) => m.initPwaClient());
}
