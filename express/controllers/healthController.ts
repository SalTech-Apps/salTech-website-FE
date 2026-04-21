import type { Request, Response } from "express";

import { getHealthStatus } from "../services/healthService.ts";

export function getHealth(_req: Request, res: Response): void {
  res.json(getHealthStatus());
}
