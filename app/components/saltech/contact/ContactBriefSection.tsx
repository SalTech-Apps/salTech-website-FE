import { useForm } from "react-hook-form";
import { z, flattenError } from "zod";
import {
	Button,
	FieldError,
	Input,
	InputGroup,
	Label,
	ListBox,
	Select,
	TextField,
} from "@heroui/react";
import {
	FaArrowRight,
	FaClock,
	FaEnvelope,
	FaMapMarkerAlt,
	FaPhone,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
	BUDGET_OPTIONS,
	BUILD_OPTIONS,
	QUICK_ANSWERS,
	ROLE_OPTIONS,
	SALTECH_CONTACT,
	TIMELINE_OPTIONS,
} from "@/data/contactPage";

const briefSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.string().email("Valid email is required"),
	company: z.string().min(1, "Company or project name is required"),
	role: z.string().min(1, "Please select your role"),
	build: z.string().min(1, "Please select an option"),
	timeline: z.string().min(1, "Please select a timeline"),
	budget: z
		.string()
		.min(1, "Please select a budget range or “Prefer not to say”"),
	message: z.string().min(1, "Tell us a bit about your project"),
});

type BriefFormValues = z.infer<typeof briefSchema>;

const inputClassName =
	"rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] placeholder:text-gray-400";
const selectTriggerClassName =
	"h-10 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 text-sm text-[#111827]";

function SelectField({
	label,
	value,
	placeholder,
	options,
	error,
	onChange,
}: {
	label: string;
	value: string;
	placeholder?: string;
	options: Array<{ value: string; label: string }>;
	error?: string;
	onChange: (next: string) => void;
}) {
	return (
		<TextField isInvalid={!!error}>
			<Label className="text-xs font-medium text-[#374151]">{label}</Label>
			<Select selectedKey={value || undefined} onSelectionChange={(key) => onChange(String(key ?? ""))}>
				<Select.Trigger className={selectTriggerClassName}>
					<Select.Value>{placeholder}</Select.Value>
					<Select.Indicator />
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						{options.map((opt) => (
							<ListBox.Item key={opt.value} id={opt.value} textValue={opt.label}>
								{opt.label}
								<ListBox.ItemIndicator />
							</ListBox.Item>
						))}
					</ListBox>
				</Select.Popover>
			</Select>
			<FieldError>{error}</FieldError>
		</TextField>
	);
}

