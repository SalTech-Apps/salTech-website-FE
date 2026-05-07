import { Button, Modal } from "@heroui/react";
import { FiBriefcase, FiClock, FiMapPin, FiTrash2 } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteApiJobsById } from "@/client";
import { JobStatusChip } from "./ConsoleShared";
import type { JobResponseSchema } from "@/atoms/console.atom";

export function JobDetailsModal({
	job,
	isOpen,
	onClose,
}: {
	job: JobResponseSchema | null;
	isOpen: boolean;
	onClose: () => void;
}) {
	if (!job) return null;

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<Modal.Backdrop>
				<Modal.Container size='lg' className="rounded-[26px]">
					<Modal.Dialog className="bg-white w-2xl">
						<Modal.CloseTrigger className="bg-transparent text-black" />
						<Modal.Header className="border-b border-[#ECE8DF] py-b">
							<Modal.Heading className="font-heading text-[2rem] font-semibold text-[#1F2534]">
								Job Details
							</Modal.Heading>
						</Modal.Header>

						<Modal.Body className="overflow-y-auto py-6">
							<div className="flex flex-col gap-3">
								<JobStatusChip status={job.status} className="border w-fit" />
								<h3 className="font-heading text-[2.6rem] font-semibold leading-none text-[#1F2534]">
									{job.title}
								</h3>
								<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7C8192]">
									<span className="inline-flex items-center gap-2">
										<FiMapPin className="text-[#E2BA51]" /> {job.location}
									</span>
									<span className="inline-flex items-center gap-2">
										<FiBriefcase className="text-[#E2BA51]" /> {job.department}
									</span>
									<span className="inline-flex items-center gap-2">
										<FiClock className="text-[#E2BA51]" /> {job.jobType}
									</span>
								</div>
							</div>

							{(job.minSalary || job.maxSalary) && (
								<div className="mt-6 grid gap-4 rounded-2xl bg-[#FBF7EE] p-5 md:grid-cols-2">
									{job.minSalary && (
										<div>
											<p className="text-xs text-[#8B91A0]">Min Salary</p>
											<p className="mt-1 font-heading text-[1.8rem] font-semibold text-[#1F2534]">
												${job.minSalary.toLocaleString()}
											</p>
										</div>
									)}
									{job.maxSalary && (
										<div>
											<p className="text-xs text-[#8B91A0]">Max Salary</p>
											<p className="mt-1 font-heading text-[1.8rem] font-semibold text-[#1F2534]">
												${job.maxSalary.toLocaleString()}
											</p>
										</div>
									)}
								</div>
							)}

							<section className="mt-7 space-y-7 text-[#707788]">
								{job.description && (
									<div>
										<h4 className="text-lg font-semibold text-[#1F2534]">
											Description
										</h4>
										<p className="mt-3 text-[15px] leading-7">
											{job.description}
										</p>
									</div>
								)}
								{job.responsibilities.length > 0 && (
									<div>
										<h4 className="text-lg font-semibold text-[#1F2534]">
											Responsibilities
										</h4>
										<ul className="mt-3 space-y-2 text-[15px] leading-7">
											{job.responsibilities.map((item, idx) => (
												<li key={`resp-${idx}`} className="flex gap-3">
													<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E2BA51]" />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
								)}
								{job.requirements.length > 0 && (
									<div>
										<h4 className="text-lg font-semibold text-[#1F2534]">
											Requirements
										</h4>
										<ul className="mt-3 space-y-2 text-[15px] leading-7">
											{job.requirements.map((item, idx) => (
												<li key={`req-${idx}`} className="flex gap-3">
													<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E2BA51]" />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
								)}
								{job.niceToHave && job.niceToHave.length > 0 && (
									<div>
										<h4 className="text-lg font-semibold text-[#1F2534]">
											Nice to Have
										</h4>
										<ul className="mt-3 space-y-2 text-[15px] leading-7">
											{job.niceToHave.map((item, idx) => (
												<li key={`nth-${idx}`} className="flex gap-3">
													<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E2BA51]" />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</section>
						</Modal.Body>

						<Modal.Footer className="border-t border-[#ECE8DF] px-0 pt-4">
							<Button
								className="h-11 w-full rounded-xl bg-[#E2BA51] font-semibold text-[#1F2534]"
								onPress={onClose}
							>
								Close
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}

export function DeleteJobModal({
	job,
	isOpen,
	onClose,
}: {
	job: JobResponseSchema | null;
	isOpen: boolean;
	onClose: () => void;
}) {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: (id: string) =>
			deleteApiJobsById({ path: { id }, throwOnError: true }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["jobs"] });
			toast.success("Job deleted successfully");
			onClose();
		},
		onError: (err: unknown) => {
			const message =
				err instanceof Error ? err.message : "Failed to delete job";
			toast.error(message);
		},
	});

	if (!job) return null;

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<Modal.Backdrop>
				<Modal.Container className="rounded-[24px] ">
					<Modal.Dialog className="bg-white">
						<Modal.CloseTrigger className="text-black bg-transparent" />
						<Modal.Header className="pt-6">
							<Modal.Icon className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF1F1] text-[#E94141]">
								<FiTrash2 />
							</Modal.Icon>
							<Modal.Heading className="font-heading text-[2rem] font-semibold text-[#1F2534]">
								Delete Job Posting
							</Modal.Heading>
						</Modal.Header>

						<Modal.Body className="pb-2 pt-3">
							<p className="text-[15px] leading-7 text-[#707788]">
								Are you sure you want to delete &ldquo;{job.title}&rdquo;? This
								action cannot be undone and will remove all associated
								applications.
							</p>
						</Modal.Body>

						<Modal.Footer className="grid grid-cols-2 gap-3 pt-4">
							<Button
								variant="outline"
								className="h-11 rounded-xl border-[#E5E1D8] bg-white font-semibold text-[#434959]"
								onPress={onClose}
								isDisabled={deleteMutation.isPending}
								fullWidth
							>
								Cancel
							</Button>
							<Button
								fullWidth
								className="h-11 rounded-xl bg-[#E62A25] font-semibold text-white"
								isDisabled={deleteMutation.isPending}
								onPress={() => deleteMutation.mutate(job.id)}
							>
								{deleteMutation.isPending ? "Deleting..." : "Delete"}
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
