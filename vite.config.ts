import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { reactRouter } from "@react-router/dev/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
    dedupe: ["react", "react-dom"],
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
