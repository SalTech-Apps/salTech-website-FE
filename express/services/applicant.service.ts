import type {
	Applicant,
	ApplicantStatus,
	CreateApplicantRequest,
	UpdateApplicantRequest,
} from "../models/applicant.model.ts";
import {
	createApplicantDocument,
	listApplicantDocuments,
	mergeApplicantDocument,
	readApplicantDocumentById,
	removeApplicantDocument,
	listApplicantsByJobId,
} from "../firebase/applicant.firestore.ts";

const validStatuses: ApplicantStatus[] = [
	"NEW",
	"UNDER_REVIEW",
	"INTERVIEW_SCHEDULED",
	"ACCEPTED",
	"REJECTED",
];

function generateApplicantId(): string {
	return `applicant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function normalizeCreateApplicantInput(
	body: Record<string, unknown>,
): CreateApplicantRequest {
	const statusValue = String(body.status ?? "NEW") as ApplicantStatus;
	return {
		jobId: String(body.jobId ?? "").trim(),
		fullName: String(body.fullName ?? "").trim(),
		email: String(body.email ?? "").trim(),
		phone: String(body.phone ?? "").trim(),
		resumeUrl: String(body.resumeUrl ?? "").trim(),
		portfolioUrl: body.portfolioUrl
			? String(body.portfolioUrl).trim() || undefined
			: undefined,
		linkedinUrl: body.linkedinUrl
			? String(body.linkedinUrl).trim() || undefined
			: undefined,
		coverLetter: String(body.coverLetter ?? "").trim(),
		earliestStartDate: body.earliestStartDate
			? String(body.earliestStartDate).trim() || undefined
			: undefined,
		status: validStatuses.includes(statusValue) ? statusValue : "NEW",
	};
}

export function normalizeUpdateApplicantInput(
	body: Record<string, unknown>,
): UpdateApplicantRequest {
	const patch: UpdateApplicantRequest = {};

	if ("fullName" in body) patch.fullName = String(body.fullName ?? "").trim();
	if ("email" in body) patch.email = String(body.email ?? "").trim();
	if ("phone" in body) patch.phone = String(body.phone ?? "").trim();
	if ("resumeUrl" in body)
		patch.resumeUrl = String(body.resumeUrl ?? "").trim();
	if ("portfolioUrl" in body)
		patch.portfolioUrl = body.portfolioUrl
			? String(body.portfolioUrl).trim() || undefined
			: undefined;
	if ("linkedinUrl" in body)
		patch.linkedinUrl = body.linkedinUrl
			? String(body.linkedinUrl).trim() || undefined
			: undefined;
	if ("coverLetter" in body)
		patch.coverLetter = String(body.coverLetter ?? "").trim();
	if ("earliestStartDate" in body)
		patch.earliestStartDate = body.earliestStartDate
			? String(body.earliestStartDate).trim() || undefined
			: undefined;
	if ("status" in body) {
		const statusValue = String(body.status ?? "") as ApplicantStatus;
		patch.status = validStatuses.includes(statusValue) ? statusValue : "NEW";
	}
	if ("assignedRecruiter" in body)
		patch.assignedRecruiter = body.assignedRecruiter
			? String(body.assignedRecruiter).trim() || undefined
			: undefined;
	if ("assignedInterviewer" in body)
		patch.assignedInterviewer = body.assignedInterviewer
			? String(body.assignedInterviewer).trim() || undefined
			: undefined;
	if ("interviewScheduledAt" in body)
		patch.interviewScheduledAt = body.interviewScheduledAt
			? String(body.interviewScheduledAt).trim() || undefined
			: undefined;
	if ("rejectionReason" in body)
		patch.rejectionReason = body.rejectionReason
			? String(body.rejectionReason).trim() || undefined
			: undefined;

	return patch;
}

export function validateCreateApplicantInput(
	input: CreateApplicantRequest,
): string | null {
	if (!input.jobId) return "jobId is required";
	if (!input.fullName) return "fullName is required";
	if (!input.email) return "email is required";
	if (!input.phone) return "phone is required";
	if (!input.resumeUrl) return "resumeUrl is required";
	if (!input.coverLetter) return "coverLetter is required";
	if (input.coverLetter.length < 50)
		return "coverLetter must be at least 50 characters";

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(input.email)) return "Invalid email address";

	return null;
}

export async function getApplicants(): Promise<Applicant[]> {
	return listApplicantDocuments();
}

export async function getApplicantsByJobId(
	jobId: string,
): Promise<Applicant[]> {
	return listApplicantsByJobId(jobId);
}

export async function getApplicantById(id: string): Promise<Applicant | null> {
	return readApplicantDocumentById(id);
}

export async function createApplicant(
	input: CreateApplicantRequest,
): Promise<Applicant> {
	const now = new Date().toISOString();
	const id = generateApplicantId();
	const status: ApplicantStatus = input.status ?? "NEW";
	const payload: Omit<Applicant, "id"> = {
		...input,
		status,
		createdAt: now,
		updatedAt: now,
	};
	const newApplicant: Applicant = {
		id,
		...payload,
	};

	await createApplicantDocument(id, payload);
	return newApplicant;
}

export async function updateApplicant(
	id: string,
	patch: UpdateApplicantRequest,
): Promise<Applicant | null> {
	return mergeApplicantDocument(id, {
		...patch,
		updatedAt: new Date().toISOString(),
	});
}

export async function deleteApplicant(id: string): Promise<boolean> {
	return removeApplicantDocument(id);
}

export async function rejectApplicant(
	id: string,
	rejectionReason: string,
): Promise<Applicant | null> {
	return mergeApplicantDocument(id, {
		status: "REJECTED",
		rejectionReason: rejectionReason.trim(),
		updatedAt: new Date().toISOString(),
	});
}

export async function scheduleInterview(
	id: string,
	interviewDate: string,
): Promise<Applicant | null> {
	return mergeApplicantDocument(id, {
		status: "INTERVIEW_SCHEDULED",
		interviewScheduledAt: interviewDate,
		updatedAt: new Date().toISOString(),
	});
}

export async function assignRecruiter(
	id: string,
	recruiterName: string,
): Promise<Applicant | null> {
	return mergeApplicantDocument(id, {
		assignedRecruiter: recruiterName.trim(),
		updatedAt: new Date().toISOString(),
	});
}

export async function assignInterviewer(
	id: string,
	interviewerName: string,
): Promise<Applicant | null> {
	return mergeApplicantDocument(id, {
		assignedInterviewer: interviewerName.trim(),
		updatedAt: new Date().toISOString(),
	});
}

export async function moveToNextStage(id: string): Promise<Applicant | null> {
	const applicant = await getApplicantById(id);
	if (!applicant) return null;

	const stageProgression: Record<ApplicantStatus, ApplicantStatus> = {
		NEW: "UNDER_REVIEW",
		UNDER_REVIEW: "INTERVIEW_SCHEDULED",
		INTERVIEW_SCHEDULED: "ACCEPTED",
		ACCEPTED: "ACCEPTED",
		REJECTED: "REJECTED",
	};

	const nextStage = stageProgression[applicant.status];
	return mergeApplicantDocument(id, {
		status: nextStage,
		updatedAt: new Date().toISOString(),
	});
}
