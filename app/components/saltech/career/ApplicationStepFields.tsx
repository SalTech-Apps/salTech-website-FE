import { FieldError, Input, InputGroup, Label, TextField } from "@heroui/react";
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

const inputClassName =
	"rounded-lg border px-4 py-2 text-[#111827] placeholder:text-gray-400";

export function PersonalInfoFields({ register, errors }: CommonStepProps) {
	return (
		<div className="space-y-5">
			<TextField isInvalid={!!errors.fullName}>
				<Label className="text-sm font-medium text-[#111827]">Full Name</Label>
				<Input
					type="text"
					placeholder="John Doe"
					{...register("fullName")}
					className={inputClassName}
				/>
				<FieldError>{errors.fullName?.message}</FieldError>
			</TextField>
			<TextField isInvalid={!!errors.email}>
				<Label className="text-sm font-medium text-[#111827]">
					Email Address
				</Label>
				<Input
					type="email"
					placeholder="john@example.com"
					{...register("email")}
					className={inputClassName}
				/>
				<FieldError>{errors.email?.message}</FieldError>
			</TextField>
			<TextField isInvalid={!!errors.phone}>
				<Label className="text-sm font-medium text-[#111827]">
					Phone Number
				</Label>
				<Input
					type="tel"
					placeholder="+1 (555) 123-4567"
					{...register("phone")}
					className={inputClassName}
				/>
				<FieldError>{errors.phone?.message}</FieldError>
			</TextField>
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
	const registerCv = register("cv");

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
						{...registerCv}
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
			<TextField isInvalid={!!errors.portfolioUrl}>
				<Label className="text-sm font-medium text-[#111827]">
					Portfolio Link
				</Label>
				<Input
					type="url"
					placeholder="https://yourportfolio.com"
					{...register("portfolioUrl")}
					className={inputClassName}
				/>
				<FieldError>{errors.portfolioUrl?.message}</FieldError>
			</TextField>
			<TextField isInvalid={!!errors.linkedinUrl}>
				<Label className="text-sm font-medium text-[#111827]">
					LinkedIn Profile
				</Label>
				<Input
					type="url"
					placeholder="https://linkedin.com/in/yourprofile"
					{...register("linkedinUrl")}
					className={inputClassName}
				/>
				<FieldError>{errors.linkedinUrl?.message}</FieldError>
			</TextField>
		</div>
	);
}

export function FinalDetailsFields({ register, errors }: CommonStepProps) {
	return (
		<div className="space-y-5">
			<TextField isInvalid={!!errors.coverLetter}>
				<Label className="text-sm font-medium text-[#111827]">
					Cover Letter / Message
				</Label>
				<InputGroup>
					<InputGroup.TextArea
						placeholder="Tell us why you are a great fit for this role..."
						{...register("coverLetter")}
						rows={6}
						className={inputClassName}
					/>
				</InputGroup>
				<FieldError>{errors.coverLetter?.message}</FieldError>
			</TextField>
			<TextField isInvalid={!!errors.startDate}>
				<Label className="text-sm font-medium text-[#111827]">
					Earliest Start Date
				</Label>
				<Input
					type="date"
					{...register("startDate")}
					className={inputClassName}
				/>
				<FieldError>{errors.startDate?.message}</FieldError>
			</TextField>
		</div>
	);
}
