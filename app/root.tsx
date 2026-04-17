import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router';

import { Toaster } from 'react-hot-toast';

import { Providers } from './providers';
import { useNProgress } from '@/hooks/useNProgress';
import { NotFound } from '@/components/errors/NotFound';
  // import type { Route } from './+types/root';

import { getBaseUrl } from "@/lib/seo";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JESFEM",
  url: getBaseUrl(),
  logo: `${getBaseUrl()}/assets/logo/logo-transparent.png`,
  description:
    "Premium real estate and property investment in Nigeria. Luxury properties, off-plan deals, rentals, and expert investment guidance.",
};

export const links = () => [
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/assets/logo/logo-transparent.png",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0e0e10" />
        <title>JESFEM | Premium Real Estate & Property Investment</title>
        {/* Non-blocking font loading - media=print defers, onLoad switches to all */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0;600;700&display=swap"
          media="print"
          onLoad={(e) => {
            (e.target as HTMLLinkElement).media = "all";
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
          media="print"
          onLoad={(e) => {
            (e.target as HTMLLinkElement).media = "all";
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0;600;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppContent() {
  useNProgress();
  return (
    <>
      <Outlet />
      <Toaster position="top-right" />
    </>
  );
}

export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
    message = 'Error';
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
