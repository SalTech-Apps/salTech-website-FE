import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const LoginRequestSchema = z.object({
	email: z.string().trim().email(),
	password: z.string().min(1),
});

export const IsoDateTimeSchema = z.string();

export const FirestoreTimestampSchema = z.object({
	_seconds: z.number(),
	_nanoseconds: z.number(),
});

export const ApiErrorSchema = z.object({
	message: z.string(),
	error: z.string(),
});

export const ApiErrorResponseSchema = ApiErrorSchema;

export function ApiSuccessResponseSchema<T extends z.ZodTypeAny>(
	dataSchema: T,
) {
	return z.object({
		message: z.string(),
		data: dataSchema,
	});
}

export const AuthUserSchema = z
	.object({
		uid: z.string(),
		email: z.string().nullable(),
		displayName: z.string().optional(),
		role: z.string().optional(),
		isAdmin: z.boolean().optional(),
		status: z.string().optional(),
		createdAt: FirestoreTimestampSchema.optional(),
		updatedAt: FirestoreTimestampSchema.optional(),
	})
	.catchall(z.unknown());

export const LoginResponseDataSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
	tokenType: z.literal("Bearer"),
	expiresAt: z.string(),
	user: AuthUserSchema,
});

export const LoginResponseSchema = ApiSuccessResponseSchema(
	LoginResponseDataSchema,
);

export type LoginDto = z.infer<typeof LoginRequestSchema>;
export type LoginResponseData = z.infer<typeof LoginResponseDataSchema>;
