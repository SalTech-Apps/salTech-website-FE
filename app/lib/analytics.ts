import type { Analytics } from "firebase/analytics";
import app from "./firebase.client";

let analyticsInstance: Analytics | null = null;

/** True when running in browser and measurement ID is set (analytics can run). */
export function isAnalyticsSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    !!import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  );
}

/** Get Firebase Analytics; initializes only in browser and only once. */
export async function getAnalytics(): Promise<Analytics | null> {
  if (!isAnalyticsSupported()) return null;
  if (analyticsInstance) return analyticsInstance;
  const { getAnalytics } = await import("firebase/analytics");
  analyticsInstance = getAnalytics(app);
  return analyticsInstance;
}

/** Log a page_view event for the current page (for anonymous visitor tracking). */
export async function logPageView(path: string, title?: string): Promise<void> {
  const analytics = await getAnalytics();
  if (!analytics) return;
  const { logEvent } = await import("firebase/analytics");
  logEvent(analytics, "page_view", {
    page_path: path,
    page_title: title ?? document?.title ?? path,
  });
}
