import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "@heroui/react";
import { FiCalendar, FiMail, FiPhone, FiUsers } from "react-icons/fi";
import {
	postApiApplicantsByIdAssignInterviewer,
	postApiApplicantsByIdAssignRecruiter,
	postApiApplicantsByIdNextStage,
	postApiApplicantsByIdReject,
	postApiApplicantsByIdScheduleInterview,
	type ApplicantsListResponse,
	type JobsListResponse,
} from "@/client";
import { CandidateStageChip } from "@/components/console/ConsoleShared";
import { apiErrorParser } from "@/lib/errorParser";
import { formatRelativeDate } from "@/lib/consoleFormat";
import toast from "react-hot-toast";

type Applicant = ApplicantsListResponse["data"][number];
type Job = JobsListResponse["data"][number];

export function ApplicantDetailsModal({
	candidate,
	jobs,
	isOpen,
	onClose,
}: {
	candidate: Applicant | null;
	jobs: Job[];
	isOpen: boolean;
	onClose: () => void;
}) {
	const queryClient = useQueryClient();
	const [recruiterName, setRecruiterName] = useState("");
	const [interviewerName, setInterviewerName] = useState("");
	const [interviewDate, setInterviewDate] = useState("");

	const assignRecruiterMutation = useMutation({
		mutationFn: async (id: string) => {
			await postApiApplicantsByIdAssignRecruiter({
				path: { id },
				body: { assignedRecruiter: recruiterName.trim() },
				throwOnError: true,
			});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["console-candidates"] });
			setRecruiterName("");
			toast.success("Recruiter assigned");
		},
		onError: (error) => toast.error(apiErrorParser(error).message),
	});

	const assignInterviewerMutation = useMutation({
		mutationFn: async (id: string) => {
			await postApiApplicantsByIdAssignInterviewer({
				path: { id },
				body: { assignedInterviewer: interviewerName.trim() },
				throwOnError: true,
			});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["console-candidates"] });
			setInterviewerName("");
			toast.success("Interviewer assigned");
		},
		onError: (error) => toast.error(apiErrorParser(error).message),
	});

	const scheduleMutation = useMutation({
		mutationFn: async (id: string) => {
			const isoDate = new Date(interviewDate).toISOString();
			await postApiApplicantsByIdScheduleInterview({
				path: { id },
				body: { interviewScheduledAt: isoDate },
				throwOnError: true,
			});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["console-candidates"] });
			setInterviewDate("");
			toast.success("Interview scheduled");
		},
		onError: (error) => toast.error(apiErrorParser(error).message),
	});

	const rejectMutation = useMutation({
		mutationFn: async (id: string) => {
			await postApiApplicantsByIdReject({
				path: { id },
				body: { rejectionReason: "Rejected by hiring team" },
				throwOnError: true,
			});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["console-candidates"] });
			toast.success("Candidate rejected");
		},
		onError: (error) => toast.error(apiErrorParser(error).message),
	});

	const moveNextMutation = useMutation({
		mutationFn: async (id: string) => {
			await postApiApplicantsByIdNextStage({
				path: { id },
				throwOnError: true,
			});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["console-candidates"] });
			toast.success("Candidate moved to next stage");
		},
		onError: (error) => toast.error(apiErrorParser(error).message),
	});

	const positionTitle =
		jobs.find((job) => job.id === candidate?.jobId)?.title ?? "Unknown Role";

	if (!candidate) return null;

	return (
		<Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
			<Modal.Backdrop>
				<Modal.Container size="lg" className="rounded-[26px]">
					<Modal.Dialog className="bg-white">
						<Modal.CloseTrigger className="bg-transparent text-black" />
						<Modal.Header className="border-b border-[#ECE8DF] px-7 py-5">
							<Modal.Heading className="font-heading text-[2rem] font-semibold text-[#1F2534]">
								Application Details
							</Modal.Heading>
						</Modal.Header>
						<Modal.Body className="px-7 py-6">
							<div className="flex items-start justify-between gap-4">
								<div>
									<h3 className="font-heading text-[2.3rem] font-semibold text-[#1F2534]">
										{candidate.fullName}
									</h3>
									<p className="mt-2 text-sm text-[#7B8090]">
										Applied for {positionTitle}
									</p>
								</div>
								<CandidateStageChip stage={candidate.status} />
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
										<FiCalendar className="text-[#E2BA51]" /> Applied
									</p>
									<p className="mt-2 text-sm text-[#1F2534]">
										{formatRelativeDate(candidate.createdAt)}
									</p>
								</div>
								<div className="rounded-xl bg-white px-4 py-3">
									<p className="inline-flex items-center gap-2 text-xs text-[#8C92A1]">
										<FiCalendar className="text-[#E2BA51]" /> Start Date
									</p>
									<p className="mt-2 text-sm text-[#1F2534]">
										{candidate.earliestStartDate || "Not provided"}
									</p>
								</div>
							</div>

							<div className="mt-6">
								<h4 className="text-sm font-semibold text-[#1F2534]">
									Links & Documents
								</h4>
								<div className="mt-3 space-y-2">
									<a
										href={candidate.resumeUrl}
										target="_blank"
										rel="noreferrer"
										className="block rounded-xl border border-[#ECE8DF] bg-white px-4 py-3"
									>
										<p className="text-sm font-medium text-[#1F2534]">Resume</p>
										<p className="mt-1 text-xs text-[#A7ACB9]">
											Open uploaded resume
										</p>
									</a>
									<div className="rounded-xl border border-[#ECE8DF] bg-white px-4 py-3">
										<p className="text-sm font-medium text-[#1F2534]">
											LinkedIn Profile
										</p>
										<p className="mt-1 text-xs text-[#A7ACB9]">
											{candidate.linkedinUrl || "Not provided"}
										</p>
									</div>
									<div className="rounded-xl border border-[#ECE8DF] bg-white px-4 py-3">
										<p className="text-sm font-medium text-[#1F2534]">
											Portfolio
										</p>
										<p className="mt-1 text-xs text-[#A7ACB9]">
											{candidate.portfolioUrl || "Not provided"}
										</p>
									</div>
								</div>
							</div>

							<div className="mt-6 space-y-3">
								<h4 className="text-sm font-semibold text-[#1F2534]">
									Assignment
								</h4>
								<div className="grid gap-3 md:grid-cols-2">
									<div className="rounded-2xl border border-[#ECE8DF] bg-white p-4">
										<p className="inline-flex items-center gap-2 text-sm font-medium text-[#434959]">
											<FiUsers /> Assign to Recruiter
										</p>
										<input
											placeholder="Enter recruiter name"
											value={recruiterName}
											onChange={(e) => setRecruiterName(e.target.value)}
											className="mt-3 h-10 w-full rounded-xl border border-[#E7E2D8] px-3 text-sm"
										/>
										<Button
											className="mt-3 h-10 rounded-xl bg-[#E2BA51] font-semibold text-[#1F2534]"
											onPress={() =>
												assignRecruiterMutation.mutate(candidate.id)
											}
											isDisabled={
												!recruiterName.trim() ||
												assignRecruiterMutation.isPending
											}
										>
											{assignRecruiterMutation.isPending
												? "Assigning..."
												: "Assign"}
										</Button>
									</div>
									<div className="rounded-2xl border border-[#ECE8DF] bg-white p-4">
										<p className="inline-flex items-center gap-2 text-sm font-medium text-[#434959]">
											<FiUsers /> Assign Interviewer
										</p>
										<input
											placeholder="Enter interviewer name"
											value={interviewerName}
											onChange={(e) => setInterviewerName(e.target.value)}
											className="mt-3 h-10 w-full rounded-xl border border-[#E7E2D8] px-3 text-sm"
										/>
										<Button
											className="mt-3 h-10 rounded-xl bg-[#E2BA51] font-semibold text-[#1F2534]"
											onPress={() =>
												assignInterviewerMutation.mutate(candidate.id)
											}
											isDisabled={
												!interviewerName.trim() ||
												assignInterviewerMutation.isPending
											}
										>
											{assignInterviewerMutation.isPending
												? "Assigning..."
												: "Assign"}
										</Button>
									</div>
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer className="px-7 pb-7 pt-0">
							<div className="grid w-full gap-3 md:grid-cols-3">
								<Button
									className="h-11 rounded-xl bg-[#E62A25] font-semibold text-white"
									onPress={() => rejectMutation.mutate(candidate.id)}
									isDisabled={rejectMutation.isPending}
								>
									{rejectMutation.isPending ? "Rejecting..." : "Reject"}
								</Button>
								<div className="flex gap-2">
									<input
										type="datetime-local"
										value={interviewDate}
										onChange={(e) => setInterviewDate(e.target.value)}
										className="h-11 flex-1 rounded-xl border border-[#E7E2D8] px-3 text-sm"
									/>
									<Button
										variant="secondary"
										className="h-11 rounded-xl border-[#E7E2D8] bg-white font-semibold text-[#434959]"
										onPress={() => scheduleMutation.mutate(candidate.id)}
										isDisabled={scheduleMutation.isPending || !interviewDate}
									>
										{scheduleMutation.isPending ? "Scheduling..." : "Schedule"}
									</Button>
								</div>
								<Button
									className="h-11 rounded-xl bg-[#E2BA51] font-semibold text-[#1F2534]"
									onPress={() => moveNextMutation.mutate(candidate.id)}
									isDisabled={moveNextMutation.isPending}
								>
									{moveNextMutation.isPending
										? "Moving..."
										: "Move to Next Stage"}
								</Button>
							</div>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
