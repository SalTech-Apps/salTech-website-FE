import type { NextFunction, Request, Response } from "express";
import { UnauthorizedResponse } from "../utils/response.ts";
import { verifyAccessToken } from "../services/auth.service.ts";

function extractBearerToken(
	authorizationHeader: string | undefined,
): string | null {
	if (!authorizationHeader) return null;
	const [scheme, token] = authorizationHeader.split(" ");
	if (scheme !== "Bearer" || !token) return null;
	return token;
}

export async function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const authorization = req.headers.authorization;
		const token = extractBearerToken(authorization);

		if (!token) {
			UnauthorizedResponse(res, "Missing or invalid Authorization header");
			return;
		}

		const decodedToken = await verifyAccessToken(token);
		res.locals.authUser = decodedToken;
		next();
	} catch (error) {
		console.error("[auth.middleware] requireAuth error:", error);
		UnauthorizedResponse(res, "Invalid or expired token", "Unauthorized");
	}
}
