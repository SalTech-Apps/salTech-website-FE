import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodType } from "zod";
import { ValidationResponse } from "../utils/response.ts";

export function validateBody<T>(schema: ZodType<T>): RequestHandler {
	return (req: Request, res: Response, next: NextFunction): void => {
		const parsed = schema.safeParse(req.body ?? {});

		if (!parsed.success) {
			const message = parsed.error.issues
				.map((issue) => {
					const path = issue.path.length > 0 ? issue.path.join(".") : "body";
					return `${path}: ${issue.message}`;
				})
				.join("; ");

			ValidationResponse(
				res,
				message || "Validation failed",
				"ValidationError",
			);
			return;
		}

		req.body = parsed.data;
		next();
	};
}
