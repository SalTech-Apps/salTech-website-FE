export type JobStatus = "DRAFT" | "OPEN" | "CLOSED";
export type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
export type JobDepartment =
	| "ENGINEERING"
	| "MARKETING"
	| "SALES"
	| "HR"
	| "DESIGN"
	| "PRODUCT"
	| "OTHER";

export type Job = {
	id: string;
	title: string;
	department: JobDepartment;
	jobType: JobType;
	location: string;
	description: string;
	responsibilities: string[];
	requirements: string[];
	niceToHave: string[];
	minSalary?: number;
	maxSalary?: number;
	status: JobStatus;
	createdAt: string;
	updatedAt: string;
};

export type CreateJobRequest = Omit<
	Job,
	"id" | "status" | "createdAt" | "updatedAt"
> & {
	status?: JobStatus;
};
export type UpdateJobRequest = Partial<CreateJobRequest>;
