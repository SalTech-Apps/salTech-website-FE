import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/react";
import {
	FiEdit2,
	FiEye,
	FiFilter,
	FiPlus,
	FiSearch,
	FiTrash2,
	FiMapPin,
	FiClock,
	FiBriefcase,
	FiX,
} from "react-icons/fi";
import {
	ConsolePageHeader,
	ConsoleStatCard,
	JobStatusChip,
	TableShell,
} from "@/components/console/ConsoleShared";
import {
	CONSOLE_JOBS,
	DASHBOARD_OVERVIEW,
	getConsoleJob,
} from "@/data/consoleDashboard";

function updateSearchParams(
	searchParams: URLSearchParams,
	setSearchParams: (nextInit: URLSearchParams) => void,
	key: string,
	value?: string,
) {
	const next = new URLSearchParams(searchParams);
	if (value) {
		next.set(key, value);
	} else {
		next.delete(key);
	}
	setSearchParams(next);
}

function JobDetailsModal({
	jobId,
	onClose,
}: {
	jobId?: string | null;
	onClose: () => void;
}) {
	const job = getConsoleJob(jobId ?? undefined);

	return (
		<Modal
			isOpen={!!job}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
			size="4xl"
			backdrop="blur"
			classNames={{
				base: "rounded-[26px] bg-white",
				closeButton: "hidden",
			}}
		>
			<ModalContent>
				{() =>
					job ? (
						<>
							<ModalHeader className="flex items-center justify-between border-b border-[#ECE8DF] px-8 py-6">
								<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
									Job Details
								</h2>
								<button
									type="button"
									onClick={onClose}
									className="text-[#7D8291]"
								>
									<FiX className="text-2xl" />
								</button>
							</ModalHeader>
							<ModalBody className="px-8 py-6">
								<div className="flex items-center gap-3">
									<JobStatusChip status={job.status} />
								</div>
								<h3 className="mt-4 font-heading text-[3rem] font-semibold leading-none text-[#1F2534]">
									{job.title}
								</h3>
								<div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7C8192]">
									<span className="inline-flex items-center gap-2">
										<FiMapPin className="text-[#E2BA51]" /> {job.location}
									</span>
									<span className="inline-flex items-center gap-2">
										<FiBriefcase className="text-[#E2BA51]" /> {job.department}
									</span>
									<span className="inline-flex items-center gap-2">
										<FiClock className="text-[#E2BA51]" /> {job.type}
									</span>
								</div>

								<div className="mt-6 grid gap-4 rounded-2xl bg-[#FBF7EE] p-5 md:grid-cols-3">
									<div>
										<p className="text-xs text-[#8B91A0]">Total Applicants</p>
										<p className="mt-1 font-heading text-[2rem] font-semibold text-[#1F2534]">
											{job.applicants}
										</p>
									</div>
									<div>
										<p className="text-xs text-[#8B91A0]">Posted</p>
										<p className="mt-2 text-sm font-semibold text-[#434959]">
											{job.posted}
										</p>
									</div>
									<div className="text-left md:text-right">
										<p className="text-xs text-[#8B91A0]">Views</p>
										<p className="mt-2 text-sm font-semibold text-[#434959]">
											{job.views}
										</p>
									</div>
								</div>

								<section className="mt-7 space-y-7 text-[#707788]">
									<div>
										<h4 className="text-lg font-semibold text-[#1F2534]">
											Description
										</h4>
										<p className="mt-3 text-[15px] leading-7">
											{job.description}
										</p>
									</div>
									<div>
										<h4 className="text-lg font-semibold text-[#1F2534]">
											Responsibilities
										</h4>
										<ul className="mt-3 space-y-2 text-[15px] leading-7">
											{job.responsibilities.map((item) => (
												<li key={item} className="flex gap-3">
													<span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#E2BA51]" />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
									<div>
										<h4 className="text-lg font-semibold text-[#1F2534]">
											Requirements
										</h4>
										<ul className="mt-3 space-y-2 text-[15px] leading-7">
											{job.requirements.map((item) => (
												<li key={item} className="flex gap-3">
													<span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#E2BA51]" />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
								</section>
							</ModalBody>
							<ModalFooter className="border-t border-[#ECE8DF] px-8 py-4">
								<Button
									className="h-11 flex-1 rounded-xl bg-[#E2BA51] font-semibold text-[#1F2534]"
									onPress={onClose}
								>
									Close
								</Button>
							</ModalFooter>
						</>
					) : null
				}
			</ModalContent>
		</Modal>
	);
}

function DeleteJobModal({
	jobId,
	onClose,
}: {
	jobId?: string | null;
	onClose: () => void;
}) {
	const job = getConsoleJob(jobId ?? undefined);

	return (
		<Modal
			isOpen={!!job}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
			size="lg"
			backdrop="blur"
			classNames={{ base: "rounded-[24px] bg-white", closeButton: "hidden" }}
		>
			<ModalContent>
				{() =>
					job ? (
						<>
							<ModalBody className="px-6 pb-6 pt-6">
								<div className="flex items-start justify-between">
									<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF1F1] text-[#E94141]">
										<FiTrash2 />
									</div>
									<button
										type="button"
										onClick={onClose}
										className="text-[#828898]"
									>
										<FiX className="text-xl" />
									</button>
								</div>
								<h2 className="mt-4 font-heading text-[2rem] font-semibold text-[#1F2534]">
									Delete Job Posting
								</h2>
								<p className="mt-3 text-[15px] leading-7 text-[#707788]">
									Are you sure you want to delete “{job.title}”? This action
									cannot be undone and will remove all associated applications.
								</p>
								<div className="mt-6 grid grid-cols-2 gap-3">
									<Button
										variant="bordered"
										className="h-11 rounded-xl border-[#E5E1D8] bg-white font-semibold text-[#434959]"
										onPress={onClose}
									>
										Cancel
									</Button>
									<Button
										className="h-11 rounded-xl bg-[#E62A25] font-semibold text-white"
										onPress={onClose}
									>
										Delete
									</Button>
								</div>
							</ModalBody>
						</>
					) : null
				}
			</ModalContent>
		</Modal>
	);
}

export default function ConsoleJobsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("q") ?? "";
	const jobs = useMemo(
		() =>
			CONSOLE_JOBS.filter((job) => job.status === "active").filter((job) =>
				job.title.toLowerCase().includes(query.toLowerCase()),
			),
		[query],
	);

	return (
		<>
			<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-8">
				<ConsolePageHeader
					title="Jobs"
					description="Manage job postings and track applications"
					action={
						<Button
							as={Link}
							to="/console/jobs/new"
							className="h-11 rounded-xl bg-[#E2BA51] px-5 font-semibold text-[#1F2534]"
							startContent={<FiPlus />}
						>
							Create Job
						</Button>
					}
				/>

				<div className="flex flex-col gap-4 rounded-[22px] px-4 py-4 md:flex-row md:items-center md:px-6">
					<Input
						placeholder="Search jobs..."
						value={query}
						onValueChange={(value) => {
							updateSearchParams(
								searchParams,
								setSearchParams,
								"q",
								value || undefined,
							);
						}}
						startContent={<FiSearch className="text-[#A0A5B4]" />}
						className="flex-1"
						classNames={{
							inputWrapper:
								"h-12 rounded-xl border border-[#E7E2D8] bg-white shadow-none",
							input: "text-[#1F2534] placeholder:text-[#A7ACB9]",
						}}
					/>
					<Button
						variant="bordered"
						className="h-12 rounded-xl border-[#E7E2D8] bg-white px-4 text-[#667085]"
						startContent={<FiFilter />}
					>
						Filter
					</Button>
				</div>

				<TableShell>
					<div className="grid grid-cols-[minmax(0,1.6fr)_1fr_1fr_0.7fr_0.8fr_0.8fr] gap-4 bg-[#FBF7EE] px-5 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
						<span>Job Title</span>
						<span>Department</span>
						<span>Location</span>
						<span>Status</span>
						<span>Applicants</span>
						<span>Actions</span>
					</div>
					<div className="divide-y divide-[#ECE8DF]">
						{jobs.map((job) => (
							<div
								key={job.id}
								className="grid grid-cols-[minmax(0,1.6fr)_1fr_1fr_0.7fr_0.8fr_0.8fr] gap-4 px-5 py-5 text-sm text-[#5F6677]"
							>
								<div className="font-medium text-[#1F2534]">{job.title}</div>
								<div>{job.department}</div>
								<div>{job.location}</div>
								<div>
									<JobStatusChip status={job.status} />
								</div>
								<div className="font-semibold text-[#1F2534]">
									{job.applicants}
								</div>
								<div className="flex items-center gap-4 text-[#818797]">
									<Link
										to={`?${new URLSearchParams({ ...Object.fromEntries(searchParams), view: job.id }).toString()}`}
										className="hover:text-[#1F2534]"
										aria-label={`View ${job.title}`}
									>
										<FiEye />
									</Link>
									<Link
										to={`/console/jobs/${job.id}/edit`}
										className="hover:text-[#1F2534]"
										aria-label={`Edit ${job.title}`}
									>
										<FiEdit2 />
									</Link>
									<Link
										to={`?${new URLSearchParams({ ...Object.fromEntries(searchParams), delete: job.id }).toString()}`}
										className="hover:text-[#E62A25]"
										aria-label={`Delete ${job.title}`}
									>
										<FiTrash2 />
									</Link>
								</div>
							</div>
						))}
					</div>
				</TableShell>

				<div className="grid gap-4 md:grid-cols-3">
					<ConsoleStatCard
						label="Total Jobs"
						value={DASHBOARD_OVERVIEW.totalJobs}
						change=""
						icon={FiBriefcase}
						tone="gold"
					/>
					<ConsoleStatCard
						label="Active Jobs"
						value={DASHBOARD_OVERVIEW.activeJobs}
						change=""
						icon={FiBriefcase}
						tone="green"
					/>
					<ConsoleStatCard
						label="Total Applicants"
						value={DASHBOARD_OVERVIEW.totalApplicants}
						change=""
						icon={FiSearch}
						tone="blue"
					/>
				</div>
			</div>

			<JobDetailsModal
				jobId={searchParams.get("view")}
				onClose={() =>
					updateSearchParams(searchParams, setSearchParams, "view")
				}
			/>
			<DeleteJobModal
				jobId={searchParams.get("delete")}
				onClose={() =>
					updateSearchParams(searchParams, setSearchParams, "delete")
				}
			/>
		</>
	);
}
