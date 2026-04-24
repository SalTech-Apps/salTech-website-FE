import type { Request, Response } from "express";
import { loginUser } from "../services/auth.service.ts";
import {
	BadRequestResponse,
	SuccessResponse,
	UnauthorizedResponse,
} from "../utils/response.ts";

export async function login(req: Request, res: Response): Promise<void> {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			BadRequestResponse(res, "Email and password are required", "BadRequest");
			return;
		}

		const user = await loginUser({ email, password });

		SuccessResponse(res, user, 200, "Login successful");
	} catch (error) {
		console.error("[auth.controller] login error:", error);
		const message = error instanceof Error ? error.message : "Login failed";
		UnauthorizedResponse(res, message, "Unauthorized");
	}
}
