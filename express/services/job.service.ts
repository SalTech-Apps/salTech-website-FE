import type {
	Job,
	CreateJobRequest,
	UpdateJobRequest,
	JobStatus,
	JobType,
	JobDepartment,
} from "../models/job.model.ts";
import {
	createJobDocument,
	listJobDocuments,
	mergeJobDocument,
	readJobDocumentById,
	removeJobDocument,
} from "../firebase/job.firestore.ts";
import { toArray, toOptionalNumber } from "../utils/fns.ts";

const allowedStatus: JobStatus[] = ["DRAFT", "OPEN", "CLOSED"];
const allowedJobType: JobType[] = [
	"FULL_TIME",
	"PART_TIME",
	"CONTRACT",
	"INTERNSHIP",
];

const allowedDepts: JobDepartment[] = [
	"ENGINEERING",
	"MARKETING",
	"SALES",
	"HR",
	"DESIGN",
	"PRODUCT",
	"OTHER",
];

export function normalizeCreateJobInput(
	body: Record<string, unknown> = {},
): CreateJobRequest {
	const status = String(body.status ?? "OPEN") as JobStatus;
	const jobType = String(body.jobType ?? "FULL_TIME") as JobType;

	return {
		title: String(body.title ?? "").trim(),
		department: allowedDepts.includes(
			String(body.department ?? "").trim() as JobDepartment,
		)
			? (String(body.department ?? "").trim() as JobDepartment)
			: "OTHER",
		jobType: allowedJobType.includes(jobType) ? jobType : "FULL_TIME",
		location: String(body.location ?? "").trim(),
		description: String(body.description ?? "").trim(),
		responsibilities: toArray(body.responsibilities),
		requirements: toArray(body.requirements),
		niceToHave: toArray(body.niceToHave),
		minSalary: toOptionalNumber(body.minSalary),
		maxSalary: toOptionalNumber(body.maxSalary),
		status: allowedStatus.includes(status) ? status : "OPEN",
	};
}

export function normalizeUpdateJobInput(
	body: Record<string, unknown>,
): UpdateJobRequest {
	const patch: UpdateJobRequest = {};

	if ("title" in body) patch.title = String(body.title ?? "").trim();
	if ("department" in body)
		patch.department = allowedDepts.includes(
			String(body.department ?? "").trim() as JobDepartment,
		)
			? (String(body.department ?? "").trim() as JobDepartment)
			: "OTHER";
	if ("jobType" in body) {
		const jobType = String(body.jobType ?? "") as JobType;
		patch.jobType = allowedJobType.includes(jobType) ? jobType : "FULL_TIME";
	}
	if ("location" in body) patch.location = String(body.location ?? "").trim();
	if ("description" in body)
		patch.description = String(body.description ?? "").trim();
	if ("responsibilities" in body)
		patch.responsibilities = toArray(body.responsibilities);
	if ("requirements" in body) patch.requirements = toArray(body.requirements);
	if ("niceToHave" in body) patch.niceToHave = toArray(body.niceToHave);
	if ("minSalary" in body) patch.minSalary = toOptionalNumber(body.minSalary);
	if ("maxSalary" in body) patch.maxSalary = toOptionalNumber(body.maxSalary);
	if ("status" in body) {
		const status = String(body.status ?? "") as JobStatus;
		patch.status = allowedStatus.includes(status) ? status : "OPEN";
	}

	return patch;
}

export function validateCreateJobInput(input: CreateJobRequest): string | null {
	if (!input.title) return "title is required";
	if (!input.department) return "department is required";
	if (!input.jobType) return "jobType is required";
	if (!input.location) return "location is required";
	if (!input.description) return "description is required";
	return null;
}

function generateJobId(title: string): string {
	const slug = title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

	const random = Math.random().toString(36).slice(2, 7);
	return (slug || "job") + "-" + random;
}

export async function getJobs(): Promise<Job[]> {
	return listJobDocuments();
}

export async function getJobById(id: string): Promise<Job | null> {
	return readJobDocumentById(id);
}

export async function createJob(input: CreateJobRequest): Promise<Job> {
	const now = new Date().toISOString();
	const id = generateJobId(input.title);
	const status: JobStatus = input.status ?? "OPEN";
	const payload: Omit<Job, "id"> = {
		...input,
		status,
		createdAt: now,
		updatedAt: now,
	};
	const newJob: Job = {
		id,
		...payload,
	};

	await createJobDocument(id, payload);
	return newJob;
}

export async function updateJob(
	id: string,
	patch: UpdateJobRequest,
): Promise<Job | null> {
	return mergeJobDocument(id, {
		...patch,
		updatedAt: new Date().toISOString(),
	});
}

export async function deleteJob(id: string): Promise<boolean> {
	return removeJobDocument(id);
}
