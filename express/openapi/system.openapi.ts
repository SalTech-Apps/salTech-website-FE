import { openApiRegistry } from "./registry.ts";
import { ApiErrorSchema } from "../schemas/auth.schema.ts";
import {
	DashboardResponseSchema,
	HealthResponseSchema,
} from "../schemas/dashboard.schema.ts";

openApiRegistry.register("HealthResponse", HealthResponseSchema);
openApiRegistry.register("DashboardResponse", DashboardResponseSchema);

openApiRegistry.registerPath({
	method: "get",
	path: "/api/health",
	tags: ["System"],
	summary: "Health check",
	responses: {
		200: {
			description: "Service is healthy",
			content: { "application/json": { schema: HealthResponseSchema } },
		},
	},
});

openApiRegistry.registerPath({
	method: "get",
	path: "/api/dashboard",
	tags: ["System"],
	summary: "Get dashboard overview",
	security: [{ bearerAuth: [] }],
	responses: {
		200: {
			description: "Dashboard data fetched successfully",
			content: { "application/json": { schema: DashboardResponseSchema } },
		},
		401: {
			description: "Unauthorized",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});
