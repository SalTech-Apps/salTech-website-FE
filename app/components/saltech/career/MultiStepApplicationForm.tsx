"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Modal, ModalBody, ModalContent } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import {
	careerApplicationDraftAtom,
	careerApplicationStepAtom,
} from "@/atoms/careerApplication.atom";
import { ApplicationModalHeader } from "./ApplicationModalHeader";
import { ApplicationStepper } from "./ApplicationStepper";
import {
	DocumentFields,
	FinalDetailsFields,
	PersonalInfoFields,
} from "./ApplicationStepFields";
import { ApplicationSuccessState } from "./ApplicationSuccessState";
import type {
	ApplicationFormSchema,
	StepDefinition,
} from "./ApplicationFormTypes";

const personalInfoSchema = z.object({
	fullName: z
		.string({ message: "Enter your full name" })
		.min(1, "Enter your full name"),
	email: z
		.string({ message: "Enter your email" })
		.email({ message: "Enter a valid email address" }),
	phone: z
		.string({ message: "Enter your phone number" })
		.min(10, "Enter a valid phone number"),
});

const documentsSchema = z.object({
	portfolioUrl: z
		.string()
		.trim()
		.optional()
		.refine((value) => !value || /^https?:\/\//.test(value), {
			message: "Enter a valid URL",
		}),
	linkedinUrl: z
		.string()
		.trim()
		.optional()
		.refine((value) => !value || /^https?:\/\//.test(value), {
			message: "Enter a valid URL",
		}),
});

const finalDetailsSchema = z.object({
	coverLetter: z
		.string({ message: "Tell us why you are a great fit" })
		.min(50, "Minimum 50 characters"),
	startDate: z
		.string({ message: "Select your earliest start date" })
		.min(1, "Select your earliest start date"),
});

const formSchema = personalInfoSchema
	.merge(documentsSchema)
	.merge(finalDetailsSchema);

const STEPS: StepDefinition[] = [
	{ name: "Personal Info", step: "PERSONAL" },
	{ name: "Documents", step: "DOCUMENTS" },
	{ name: "Final Details", step: "FINAL" },
];

interface MultiStepFormProps {
	jobTitle: string;
	jobId: string;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}

