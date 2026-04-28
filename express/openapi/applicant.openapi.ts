import { z } from "zod";
import { openApiRegistry } from "./registry.ts";
import { ApiErrorSchema } from "../schemas/auth.schema.ts";
import {
	ApplicantDeleteResponseSchema,
	ApplicantResponseSchema,
	ApplicantsListResponseSchema,
	AssignInterviewerRequestSchema,
	AssignRecruiterRequestSchema,
	CreateApplicantRequestSchema,
	RejectApplicantRequestSchema,
	ScheduleInterviewRequestSchema,
	UpdateApplicantRequestSchema,
} from "../schemas/applicant.schema.ts";

const ApplicantIdParamSchema = z.object({ id: z.string().min(1) });
const JobIdParamSchema = z.object({ jobId: z.string().min(1) });

openApiRegistry.register(
	"CreateApplicantRequest",
	CreateApplicantRequestSchema,
);
openApiRegistry.register(
	"UpdateApplicantRequest",
	UpdateApplicantRequestSchema,
);
openApiRegistry.register("ApplicantResponse", ApplicantResponseSchema);
openApiRegistry.register(
	"ApplicantsListResponse",
	ApplicantsListResponseSchema,
);
openApiRegistry.register(
	"ApplicantDeleteResponse",
	ApplicantDeleteResponseSchema,
);
openApiRegistry.register(
	"RejectApplicantRequest",
	RejectApplicantRequestSchema,
);
openApiRegistry.register(
	"ScheduleInterviewRequest",
	ScheduleInterviewRequestSchema,
);
openApiRegistry.register(
	"AssignRecruiterRequest",
	AssignRecruiterRequestSchema,
);
openApiRegistry.register(
	"AssignInterviewerRequest",
	AssignInterviewerRequestSchema,
);

