import { atomWithStorage } from "jotai/utils";

export type CareerApplicationStep = "PERSONAL" | "DOCUMENTS" | "FINAL" | "SUCCESS";

export type CareerApplicationDraft = {
	fullName: string;
	email: string;
	phone: string;
	portfolioUrl: string;
	linkedinUrl: string;
	coverLetter: string;
	startDate: string;
	cvName: string;
};

export const careerApplicationStepAtom = atomWithStorage<CareerApplicationStep>(
	"career-application-step",
	"PERSONAL",
);

export const careerApplicationDraftAtom = atomWithStorage<CareerApplicationDraft>(
	"career-application-draft",
	{
		fullName: "",
		email: "",
		phone: "",
		portfolioUrl: "",
		linkedinUrl: "",
		coverLetter: "",
		startDate: "",
		cvName: "",
	},
);