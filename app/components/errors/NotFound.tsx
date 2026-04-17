import { Link } from "react-router";

export function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-4 pt-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-lg text-neutral-600">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        prefetch="intent"
        className="mt-6 inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
      >
        Back to home
      </Link>
    </main>
  );
}