// GET /api/applicants
openApiRegistry.registerPath({
	method: "get",
	path: "/api/applicants",
	tags: ["Applicants"],
	summary: "List all applicants",
	security: [{ bearerAuth: [] }],
	responses: {
		200: {
			description: "Applicants fetched successfully",
			content: { "application/json": { schema: ApplicantsListResponseSchema } },
		},
		401: {
			description: "Unauthorized",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// GET /api/applicants/:id
openApiRegistry.registerPath({
	method: "get",
	path: "/api/applicants/{id}",
	tags: ["Applicants"],
	summary: "Get applicant by id",
	security: [{ bearerAuth: [] }],
	request: { params: ApplicantIdParamSchema },
	responses: {
		200: {
			description: "Applicant fetched successfully",
			content: { "application/json": { schema: ApplicantResponseSchema } },
		},
		404: {
			description: "Applicant not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// GET /api/jobs/:jobId/applicants
openApiRegistry.registerPath({
	method: "get",
	path: "/api/jobs/{jobId}/applicants",
	tags: ["Applicants"],
	summary: "List applicants for a job",
	security: [{ bearerAuth: [] }],
	request: { params: JobIdParamSchema },
	responses: {
		200: {
			description: "Applicants fetched successfully",
			content: { "application/json": { schema: ApplicantsListResponseSchema } },
		},
		401: {
			description: "Unauthorized",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// POST /api/applicants
openApiRegistry.registerPath({
	method: "post",
	path: "/api/applicants",
	tags: ["Applicants"],
	summary: "Submit a job application",
	request: {
		body: {
			required: true,
			content: { "application/json": { schema: CreateApplicantRequestSchema } },
		},
	},
	responses: {
		201: {
			description: "Application submitted successfully",
			content: { "application/json": { schema: ApplicantResponseSchema } },
		},
		400: {
			description: "Validation error",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// PATCH /api/applicants/:id
openApiRegistry.registerPath({
	method: "patch",
	path: "/api/applicants/{id}",
	tags: ["Applicants"],
	summary: "Update applicant",
	security: [{ bearerAuth: [] }],
	request: {
		params: ApplicantIdParamSchema,
		body: {
			required: true,
			content: { "application/json": { schema: UpdateApplicantRequestSchema } },
		},
	},
	responses: {
		200: {
			description: "Applicant updated successfully",
			content: { "application/json": { schema: ApplicantResponseSchema } },
		},
		404: {
			description: "Applicant not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// DELETE /api/applicants/:id
openApiRegistry.registerPath({
	method: "delete",
	path: "/api/applicants/{id}",
	tags: ["Applicants"],
	summary: "Delete applicant",
	security: [{ bearerAuth: [] }],
	request: { params: ApplicantIdParamSchema },
	responses: {
		200: {
			description: "Applicant deleted successfully",
			content: {
				"application/json": { schema: ApplicantDeleteResponseSchema },
			},
		},
		404: {
			description: "Applicant not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// POST /api/applicants/:id/reject
openApiRegistry.registerPath({
	method: "post",
	path: "/api/applicants/{id}/reject",
	tags: ["Applicants"],
	summary: "Reject an applicant",
	security: [{ bearerAuth: [] }],
	request: {
		params: ApplicantIdParamSchema,
		body: {
			required: false,
			content: { "application/json": { schema: RejectApplicantRequestSchema } },
		},
	},
	responses: {
		200: {
			description: "Applicant rejected",
			content: { "application/json": { schema: ApplicantResponseSchema } },
		},
		404: {
			description: "Applicant not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// POST /api/applicants/:id/schedule-interview
openApiRegistry.registerPath({
	method: "post",
	path: "/api/applicants/{id}/schedule-interview",
	tags: ["Applicants"],
	summary: "Schedule an interview for an applicant",
	security: [{ bearerAuth: [] }],
	request: {
		params: ApplicantIdParamSchema,
		body: {
			required: true,
			content: {
				"application/json": { schema: ScheduleInterviewRequestSchema },
			},
		},
	},
	responses: {
		200: {
			description: "Interview scheduled",
			content: { "application/json": { schema: ApplicantResponseSchema } },
		},
		404: {
			description: "Applicant not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// POST /api/applicants/:id/assign-recruiter
openApiRegistry.registerPath({
	method: "post",
	path: "/api/applicants/{id}/assign-recruiter",
	tags: ["Applicants"],
	summary: "Assign a recruiter to an applicant",
	security: [{ bearerAuth: [] }],
	request: {
		params: ApplicantIdParamSchema,
		body: {
			required: true,
			content: { "application/json": { schema: AssignRecruiterRequestSchema } },
		},
	},
	responses: {
		200: {
			description: "Recruiter assigned",
			content: { "application/json": { schema: ApplicantResponseSchema } },
		},
		404: {
			description: "Applicant not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// POST /api/applicants/:id/assign-interviewer
openApiRegistry.registerPath({
	method: "post",
	path: "/api/applicants/{id}/assign-interviewer",
	tags: ["Applicants"],
	summary: "Assign an interviewer to an applicant",
	security: [{ bearerAuth: [] }],
	request: {
		params: ApplicantIdParamSchema,
		body: {
			required: true,
			content: {
				"application/json": { schema: AssignInterviewerRequestSchema },
			},
		},
	},
	responses: {
		200: {
			description: "Interviewer assigned",
			content: { "application/json": { schema: ApplicantResponseSchema } },
		},
		404: {
			description: "Applicant not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

// POST /api/applicants/:id/next-stage
openApiRegistry.registerPath({
	method: "post",
	path: "/api/applicants/{id}/next-stage",
	tags: ["Applicants"],
	summary: "Move applicant to the next stage",
	security: [{ bearerAuth: [] }],
	request: { params: ApplicantIdParamSchema },
	responses: {
		200: {
			description: "Applicant moved to next stage",
			content: { "application/json": { schema: ApplicantResponseSchema } },
		},
		404: {
			description: "Applicant not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});
