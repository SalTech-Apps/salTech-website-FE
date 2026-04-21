/* eslint-disable react-refresh/only-export-components -- resource route */
import { getHealthStatus } from "@/lib/health.server";

/**
 * JSON health for load balancers and `/health` UI. On Vercel this route is served by
 * the React Router server bundle; locally `server.ts` still handles `/api` first.
 */
export function loader() {
  return Response.json(getHealthStatus(), {
    headers: { "Cache-Control": "no-store" },
  });
}
