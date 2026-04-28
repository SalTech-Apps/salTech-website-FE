import { z } from "zod";
import { openApiRegistry } from "./registry.ts";
import {
	ApiErrorResponseSchema,
	AuthUserSchema,
	FirestoreTimestampSchema,
	LoginRequestSchema,
	LoginResponseDataSchema,
	LoginResponseSchema,
} from "../schemas/auth.schema.ts";

openApiRegistry.register("FirestoreTimestamp", FirestoreTimestampSchema);
openApiRegistry.register("AuthUser", AuthUserSchema);
openApiRegistry.register("LoginRequest", LoginRequestSchema);
openApiRegistry.register("LoginResponseData", LoginResponseDataSchema);
openApiRegistry.register("LoginResponse", LoginResponseSchema);
openApiRegistry.register("ApiErrorResponse", ApiErrorResponseSchema);
openApiRegistry.registerComponent("securitySchemes", "bearerAuth", {
	type: "http",
	scheme: "bearer",
	bearerFormat: "JWT",
});

openApiRegistry.registerPath({
	method: "post",
	path: "/api/auth/login",
	tags: ["Auth"],
	summary: "Authenticate a user with email and password",
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: LoginRequestSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Login successful",
			content: {
				"application/json": {
					schema: LoginResponseSchema,
				},
			},
		},
		400: {
			description: "Validation error",
			content: {
				"application/json": {
					schema: ApiErrorResponseSchema,
				},
			},
		},
		401: {
			description: "Authentication failed",
			content: {
				"application/json": {
					schema: ApiErrorResponseSchema,
				},
			},
		},
	},
});

openApiRegistry.registerPath({
	method: "get",
	path: "/api/auth/me",
	tags: ["Auth"],
	summary: "Get the currently authenticated user",
	security: [{ bearerAuth: [] }],
	responses: {
		200: {
			description: "Authenticated user fetched successfully",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
						data: z.object({
							uid: z.string(),
							email: z.string().nullable(),
							claims: z.record(z.string(), z.unknown()),
						}),
					}),
				},
			},
		},
		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: ApiErrorResponseSchema,
				},
			},
		},
	},
});
