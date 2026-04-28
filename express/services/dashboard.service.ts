import { listApplicantDocuments } from "../firebase/applicant.firestore.ts";
import { listJobDocuments } from "../firebase/job.firestore.ts";
import type { ApplicantStatus } from "../models/applicant.model.ts";
import type {
	DashboardOverview,
	DashboardRecentApplication,
} from "../models/dashboard.model.ts";

function toDateOrNull(value: string | undefined): Date | null {
	if (!value) return null;
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getStartOfWeekUTC(date: Date): Date {
	const result = new Date(date);
	const day = result.getUTCDay();
	const diffToMonday = (day + 6) % 7;
	result.setUTCDate(result.getUTCDate() - diffToMonday);
	result.setUTCHours(0, 0, 0, 0);
	return result;
}

function isWithinRange(
	date: Date,
	fromInclusive: Date,
	toExclusive: Date,
): boolean {
	return date >= fromInclusive && date < toExclusive;
}

function countWithinRange(
	values: Array<string | undefined>,
	fromInclusive: Date,
	toExclusive: Date,
): number {
	let count = 0;
	for (const value of values) {
		const date = toDateOrNull(value);
		if (!date) continue;
		if (isWithinRange(date, fromInclusive, toExclusive)) count += 1;
	}
	return count;
}

function formatApplicantStatus(status: ApplicantStatus): string {
	const labels: Record<ApplicantStatus, string> = {
		NEW: "New",
		UNDER_REVIEW: "Under Review",
		INTERVIEW_SCHEDULED: "Interview Scheduled",
		ACCEPTED: "Accepted",
		REJECTED: "Rejected",
	};

	return labels[status];
}

function formatAppliedDate(value: string): string {
	const date = toDateOrNull(value);
	if (!date) return "Unknown date";

	return date.toISOString().slice(0, 10);
}

function sortByCreatedAtDesc(a: string, b: string): number {
	const left = toDateOrNull(a);
	const right = toDateOrNull(b);

	if (!left && !right) return 0;
	if (!left) return 1;
	if (!right) return -1;

	return right.getTime() - left.getTime();
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
	const [jobs, applicants] = await Promise.all([
		listJobDocuments(),
		listApplicantDocuments(),
	]);

	const now = new Date();
	const startOfThisWeek = getStartOfWeekUTC(now);

	const totalJobsCount = jobs.length;
	const activeJobsCount = jobs.filter((job) => job.status === "OPEN").length;

	const totalApplicantsCount = applicants.length;
	const newApplicantsThisWeek = countWithinRange(
		applicants.map((applicant) => applicant.createdAt),
		startOfThisWeek,
		now,
	);

	const jobsById = new Map(jobs.map((job) => [job.id, job]));

	const recentApplications: DashboardRecentApplication[] = [...applicants]
		.sort((left, right) => sortByCreatedAtDesc(left.createdAt, right.createdAt))
		.slice(0, 5)
		.map((applicant) => ({
			id: applicant.id,
			fullName: applicant.fullName,
			email: applicant.email,
			position: jobsById.get(applicant.jobId)?.title ?? "Unknown Position",
			status: applicant.status,
			statusLabel: formatApplicantStatus(applicant.status),
			appliedDate: formatAppliedDate(applicant.createdAt),
		}));

	return {
		totalJobs: totalJobsCount,
		activeJobs: activeJobsCount,
		totalApplicants: totalApplicantsCount,
		newThisWeek: newApplicantsThisWeek,
		recentApplications,
	};
}
