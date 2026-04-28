import type { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/response.ts";
import { getDashboardOverview } from "../services/dashboard.service.ts";

export async function getDashboard(
	_req: Request,
	res: Response,
): Promise<void> {
	try {
		const dashboard = await getDashboardOverview();
		SuccessResponse(res, dashboard, 200, "Dashboard fetched successfully");
	} catch (error) {
		console.error("[dashboard.controller] getDashboard error:", error);
		ErrorResponse(res, "Failed to fetch dashboard");
	}
}
