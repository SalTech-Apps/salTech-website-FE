import type { Request, Response } from "express";

import { getHealthStatus } from "../../app/lib/health.server.ts";
import { SuccessResponse } from "../utils/response.ts";

export function getHealth(_req: Request, res: Response): void {
	SuccessResponse(res, getHealthStatus(), 200, "Health check successful");
}
