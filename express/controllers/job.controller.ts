import type { Request, Response } from "express";
import {
	BadRequestResponse,
	ErrorResponse,
	NotFoundResponse,
	SuccessResponse,
} from "../utils/response.ts";
import {
	createJob,
	deleteJob,
	getJobById,
	getJobs,
	normalizeCreateJobInput,
	normalizeUpdateJobInput,
	updateJob,
	validateCreateJobInput,
} from "../services/job.service.ts";
import { getParamId } from "../utils/fns.ts";
import type { CreateJobRequest } from "../models/job.model.ts";

export async function listJobs(_req: Request, res: Response): Promise<void> {
	try {
		const jobs = await getJobs();
		SuccessResponse(res, jobs, 200, "Jobs fetched successfully");
	} catch (error) {
		console.error("[job.controller] listJobs error:", error);
		ErrorResponse(res, "Failed to fetch jobs");
	}
}

export async function getJob(req: Request, res: Response): Promise<void> {
	try {
		const id = getParamId(req.params.id);

		if (!id) {
			BadRequestResponse(res, "Job id is required", "BadRequest");
			return;
		}

		const job = await getJobById(id);

		if (!job) {
			NotFoundResponse(res, "Job not found", "NotFound");
			return;
		}

		SuccessResponse(res, job, 200, "Job fetched successfully");
	} catch (error) {
		console.error("[job.controller] getJob error:", error);
		ErrorResponse(res, "Failed to fetch job");
	}
}

export async function postJob(
	req: Request<object, object, CreateJobRequest>,
	res: Response,
): Promise<void> {
	try {
		if (!req.body || typeof req.body !== "object") {
			BadRequestResponse(
				res,
				"Request body is required and must be valid JSON",
				"BadRequest",
			);
			return;
		}

		const input = normalizeCreateJobInput(req.body as Record<string, unknown>);
		const validationError = validateCreateJobInput(input);

		if (validationError) {
			BadRequestResponse(res, validationError, "BadRequest");
			return;
		}

		const created = await createJob(input);
		SuccessResponse(res, created, 201, "Job created successfully");
	} catch (error) {
		console.error("[job.controller] postJob error:", error);
		ErrorResponse(res, "Failed to create job");
	}
}

export async function editJob(req: Request, res: Response): Promise<void> {
	try {
		const id = getParamId(req.params.id);

		if (!id) {
			BadRequestResponse(res, "Job id is required", "BadRequest");
			return;
		}

		const patch = normalizeUpdateJobInput(req.body as Record<string, unknown>);
		const updated = await updateJob(id, patch);

		if (!updated) {
			NotFoundResponse(res, "Job not found", "NotFound");
			return;
		}

		SuccessResponse(res, updated, 200, "Job updated successfully");
	} catch (error) {
		console.error("[job.controller] editJob error:", error);
		ErrorResponse(res, "Failed to update job");
	}
}

export async function removeJob(req: Request, res: Response): Promise<void> {
	try {
		const id = getParamId(req.params.id);

		if (!id) {
			BadRequestResponse(res, "Job id is required", "BadRequest");
			return;
		}

		const deleted = await deleteJob(id);

		if (!deleted) {
			NotFoundResponse(res, "Job not found", "NotFound");
			return;
		}

		SuccessResponse(res, { id }, 200, "Job deleted successfully");
	} catch (error) {
		console.error("[job.controller] removeJob error:", error);
		ErrorResponse(res, "Failed to delete job");
	}
}
