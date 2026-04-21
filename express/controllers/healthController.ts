import type { Request, Response } from "express";

import { getHealthStatus } from "../../app/lib/health.server.ts";

export function getHealth(_req: Request, res: Response): void {
  res.json(getHealthStatus());
}
