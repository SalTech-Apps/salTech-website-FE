import type { Request, Response } from "express";
import type { DecodedIdToken } from "firebase-admin/auth";
import { loginUser, logoutUser } from "../services/auth.service.ts";
import { SuccessResponse, UnauthorizedResponse } from "../utils/response.ts";
import type { LoginDto } from "../schemas/auth.schema.ts";

export async function login(
	req: Request<object, object, LoginDto>,
	res: Response,
): Promise<void> {
	try {
		const user = await loginUser(req.body);

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

export async function logout(_req: Request, res: Response): Promise<void> {
	try {
		const authUser = res.locals.authUser as DecodedIdToken | undefined;
		if (!authUser?.uid) {
			UnauthorizedResponse(res, "Unauthorized", "Unauthorized");
			return;
		}

		await logoutUser(authUser.uid);
		SuccessResponse(res, { success: true }, 200, "Logout successful");
	} catch (error) {
		console.error("[auth.controller] logout error:", error);
		UnauthorizedResponse(res, "Logout failed", "Unauthorized");
	}
}
