import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getApiJobs } from "@/client";
import { Button, Chip } from "@heroui/react";

type CareerOpening = {
	id: string;
	title: string;
	location: string;
	type: string;
	department: string;
	status: string;
};

export function CurrentOpeningsSection() {
	const navigate = useNavigate();

	const jobsQuery = useQuery({
		queryKey: ["career-open-jobs"],
		queryFn: async () => {
			const { data } = await getApiJobs({ throwOnError: true });
			return data.data;
		},
	});

	const openings = useMemo<CareerOpening[]>(() => {
		const apiJobs = jobsQuery.data ?? [];
		return apiJobs
			.filter((job) => job.status === "OPEN")
			.map((job) => ({
				id: job.id,
				title: job.title,
				location: job.location,
				type: job.jobType.replaceAll("_", " "),
				department: job.department,
				status: "hiring_now",
			}));
	}, [jobsQuery.data]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "hiring_now":
				return "bg-[#F0FDF4] text-[#166534] border-[#166534]";
			case "new":
				return "bg-[#E2BA511A] text-[#C99E2E] border-[#C99E2E]";
			default:
				return "bg-[#f3f4f6] text-[#6b7280]";
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case "hiring_now":
				return "Hiring Now";
			case "new":
				return "New";
			default:
				return "Open";
		}
	};

	return (
		<section id="openings" className="bg-[#FAF7EF] px-4 py-16 md:px-8 lg:px-12">
			<div className="mx-auto max-w-6xl">
				<div className="mb-12 flex flex-col items-start gap-3">
					<p className="text-xs font-bold uppercase tracking-[0.12em] text-[#c99e2e]">
						OPEN POSITIONS
					</p>
					<h2 className="font-saltech-display text-3xl md:text-4xl font-normal tracking-tight text-[#111827]">
						Current openings.
					</h2>
					<p className="max-w-2xl text-[#6b7280]">
						We hire for craft and context. If you know your domain and care
						about the outcome, we want to hear from you.
					</p>
				</div>

				<div className="space-y-4">
					{jobsQuery.isLoading &&
						Array.from({ length: 3 }).map((_, index) => (
							<div
								key={`skeleton-${index}`}
								className="rounded-2xl border border-[#e5e7eb] p-6 md:p-8"
							>
								<div className="h-5 w-1/2 animate-pulse rounded bg-[#EFE8D8]" />
								<div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-[#F4EEE0]" />
								<div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-[#F4EEE0]" />
							</div>
						))}

					{openings.map((job) => (
						<div
							key={job.id}
							className="group rounded-2xl border border-[#e5e7eb] p-6 md:p-8 transition-all duration-300 cursor-pointer"
							onClick={() => navigate(`/career/${job.id}`)}
						>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-3">
										<h3 className="text-lg font-semibold text-[#111827] group-hover:text-[#c99e2e] transition-colors">
											{job.title}
										</h3>
									</div>

									<div className="flex flex-wrap gap-3 text-sm text-[#6b7280]">
										<span className="flex items-center gap-1">
											<span className="text-[#c99e2e]">📍</span> {job.location}
										</span>
										<span className="flex items-center gap-1">
											<span className="text-[#c99e2e]">💼</span> {job.type}
										</span>
										<span className="text-[#9ca3af]">{job.department}</span>
										<Chip
											className={`text-xs font-medium rounded-full border ${getStatusColor(job.status)}`}
										>
											{getStatusLabel(job.status)}
										</Chip>
									</div>
								</div>

								<div className="shrink-0">
									<button
										className="inline-flex items-center px-6 py-3 bg-[#E2BA51] text-[#111827] font-semibold rounded-lg transition-all duration-300 whitespace-nowrap group-hover:translate-x-1"
										onClick={(e) => {
											e.stopPropagation();
											navigate(`/career/${job.id}`);
										}}
									>
										Apply
										<svg
											className="w-4 h-4 ml-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 7l5 5m0 0l-5 5m5-5H6"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					))}
					{jobsQuery.isError && (
						<div className="rounded-2xl border border-[#F9CACA] bg-[#FFF5F5] p-6 text-sm text-[#B42318]">
							Unable to load jobs right now. Please try again shortly.
						</div>
					)}
					{!jobsQuery.isLoading &&
						!jobsQuery.isError &&
						openings.length === 0 && (
							<div className="rounded-2xl border border-[#e5e7eb] p-6 text-sm text-[#6b7280]">
								No open positions are available at the moment.
							</div>
						)}
				</div>

				<div className="mt-12 rounded-2xl border border-[#C99E2E] bg-[#E2BA511A] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					<div>
						<h3 className="font-semibold text-lg text-[#111827] mb-2">
							Don't see your role?
						</h3>
						<p className="text-[#6b7280] mb-4">
							If you're exceptional at what you do — send us a note anyway. We
							read every email.
						</p>
					</div>
					<Button
						className="inline-flex items-center rounded-xl bg-[#E2BA51] px-6 py-3 font-semibold text-[#111827] transition-all duration-300 hover:bg-[#d4a84a]"
					>
						Send an Open Application
						<svg
							className="w-4 h-4 ml-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</Button>
				</div>
			</div>
		</section>
	);
}
