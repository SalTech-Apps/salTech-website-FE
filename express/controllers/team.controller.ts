import multer from "multer";
import type { NextFunction, Request, Response } from "express";
import {
	BadRequestResponse,
	ErrorResponse,
	NotFoundResponse,
	SuccessResponse,
} from "../utils/response.ts";
import { getParamId } from "../utils/fns.ts";
import { uploadTeamMemberImage } from "../services/file.service.ts";
import {
	createTeamMember,
	deleteTeamMember,
	getTeamMember as getTeamMemberById,
	listTeamMembers as listAllTeamMembers,
	normalizeCreateTeamMemberInput,
	normalizeUpdateTeamMemberInput,
	updateTeamMember,
	validateCreateTeamMemberInput,
} from "../services/team.service.ts";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
});

const teamMemberImageUpload = upload.single("profileImage");

export function teamMemberImageUploadMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	teamMemberImageUpload(req, res, (error) => {
		if (!error) {
			next();
			return;
		}

		const message =
			error instanceof Error
				? error.message
				: "Team member image upload failed";
		BadRequestResponse(res, message, "BadRequest");
	});
}

export async function listTeamMembers(
	_req: Request,
	res: Response,
): Promise<void> {
	try {
		const members = await listAllTeamMembers();
		SuccessResponse(res, members, 200, "Team members fetched successfully");
	} catch (error) {
		console.error("[team.controller] listTeamMembers error:", error);
		ErrorResponse(res, "Failed to fetch team members");
	}
}

export async function getTeamMember(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);
		if (!id) {
			BadRequestResponse(res, "Team member id is required", "BadRequest");
			return;
		}
		const member = await getTeamMemberById(id);
		if (!member) {
			NotFoundResponse(res, "Team member not found", "NotFound");
			return;
		}
		SuccessResponse(res, member, 200, "Team member fetched successfully");
	} catch (error) {
		console.error("[team.controller] getTeamMember error:", error);
		ErrorResponse(res, "Failed to fetch team member");
	}
}

export async function postTeamMember(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const body =
			req.body && typeof req.body === "object"
				? (req.body as Record<string, unknown>)
				: {};
		const input = normalizeCreateTeamMemberInput(body);

		if (req.file) {
			const uploaded = await uploadTeamMemberImage({
				buffer: req.file.buffer,
				originalName: req.file.originalname,
				mimeType: req.file.mimetype,
				name: input.name,
			});
			input.profileImageUrl = uploaded.url;
		}

		const validationError = validateCreateTeamMemberInput(input);
		if (validationError) {
			BadRequestResponse(res, validationError, "BadRequest");
			return;
		}

		const member = await createTeamMember(input);
		SuccessResponse(res, member, 201, "Team member created successfully");
	} catch (error) {
		console.error("[team.controller] postTeamMember error:", error);
		ErrorResponse(res, "Failed to create team member");
	}
}

export async function editTeamMember(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);
		if (!id) {
			BadRequestResponse(res, "Team member id is required", "BadRequest");
			return;
		}

		const body =
			req.body && typeof req.body === "object"
				? (req.body as Record<string, unknown>)
				: {};
		const patch = normalizeUpdateTeamMemberInput(body);

		if (req.file) {
			const existing = await getTeamMemberById(id);
			const uploaded = await uploadTeamMemberImage({
				buffer: req.file.buffer,
				originalName: req.file.originalname,
				mimeType: req.file.mimetype,
				name: patch.name ?? existing?.name ?? "team-member",
			});
			patch.profileImageUrl = uploaded.url;
		}

		if (Object.keys(patch).length === 0) {
			BadRequestResponse(
				res,
				"No valid fields provided for update",
				"BadRequest",
			);
			return;
		}

		const updated = await updateTeamMember(id, patch);
		if (!updated) {
			NotFoundResponse(res, "Team member not found", "NotFound");
			return;
		}

		SuccessResponse(res, updated, 200, "Team member updated successfully");
	} catch (error) {
		console.error("[team.controller] editTeamMember error:", error);
		ErrorResponse(res, "Failed to update team member");
	}
}

export async function removeTeamMember(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const id = getParamId(req.params.id);
		if (!id) {
			BadRequestResponse(res, "Team member id is required", "BadRequest");
			return;
		}

		const deleted = await deleteTeamMember(id);
		if (!deleted) {
			NotFoundResponse(res, "Team member not found", "NotFound");
			return;
		}

		SuccessResponse(res, { id }, 200, "Team member deleted successfully");
	} catch (error) {
		console.error("[team.controller] removeTeamMember error:", error);
		ErrorResponse(res, "Failed to delete team member");
	}
}
