import type { CareerApplicationStep } from "@/atoms/careerApplication.atom";

export type ApplicationFormSchema = {
	fullName: string;
	email: string;
	phone: string;
	portfolioUrl?: string;
	linkedinUrl?: string;
	coverLetter: string;
	startDate: string;
	cv?: FileList;
};

export type StepDefinition = {
	name: string;
	step: CareerApplicationStep;
};
