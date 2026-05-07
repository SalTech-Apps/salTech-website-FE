import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "@heroui/react";
import { FiEye, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { getApiJobs, type JobsListResponse } from "@/client";
import {
	ConsolePageHeader,
	JobStatusChip,
} from "@/components/console/ConsoleShared";
import {
	DraftDetailsModal,
	DeleteDraftModal,
} from "@/components/console/DraftModals";
import { formatEnumLabel, formatRelativeDate } from "@/lib/consoleFormat";

type DraftJob = JobsListResponse["data"][number];

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

export default function ConsoleDraftsPage() {
	const [viewDraft, setViewDraft] = useState<DraftJob | null>(null);
	const [deleteDraft, setDeleteDraft] = useState<DraftJob | null>(null);

	const jobsQuery = useQuery({
		queryKey: ["console-jobs"],
		queryFn: async () => {
			const response = await getApiJobs({ throwOnError: true });
			return response.data.data;
		},
	});

	const drafts = (jobsQuery.data ?? []).filter((job) => job.status === "DRAFT");

	return (
		<>
			<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-2">
				<ConsolePageHeader
					title="Drafts"
					description="Jobs saved as drafts while you prepare for publishing"
					action={
						<Link to="/console/jobs/new" prefetch="intent">
							<Button className="h-11 rounded-xl bg-[#E2BA51] px-5 font-semibold text-[#1F2534]">
								<span className="inline-flex items-center gap-2">
									<FiPlus />
									Create Job
								</span>
							</Button>
						</Link>
					}
				/>

				<Table variant="secondary">
					<Table.ScrollContainer>
						<Table.Content aria-label="Draft jobs">
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
									Last Modified
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Status
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
											No drafts saved yet.
										</div>
									)
								}
							>
								{drafts.map((job) => (
									<Table.Row key={job.id}>
										<Table.Cell className="py-4 text-sm font-medium text-[#1F2534]">
											{job.title}
										</Table.Cell>
										<Table.Cell className="py-4 text-sm text-[#5F6677]">
											{formatEnumLabel(job.department)}
										</Table.Cell>
										<Table.Cell className="py-4 text-sm text-[#5F6677]">
											{job.location}
										</Table.Cell>
										<Table.Cell className="py-4 text-sm text-[#5F6677]">
											{formatRelativeDate(job.updatedAt)}
										</Table.Cell>
										<Table.Cell className="py-4 text-sm text-[#5F6677]">
											<JobStatusChip status={job.status} />
										</Table.Cell>
										<Table.Cell>
											<div className="flex items-center gap-4 text-[#818797]">
												<Button
													isIconOnly
													type="button"
													onClick={() => setViewDraft(job)}
													className="bg-transparent text-[#1F2534]"
													aria-label={`View ${job.title}`}
												>
													<FiEye />
												</Button>
												<Link
													to={`/console/jobs/${job.id}/edit`}
													className="hover:text-[#1F2534]"
													aria-label={`Edit ${job.title}`}
												>
													<FiEdit2 />
												</Link>
												<Button
													isIconOnly
													type="button"
													onClick={() => setDeleteDraft(job)}
													className="bg-transparent text-[#E62A25] hover:text-[#E62A25]"
													aria-label={`Delete ${job.title}`}
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

			<DraftDetailsModal
				draft={viewDraft}
				isOpen={viewDraft !== null}
				onClose={() => setViewDraft(null)}
			/>
			<DeleteDraftModal
				draft={deleteDraft}
				isOpen={deleteDraft !== null}
				onClose={() => setDeleteDraft(null)}
			/>
		</>
	);
}
