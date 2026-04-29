import { z } from "zod";
import { ApiSuccessResponseSchema } from "./auth.schema.ts";

export const ApplicantStatusSchema = z.enum([
	"NEW",
	"UNDER_REVIEW",
	"INTERVIEW_SCHEDULED",
	"ACCEPTED",
	"REJECTED",
]);

export const ApplicantSchema = z.object({
	id: z.string(),
	jobId: z.string(),
	fullName: z.string(),
	email: z.string().email(),
	phone: z.string(),
	resumeUrl: z.string().url(),
	portfolioUrl: z.string().url().optional(),
	linkedinUrl: z.string().url().optional(),
	coverLetter: z.string(),
	earliestStartDate: z.string().optional(),
	status: ApplicantStatusSchema,
	assignedRecruiter: z.string().optional(),
	assignedInterviewer: z.string().optional(),
	interviewScheduledAt: z.string().optional(),
	rejectionReason: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CreateApplicantRequestSchema = ApplicantSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	status: true,
}).extend({
	status: ApplicantStatusSchema.optional(),
});

export const UpdateApplicantRequestSchema =
	CreateApplicantRequestSchema.partial();

export const RejectApplicantRequestSchema = z.object({
	rejectionReason: z.string().optional(),
});

export const ScheduleInterviewRequestSchema = z.object({
	interviewScheduledAt: z.string(),
});

export const AssignRecruiterRequestSchema = z.object({
	assignedRecruiter: z.string(),
});

export const AssignInterviewerRequestSchema = z.object({
	assignedInterviewer: z.string(),
});

export const ApplicantResponseSchema =
	ApiSuccessResponseSchema(ApplicantSchema);
export const ApplicantsListResponseSchema = ApiSuccessResponseSchema(
	z.array(ApplicantSchema),
);
export const ApplicantDeleteResponseSchema = ApiSuccessResponseSchema(
	z.object({ id: z.string() }),
);
