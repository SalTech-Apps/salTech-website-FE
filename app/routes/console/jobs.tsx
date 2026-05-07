import { useState } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router";
import { Button, Table } from "@heroui/react";
import {
	FiEdit2,
	FiEye,
	FiFilter,
	FiPlus,
	FiSearch,
	FiTrash2,
	FiBriefcase,
} from "react-icons/fi";
import {
	ConsolePageHeader,
	ConsoleStatCard,
	JobStatusChip,
} from "@/components/console/ConsoleShared";

import {
	JobDetailsModal,
	DeleteJobModal,
} from "@/components/console/JobModals";
import { useQuery } from "@tanstack/react-query";
import { getApiJobs } from "@/client/sdk.gen";
import { JobAtom } from "@/atoms/console.atom";
import type { JobResponseSchema } from "@/atoms/console.atom";

function SkeletonRows() {
	return (
		<>
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className="flex gap-4 border-b border-[#ECE8DF] px-5 py-4">
					{Array.from({ length: 6 }).map((_, j) => (
						<div
							key={j}
							className="h-4 flex-1 animate-pulse rounded-md bg-[#ECE8DF]"
							style={{ maxWidth: j === 5 ? "60px" : undefined }}
						/>
					))}
				</div>
			))}
		</>
	);
}

export default function ConsoleJobsPage() {
	const [, setJobAtom] = useAtom(JobAtom);
	const [search, setSearch] = useState("");
	const [viewJob, setViewJob] = useState<JobResponseSchema | null>(null);
	const [deleteJob, setDeleteJob] = useState<JobResponseSchema | null>(null);

	const jobsQuery = useQuery({
		queryKey: ["jobs"],
		queryFn: async () => {
			const { data } = await getApiJobs({ throwOnError: true });
			return data.data;
		},
	});

	const jobs = jobsQuery.data ?? [];
	const filtered = search.trim()
		? jobs.filter(
				(j) =>
					j.title.toLowerCase().includes(search.toLowerCase()) ||
					j.department.toLowerCase().includes(search.toLowerCase()) ||
					j.location.toLowerCase().includes(search.toLowerCase()),
			)
		: jobs;

	function openView(job: JobResponseSchema) {
		setJobAtom(job);
		setViewJob(job);
	}

	function openDelete(job: JobResponseSchema) {
		setDeleteJob(job);
	}

	return (
		<>
			<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-2">
				<ConsolePageHeader
					title="Jobs"
					description="Manage job postings and track applications"
					action={
						<Link to="/console/jobs/new">
							<Button className="h-11 rounded-xl bg-[#E2BA51] px-5 font-semibold text-[#1F2534]">
								<span className="inline-flex items-center gap-2">
									<FiPlus />
									Create Job
								</span>
							</Button>
						</Link>
					}
				/>

				<div className="grid gap-4 md:grid-cols-3">
					<ConsoleStatCard
						label="Total Jobs"
						value={jobs.length}
						change=""
						icon={FiBriefcase}
						tone="gold"
					/>
					<ConsoleStatCard
						label="Active Jobs"
						value={jobs.filter((j) => j.status === "OPEN").length}
						change=""
						icon={FiBriefcase}
						tone="green"
					/>
					<ConsoleStatCard
						label="Draft Jobs"
						value={jobs.filter((j) => j.status === "DRAFT").length}
						change=""
						icon={FiSearch}
						tone="blue"
					/>
				</div>

				<div className="flex flex-col gap-4 rounded-[22px] py-4 md:flex-row md:items-center">
					<div className="relative flex-1">
						<FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A5B4]" />
						<input
							type="text"
							placeholder="Search jobs..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="h-12 w-full rounded-xl border border-[#E7E2D8] bg-white pl-11 pr-4 text-[#1F2534] placeholder:text-[#A7ACB9]"
						/>
					</div>
					<Button
						variant="secondary"
						className="h-12 rounded-xl border-[#E7E2D8] bg-white px-4 text-[#667085]"
					>
						<span className="inline-flex items-center gap-2">
							<FiFilter />
							Filter
						</span>
					</Button>
				</div>

				<Table variant="secondary">
					<Table.ScrollContainer>
						<Table.Content aria-label="Jobs" className="min-w-175">
							<Table.Header className="bg-[#FBF7EE]">
								<Table.Column
									isRowHeader
									className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]"
								>
									Job Title
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Department
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Location
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Status
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Type
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Actions
								</Table.Column>
							</Table.Header>
							<Table.Body
								renderEmptyState={() =>
									jobsQuery.isLoading ? (
										<SkeletonRows />
									) : (
										<div className="py-10 text-center text-sm text-[#8D92A1]">
											{search ? "No jobs match your search." : "No jobs found."}
										</div>
									)
								}
							>
								{filtered.map((job) => (
									<Table.Row key={job.id}>
										<Table.Cell className="truncate font-medium text-[#1F2534]">
											{job.title}
										</Table.Cell>
										<Table.Cell className="truncate text-sm text-[#5F6677]">
											{job.department}
										</Table.Cell>
										<Table.Cell className="truncate text-sm text-[#5F6677]">
											{job.location}
										</Table.Cell>
										<Table.Cell>
											<JobStatusChip status={job.status} />
										</Table.Cell>
										<Table.Cell className="truncate text-sm text-[#5F6677]">
											{job.jobType}
										</Table.Cell>
										<Table.Cell>
											<div className="flex items-center gap-4 text-[#818797]">
												<Button
													type="button"
													isIconOnly
													className="bg-transparent text-[#1F2534] hover:text-[#1F2534]"
													aria-label={`View ${job.title}`}
													onPress={() => openView(job)}
												>
													<FiEye />
												</Button>
												<Link
													to={`/console/jobs/${job.id}/edit`}
													onClick={() => setJobAtom(job)}
													className="hover:text-[#1F2534]"
													aria-label={`Edit ${job.title}`}
												>
													<FiEdit2 />
												</Link>
												<Button
													type="button"
													isIconOnly
													className="bg-transparent text-[#E62A25] hover:text-[#E62A25]"
													aria-label={`Delete ${job.title}`}
													onPress={() => openDelete(job)}
												>
													<FiTrash2 />
												</Button>
											</div>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Content>
					</Table.ScrollContainer>
				</Table>
			</div>

			<JobDetailsModal
				job={viewJob}
				isOpen={viewJob !== null}
				onClose={() => setViewJob(null)}
			/>

			<DeleteJobModal
				job={deleteJob}
				isOpen={deleteJob !== null}
				onClose={() => setDeleteJob(null)}
			/>
		</>
	);
}
