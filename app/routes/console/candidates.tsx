import { useSearchParams } from "react-router-dom";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalFooter,
} from "@heroui/react";
import {
	FiEye,
	FiPlus,
	FiMail,
	FiPhone,
	FiCalendar,
	FiUsers,
	FiX,
} from "react-icons/fi";
import {
	CandidateStageChip,
	ConsolePageHeader,
	TableShell,
} from "@/components/console/ConsoleShared";
import {
	ASSIGNMENT_OPTIONS,
	CANDIDATE_APPLICATIONS,
	getCandidate,
	getJobTitle,
} from "@/data/consoleDashboard";

export default function ConsoleCandidatesPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const candidate = getCandidate(searchParams.get("view") ?? undefined);

	return (
		<>
			<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-8">
				<ConsolePageHeader
					title="Candidates"
					description="Review and manage candidate applications"
					action={
						<Button
							className="h-11 rounded-xl bg-[#E2BA51] px-5 font-semibold text-[#1F2534]"
							startContent={<FiPlus />}
						>
							Create Job
						</Button>
					}
				/>

				<TableShell>
					<div className="grid grid-cols-[1.1fr_1.25fr_1.45fr_0.8fr_1fr_0.55fr] gap-4 bg-[#FBF7EE] px-5 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
						<span>Name</span>
						<span>Email</span>
						<span>Position</span>
						<span>Date</span>
						<span>Status</span>
						<span>Actions</span>
					</div>
					<div className="divide-y divide-[#ECE8DF]">
						{CANDIDATE_APPLICATIONS.map((item) => (
							<div
								key={item.id}
								className="grid grid-cols-[1.1fr_1.25fr_1.45fr_0.8fr_1fr_0.55fr] gap-4 px-5 py-5 text-sm text-[#5F6677]"
							>
								<div className="font-medium text-[#1F2534]">{item.name}</div>
								<div>{item.email}</div>
								<div>{getJobTitle(item.positionId)}</div>
								<div>{item.date}</div>
								<div>
									<CandidateStageChip stage={item.stage} />
								</div>
								<div>
									<button
										type="button"
										onClick={() =>
											setSearchParams(new URLSearchParams({ view: item.id }))
										}
										className="text-[#7E8392] hover:text-[#1F2534]"
										aria-label={`View ${item.name}`}
									>
										<FiEye />
									</button>
								</div>
							</div>
						))}
					</div>
				</TableShell>
			</div>

			<Modal
				isOpen={!!candidate}
				onOpenChange={(open) => !open && setSearchParams(new URLSearchParams())}
				size="3xl"
				backdrop="blur"
				classNames={{ base: "rounded-[26px] bg-white", closeButton: "hidden" }}
			>
				<ModalContent>
					{() =>
						candidate ? (
							<>
								<ModalHeader className="flex items-center justify-between border-b border-[#ECE8DF] px-7 py-5">
									<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
										Application Details
									</h2>
									<button
										type="button"
										onClick={() => setSearchParams(new URLSearchParams())}
										className="text-[#7D8291]"
									>
										<FiX className="text-2xl" />
									</button>
								</ModalHeader>
								<ModalBody className="px-7 py-6">
									<div className="flex items-start justify-between gap-4">
										<div>
											<h3 className="font-heading text-[2.3rem] font-semibold text-[#1F2534]">
												{candidate.name}
											</h3>
											<p className="mt-2 text-sm text-[#7B8090]">
												Applied for {getJobTitle(candidate.positionId)}
											</p>
										</div>
										<CandidateStageChip stage={candidate.stage} />
									</div>

									<div className="mt-5 grid gap-3 rounded-2xl bg-[#FBF7EE] p-4 md:grid-cols-2">
										<div className="rounded-xl bg-white px-4 py-3">
											<p className="inline-flex items-center gap-2 text-xs text-[#8C92A1]">
												<FiMail className="text-[#E2BA51]" /> Email
											</p>
											<p className="mt-2 text-sm text-[#1F2534]">
												{candidate.email}
											</p>
										</div>
										<div className="rounded-xl bg-white px-4 py-3">
											<p className="inline-flex items-center gap-2 text-xs text-[#8C92A1]">
												<FiPhone className="text-[#E2BA51]" /> Phone
											</p>
											<p className="mt-2 text-sm text-[#1F2534]">
												{candidate.phone}
											</p>
										</div>
										<div className="rounded-xl bg-white px-4 py-3">
											<p className="inline-flex items-center gap-2 text-xs text-[#8C92A1]">
												<FiCalendar className="text-[#E2BA51]" /> Applied On
											</p>
											<p className="mt-2 text-sm text-[#1F2534]">
												{candidate.date}
											</p>
										</div>
										<div className="rounded-xl bg-white px-4 py-3">
											<p className="inline-flex items-center gap-2 text-xs text-[#8C92A1]">
												<FiCalendar className="text-[#E2BA51]" /> Start Date
											</p>
											<p className="mt-2 text-sm text-[#1F2534]">
												{candidate.startDate}
											</p>
										</div>
									</div>

									<div className="mt-6">
										<h4 className="text-sm font-semibold text-[#1F2534]">
											Links & Documents
										</h4>
										<div className="mt-3 space-y-2">
											<div className="rounded-xl border border-[#ECE8DF] bg-white px-4 py-3">
												<p className="text-sm font-medium text-[#1F2534]">
													{candidate.resumeName}
												</p>
												<p className="mt-1 text-xs text-[#A7ACB9]">
													{candidate.resumeSize}
												</p>
											</div>
											<div className="rounded-xl border border-[#ECE8DF] bg-white px-4 py-3">
												<p className="text-sm font-medium text-[#1F2534]">
													LinkedIn Profile
												</p>
												<p className="mt-1 text-xs text-[#A7ACB9]">
													{candidate.linkedin}
												</p>
											</div>
											<div className="rounded-xl border border-[#ECE8DF] bg-white px-4 py-3">
												<p className="text-sm font-medium text-[#1F2534]">
													Portfolio
												</p>
												<p className="mt-1 text-xs text-[#A7ACB9]">
													{candidate.portfolio}
												</p>
											</div>
										</div>
									</div>

									<div className="mt-6">
										<h4 className="text-sm font-semibold text-[#1F2534]">
											Cover Letter
										</h4>
										<div className="mt-3 rounded-2xl bg-[#FBF7EE] p-5 text-[15px] leading-7 text-[#5F6677] whitespace-pre-line">
											{candidate.coverLetter}
										</div>
									</div>

									<div className="mt-6">
										<h4 className="text-sm font-semibold text-[#1F2534]">
											Assignment
										</h4>
										<div className="mt-3 grid gap-3 md:grid-cols-2">
											<div className="rounded-2xl border border-[#ECE8DF] bg-white p-4">
												<p className="inline-flex items-center gap-2 text-sm font-medium text-[#434959]">
													<FiUsers /> Assign to Recruiter
												</p>
												<div className="mt-4 space-y-2">
													{ASSIGNMENT_OPTIONS.recruiters.map((person) => (
														<div
															key={person.name}
															className={`rounded-xl border px-3 py-2 ${candidate.assignedRecruiter === person.name ? "border-[#E2BA51] bg-[#FFF7E7]" : "border-[#ECE8DF]"}`}
														>
															<p className="text-sm font-medium text-[#1F2534]">
																{person.name}
															</p>
															<p className="text-xs text-[#8F94A2]">
																{person.role}
															</p>
														</div>
													))}
												</div>
											</div>
											<div className="rounded-2xl border border-[#ECE8DF] bg-white p-4">
												<p className="inline-flex items-center gap-2 text-sm font-medium text-[#434959]">
													<FiUsers /> Assign Interviewer
												</p>
												<div className="mt-4 space-y-2">
													{ASSIGNMENT_OPTIONS.interviewers.map((person) => (
														<div
															key={person.name}
															className={`rounded-xl border px-3 py-2 ${candidate.assignedInterviewer === person.name ? "border-[#E2BA51] bg-[#FFF7E7]" : "border-[#ECE8DF]"}`}
														>
															<p className="text-sm font-medium text-[#1F2534]">
																{person.name}
															</p>
															<p className="text-xs text-[#8F94A2]">
																{person.role}
															</p>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</ModalBody>
								<ModalFooter className="px-7 pb-7 pt-0">
									<div className="grid w-full gap-3 md:grid-cols-3">
										<Button className="h-11 rounded-xl bg-[#E62A25] font-semibold text-white">
											Reject
										</Button>
										<Button
											variant="bordered"
											className="h-11 rounded-xl border-[#E7E2D8] bg-white font-semibold text-[#434959]"
										>
											Schedule Interview
										</Button>
										<Button className="h-11 rounded-xl bg-[#E2BA51] font-semibold text-[#1F2534]">
											Move to Next Stage
										</Button>
									</div>
								</ModalFooter>
							</>
						) : null
					}
				</ModalContent>
			</Modal>
		</>
	);
}
