import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
	Button,
	Input,
	InputGroup,
	Label,
	ListBox,
	Select,
	TextField,
} from "@heroui/react";
import { FiArrowLeft, FiEye, FiSave } from "react-icons/fi";
import { useAtom } from "jotai";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ConsoleBrand } from "@/components/console/ConsoleShared";
import { JobAtom } from "@/atoms/console.atom";
import { getApiJobsById, patchApiJobsById } from "@/client";
import type { JobResponseSchema } from "@/atoms/console.atom";

// ── Constants ────────────────────────────────────────────────────────────────

type Department = JobResponseSchema["department"];
type JobType = JobResponseSchema["jobType"];
type JobStatus = JobResponseSchema["status"];

const DEPARTMENTS: { label: string; value: Department }[] = [
	{ label: "Engineering", value: "ENGINEERING" },
	{ label: "Marketing", value: "MARKETING" },
	{ label: "Sales", value: "SALES" },
	{ label: "HR", value: "HR" },
	{ label: "Design", value: "DESIGN" },
	{ label: "Product", value: "PRODUCT" },
	{ label: "Other", value: "OTHER" },
];

const JOB_TYPES: { label: string; value: JobType }[] = [
	{ label: "Full-time", value: "FULL_TIME" },
	{ label: "Part-time", value: "PART_TIME" },
	{ label: "Contract", value: "CONTRACT" },
	{ label: "Internship", value: "INTERNSHIP" },
];

const JOB_STATUSES: { label: string; value: JobStatus }[] = [
	{ label: "Open", value: "OPEN" },
	{ label: "Draft", value: "DRAFT" },
	{ label: "Closed", value: "CLOSED" },
];

// ── Styles ───────────────────────────────────────────────────────────────────

const fieldClassName = "w-full";
const inputClassName =
	"h-12 w-full rounded-xl border border-[#E7E2D8] bg-white px-4 text-[#1F2534] placeholder:text-[#B0B5C2]";
const textAreaClassName =
	"w-full rounded-xl border border-[#E7E2D8] bg-white px-4 py-3 text-[#1F2534] placeholder:text-[#B0B5C2]";
const labelClassName = "text-sm font-medium text-[#1F2534]";
const selectTriggerClassName =
	"h-12 w-full rounded-xl border border-[#E7E2D8] bg-white px-4 text-[#1F2534]";

// ── SimpleSelect ─────────────────────────────────────────────────────────────

