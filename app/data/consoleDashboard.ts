import { JOB_OPENINGS } from "@/data/saltechCareers";

export type ConsoleJobStatus = "active" | "draft";
export type CandidateStage =
	| "Under Review"
	| "Interview Scheduled"
	| "New"
	| "Rejected";

export type ConsoleJob = {
	id: string;
	title: string;
	department: string;
	location: string;
	type: string;
	status: ConsoleJobStatus;
	applicants: number;
	views: number;
	posted: string;
	modified: string;
	description: string;
	responsibilities: string[];
	requirements: string[];
	niceToHave: string[];
	salaryMin?: number;
	salaryMax?: number;
};

export type CandidateApplication = {
	id: string;
	name: string;
	email: string;
	phone: string;
	positionId: string;
	date: string;
	stage: CandidateStage;
	startDate: string;
	resumeName: string;
	resumeSize: string;
	linkedin: string;
	portfolio: string;
	coverLetter: string;
	assignedRecruiter: string;
	assignedInterviewer: string;
};

const BASE_JOBS: ConsoleJob[] = JOB_OPENINGS.map((job) => ({
	id: job.id,
	title: job.title,
	department: job.department,
	location: job.location,
	type: job.type,
	status: job.id === "business-dev" ? "active" : "active",
	applicants:
		job.id === "senior-backend-engineer"
			? 23
			: job.id === "product-designer"
				? 15
				: job.id === "business-dev"
					? 8
					: 31,
	views:
		job.id === "senior-backend-engineer"
			? 245
			: job.id === "product-designer"
				? 192
				: job.id === "business-dev"
					? 128
					: 214,
	posted: job.posted,
	modified:
		job.id === "senior-backend-engineer"
			? "2026-04-14"
			: job.id === "product-designer"
				? "2026-04-13"
				: job.id === "business-dev"
					? "2026-04-10"
					: "2026-04-11",
	description: job.description,
	responsibilities: [...job.whatYouWillDo].slice(0, 3),
	requirements: [...job.whatWeAreLookingFor].slice(0, 3),
	niceToHave: [...job.niceToHave],
	salaryMin:
		job.id === "business-dev"
			? 40000
			: job.id === "product-designer"
				? 70000
				: 80000,
	salaryMax:
		job.id === "business-dev"
			? 65000
			: job.id === "product-designer"
				? 105000
				: 120000,
}));

export const CONSOLE_JOBS: ConsoleJob[] = [
	...BASE_JOBS,
	{
		id: "devops-engineer",
		title: "DevOps Engineer",
		department: "Engineering",
		location: "Remote · Africa",
		type: "Full-time",
		status: "draft",
		applicants: 0,
		views: 245,
		posted: "3 days ago",
		modified: "2 days ago",
		description:
			"We're looking for an experienced backend engineer to build mission-critical infrastructure for Africa's digital economy. You'll own core systems used by thousands of people across 14 countries.",
		responsibilities: [
			"Design and build scalable backend services using Go, Python, or Node.js",
			"Own end-to-end delivery of critical features from design to deployment",
			"Work directly with stakeholders to understand requirements",
		],
		requirements: [
			"5+ years building production backend systems",
			"Strong experience with one or more: Go, Python, Node.js, Java",
			"Deep understanding of databases (PostgreSQL, MongoDB)",
		],
		niceToHave: [
			"Experience with infrastructure-as-code",
			"Kubernetes and Docker in production",
		],
		salaryMin: 80000,
		salaryMax: 120000,
	},
];

