import multer from "multer";
import type { NextFunction, Request, Response } from "express";
import {
	BadRequestResponse,
	ErrorResponse,
	NotFoundResponse,
	SuccessResponse,
} from "../utils/response.ts";
import {
	assignInterviewer,
	assignRecruiter,
	createApplicant,
	deleteApplicant,
	getApplicantById,
	getApplicants,
	getApplicantsByJobId,
	moveToNextStage,
	normalizeCreateApplicantInput,
	normalizeUpdateApplicantInput,
	rejectApplicant,
	scheduleInterview,
	updateApplicant,
	validateCreateApplicantInput,
} from "../services/applicant.service.ts";
import { uploadResume } from "../services/file.service.ts";
import { getParamId } from "../utils/fns.ts";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
});

const applicantResumeUpload = upload.single("resume");

export function applicantResumeUploadMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	applicantResumeUpload(req, res, (error) => {
		if (!error) {
			next();
			return;
		}

		const message =
			error instanceof Error ? error.message : "Resume upload failed";
		BadRequestResponse(res, message, "BadRequest");
	});
}

export async function listApplicants(
	_req: Request,
	res: Response,
): Promise<void> {
	try {
		const applicants = await getApplicants();
		SuccessResponse(res, applicants, 200, "Applicants fetched successfully");
	} catch (error) {
		console.error("[applicant.controller] listApplicants error:", error);
		ErrorResponse(res, "Failed to fetch applicants");
	}
}

export async function getApplicantsByJob(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const jobId = getParamId(req.params.jobId);

		if (!jobId) {
			BadRequestResponse(res, "Job ID is required", "BadRequest");
			return;
		}

		const applicants = await getApplicantsByJobId(jobId);
		SuccessResponse(res, applicants, 200, "Applicants fetched successfully");
	} catch (error) {
		console.error("[applicant.controller] getApplicantsByJob error:", error);
		ErrorResponse(res, "Failed to fetch applicants");
	}
}

export async function getApplicant(req: Request, res: Response): Promise<void> {
	try {
		const id = getParamId(req.params.id);

		if (!id) {
			BadRequestResponse(res, "Applicant ID is required", "BadRequest");
			return;
		}

		const applicant = await getApplicantById(id);

		if (!applicant) {
			NotFoundResponse(res, "Applicant not found", "NotFound");
			return;
		}

		SuccessResponse(res, applicant, 200, "Applicant fetched successfully");
	} catch (error) {
		console.error("[applicant.controller] getApplicant error:", error);
		ErrorResponse(res, "Failed to fetch applicant");
	}
}

export async function submitApplicant(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const body =
			req.body && typeof req.body === "object"
				? (req.body as Record<string, unknown>)
				: {};
		const input = normalizeCreateApplicantInput(body);

		if (req.file) {
			const uploaded = await uploadResume({
				buffer: req.file.buffer,
				originalName: req.file.originalname,
				mimeType: req.file.mimetype,
				name: input.fullName,
			});
			input.resumeUrl = uploaded.url;
		}

		const validationError = validateCreateApplicantInput(input);

		if (validationError) {
			BadRequestResponse(res, validationError, "BadRequest");
			return;
		}

		const created = await createApplicant(input);
		SuccessResponse(res, created, 201, "Application submitted successfully");
	} catch (error) {
		console.error("[applicant.controller] submitApplicant error:", error);
		ErrorResponse(res, "Failed to submit application");
	}
}

export async function editApplicant(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);

		if (!id) {
			BadRequestResponse(res, "Applicant ID is required", "BadRequest");
			return;
		}

		const patch = normalizeUpdateApplicantInput(
			req.body as Record<string, unknown>,
		);
		const updated = await updateApplicant(id, patch);

		if (!updated) {
			NotFoundResponse(res, "Applicant not found", "NotFound");
			return;
		}

		SuccessResponse(res, updated, 200, "Applicant updated successfully");
	} catch (error) {
		console.error("[applicant.controller] editApplicant error:", error);
		ErrorResponse(res, "Failed to update applicant");
	}
}

