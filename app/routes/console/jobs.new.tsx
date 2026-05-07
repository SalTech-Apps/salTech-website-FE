import { useState } from "react";
import { Link, useNavigate } from "react-router";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ConsoleBrand } from "@/components/console/ConsoleShared";
import { postApiJobs } from "@/client";
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CreateJobPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [department, setDepartment] = useState<Department>("ENGINEERING");
	const [jobType, setJobType] = useState<JobType>("FULL_TIME");
	const [description, setDescription] = useState("");
	const [responsibilities, setResponsibilities] = useState("");
	const [requirements, setRequirements] = useState("");
	const [niceToHave, setNiceToHave] = useState("");
	const [minSalary, setMinSalary] = useState("");
	const [maxSalary, setMaxSalary] = useState("");

	const createMutation = useMutation({
		mutationFn: (body: Parameters<typeof postApiJobs>[0]["body"]) =>
			postApiJobs({ body, throwOnError: true }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["jobs"] });
			toast.success("Job created successfully");
			navigate("/console/jobs");
		},
		onError: (err: unknown) => {
			const message =
				err instanceof Error ? err.message : "Failed to create job";
			toast.error(message);
		},
	});

	function toLines(raw: string): string[] {
		return raw
			.split("\n")
			.map((l) => l.trim())
			.filter(Boolean);
	}

	function handleSubmit(status: JobStatus) {
		if (!title.trim()) {
			toast.error("Job title is required");
			return;
		}
		if (!location.trim()) {
			toast.error("Location is required");
			return;
		}
		if (!description.trim()) {
			toast.error("Description is required");
			return;
		}

		createMutation.mutate({
			title: title.trim(),
			location: location.trim(),
			department,
			jobType,
			status,
			description: description.trim(),
			responsibilities: toLines(responsibilities),
			requirements: toLines(requirements),
			niceToHave: toLines(niceToHave),
			minSalary: minSalary ? Number(minSalary) : undefined,
			maxSalary: maxSalary ? Number(maxSalary) : undefined,
		});
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
						Create New Job
					</h1>
					<p className="mt-2 text-sm text-[#7B8090]">
						Add a new position to your careers page
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
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Senior Backend Engineer"
									className={inputClassName}
								/>
							</TextField>
							<div className="grid gap-5 md:grid-cols-2">
								<SimpleSelect
									label="Department"
									value={department}
									onChange={setDepartment}
									items={DEPARTMENTS}
								/>
								<SimpleSelect
									label="Job Type"
									value={jobType}
									onChange={setJobType}
									items={JOB_TYPES}
								/>
							</div>
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>Location</Label>
								<Input
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									placeholder="Remote · Africa"
									className={inputClassName}
								/>
							</TextField>
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
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="Brief overview of the role..."
										rows={4}
										className={textAreaClassName}
									/>
								</InputGroup>
							</TextField>
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>
									Responsibilities{" "}
									<span className="font-normal text-[#B0B5C2]">
										(one per line)
									</span>
								</Label>
								<InputGroup>
									<InputGroup.TextArea
										value={responsibilities}
										onChange={(e) => setResponsibilities(e.target.value)}
										placeholder="List key responsibilities (one per line)"
										rows={6}
										className={textAreaClassName}
									/>
								</InputGroup>
							</TextField>
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>
									Requirements{" "}
									<span className="font-normal text-[#B0B5C2]">
										(one per line)
									</span>
								</Label>
								<InputGroup>
									<InputGroup.TextArea
										value={requirements}
										onChange={(e) => setRequirements(e.target.value)}
										placeholder="List requirements (one per line)"
										rows={6}
										className={textAreaClassName}
									/>
								</InputGroup>
							</TextField>
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>Nice to Have</Label>
								<InputGroup>
									<InputGroup.TextArea
										value={niceToHave}
										onChange={(e) => setNiceToHave(e.target.value)}
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
									value={minSalary}
									onChange={(e) => setMinSalary(e.target.value)}
									placeholder="80000"
									className={inputClassName}
								/>
							</TextField>
							<TextField className={fieldClassName}>
								<Label className={labelClassName}>Maximum Salary</Label>
								<Input
									type="number"
									value={maxSalary}
									onChange={(e) => setMaxSalary(e.target.value)}
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
					isDisabled={createMutation.isPending}
					onPress={() => handleSubmit("DRAFT")}
				>
					<span className="inline-flex items-center gap-2">
						<FiSave />
						{createMutation.isPending ? "Saving..." : "Save as Draft"}
					</span>
				</Button>
				<Button
					className="h-12 rounded-xl bg-[#E2BA51] px-5 font-semibold text-[#1F2534]"
					isDisabled={createMutation.isPending}
					onPress={() => handleSubmit("OPEN")}
				>
					<span className="inline-flex items-center gap-2">
						<FiEye />
						{createMutation.isPending ? "Creating..." : "Create Job"}
					</span>
				</Button>
			</div>
		</div>
	);
}
