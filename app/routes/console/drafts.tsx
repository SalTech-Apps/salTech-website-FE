import { Link, useSearchParams } from "react-router-dom";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/react";
import {
	FiEye,
	FiEdit2,
	FiTrash2,
	FiPlus,
	FiMapPin,
	FiClock,
	FiBriefcase,
	FiX,
} from "react-icons/fi";
import {
	ConsolePageHeader,
	JobStatusChip,
	TableShell,
} from "@/components/console/ConsoleShared";
import { CONSOLE_JOBS, getConsoleJob } from "@/data/consoleDashboard";

export default function ConsoleDraftsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const drafts = CONSOLE_JOBS.filter((job) => job.status === "draft");
	const viewedDraft = getConsoleJob(searchParams.get("view") ?? undefined);

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

				<TableShell>
					<div className="grid grid-cols-[minmax(0,1.6fr)_1fr_1fr_1fr_0.8fr] gap-4 bg-[#FBF7EE] px-5 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
						<span>Job Title</span>
						<span>Department</span>
						<span>Location</span>
						<span>Last Modified</span>
						<span>Actions</span>
					</div>
					<div className="divide-y divide-[#ECE8DF]">
						{drafts.map((job) => (
							<div
								key={job.id}
								className="grid grid-cols-[minmax(0,1.6fr)_1fr_1fr_1fr_0.8fr] gap-4 px-5 py-5 text-sm text-[#5F6677]"
							>
								<div className="font-medium text-[#1F2534]">{job.title}</div>
								<div>{job.department}</div>
								<div>{job.location}</div>
								<div>{job.modified}</div>
								<div className="flex items-center gap-4 text-[#818797]">
									<Link
										to={`?view=${job.id}`}
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
									<button
										type="button"
										className="hover:text-[#E62A25]"
										aria-label={`Delete ${job.title}`}
									>
										<FiTrash2 />
									</button>
								</div>
							</div>
						))}
					</div>
				</TableShell>
			</div>

			<Modal
				isOpen={!!viewedDraft}
				onOpenChange={(open) => !open && setSearchParams(new URLSearchParams())}
				size="4xl"
				backdrop="blur"
				classNames={{ base: "rounded-[26px] bg-white", closeButton: "hidden" }}
			>
				<ModalContent>
					{() =>
						viewedDraft ? (
							<>
								<ModalHeader className="flex items-center justify-between border-b border-[#ECE8DF] px-8 py-6">
									<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
										Job Details
									</h2>
									<button
										type="button"
										onClick={() => setSearchParams(new URLSearchParams())}
										className="text-[#7D8291]"
									>
										<FiX className="text-2xl" />
									</button>
								</ModalHeader>
								<ModalBody className="px-8 py-6">
									<JobStatusChip status={viewedDraft.status} />
									<h3 className="mt-4 font-heading text-[3rem] font-semibold leading-none text-[#1F2534]">
										{viewedDraft.title}
									</h3>
									<div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7C8192]">
										<span className="inline-flex items-center gap-2">
											<FiMapPin className="text-[#E2BA51]" />{" "}
											{viewedDraft.location}
										</span>
										<span className="inline-flex items-center gap-2">
											<FiBriefcase className="text-[#E2BA51]" />{" "}
											{viewedDraft.department}
										</span>
										<span className="inline-flex items-center gap-2">
											<FiClock className="text-[#E2BA51]" /> {viewedDraft.type}
										</span>
									</div>
									<div className="mt-6 grid gap-4 rounded-2xl bg-[#FBF7EE] p-5 md:grid-cols-3">
										<div>
											<p className="text-xs text-[#8B91A0]">Total Applicants</p>
											<p className="mt-1 font-heading text-[2rem] font-semibold text-[#1F2534]">
												{viewedDraft.applicants}
											</p>
										</div>
										<div>
											<p className="text-xs text-[#8B91A0]">Posted</p>
											<p className="mt-2 text-sm font-semibold text-[#434959]">
												{viewedDraft.posted}
											</p>
										</div>
										<div className="text-left md:text-right">
											<p className="text-xs text-[#8B91A0]">Views</p>
											<p className="mt-2 text-sm font-semibold text-[#434959]">
												{viewedDraft.views}
											</p>
										</div>
									</div>
									<section className="mt-7 space-y-7 text-[#707788]">
										<div>
											<h4 className="text-lg font-semibold text-[#1F2534]">
												Description
											</h4>
											<p className="mt-3 text-[15px] leading-7">
												{viewedDraft.description}
											</p>
										</div>
										<div>
											<h4 className="text-lg font-semibold text-[#1F2534]">
												Responsibilities
											</h4>
											<ul className="mt-3 space-y-2 text-[15px] leading-7">
												{viewedDraft.responsibilities.map((item) => (
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
												{viewedDraft.requirements.map((item) => (
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
										onPress={() => setSearchParams(new URLSearchParams())}
									>
										Close
									</Button>
								</ModalFooter>
							</>
						) : null
					}
				</ModalContent>
			</Modal>
		</>
	);
}
