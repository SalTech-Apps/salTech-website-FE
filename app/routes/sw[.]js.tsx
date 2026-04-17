import { readFile } from "node:fs/promises";
import path from "node:path";

export async function loader() {
  // `react-router-serve` doesn't serve root-level `.js` files from `build/client`,
  // but a service worker must be at `/sw.js` for full-scope control.
  const swPath = path.join(process.cwd(), "public", "sw.js");

  try {
    const sw = await readFile(swPath);
    return new Response(sw, {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        // Ensure the browser always revalidates the SW file (updates are important).
        "Cache-Control": "no-cache",
        "Service-Worker-Allowed": "/",
      },
    });
  } catch {
    return new Response("/* sw.js not found */", {
      status: 404,
      headers: { "Content-Type": "application/javascript; charset=utf-8" },
    });
  }
}

