import type { Request, Response } from "express";
import type { DecodedIdToken } from "firebase-admin/auth";
import { loginUser } from "../services/auth.service.ts";
import {
	BadRequestResponse,
	SuccessResponse,
	UnauthorizedResponse,
} from "../utils/response.ts";
import type { LoginDto } from "../models/auth.model.ts";

export async function login(
	req: Request<object, object, LoginDto>,
	res: Response,
): Promise<void> {
	try {
		const body = (req.body ?? {}) as Record<string, unknown>;
		const email = String(body.email ?? "").trim();
		const password = String(body.password ?? "");

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

export async function getAuthenticatedUser(
	_req: Request,
	res: Response,
): Promise<void> {
	const authUser = res.locals.authUser as DecodedIdToken | undefined;

	if (!authUser) {
		UnauthorizedResponse(res, "Unauthorized", "Unauthorized");
		return;
	}

	SuccessResponse(
		res,
		{
			uid: authUser.uid,
			email: authUser.email ?? null,
			claims: authUser,
		},
		200,
		"Authenticated user fetched successfully",
	);
}
