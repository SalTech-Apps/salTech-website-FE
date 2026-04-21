import { Router } from "express";

import { getHealth } from "./controllers/healthController.ts";

export function createApiRouter(): Router {
  const api = Router();
  api.get("/health", getHealth);
  return api;
}
