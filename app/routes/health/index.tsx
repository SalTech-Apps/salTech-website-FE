/* eslint-disable react-refresh/only-export-components -- React Router route exports */
import { useLoaderData, type LoaderFunctionArgs } from "react-router";

import { buildMetaTags } from "@/lib/seo";

type HealthPayload = {
  ok: true;
  uptimeSeconds: number;
};

type HealthLoaderData =
  | { status: "ok"; data: HealthPayload }
  | { status: "error"; message: string };

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<HealthLoaderData> {
  const healthUrl = new URL("/api/health", request.url).href;
  try {
    const res = await fetch(healthUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      return {
        status: "error",
        message: `Server returned ${res.status}`,
      };
    }
    const data = (await res.json()) as HealthPayload;

    if (data?.ok !== true || typeof data.uptimeSeconds !== "number") {
      return { status: "error", message: "Unexpected response shape" };
    }
    return { status: "ok", data };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Could not reach the health endpoint";
    return { status: "error", message };
  }
}

export function meta({ location }: { location: { pathname: string } }) {
  return [
    ...buildMetaTags({
      title: "Health",
      description: "Service health and process uptime.",
      path: location.pathname,
    }),
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function HealthPage() {
  const result = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-main-background pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="mb-6 font-heading text-heading-h1 text-main-text-headlines">
          Health
        </h1>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur-sm">
          {result.status === "ok" ? (
            <dl className="space-y-4 text-main-text-body">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <dt className="font-medium text-main-text-headlines">Status</dt>
                <dd className="font-mono text-emerald-600 dark:text-emerald-400">
                  operational
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <dt className="font-medium text-main-text-headlines">
                  Uptime
                </dt>
                <dd className="font-mono tabular-nums">
                  {result.data.uptimeSeconds.toLocaleString()} s
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-main-text-body" role="status">
              <span className="font-medium text-main-text-headlines">
                Unavailable:{" "}
              </span>
              {result.message}
            </p>
          )}
        </div>
        <p className="mt-6 text-sm text-main-text-body/80">
          JSON: <code className="font-mono text-xs">GET /api/health</code>
        </p>
      </div>
    </div>
  );
}
