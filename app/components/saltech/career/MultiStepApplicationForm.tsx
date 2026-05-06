"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Modal, ModalBackdrop, ModalContainer, ModalDialog } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { postApiApplicants } from "@/client";
import {
	careerApplicationDraftAtom,
	careerApplicationStepAtom,
} from "@/atoms/careerApplication.atom";
import { apiErrorParser } from "@/lib/errorParser";
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
	const [isUploadingResume, setIsUploadingResume] = useState(false);

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
		getValues,
		formState: { errors },
		trigger,
		setError,
		clearErrors,
		reset,
	} = form;

	const uploadResume = async (file: File): Promise<string> => {
		setIsUploadingResume(true);
		try {
			const formData = new FormData();
			formData.append("resume", file);

			const response = await fetch("/api/uploads/resume", {
				method: "POST",
				body: formData,
				credentials: "include",
			});

			const payload = (await response.json()) as {
				message?: string;
				data?: { url?: string; fileName?: string };
			};

			if (!response.ok || !payload.data?.url) {
				throw new Error(payload.message || "Failed to upload resume");
			}

			const uploadedUrl = payload.data.url;
			const uploadedFileName = payload.data.fileName || file.name;

			setDraft((previous) => ({
				...previous,
				cvName: uploadedFileName,
				resumeUrl: uploadedUrl,
			}));
			clearErrors("cv");
			return uploadedUrl;
		} catch (error) {
			const parsedError = apiErrorParser(error);
			setDraft((previous) => ({
				...previous,
				resumeUrl: "",
			}));
			setError("cv", { type: "manual", message: parsedError.message });
			throw error;
		} finally {
			setIsUploadingResume(false);
		}
	};

	const submitMutation = useMutation({
		mutationFn: async (values: ApplicationFormSchema) => {
			let resumeUrl = draft.resumeUrl;
			const selectedFile = values.cv?.[0];
			if (!resumeUrl && selectedFile) {
				resumeUrl = await uploadResume(selectedFile);
			}

			if (!resumeUrl) {
				throw new Error("Upload your resume before submitting");
			}

			const response = await postApiApplicants({
				body: {
					jobId,
					fullName: values.fullName,
					email: values.email,
					phone: values.phone,
					resumeUrl,
					portfolioUrl: values.portfolioUrl || undefined,
					linkedinUrl: values.linkedinUrl || undefined,
					coverLetter: values.coverLetter,
					earliestStartDate: values.startDate,
					status: "NEW",
				},
				throwOnError: true,
			});

			return response.data.data;
		},
		onSuccess: () => {
			toast.success("Application submitted successfully");
			setCurrentStep("SUCCESS");
			setDraft((previous) => ({
				...previous,
				cvName: "",
				resumeUrl: "",
			}));
		},
		onError: (error) => {
			const parsedError = apiErrorParser(error);
			toast.error(parsedError.message);
		},
	});

	const watchedValues =
		useWatch({
			control: form.control,
		}) ?? {};

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
			resumeUrl: previous.resumeUrl,
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
			const hasFile = Boolean(getValues("cv")?.[0]) || Boolean(draft.cvName);
			if (!hasFile) {
				setError("cv", { type: "manual", message: "Upload your CV/Resume" });
				return;
			}
			if (isUploadingResume) {
				setError("cv", {
					type: "manual",
					message: "Please wait for resume upload to complete",
				});
				return;
			}
			if (!draft.resumeUrl) {
				setError("cv", {
					type: "manual",
					message: "Resume upload is required",
				});
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
			resumeUrl: "",
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

	console.log("LOG", form.formState.errors);

	return (
		<Modal>
			<ModalBackdrop isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContainer size="5xl" className="min-h-170 border bg-white p-4 md:p-6">
				<ModalDialog>
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

						<div className="mx-auto w-full max-w-3xl px-0 pb-2 pt-10">
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
											draftResumeUrl={draft.resumeUrl}
											isUploadingResume={isUploadingResume}
											onResumeSelected={uploadResume}
										/>
									)}

									{currentStep === "FINAL" && (
										<FinalDetailsFields register={register} errors={errors} />
									)}

									<div className="grid grid-cols-2 gap-3 border-t border-[#e5e7eb] pt-6">
										<Button
											variant="secondary"
											className="rounded-xl"
											onPress={goToPreviousStep}
											isDisabled={currentStep === "PERSONAL"}
										>
											Back
										</Button>
										{currentStep !== "FINAL" ? (
											<Button
												className="rounded-xl bg-[#c99e2e] text-[#111827]"
												onPress={goToNextStep}
												isDisabled={isUploadingResume}
											>
												Continue
											</Button>
										) : (
											<Button
												type="submit"
												className="rounded-xl bg-[#c99e2e] text-[#111827]"
												isPending={
													submitMutation.isPending || isUploadingResume
												}
												isDisabled={isUploadingResume}
											>
												Submit Application
											</Button>
										)}
										<Button className="rounded-xl" variant="ghost" onPress={closeAndKeepProgress}>
											Close
										</Button>
									</div>
								</form>
							)}
						</div>
					</div>
				)}
				</ModalDialog>
			</ModalContainer>
			</ModalBackdrop>
		</Modal>
	);
}
