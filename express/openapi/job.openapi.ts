import { z } from "zod";
import { openApiRegistry } from "./registry.ts";
import { ApiErrorSchema } from "../schemas/auth.schema.ts";
import {
	CreateJobRequestSchema,
	JobDeleteResponseSchema,
	JobResponseSchema,
	JobsListResponseSchema,
	UpdateJobRequestSchema,
} from "../schemas/job.schema.ts";

const JobIdParamSchema = z.object({
	id: z.string().min(1),
});

openApiRegistry.register("CreateJobRequest", CreateJobRequestSchema);
openApiRegistry.register("UpdateJobRequest", UpdateJobRequestSchema);
openApiRegistry.register("JobResponse", JobResponseSchema);
openApiRegistry.register("JobsListResponse", JobsListResponseSchema);
openApiRegistry.register("JobDeleteResponse", JobDeleteResponseSchema);
openApiRegistry.register("ApiError", ApiErrorSchema);

openApiRegistry.registerPath({
	method: "get",
	path: "/api/jobs",
	tags: ["Jobs"],
	summary: "List jobs",
	responses: {
		200: {
			description: "Jobs fetched successfully",
			content: { "application/json": { schema: JobsListResponseSchema } },
		},
		500: {
			description: "Failed to fetch jobs",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

openApiRegistry.registerPath({
	method: "get",
	path: "/api/jobs/{id}",
	tags: ["Jobs"],
	summary: "Get job by id",
	request: { params: JobIdParamSchema },
	responses: {
		200: {
			description: "Job fetched successfully",
			content: { "application/json": { schema: JobResponseSchema } },
		},
		404: {
			description: "Job not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

openApiRegistry.registerPath({
	method: "post",
	path: "/api/jobs",
	tags: ["Jobs"],
	summary: "Create job",
	security: [{ bearerAuth: [] }],
	request: {
		body: {
			required: true,
			content: { "application/json": { schema: CreateJobRequestSchema } },
		},
	},
	responses: {
		201: {
			description: "Job created successfully",
			content: { "application/json": { schema: JobResponseSchema } },
		},
		400: {
			description: "Validation error",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
		401: {
			description: "Unauthorized",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

openApiRegistry.registerPath({
	method: "patch",
	path: "/api/jobs/{id}",
	tags: ["Jobs"],
	summary: "Update job",
	security: [{ bearerAuth: [] }],
	request: {
		params: JobIdParamSchema,
		body: {
			required: true,
			content: { "application/json": { schema: UpdateJobRequestSchema } },
		},
	},
	responses: {
		200: {
			description: "Job updated successfully",
			content: { "application/json": { schema: JobResponseSchema } },
		},
		404: {
			description: "Job not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

openApiRegistry.registerPath({
	method: "delete",
	path: "/api/jobs/{id}",
	tags: ["Jobs"],
	summary: "Delete job",
	security: [{ bearerAuth: [] }],
	request: { params: JobIdParamSchema },
	responses: {
		200: {
			description: "Job deleted successfully",
			content: { "application/json": { schema: JobDeleteResponseSchema } },
		},
		404: {
			description: "Job not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});