export const CANDIDATE_APPLICATIONS: CandidateApplication[] = [
	{
		id: "john-doe",
		name: "John Doe",
		email: "john.doe@email.com",
		phone: "+1 (555) 123-4567",
		positionId: "senior-backend-engineer",
		date: "2026-04-14",
		stage: "Under Review",
		startDate: "Immediately",
		resumeName: "Resume.pdf",
		resumeSize: "245 KB",
		linkedin: "linkedin.com/in/johndoe",
		portfolio: "johndoe.dev",
		coverLetter:
			"I am writing to express my strong interest in the Senior Backend Engineer position at SalTech. With over 7 years of experience in backend development and a proven track record of building scalable systems, I am confident I would be a valuable addition to your team.\n\nI have extensive experience with Go, Python, and Node.js, and have led several high-impact projects involving payment infrastructure and real-time data platforms. I am particularly excited about the opportunity to contribute to Africa's digital economy.",
		assignedRecruiter: "Jane Smith",
		assignedInterviewer: "David Chen",
	},
	{
		id: "sarah-johnson",
		name: "Sarah Johnson",
		email: "sarah.j@email.com",
		phone: "+1 (555) 223-9988",
		positionId: "product-designer",
		date: "2026-04-13",
		stage: "Interview Scheduled",
		startDate: "2 weeks",
		resumeName: "Sarah_Johnson_Portfolio.pdf",
		resumeSize: "312 KB",
		linkedin: "linkedin.com/in/sarahjohnson",
		portfolio: "sarahjohnson.design",
		coverLetter:
			"I have spent the last five years shipping polished, customer-facing product experiences and collaborating deeply with engineering teams. SalTech's focus on mission-critical products is exactly the type of work I want to keep doing.",
		assignedRecruiter: "Mark Johnson",
		assignedInterviewer: "Emily Rodriguez",
	},
	{
		id: "michael-chen",
		name: "Michael Chen",
		email: "m.chen@email.com",
		phone: "+1 (555) 891-0042",
		positionId: "senior-backend-engineer",
		date: "2026-04-12",
		stage: "New",
		startDate: "1 month",
		resumeName: "Michael_Chen_Resume.pdf",
		resumeSize: "198 KB",
		linkedin: "linkedin.com/in/michaelchen",
		portfolio: "michaelchen.io",
		coverLetter:
			"My background spans distributed systems, internal developer platforms, and platform reliability. I enjoy ambiguous problems and fast-moving teams.",
		assignedRecruiter: "Sarah Williams",
		assignedInterviewer: "Michael Brown",
	},
	{
		id: "emily-brown",
		name: "Emily Brown",
		email: "emily.b@email.com",
		phone: "+1 (555) 702-1460",
		positionId: "frontend-engineer",
		date: "2026-04-11",
		stage: "Under Review",
		startDate: "3 weeks",
		resumeName: "Emily_Brown_CV.pdf",
		resumeSize: "221 KB",
		linkedin: "linkedin.com/in/emilybrown",
		portfolio: "emilybrown.dev",
		coverLetter:
			"I build detail-oriented interfaces with React and React Native, and I care deeply about accessibility and performance. I would bring strong product sensitivity to the SalTech team.",
		assignedRecruiter: "Jane Smith",
		assignedInterviewer: "Emily Rodriguez",
	},
	{
		id: "david-wilson",
		name: "David Wilson",
		email: "d.wilson@email.com",
		phone: "+1 (555) 188-4402",
		positionId: "business-dev",
		date: "2026-04-10",
		stage: "Rejected",
		startDate: "Immediately",
		resumeName: "David_Wilson_CV.pdf",
		resumeSize: "267 KB",
		linkedin: "linkedin.com/in/davidwilson",
		portfolio: "davidwilson.co",
		coverLetter:
			"I have led partnerships and enterprise sales programs across West Africa and understand what it takes to open and grow strategic markets.",
		assignedRecruiter: "Mark Johnson",
		assignedInterviewer: "David Chen",
	},
];

export const ASSIGNMENT_OPTIONS = {
	recruiters: [
		{ name: "Jane Smith", role: "Senior Recruiter" },
		{ name: "Mark Johnson", role: "Technical Recruiter" },
		{ name: "Sarah Williams", role: "HR Manager" },
	],
	interviewers: [
		{ name: "David Chen", role: "Engineering Lead" },
		{ name: "Emily Rodriguez", role: "Senior Engineer" },
		{ name: "Michael Brown", role: "Tech Lead" },
	],
} as const;

export const DASHBOARD_OVERVIEW = {
	totalJobs: CONSOLE_JOBS.length,
	activeJobs: CONSOLE_JOBS.filter((job) => job.status === "active").length,
	totalApplicants: CANDIDATE_APPLICATIONS.length + 72,
	newThisWeek: 12,
} as const;

export function getConsoleJob(jobId: string | undefined) {
	return CONSOLE_JOBS.find((job) => job.id === jobId);
}

export function getCandidate(candidateId: string | undefined) {
	return CANDIDATE_APPLICATIONS.find(
		(candidate) => candidate.id === candidateId,
	);
}

export function getJobTitle(jobId: string) {
	return getConsoleJob(jobId)?.title ?? "Unknown Position";
}

export function getJobCandidates(jobId: string) {
	return CANDIDATE_APPLICATIONS.filter(
		(candidate) => candidate.positionId === jobId,
	);
}
