import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { FiArrowLeft, FiSave, FiEye } from "react-icons/fi";
import { ConsoleBrand } from "@/components/console/ConsoleShared";
import { getConsoleJob } from "@/data/consoleDashboard";

const DEPARTMENTS = ["Engineering", "Design", "Business"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract"];

const inputClassNames = {
	inputWrapper: "rounded-xl border border-[#E7E2D8] bg-white shadow-none",
	input: "text-[#1F2534] placeholder:text-[#B0B5C2]",
	label: "text-sm font-medium text-[#1F2534]",
};

const textareaClassNames = {
	inputWrapper: "rounded-xl border border-[#E7E2D8] bg-white shadow-none",
	input: "text-[#1F2534] placeholder:text-[#B0B5C2]",
	label: "text-sm font-medium text-[#1F2534]",
};

const selectClassNames = {
	trigger: "h-12 rounded-xl border border-[#E7E2D8] bg-white shadow-none",
	value: "text-[#1F2534]",
	label: "text-sm font-medium text-[#1F2534]",
};

export default function EditJobPage() {
	const { jobId } = useParams();
	const job = useMemo(() => getConsoleJob(jobId), [jobId]);
	const [department, setDepartment] = useState(
		job?.department ?? "Engineering",
	);
	const [jobType, setJobType] = useState(job?.type ?? "Full-time");

	if (!job) {
		return (
			<div className="mx-auto max-w-190 px-4 py-10 text-[#1F2534]">
				<p className="text-sm text-[#7B8090]">Job not found.</p>
			</div>
		);
	}

	return (
		<div className="mx-auto flex w-full max-w-190 flex-col gap-6 px-0 py-6 lg:py-8">
			<Link
				to="/console"
				className="inline-flex items-center gap-2 text-sm text-[#6E7485] hover:text-[#1F2534]"
			>
				<FiArrowLeft /> Back to Dashboard
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
							<Input
								label="Job Title *"
								labelPlacement="outside"
								defaultValue={job.title}
								classNames={inputClassNames}
							/>
							<div className="grid gap-5 md:grid-cols-2">
								<Select
									label="Department *"
									labelPlacement="outside"
									selectedKeys={[department]}
									onSelectionChange={(keys) =>
										setDepartment(String(Array.from(keys)[0] ?? job.department))
									}
									classNames={selectClassNames}
								>
									{DEPARTMENTS.map((item) => (
										<SelectItem key={item}>{item}</SelectItem>
									))}
								</Select>
								<Select
									label="Job Type *"
									labelPlacement="outside"
									selectedKeys={[jobType]}
									onSelectionChange={(keys) =>
										setJobType(String(Array.from(keys)[0] ?? job.type))
									}
									classNames={selectClassNames}
								>
									{JOB_TYPES.map((item) => (
										<SelectItem key={item}>{item}</SelectItem>
									))}
								</Select>
							</div>
							<Input
								label="Location *"
								labelPlacement="outside"
								defaultValue={job.location}
								classNames={inputClassNames}
							/>
						</div>
					</section>

					<section>
						<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
							Job Description
						</h2>
						<div className="mt-5 space-y-5">
							<Textarea
								label="Description *"
								labelPlacement="outside"
								defaultValue={job.description}
								minRows={4}
								classNames={textareaClassNames}
							/>
							<Textarea
								label="Responsibilities *"
								labelPlacement="outside"
								defaultValue={job.responsibilities.join("\n")}
								minRows={6}
								classNames={textareaClassNames}
							/>
							<Textarea
								label="Requirements *"
								labelPlacement="outside"
								defaultValue={job.requirements.join("\n")}
								minRows={6}
								classNames={textareaClassNames}
							/>
							<Textarea
								label="Nice to Have"
								labelPlacement="outside"
								defaultValue={job.niceToHave.join("\n")}
								minRows={4}
								classNames={textareaClassNames}
							/>
						</div>
					</section>

					<section>
						<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
							Compensation
						</h2>
						<div className="mt-5 grid gap-5 md:grid-cols-2">
							<Input
								label="Minimum Salary (USD)"
								labelPlacement="outside"
								defaultValue={String(job.salaryMin ?? "")}
								classNames={inputClassNames}
							/>
							<Input
								label="Maximum Salary (USD)"
								labelPlacement="outside"
								defaultValue={String(job.salaryMax ?? "")}
								classNames={inputClassNames}
							/>
						</div>
						<p className="mt-3 text-xs text-[#B0B5C2]">
							Leave empty if you prefer not to disclose salary range
						</p>
					</section>
				</div>
			</div>

			<div className="flex flex-col justify-end gap-3 sm:flex-row">
				<Button
					variant="bordered"
					className="h-12 rounded-xl border-[#E7E2D8] bg-white px-5 font-semibold text-[#434959]"
					startContent={<FiSave />}
				>
					Save as Draft
				</Button>
				<Button
					className="h-12 rounded-xl bg-[#E2BA51] px-5 font-semibold text-[#1F2534]"
					startContent={<FiEye />}
				>
					Update Job
				</Button>
			</div>
		</div>
	);
}
