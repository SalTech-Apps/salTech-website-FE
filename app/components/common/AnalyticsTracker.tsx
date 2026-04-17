import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "@/lib/analytics";

/**
 * Logs page_view to Firebase Analytics on route change.
 * Renders nothing. Only runs in the browser; safe for SSR.
 */
export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname).catch(() => {
      // Ignore analytics errors (e.g. ad blockers)
    });
  }, [location.pathname]);

  return null;
}
