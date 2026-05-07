import { Router } from "express";

import { getHealth } from "./controllers/healthController.ts";
import {
	getAuthenticatedUser,
	login,
	logout,
} from "./controllers/auth.controller.ts";
import { getDashboard } from "./controllers/dashboard.controller.ts";
import {
	editJob,
	getJob,
	listJobs,
	postJob,
	removeJob,
} from "./controllers/job.controller.ts";
import {
	editTeamMember,
	getTeamMember,
	listTeamMembers,
	postTeamMember,
	removeTeamMember,
	teamMemberImageUploadMiddleware,
} from "./controllers/team.controller.ts";
import {
	applicantResumeUploadMiddleware,
	assignInterviewerAction,
	assignRecruiterAction,
	editApplicant,
	getApplicant,
	getApplicantsByJob,
	listApplicants,
	moveToNextStageAction,
	rejectApplicantAction,
	removeApplicant,
	scheduleInterviewAction,
	submitApplicant,
} from "./controllers/applicant.controller.ts";
import { requireAuth } from "./middleware/auth.middleware.ts";
import { validateBody } from "./middleware/validate.middleware.ts";
import { LoginRequestSchema } from "./schemas/auth.schema.ts";

export function createApiRouter(): Router {
	const api = Router();
	api.get("/health", getHealth);
	api.post("/auth/login", validateBody(LoginRequestSchema), login);
	api.get("/auth/me", requireAuth, getAuthenticatedUser);
	api.post("/auth/logout", requireAuth, logout);
	api.get("/dashboard", requireAuth, getDashboard);

	api.get("/jobs", listJobs);
	api.get("/jobs/:id", getJob);
	api.post("/jobs", requireAuth, postJob);
	api.patch("/jobs/:id", requireAuth, editJob);
	api.delete("/jobs/:id", requireAuth, removeJob);

	api.get("/team-members", requireAuth, listTeamMembers);
	api.get("/team-members/:id", requireAuth, getTeamMember);
	api.post(
		"/team-members",
		requireAuth,
		teamMemberImageUploadMiddleware,
		postTeamMember,
	);
	api.patch(
		"/team-members/:id",
		requireAuth,
		teamMemberImageUploadMiddleware,
		editTeamMember,
	);
	api.delete("/team-members/:id", requireAuth, removeTeamMember);

	api.get("/applicants", requireAuth, listApplicants);
	api.get("/applicants/:id", requireAuth, getApplicant);
	api.get("/jobs/:jobId/applicants", requireAuth, getApplicantsByJob);
	api.post("/applicants", applicantResumeUploadMiddleware, submitApplicant);
	api.patch("/applicants/:id", requireAuth, editApplicant);
	api.delete("/applicants/:id", requireAuth, removeApplicant);

	api.post("/applicants/:id/reject", requireAuth, rejectApplicantAction);
	api.post(
		"/applicants/:id/schedule-interview",
		requireAuth,
		scheduleInterviewAction,
	);
	api.post(
		"/applicants/:id/assign-recruiter",
		requireAuth,
		assignRecruiterAction,
	);
	api.post(
		"/applicants/:id/assign-interviewer",
		requireAuth,
		assignInterviewerAction,
	);
	api.post("/applicants/:id/next-stage", requireAuth, moveToNextStageAction);

	return api;
}
