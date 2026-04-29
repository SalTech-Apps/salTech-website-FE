import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import "./auth.openapi.ts";
import "./job.openapi.ts";
import "./applicant.openapi.ts";
import "./system.openapi.ts";
import { openApiRegistry } from "./registry.ts";

const generator = new OpenApiGeneratorV3(openApiRegistry.definitions);
type GeneratedOpenApiDocument = ReturnType<
	OpenApiGeneratorV3["generateDocument"]
>;

export const openApiDocument: GeneratedOpenApiDocument =
	generator.generateDocument({
		openapi: "3.0.0",
		info: {
			title: "SalTech API",
			version: "1.0.0",
			description: "Generated from Zod schemas and route registrations.",
		},
		servers: [{ url: "http://localhost:8080" }],
		tags: [
			{ name: "Auth", description: "Authentication endpoints" },
			{ name: "Jobs", description: "Job management endpoints" },
			{ name: "Applicants", description: "Applicant management endpoints" },
			{ name: "System", description: "Health and dashboard endpoints" },
		],
	});
