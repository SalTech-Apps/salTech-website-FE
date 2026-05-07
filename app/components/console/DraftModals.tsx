import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "@heroui/react";
import { FiBriefcase, FiClock, FiMapPin } from "react-icons/fi";
import { deleteApiJobsById, type JobsListResponse } from "@/client";
import { JobStatusChip } from "@/components/console/ConsoleShared";
import { formatEnumLabel, formatRelativeDate } from "@/lib/consoleFormat";
import { apiErrorParser } from "@/lib/errorParser";
import toast from "react-hot-toast";

type DraftJob = JobsListResponse["data"][number];

export function DraftDetailsModal({
	draft,
	isOpen,
	onClose,
}: {
	draft: DraftJob | null;
	isOpen: boolean;
	onClose: () => void;
}) {
	if (!draft) return null;

	return (
		<Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
			<Modal.Backdrop>
				<Modal.Container size="lg" className="rounded-[26px]">
					<Modal.Dialog className="bg-white">
						<Modal.CloseTrigger className="bg-transparent text-black" />
						<Modal.Header className="border-b border-[#ECE8DF]">
							<Modal.Heading className="font-heading text-[2rem] font-semibold text-[#1F2534]">
								Job Details
							</Modal.Heading>
						</Modal.Header>
						<Modal.Body className="py-6">
							<JobStatusChip status={draft.status} />
							<h3 className="mt-4 font-heading text-[3rem] font-semibold leading-none text-[#1F2534]">
								{draft.title}
							</h3>
							<div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7C8192]">
								<span className="inline-flex items-center gap-2">
									<FiMapPin className="text-[#E2BA51]" /> {draft.location}
								</span>
								<span className="inline-flex items-center gap-2">
									<FiBriefcase className="text-[#E2BA51]" />
									{formatEnumLabel(draft.department)}
								</span>
								<span className="inline-flex items-center gap-2">
									<FiClock className="text-[#E2BA51]" />
									Updated {formatRelativeDate(draft.updatedAt)}
								</span>
							</div>
							<section className="mt-7 space-y-7 text-[#707788]">
								<div>
									<h4 className="text-lg font-semibold text-[#1F2534]">
										Description
									</h4>
									<p className="mt-3 text-[15px] leading-7">
										{draft.description}
									</p>
								</div>
								<div>
									<h4 className="text-lg font-semibold text-[#1F2534]">
										Responsibilities
									</h4>
									<ul className="mt-3 space-y-2 text-[15px] leading-7">
										{draft.responsibilities.map((item) => (
											<li key={item} className="flex gap-3">
												<span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#E2BA51]" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							</section>
						</Modal.Body>
						<Modal.Footer className="border-t border-[#ECE8DF] py-4">
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

export function DeleteDraftModal({
	draft,
	isOpen,
	onClose,
}: {
	draft: DraftJob | null;
	isOpen: boolean;
	onClose: () => void;
}) {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: async (jobId: string) => {
			await deleteApiJobsById({ path: { id: jobId }, throwOnError: true });
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["console-jobs"] });
			void queryClient.invalidateQueries({ queryKey: ["jobs"] });
			toast.success("Draft deleted successfully");
			onClose();
		},
		onError: (error) => {
			toast.error(apiErrorParser(error).message);
		},
	});

	if (!draft) return null;

	return (
		<Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
			<Modal.Backdrop>
				<Modal.Container size="sm" className="rounded-[24px]">
					<Modal.Dialog className="bg-white">
						<Modal.CloseTrigger className="bg-transparent text-black" />
						<Modal.Header className="pt-6">
							<Modal.Heading className="font-heading text-[2rem] font-semibold text-[#1F2534]">
								Delete Draft
							</Modal.Heading>
						</Modal.Header>
						<Modal.Body className="pb-2 pt-3">
							<p className="text-sm text-[#707788]">
								Delete "{draft.title}" draft?
							</p>
						</Modal.Body>
						<Modal.Footer className="grid grid-cols-2 gap-3 pt-4">
							<Button
								variant="outline"
								className="rounded-xl text-black"
								onPress={onClose}
								isDisabled={deleteMutation.isPending}
								fullWidth
							>
								Cancel
							</Button>
							<Button
								className="rounded-xl bg-[#E62A25] text-white"
								onPress={() => deleteMutation.mutate(draft.id)}
								isDisabled={deleteMutation.isPending}
								fullWidth
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
