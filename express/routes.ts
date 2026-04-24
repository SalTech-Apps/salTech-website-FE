import { Router } from "express";

import { getHealth } from "./controllers/healthController.ts";
import { login } from "./controllers/auth.controller.ts";

export function createApiRouter(): Router {
	const api = Router();
	api.get("/health", getHealth);
	api.post("/auth/login", login);
	return api;
}
