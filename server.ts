import "dotenv/config";
import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import express, { type ErrorRequestHandler } from "express";
import morgan from "morgan";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { createApiRouter } from "./express/routes.ts";

process.env.NODE_ENV ??= "production";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** React Router + Vercel preset emits `build/server/<runtime-id>/index.js`; plain builds use `build/server/index.js`. */
function resolveBuildServerEntry(): string {
	const flat = path.join(__dirname, "build/server/index.js");
	if (existsSync(flat)) return flat;
	const serverDir = path.join(__dirname, "build/server");
	if (!existsSync(serverDir)) {
		throw new Error(
			`[server] Missing build output at ${serverDir}. Run "pnpm run build" first.`,
		);
	}
	for (const name of readdirSync(serverDir, { withFileTypes: true })) {
		if (!name.isDirectory()) continue;
		const candidate = path.join(serverDir, name.name, "index.js");
		if (existsSync(candidate)) return candidate;
	}
	throw new Error(
		`[server] No server bundle found under ${serverDir} (expected index.js).`,
	);
}

const buildServerPath = resolveBuildServerEntry();
const buildModule = await import(pathToFileURL(buildServerPath).href);

const assetsBuildDirectory = path.resolve(
	__dirname,
	buildModule.assetsBuildDirectory,
);
const { publicPath } = buildModule;
const app = express();

app.disable("x-powered-by");
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	void _next;
	console.error("[server] unhandled request error", err);
	if (res.headersSent) return;
	res.status(500).json({
		message: "Internal server error",
		error: "ServerError",
	});
};

app.use(errorHandler);

const port = Number(process.env.PORT);
const listenPort = Number.isFinite(port) ? port : 8080;

const server = app.listen(listenPort, () => {
	console.log(`[server] http://localhost:${listenPort}`);
});

process.on("unhandledRejection", (reason) => {
	console.error("[server] unhandled rejection", reason);
});

process.on("uncaughtException", (error) => {
	console.error("[server] uncaught exception", error);
});

for (const signal of ["SIGTERM", "SIGINT"] as const) {
	process.once(signal, () => {
		server.close((err) => {
			if (err) console.error(err);
		});
	});
}
