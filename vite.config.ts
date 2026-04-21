import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Connect, type Plugin } from "vite";

import { createApiRouter } from "./express/routes.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Serves `/api/*` during `react-router dev` / `vite preview` so `/api/health` is not handled as an app route. */
function saltechApiDevPlugin(): Plugin {
  function mountApi(middlewares: Connect.Server): void {
    const app = express();
    app.disable("x-powered-by");
    app.use("/api", createApiRouter());
    middlewares.use(app);
  }

  return {
    name: "saltech-api-dev",
    enforce: "pre",
    configureServer(server) {
      mountApi(server.middlewares);
    },
    configurePreviewServer(server) {
      mountApi(server.middlewares);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [saltechApiDevPlugin(), reactRouter(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
    dedupe: ["react", "react-dom", "react-router", "react-router-dom"],
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    watch: {
      ignored: ["**/content/**"],
    },
    allowedHosts: ["hosted.app", "saltechapps.com", "www.saltechapps.com"],
  },
  preview: {
    port: 8080,
    strictPort: true,
    host: true,
  },
  define: {
    global: "globalThis",
  },
});
