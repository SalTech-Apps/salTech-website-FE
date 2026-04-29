export type ApplicantStatus =
	| "NEW"
	| "UNDER_REVIEW"
	| "INTERVIEW_SCHEDULED"
	| "ACCEPTED"
	| "REJECTED";

export type Applicant = {
	id: string;
	jobId: string;
	fullName: string;
	email: string;
	phone: string;
	resumeUrl: string;
	portfolioUrl?: string;
	linkedinUrl?: string;
	coverLetter: string;
	earliestStartDate?: string;
	status: ApplicantStatus;
	assignedRecruiter?: string;
	assignedInterviewer?: string;
	interviewScheduledAt?: string;
	rejectionReason?: string;
	createdAt: string;
	updatedAt: string;
};

export type CreateApplicantRequest = Omit<
	Applicant,
	"id" | "createdAt" | "updatedAt" | "status"
> & {
	status?: ApplicantStatus;
};
export type UpdateApplicantRequest = Partial<CreateApplicantRequest>;
