import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@heroui/react";
import { FiEye } from "react-icons/fi";
import {
	getApiApplicants,
	getApiJobs,
	type ApplicantsListResponse,
	type JobsListResponse,
} from "@/client";
import {
	CandidateStageChip,
	ConsolePageHeader,
} from "@/components/console/ConsoleShared";
import { formatRelativeDate, toCandidateLabel } from "@/lib/consoleFormat";
import { ApplicantDetailsModal } from "@/components/console/ApplicantDetailsModal";

type Applicant = ApplicantsListResponse["data"][number];
type Job = JobsListResponse["data"][number];

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

export default function ConsoleCandidatesPage() {
	const [selectedCandidate, setSelectedCandidate] = useState<Applicant | null>(
		null,
	);

	const applicantsQuery = useQuery({
		queryKey: ["console-candidates"],
		queryFn: async () => {
			const response = await getApiApplicants({ throwOnError: true });
			return response.data.data;
		},
	});

	const jobsQuery = useQuery({
		queryKey: ["console-jobs"],
		queryFn: async () => {
			const response = await getApiJobs({ throwOnError: true });
			return response.data.data;
		},
	});

	const candidates = useMemo(
		() => applicantsQuery.data ?? [],
		[applicantsQuery.data],
	);
	const jobs = useMemo(() => jobsQuery.data ?? [], [jobsQuery.data]);

	const getJobTitle = (jobId: string): string => {
		return (
			(jobs as Job[]).find((job) => job.id === jobId)?.title ??
			"Unknown Position"
		);
	};

	const isLoading = applicantsQuery.isLoading || jobsQuery.isLoading;

	return (
		<>
			<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-2">
				<ConsolePageHeader
					title="Candidates"
					description="Review and manage candidate applications"
				/>

				<Table>
					<Table.ScrollContainer>
						<Table.Content aria-label="Candidates" className="min-w-175">
							<Table.Header className="bg-[#FBF7EE]">
								<Table.Column
									isRowHeader
									className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]"
								>
									Name
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Email
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Position
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Applied
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
									isLoading ? (
										<SkeletonRows />
									) : (
										<div className="py-10 text-center text-sm text-[#8D92A1]">
											No candidates yet.
										</div>
									)
								}
							>
								{candidates.map((item) => (
									<Table.Row key={item.id}>
										<Table.Cell className="font-medium text-[#1F2534]">
											{item.fullName}
										</Table.Cell>
										<Table.Cell className="text-sm text-[#5F6677]">
											{item.email}
										</Table.Cell>
										<Table.Cell className="text-sm text-[#5F6677]">
											{getJobTitle(item.jobId)}
										</Table.Cell>
										<Table.Cell className="text-sm text-[#5F6677]">
											{formatRelativeDate(item.createdAt)}
										</Table.Cell>
										<Table.Cell>
											<CandidateStageChip
												stage={toCandidateLabel(item.status)}
											/>
										</Table.Cell>
										<Table.Cell>
											<button
												type="button"
												onClick={() => setSelectedCandidate(item)}
												className="text-[#7E8392] hover:text-[#1F2534]"
												aria-label={`View ${item.fullName}`}
											>
												<FiEye />
											</button>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Content>
					</Table.ScrollContainer>
				</Table>
			</div>

			<ApplicantDetailsModal
				candidate={selectedCandidate}
				jobs={jobs}
				isOpen={selectedCandidate !== null}
				onClose={() => setSelectedCandidate(null)}
			/>
		</>
	);
}
