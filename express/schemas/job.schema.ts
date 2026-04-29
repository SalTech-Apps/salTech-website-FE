import { z } from "zod";
import { ApiSuccessResponseSchema } from "./auth.schema.ts";

export const JobStatusSchema = z.enum(["DRAFT", "OPEN", "CLOSED"]);
export const JobTypeSchema = z.enum([
	"FULL_TIME",
	"PART_TIME",
	"CONTRACT",
	"INTERNSHIP",
]);
export const JobDepartmentSchema = z.enum([
	"ENGINEERING",
	"MARKETING",
	"SALES",
	"HR",
	"DESIGN",
	"PRODUCT",
	"OTHER",
]);

export const JobSchema = z.object({
	id: z.string(),
	title: z.string(),
	department: JobDepartmentSchema,
	jobType: JobTypeSchema,
	location: z.string(),
	description: z.string(),
	responsibilities: z.array(z.string()),
	requirements: z.array(z.string()),
	niceToHave: z.array(z.string()),
	minSalary: z.number().optional(),
	maxSalary: z.number().optional(),
	status: JobStatusSchema,
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CreateJobRequestSchema = JobSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	status: true,
}).extend({
	status: JobStatusSchema.optional(),
});

export const UpdateJobRequestSchema = CreateJobRequestSchema.partial();

export const JobResponseSchema = ApiSuccessResponseSchema(JobSchema);
export const JobsListResponseSchema = ApiSuccessResponseSchema(
	z.array(JobSchema),
);
export const JobDeleteResponseSchema = ApiSuccessResponseSchema(
	z.object({ id: z.string() }),
);
