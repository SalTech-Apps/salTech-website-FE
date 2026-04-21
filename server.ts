import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { createApiRouter } from "./express/routes.ts";

process.env.NODE_ENV ??= "production";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildServerPath = path.join(__dirname, "build/server/index.js");
const buildModule = await import(pathToFileURL(buildServerPath).href);

const assetsBuildDirectory = path.resolve(
  __dirname,
  buildModule.assetsBuildDirectory,
);
const { publicPath } = buildModule;

const app = express();
app.disable("x-powered-by");
app.use(compression());
app.use("/api", createApiRouter());

app.use(
  path.posix.join(publicPath, "assets"),
  express.static(path.join(assetsBuildDirectory, "assets"), {
    immutable: true,
    maxAge: "1y",
  }),
);
app.use(publicPath, express.static(assetsBuildDirectory));
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1h" }));
app.use(morgan("tiny"));
app.use(
  createRequestHandler({
    build: buildModule,
    mode: process.env.NODE_ENV,
  }),
);

const port = Number(process.env.PORT);
const listenPort = Number.isFinite(port) ? port : 8080;

const server = app.listen(listenPort, () => {
  console.log(`[server] http://localhost:${listenPort}`);
});

for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.once(signal, () => {
    server.close((err) => {
      if (err) console.error(err);
    });
  });
}