export async function removeApplicant(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);

		if (!id) {
			BadRequestResponse(res, "Applicant ID is required", "BadRequest");
			return;
		}

		const deleted = await deleteApplicant(id);

		if (!deleted) {
			NotFoundResponse(res, "Applicant not found", "NotFound");
			return;
		}

		SuccessResponse(res, { id }, 200, "Applicant deleted successfully");
	} catch (error) {
		console.error("[applicant.controller] removeApplicant error:", error);
		ErrorResponse(res, "Failed to delete applicant");
	}
}

export async function rejectApplicantAction(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);
		const { rejectionReason } = req.body as Record<string, unknown>;

		if (!id) {
			BadRequestResponse(res, "Applicant ID is required", "BadRequest");
			return;
		}

		if (!rejectionReason || typeof rejectionReason !== "string") {
			BadRequestResponse(res, "rejectionReason is required", "BadRequest");
			return;
		}

		const updated = await rejectApplicant(id, rejectionReason);

		if (!updated) {
			NotFoundResponse(res, "Applicant not found", "NotFound");
			return;
		}

		SuccessResponse(res, updated, 200, "Applicant rejected successfully");
	} catch (error) {
		console.error("[applicant.controller] rejectApplicantAction error:", error);
		ErrorResponse(res, "Failed to reject applicant");
	}
}

export async function scheduleInterviewAction(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);
		const { interviewScheduledAt } = req.body as Record<string, unknown>;

		if (!id) {
			BadRequestResponse(res, "Applicant ID is required", "BadRequest");
			return;
		}

		if (!interviewScheduledAt || typeof interviewScheduledAt !== "string") {
			BadRequestResponse(res, "interviewScheduledAt is required", "BadRequest");
			return;
		}

		const updated = await scheduleInterview(id, interviewScheduledAt);

		if (!updated) {
			NotFoundResponse(res, "Applicant not found", "NotFound");
			return;
		}

		SuccessResponse(res, updated, 200, "Interview scheduled successfully");
	} catch (error) {
		console.error(
			"[applicant.controller] scheduleInterviewAction error:",
			error,
		);
		ErrorResponse(res, "Failed to schedule interview");
	}
}

export async function assignRecruiterAction(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);
		const { assignedRecruiter } = req.body as Record<string, unknown>;

		if (!id) {
			BadRequestResponse(res, "Applicant ID is required", "BadRequest");
			return;
		}

		if (!assignedRecruiter || typeof assignedRecruiter !== "string") {
			BadRequestResponse(res, "assignedRecruiter is required", "BadRequest");
			return;
		}

		const updated = await assignRecruiter(id, assignedRecruiter);

		if (!updated) {
			NotFoundResponse(res, "Applicant not found", "NotFound");
			return;
		}

		SuccessResponse(res, updated, 200, "Recruiter assigned successfully");
	} catch (error) {
		console.error("[applicant.controller] assignRecruiterAction error:", error);
		ErrorResponse(res, "Failed to assign recruiter");
	}
}

export async function assignInterviewerAction(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);
		const { assignedInterviewer } = req.body as Record<string, unknown>;

		if (!id) {
			BadRequestResponse(res, "Applicant ID is required", "BadRequest");
			return;
		}

		if (!assignedInterviewer || typeof assignedInterviewer !== "string") {
			BadRequestResponse(res, "assignedInterviewer is required", "BadRequest");
			return;
		}

		const updated = await assignInterviewer(id, assignedInterviewer);

		if (!updated) {
			NotFoundResponse(res, "Applicant not found", "NotFound");
			return;
		}

		SuccessResponse(res, updated, 200, "Interviewer assigned successfully");
	} catch (error) {
		console.error(
			"[applicant.controller] assignInterviewerAction error:",
			error,
		);
		ErrorResponse(res, "Failed to assign interviewer");
	}
}

export async function moveToNextStageAction(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);

		if (!id) {
			BadRequestResponse(res, "Applicant ID is required", "BadRequest");
			return;
		}

		const updated = await moveToNextStage(id);

		if (!updated) {
			NotFoundResponse(res, "Applicant not found", "NotFound");
			return;
		}

		SuccessResponse(
			res,
			updated,
			200,
			"Applicant moved to next stage successfully",
		);
	} catch (error) {
		console.error("[applicant.controller] moveToNextStageAction error:", error);
		ErrorResponse(res, "Failed to move applicant to next stage");
	}
}
