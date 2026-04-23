import { Input, Textarea } from "@heroui/react";
import type {
	FieldErrors,
	UseFormRegister,
	UseFormWatch,
} from "react-hook-form";
import type { ApplicationFormSchema } from "./ApplicationFormTypes";

interface CommonStepProps {
	register: UseFormRegister<ApplicationFormSchema>;
	errors: FieldErrors<ApplicationFormSchema>;
}

export function PersonalInfoFields({ register, errors }: CommonStepProps) {
	return (
		<div className="space-y-5">
			<Input
				label="Full Name"
				labelPlacement="outside"
				placeholder="John Doe"
				{...register("fullName")}
				isInvalid={!!errors.fullName}
				errorMessage={errors.fullName?.message}
			/>
			<Input
				label="Email Address"
				labelPlacement="outside"
				type="email"
				placeholder="john@example.com"
				{...register("email")}
				isInvalid={!!errors.email}
				errorMessage={errors.email?.message}
			/>
			<Input
				label="Phone Number"
				labelPlacement="outside"
				placeholder="+1 (555) 123-4567"
				{...register("phone")}
				isInvalid={!!errors.phone}
				errorMessage={errors.phone?.message}
			/>
		</div>
	);
}

interface DocumentStepProps extends CommonStepProps {
	watch: UseFormWatch<ApplicationFormSchema>;
	draftCvName: string;
}

export function DocumentFields({
	register,
	errors,
	watch,
	draftCvName,
}: DocumentStepProps) {
	return (
		<div className="space-y-5">
			<div>
				<label className="mb-2 block text-sm font-medium text-[#111827]">
					Upload CV/Resume
				</label>
				<label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[#e5e7eb] p-8 text-center">
					<span className="text-sm text-[#6b7280]">
						Drop your file here or click to browse
					</span>
					<span className="text-xs text-[#9ca3af]">
						PDF, DOC, DOCX up to 10MB
					</span>
					<input
						type="file"
						accept=".pdf,.doc,.docx"
						className="hidden"
						{...register("cv")}
					/>
				</label>
				{(watch("cv")?.[0]?.name || draftCvName) && (
					<p className="mt-2 text-sm text-[#047857]">
						Attached: {watch("cv")?.[0]?.name || draftCvName}
					</p>
				)}
				{errors.cv?.message && (
					<p className="mt-2 text-sm text-[#dc2626]">{errors.cv.message}</p>
				)}
			</div>
			<Input
				label="Portfolio Link"
				labelPlacement="outside"
				placeholder="https://yourportfolio.com"
				{...register("portfolioUrl")}
				isInvalid={!!errors.portfolioUrl}
				errorMessage={errors.portfolioUrl?.message}
			/>
			<Input
				label="LinkedIn Profile"
				labelPlacement="outside"
				placeholder="https://linkedin.com/in/yourprofile"
				{...register("linkedinUrl")}
				isInvalid={!!errors.linkedinUrl}
				errorMessage={errors.linkedinUrl?.message}
			/>
		</div>
	);
}

export function FinalDetailsFields({ register, errors }: CommonStepProps) {
	return (
		<div className="space-y-5">
			<Textarea
				label="Cover Letter / Message"
				labelPlacement="outside"
				placeholder="Tell us why you are a great fit for this role..."
				minRows={6}
				{...register("coverLetter")}
				isInvalid={!!errors.coverLetter}
				errorMessage={errors.coverLetter?.message}
			/>
			<Input
				label="Earliest Start Date"
				labelPlacement="outside"
				type="date"
				{...register("startDate")}
				isInvalid={!!errors.startDate}
				errorMessage={errors.startDate?.message}
			/>
		</div>
	);
}