function SimpleSelect<T extends string>({
	label,
	value,
	onChange,
	items,
}: {
	label: string;
	value: T;
	onChange: (next: T) => void;
	items: { label: string; value: T }[];
}) {
	return (
		<div className="space-y-2">
			<Label className={labelClassName}>{label}</Label>
			<Select
				selectedKey={value}
				onSelectionChange={(key) => onChange(key as T)}
			>
				<Select.Trigger className={selectTriggerClassName}>
					<Select.Value />
					<Select.Indicator />
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						{items.map((item) => (
							<ListBox.Item
								key={item.value}
								id={item.value}
								textValue={item.label}
							>
								{item.label}
								<ListBox.ItemIndicator />
							</ListBox.Item>
						))}
					</ListBox>
				</Select.Popover>
			</Select>
		</div>
	);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

type FormState = {
	title: string;
	location: string;
	department: Department;
	jobType: JobType;
	status: JobStatus;
	description: string;
	responsibilities: string;
	requirements: string;
	niceToHave: string;
	minSalary: string;
	maxSalary: string;
};

const EMPTY_FORM: FormState = {
	title: "",
	location: "",
	department: "ENGINEERING",
	jobType: "FULL_TIME",
	status: "OPEN",
	description: "",
	responsibilities: "",
	requirements: "",
	niceToHave: "",
	minSalary: "",
	maxSalary: "",
};

function sourceToForm(source: JobResponseSchema): FormState {
	return {
		title: source.title,
		location: source.location,
		department: source.department,
		jobType: source.jobType,
		status: source.status,
		description: source.description,
		responsibilities: source.responsibilities.join("\n"),
		requirements: source.requirements.join("\n"),
		niceToHave: (source.niceToHave ?? []).join("\n"),
		minSalary: source.minSalary != null ? String(source.minSalary) : "",
		maxSalary: source.maxSalary != null ? String(source.maxSalary) : "",
	};
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EditJobPage() {
	const { jobId } = useParams<{ jobId: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [jobAtom, setJobAtom] = useAtom(JobAtom);

	// Atom seed: synchronously available if atom holds this job
	const atomSeed = jobAtom?.id === jobId ? jobAtom : null;

	// ── Query ─────────────────────────────────────────────────────────────────
	const jobQuery = useQuery({
		queryKey: ["jobs", jobId],
		queryFn: async () => {
			if (!jobId) throw new Error("No job id");
			const { data } = await getApiJobsById({
				path: { id: jobId },
				throwOnError: true,
			});
			return data.data;
		},
		// Use atom as initial data so form seeds synchronously when atom has data
		initialData: atomSeed ?? undefined,
		// Only network-fetch when atom doesn't have this job
		enabled: !!jobId && !atomSeed,
	});

	// ── Form state ────────────────────────────────────────────────────────────
	// Lazy initializer: seeds from query.data which already includes initialData
	const [form, setForm] = useState<FormState>(() =>
		jobQuery.data ? sourceToForm(jobQuery.data) : EMPTY_FORM,
	);

	// For refresh case: when query resolves after a page reload (atom was null),
	// update form if it's still empty. React 18 allows setState during render
	// to synchronize derived state.
	const [prevQueryData, setPrevQueryData] = useState(jobQuery.data);
	if (jobQuery.data && prevQueryData !== jobQuery.data) {
		setPrevQueryData(jobQuery.data);
		if (!form.title) {
			setForm(sourceToForm(jobQuery.data));
		}
	}

	function patch<K extends keyof FormState>(key: K, value: FormState[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	// ── Mutation ──────────────────────────────────────────────────────────────
	const patchMutation = useMutation({
		mutationFn: (body: Parameters<typeof patchApiJobsById>[0]["body"]) =>
			patchApiJobsById({
				path: { id: jobId! },
				body,
				throwOnError: true,
			}),
		onSuccess: ({ data }) => {
			setJobAtom(data.data);
			queryClient.invalidateQueries({ queryKey: ["jobs"] });
			queryClient.setQueryData(["jobs", jobId], data.data);
			toast.success("Job updated successfully");
			navigate("/console/jobs");
		},
		onError: (err: unknown) => {
			const message =
				err instanceof Error ? err.message : "Failed to update job";
			toast.error(message);
		},
	});

	function toLines(raw: string): string[] {
		return raw
			.split("\n")
			.map((l) => l.trim())
			.filter(Boolean);
	}

	function handleSubmit(newStatus: JobStatus) {
		if (!jobId) return;
		patchMutation.mutate({
			title: form.title.trim(),
			location: form.location.trim(),
			department: form.department,
			jobType: form.jobType,
			status: newStatus,
			description: form.description.trim(),
			responsibilities: toLines(form.responsibilities),
			requirements: toLines(form.requirements),
			niceToHave: toLines(form.niceToHave),
			minSalary: form.minSalary ? Number(form.minSalary) : undefined,
			maxSalary: form.maxSalary ? Number(form.maxSalary) : undefined,
		});
	}

	// ── Loading / error states ────────────────────────────────────────────────
	// Form is empty when there's no data yet (neither atom nor query resolved)
	const isLoading = jobQuery.isLoading && !form.title;

	if (isLoading) {
		return (
			<div className="mx-auto max-w-190 px-4 py-10">
				<div className="space-y-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="h-12 animate-pulse rounded-xl bg-[#ECE8DF]"
						/>
					))}
				</div>
			</div>
		);
	}

	if (!isLoading && !form.title && jobQuery.isError) {
		return (
			<div className="mx-auto max-w-190 px-4 py-10 text-[#1F2534]">
				<p className="text-sm text-[#E62A25]">
					Failed to load job. Please try again.
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto flex w-full max-w-190 flex-col gap-6 px-0 py-6 lg:py-8">
			<Link
				to="/console/jobs"
				className="inline-flex items-center gap-2 text-sm text-[#6E7485] hover:text-[#1F2534]"
			>
				<FiArrowLeft /> Back to Jobs
			</Link>

			<div className="flex items-start gap-4">
				<ConsoleBrand to="/console" />
				<div>
					<h1 className="font-heading text-[2.4rem] font-semibold leading-none text-[#1F2534]">
						Edit Job
					</h1>
					<p className="mt-2 text-sm text-[#7B8090]">
						Update this position on your careers page
					</p>
				</div>
			</div>

			<div className="rounded-[24px] border border-[#E7E2D8] bg-white p-6 shadow-none sm:p-8">
				<div className="space-y-8">
					<section>
						<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
							Basic Information
						</h2>
						<div className="mt-5 grid gap-5">
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>Job Title</Label>
								<Input
									value={form.title}
									onChange={(e) => patch("title", e.target.value)}
									placeholder="Senior Backend Engineer"
									className={inputClassName}
								/>
							</TextField>
							<div className="grid gap-5 md:grid-cols-2">
								<SimpleSelect
									label="Department"
									value={form.department}
									onChange={(v) => patch("department", v)}
									items={DEPARTMENTS}
								/>
								<SimpleSelect
									label="Job Type"
									value={form.jobType}
									onChange={(v) => patch("jobType", v)}
									items={JOB_TYPES}
								/>
							</div>
							<div className="grid gap-5 md:grid-cols-2">
								<TextField className={fieldClassName}>
									<Label className={labelClassName}>Location</Label>
									<Input
										value={form.location}
										onChange={(e) => patch("location", e.target.value)}
										placeholder="Remote · Africa"
										className={inputClassName}
									/>
								</TextField>
								<SimpleSelect
									label="Status"
									value={form.status}
									onChange={(v) => patch("status", v)}
									items={JOB_STATUSES}
								/>
							</div>
						</div>
					</section>

					<section>
						<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
							Job Description
						</h2>
						<div className="mt-5 space-y-5">
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>Description</Label>
								<InputGroup>
									<InputGroup.TextArea
										value={form.description}
										onChange={(e) => patch("description", e.target.value)}
										placeholder="Brief overview of the role..."
										rows={4}
										className={textAreaClassName}
									/>
								</InputGroup>
							</TextField>
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>
									Responsibilities{" "}
									<span className="text-[#B0B5C2] font-normal">
										(one per line)
									</span>
								</Label>
								<InputGroup>
									<InputGroup.TextArea
										value={form.responsibilities}
										onChange={(e) => patch("responsibilities", e.target.value)}
										placeholder="List key responsibilities"
										rows={6}
										className={textAreaClassName}
									/>
								</InputGroup>
							</TextField>
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>
									Requirements{" "}
									<span className="text-[#B0B5C2] font-normal">
										(one per line)
									</span>
								</Label>
								<InputGroup>
									<InputGroup.TextArea
										value={form.requirements}
										onChange={(e) => patch("requirements", e.target.value)}
										placeholder="List requirements"
										rows={6}
										className={textAreaClassName}
									/>
								</InputGroup>
							</TextField>
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>Nice to Have</Label>
								<InputGroup>
									<InputGroup.TextArea
										value={form.niceToHave}
										onChange={(e) => patch("niceToHave", e.target.value)}
										placeholder="Optional skills and qualifications"
										rows={4}
										className={textAreaClassName}
									/>
								</InputGroup>
							</TextField>
						</div>
					</section>

					<section>
						<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
							Compensation
						</h2>
						<div className="mt-5 grid gap-5 md:grid-cols-2">
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>Minimum Salary</Label>
								<Input
									type="number"
									value={form.minSalary}
									onChange={(e) => patch("minSalary", e.target.value)}
									placeholder="80000"
									className={inputClassName}
								/>
							</TextField>
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>Maximum Salary</Label>
								<Input
									type="number"
									value={form.maxSalary}
									onChange={(e) => patch("maxSalary", e.target.value)}
									placeholder="120000"
									className={inputClassName}
								/>
							</TextField>
						</div>
						<p className="mt-3 text-xs text-[#B0B5C2]">
							Leave empty if you prefer not to disclose salary range
						</p>
					</section>
				</div>
			</div>

			<div className="flex flex-col justify-end gap-3 sm:flex-row">
				<Button
					variant="secondary"
					className="h-12 rounded-xl border-[#E7E2D8] bg-white px-5 font-semibold text-[#434959]"
					isDisabled={patchMutation.isPending}
					onPress={() => handleSubmit("DRAFT")}
				>
					<span className="inline-flex items-center gap-2">
						<FiSave />
						{patchMutation.isPending ? "Saving..." : "Save as Draft"}
					</span>
				</Button>
				<Button
					className="h-12 rounded-xl bg-[#E2BA51] px-5 font-semibold text-[#1F2534]"
					isDisabled={patchMutation.isPending}
					onPress={() =>
						handleSubmit(form.status === "DRAFT" ? "OPEN" : form.status)
					}
				>
					<span className="inline-flex items-center gap-2">
						<FiEye />
						{patchMutation.isPending ? "Updating..." : "Update Job"}
					</span>
				</Button>
			</div>
		</div>
	);
}
