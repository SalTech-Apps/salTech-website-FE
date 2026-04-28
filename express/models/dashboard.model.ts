import type { Applicant } from "./applicant.model.ts";

type RecentApplicantBase = Pick<
	Applicant,
	"id" | "fullName" | "email" | "status" | "createdAt"
>;

export type DashboardRecentApplication = Omit<
	RecentApplicantBase,
	"createdAt"
> & {
	position: string;
	statusLabel: string;
	appliedDate: Applicant["createdAt"];
};

export type DashboardOverview = {
	totalJobs: number;
	activeJobs: number;
	totalApplicants: number;
	newThisWeek: number;
	recentApplications: DashboardRecentApplication[];
};