export function MultiStepApplicationForm({
	jobTitle,
	jobId,
	isOpen,
	onOpenChange,
}: MultiStepFormProps) {
	const [currentStep, setCurrentStep] = useAtom(careerApplicationStepAtom);
	const [draft, setDraft] = useAtom(careerApplicationDraftAtom);

	const form = useForm<ApplicationFormSchema>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			fullName: draft.fullName,
			email: draft.email,
			phone: draft.phone,
			portfolioUrl: draft.portfolioUrl,
			linkedinUrl: draft.linkedinUrl,
			coverLetter: draft.coverLetter,
			startDate: draft.startDate,
		},
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		trigger,
		setError,
		reset,
	} = form;

	const submitMutation = useMutation({
		mutationFn: async (values: ApplicationFormSchema) => {
			console.log("Submitting application", { jobId, ...values });
			await new Promise((resolve) => setTimeout(resolve, 1200));
			return values;
		},
		onSuccess: () => {
			toast.success("Application submitted successfully");
			setCurrentStep("SUCCESS");
		},
		onError: () => {
			toast.error("Failed to submit application. Please try again.");
		},
	});

	const watchedValues = watch();

	useEffect(() => {
		setDraft((previous) => ({
			...previous,
			fullName: watchedValues.fullName ?? previous.fullName,
			email: watchedValues.email ?? previous.email,
			phone: watchedValues.phone ?? previous.phone,
			portfolioUrl: watchedValues.portfolioUrl ?? previous.portfolioUrl,
			linkedinUrl: watchedValues.linkedinUrl ?? previous.linkedinUrl,
			coverLetter: watchedValues.coverLetter ?? previous.coverLetter,
			startDate: watchedValues.startDate ?? previous.startDate,
			cvName: watchedValues.cv?.[0]?.name ?? previous.cvName,
		}));
	}, [
		watchedValues.fullName,
		watchedValues.email,
		watchedValues.phone,
		watchedValues.portfolioUrl,
		watchedValues.linkedinUrl,
		watchedValues.coverLetter,
		watchedValues.startDate,
		watchedValues.cv,
		setDraft,
	]);

	useEffect(() => {
		if (!isOpen) {
			reset({
				fullName: draft.fullName,
				email: draft.email,
				phone: draft.phone,
				portfolioUrl: draft.portfolioUrl,
				linkedinUrl: draft.linkedinUrl,
				coverLetter: draft.coverLetter,
				startDate: draft.startDate,
			});
		}
	}, [isOpen, draft, reset]);

	const stepIndex = useMemo(() => {
		if (currentStep === "PERSONAL") return 0;
		if (currentStep === "DOCUMENTS") return 1;
		if (currentStep === "FINAL") return 2;
		return 3;
	}, [currentStep]);

	const goToNextStep = async () => {
		if (currentStep === "PERSONAL") {
			const valid = await trigger(["fullName", "email", "phone"]);
			if (valid) setCurrentStep("DOCUMENTS");
			return;
		}

		if (currentStep === "DOCUMENTS") {
			const valid = await trigger(["portfolioUrl", "linkedinUrl"]);
			const hasFile = Boolean(watch("cv")?.[0]) || Boolean(draft.cvName);
			if (!hasFile) {
				setError("cv", { type: "manual", message: "Upload your CV/Resume" });
				return;
			}
			if (valid) setCurrentStep("FINAL");
		}
	};

	const goToPreviousStep = () => {
		if (currentStep === "FINAL") setCurrentStep("DOCUMENTS");
		if (currentStep === "DOCUMENTS") setCurrentStep("PERSONAL");
	};

	const resetApplication = () => {
		setCurrentStep("PERSONAL");
		setDraft({
			fullName: "",
			email: "",
			phone: "",
			portfolioUrl: "",
			linkedinUrl: "",
			coverLetter: "",
			startDate: "",
			cvName: "",
		});
		reset({
			fullName: "",
			email: "",
			phone: "",
			portfolioUrl: "",
			linkedinUrl: "",
			coverLetter: "",
			startDate: "",
		});
	};

	const closeAndKeepProgress = () => {
		onOpenChange(false);
	};

	const onSubmit = (values: ApplicationFormSchema) => {
		submitMutation.mutate(values);
	};

	return (
		<Modal
			size="5xl"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			className="min-h-170"
		>
			<ModalContent className="border bg-white p-4 md:p-6">
				{() => (
					<div className="mx-auto flex h-full w-full max-w-4xl flex-col">
						<ApplicationModalHeader
							jobTitle={jobTitle}
							onBack={closeAndKeepProgress}
						/>

						<ApplicationStepper
							steps={STEPS}
							currentStep={currentStep}
							stepIndex={stepIndex}
						/>

						<ModalBody className="mx-auto w-full max-w-3xl px-0 pb-2 pt-10">
							{currentStep === "SUCCESS" ? (
								<ApplicationSuccessState
									onDone={closeAndKeepProgress}
									onReset={resetApplication}
								/>
							) : (
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
									{currentStep === "PERSONAL" && (
										<PersonalInfoFields register={register} errors={errors} />
									)}

									{currentStep === "DOCUMENTS" && (
										<DocumentFields
											register={register}
											errors={errors}
											watch={watch}
											draftCvName={draft.cvName}
										/>
									)}

									{currentStep === "FINAL" && (
										<FinalDetailsFields register={register} errors={errors} />
									)}

									<div className="grid grid-cols-2 gap-3 border-t border-[#e5e7eb] pt-6">
										<Button
											variant="bordered"
											onPress={goToPreviousStep}
											isDisabled={currentStep === "PERSONAL"}
										>
											Back
										</Button>
										{currentStep !== "FINAL" ? (
											<Button
												className="bg-[#c99e2e] text-[#111827]"
												onPress={goToNextStep}
											>
												Continue
											</Button>
										) : (
											<Button
												type="submit"
												className="bg-[#c99e2e] text-[#111827]"
												isLoading={submitMutation.isPending}
											>
												Submit Application
											</Button>
										)}
										<Button variant="light" onPress={closeAndKeepProgress}>
											Close
										</Button>
									</div>
								</form>
							)}
						</ModalBody>
					</div>
				)}
			</ModalContent>
		</Modal>
	);
}
