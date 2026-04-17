let _registered = false;

export function initPwaClient() {
  if (_registered) return;
  _registered = true;

  if (!import.meta.env.PROD) return;
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      // Non-fatal: app should still run without SW
      console.warn("Service worker registration failed:", error);
    });
  });
}