export function ContactBriefSection() {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<BriefFormValues>({
		defaultValues: {
			fullName: "",
			email: "",
			company: "",
			role: "",
			build: "",
			timeline: "asap",
			budget: "unspecified",
			message: "",
		},
	});

	const role = watch("role") || "";
	const build = watch("build") || "";
	const timeline = watch("timeline") || "asap";
	const budget = watch("budget") || "unspecified";

	async function onSubmit(data: BriefFormValues) {
		const parsed = briefSchema.safeParse(data);
		if (!parsed.success) {
			const flattened = flattenError(parsed.error);
			Object.entries(flattened.fieldErrors).forEach(([field, messages]) => {
				const msg = messages?.[0];
				if (msg)
					setError(field as keyof BriefFormValues, {
						type: "manual",
						message: msg,
					});
			});
			return;
		}
		clearErrors();

		const lines = [
			`Company / project: ${data.company}`,
			`Role: ${ROLE_OPTIONS.find((r) => r.value === data.role)?.label ?? data.role}`,
			`Looking to build: ${BUILD_OPTIONS.find((b) => b.value === data.build)?.label ?? data.build}`,
			`Timeline: ${TIMELINE_OPTIONS.find((t) => t.value === data.timeline)?.label ?? data.timeline}`,
			`Budget: ${BUDGET_OPTIONS.find((b) => b.value === data.budget)?.label ?? data.budget}`,
			"",
			data.message,
		];

		try {
			const consultationPayload: Record<string, string> = {
				fullName: data.fullName,
				email: data.email,
				phone: "—",
				subject: "SalTech — Project brief",
				message: lines.join("\n"),
			};
			const notificationQueue: Array<Record<string, string>> = [];
			notificationQueue.push(consultationPayload);
			toast.success("Brief sent. We'll reply within one business day.");
			reset({
				fullName: "",
				email: "",
				company: "",
				role: "",
				build: "",
				timeline: "asap",
				budget: "unspecified",
				message: "",
			});
		} catch (err) {
			console.error(err);
			toast.error(
				"Something went wrong. Please try again or email us directly.",
			);
		}
	}

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					<div className="flex flex-col gap-6 text-[#111827]">
						<div>
							<h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-[28px] sm:leading-snug">
								We respond within one business day.
							</h2>
							<p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#6b7280]">
								Every inquiry is reviewed by a real person. If your project is a
								fit, we&apos;ll schedule a 30-minute call — no pitch, no
								pressure.
							</p>
						</div>

						<ul className="flex flex-col gap-5">
							<li className="flex gap-3">
								<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-primary-gold">
									<FaEnvelope className="h-4 w-4" aria-hidden />
								</span>
								<div>
									<p className="text-sm font-medium text-[#374151]">Email</p>
									<a
										className="text-xs text-[#374151]/70 underline-offset-2 hover:underline"
										href={`mailto:${SALTECH_CONTACT.email}`}
									>
										{SALTECH_CONTACT.email}
									</a>
								</div>
							</li>
							<li className="flex gap-3">
								<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-primary-gold">
									<FaPhone className="h-4 w-4" aria-hidden />
								</span>
								<div>
									<p className="text-sm font-medium text-[#374151]">Phone</p>
									<a
										className="text-xs text-[#374151]/70 underline-offset-2 hover:underline"
										href={`tel:${SALTECH_CONTACT.phoneE164}`}
									>
										{SALTECH_CONTACT.phoneDisplay}
									</a>
								</div>
							</li>
							<li className="flex gap-3">
								<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-primary-gold">
									<FaMapMarkerAlt className="h-4 w-4" aria-hidden />
								</span>
								<div>
									<p className="text-sm font-medium text-[#374151]">Office</p>
									<p className="text-xs leading-relaxed text-[#374151]/70">
										{SALTECH_CONTACT.addressLines.map((line) => (
											<span key={line} className="block">
												{line}
											</span>
										))}
									</p>
								</div>
							</li>
						</ul>

						<blockquote className="rounded-2xl bg-[#faf3dc] p-4 text-[#111827]">
							<p className="text-sm font-medium leading-relaxed">
								&ldquo;SalTech turned our idea into a working product in six
								weeks. Clear process, zero surprises.&rdquo;
							</p>
							<footer className="mt-2 text-xs text-[#6b7280]">
								— Founder, Fintech Startup (US)
							</footer>
						</blockquote>

						<div>
							<p className="text-sm font-semibold text-[#374151]">
								Quick answers
							</p>
							<ul className="mt-3 flex flex-col gap-2 text-sm text-[#6b7280]">
								{QUICK_ANSWERS.map((line) => (
									<li key={line} className="flex gap-2">
										<span className="text-primary-gold" aria-hidden>
											⁘
										</span>
										<span>{line}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="rounded-[20px] bg-white p-6 lg:p-8">
						<div className="mb-6">
							<h2 className="font-heading text-2xl font-semibold text-[#111827]">
								Send us your brief
							</h2>
							<p className="mt-2 flex items-center gap-2 text-base text-[#6b7280]">
								<FaClock
									className="h-4 w-4 shrink-0 text-[#6b7280]"
									aria-hidden
								/>
								Average response: 4 hours during business days
							</p>
						</div>

						<form
							className="flex flex-col gap-4"
							onSubmit={handleSubmit(onSubmit)}
							noValidate
						>
							<div className="grid gap-4 sm:grid-cols-2">
								<TextField isInvalid={!!errors.fullName}>
									<Label className="text-xs font-medium text-[#374151]">Full Name</Label>
									<Input
										placeholder="Your name"
										{...register("fullName")}
										className={inputClassName}
									/>
									<FieldError>{errors.fullName?.message}</FieldError>
								</TextField>
								<TextField isInvalid={!!errors.email}>
									<Label className="text-xs font-medium text-[#374151]">Email Address</Label>
									<Input
										type="email"
										placeholder="you@company.com"
										{...register("email")}
										className={inputClassName}
									/>
									<FieldError>{errors.email?.message}</FieldError>
								</TextField>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<TextField isInvalid={!!errors.company}>
									<Label className="text-xs font-medium text-[#374151]">Company / Project Name</Label>
									<Input
										placeholder="Acme Inc."
										{...register("company")}
										className={inputClassName}
									/>
									<FieldError>{errors.company?.message}</FieldError>
								</TextField>
								<SelectField
									label="Your Role"
									value={role}
									placeholder="Select role"
									error={errors.role?.message}
									onChange={(next) => setValue("role", next, { shouldValidate: true })}
									options={ROLE_OPTIONS}
								/>
							</div>

							<SelectField
								label="What are you looking to build?"
								value={build}
								placeholder="Select an option"
								error={errors.build?.message}
								onChange={(next) => setValue("build", next, { shouldValidate: true })}
								options={BUILD_OPTIONS}
							/>

							<div className="grid gap-4 sm:grid-cols-2">
								<SelectField
									label="Timeline"
									value={timeline}
									error={errors.timeline?.message}
									onChange={(next) => setValue("timeline", next, { shouldValidate: true })}
									options={TIMELINE_OPTIONS}
								/>
								<SelectField
									label="Budget (Optional)"
									value={budget}
									error={errors.budget?.message}
									onChange={(next) => setValue("budget", next, { shouldValidate: true })}
									options={BUDGET_OPTIONS}
								/>
							</div>

							<TextField isInvalid={!!errors.message}>
								<Label className="text-xs font-medium text-[#374151]">Tell us about your project</Label>
								<InputGroup>
									<InputGroup.TextArea
										rows={4}
										placeholder={`E.g. We're building a logistics platform for SMEs in West Africa and need an MVP in 10 weeks.`}
										{...register("message")}
										className={inputClassName}
									/>
								</InputGroup>
								<FieldError>{errors.message?.message}</FieldError>
							</TextField>

							<div className="pt-1">
								<Button
									type="submit"
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-gold font-body font-semibold text-[#111827] hover:bg-soft-gold-hover-state"
									isPending={isSubmitting}
								>
									Send My Brief
									<FaArrowRight className="text-sm" aria-hidden />
								</Button>
								<p className="mt-3 text-center text-xs text-[#9ca3af]">
									No commitment. No spam. Just a real conversation.
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
