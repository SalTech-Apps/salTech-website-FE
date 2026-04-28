import { z } from "zod";
import { ApiSuccessResponseSchema } from "./auth.schema.ts";
import { ApplicantStatusSchema } from "./applicant.schema.ts";

export const HealthStatusSchema = z.object({
	ok: z.literal(true),
	uptimeSeconds: z.number(),
});

export const HealthResponseSchema =
	ApiSuccessResponseSchema(HealthStatusSchema);

export const DashboardRecentApplicationSchema = z.object({
	id: z.string(),
	fullName: z.string(),
	email: z.string().email(),
	status: ApplicantStatusSchema,
	position: z.string(),
	statusLabel: z.string(),
	appliedDate: z.string(),
});

export const DashboardOverviewSchema = z.object({
	totalJobs: z.number(),
	activeJobs: z.number(),
	totalApplicants: z.number(),
	newThisWeek: z.number(),
	recentApplications: z.array(DashboardRecentApplicationSchema),
});

export const DashboardResponseSchema = ApiSuccessResponseSchema(
	DashboardOverviewSchema,
);
