"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { JOB_OPENINGS, type JobOpening } from "@/data/saltechCareers";
import { getApiJobsById } from "@/client";
import { MultiStepApplicationForm } from "./MultiStepApplicationForm";
import { Button, Chip, Separator } from "@heroui/react";
import {
	FiBookmark,
	FiBriefcase,
	FiClock,
	FiMapPin,
	FiShare2,
} from "react-icons/fi";

interface JobDetailProps {
	jobId: string;
}

type JobDetailView = {
	id: string;
	title: string;
	department: string;
	location: string;
	type: string;
	status: string;
	posted: string;
	aboutRole: string;
	whatYouWillDo: string[];
	whatWeAreLookingFor: string[];
	niceToHave: string[];
	benefits: Array<{ title: string; description: string }>;
};

const DEFAULT_BENEFITS: JobDetailView["benefits"] = [
	{
		title: "Competitive Salary",
		description: "Market-rate compensation aligned with role scope.",
	},
	{
		title: "Remote-First",
		description:
			"Flexible location with collaboration across distributed teams.",
	},
	{
		title: "Learning Budget",
		description:
			"Support for courses, conferences, and professional development.",
	},
];

function formatEnumLabel(value: string): string {
	return value
		.toLowerCase()
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function toPostedDate(value: string): string {
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) return "Recently posted";
	return formatDistanceToNow(parsed, { addSuffix: true });
}

export function JobDetail({ jobId }: JobDetailProps) {
	const navigate = useNavigate();
	const [showApplicationForm, setShowApplicationForm] = useState(false);
	const staticJob = JOB_OPENINGS.find((j) => j.id === jobId) as
		| JobOpening
		| undefined;

	const apiJobQuery = useQuery({
		queryKey: ["career-job", jobId],
		queryFn: async () => {
			const response = await getApiJobsById({
				path: { id: jobId },
				throwOnError: true,
			});
			return response.data.data;
		},
		enabled: !staticJob,
	});

	const job: JobDetailView | null = (() => {
		if (apiJobQuery.data) {
			const apiJob = apiJobQuery.data;
			return {
				id: apiJob.id,
				title: apiJob.title,
				department: formatEnumLabel(apiJob.department),
				location: apiJob.location,
				type: formatEnumLabel(apiJob.jobType),
				status: formatEnumLabel(apiJob.status),
				posted: toPostedDate(apiJob.createdAt),
				aboutRole: apiJob.description,
				whatYouWillDo:
					apiJob.responsibilities.length > 0
						? apiJob.responsibilities
						: [apiJob.description],
				whatWeAreLookingFor:
					apiJob.requirements.length > 0
						? apiJob.requirements
						: ["Experience delivering quality outcomes in similar roles."],
				niceToHave:
					apiJob.niceToHave.length > 0
						? apiJob.niceToHave
						: ["Strong communication and collaboration skills."],
				benefits: DEFAULT_BENEFITS,
			};
		}

		if (staticJob) {
			return {
				id: staticJob.id,
				title: staticJob.title,
				department: staticJob.department,
				location: staticJob.location,
				type: staticJob.type,
				status: formatEnumLabel(staticJob.status),
				posted: staticJob.posted,
				aboutRole: staticJob.aboutRole,
				whatYouWillDo: [...staticJob.whatYouWillDo],
				whatWeAreLookingFor: [...staticJob.whatWeAreLookingFor],
				niceToHave: [...staticJob.niceToHave],
				benefits: staticJob.benefits.map((benefit) => ({
					title: benefit.title,
					description: benefit.description,
				})),
			};
		}

		return null;
	})();

	if (apiJobQuery.isLoading && !job) {
		return (
			<div className="flex min-h-screen items-center justify-center px-4">
				<p className="text-sm text-[#6b7280]">Loading job details...</p>
			</div>
		);
	}

	if (!job) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen px-4">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-[#111827] mb-4">
						Job Not Found
					</h1>
					<p className="text-[#6b7280] mb-8">
						Sorry, the job you're looking for doesn't exist.
					</p>
					<Button
						onPress={() => navigate("/career")}
						className="rounded-xl bg-[#c99e2e] text-[#111827] hover:bg-[#d4a84a]"
					>
						Back to Careers
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<MultiStepApplicationForm
				jobTitle={job.title}
				jobId={job.id}
				isOpen={showApplicationForm}
				onOpenChange={setShowApplicationForm}
			/>
			{/* <div className="border-b border-[#e5e7eb] p-4 md:p-6">
				<button
					onClick={() => navigate("/career")}
					className="flex items-center gap-2 text-[#6b7280] hover:text-[#111827] transition-colors"
				>
					<span>←</span> Back to Job Listings
				</button>
			</div> */}

			{/* Header */}
			<div className="bg-linear-to-br from-[#0f1419] to-[#1a2332] text-white px-4 md:px-8 lg:px-12 py-12 md:py-16">
				<div className="max-w-5xl container mx-auto">
					<div className="flex flex-wrap gap-3 mb-4">
						<Chip className="px-3 py-1 bg-[#E2BA511A] text-[#E2BA51] text-xs font-semibold">
							{job.department}
						</Chip>
						<Chip className="px-3 py-1 bg-[#166534] text-[#4ADE80] text-xs font-medium">
							{job.status}
						</Chip>
					</div>

					<h1 className="text-4xl md:text-5xl font-bold mb-4">{job.title}</h1>

					<div className="flex items-center flex-wrap gap-4">
						<div className="flex items-center gap-1.5">
							<FiMapPin className="text-[#E2BA51]" />
							<span className="text-[#9CA3AF]">{job.location}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<FiBriefcase className="text-[#E2BA51]" />
							<span className="text-[#9CA3AF]">{job.type}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<FiClock className="text-[#E2BA51]" />
							<span className="text-[#9CA3AF]">{job.posted}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="container mx-auto max-w-6xl px-4 md:px-8 lg:px-12 py-12 md:py-16">
				<div className="grid lg:grid-cols-3 gap-12">
					{/* Left column - Main content */}
					<div className="lg:col-span-2 space-y-12">
						{/* About the Role */}
						<section>
							<h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
								About the Role
							</h2>
							<p className="text-[#6b7280] leading-relaxed">{job.aboutRole}</p>
						</section>

						{/* What You'll Do */}
						<section>
							<h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
								What You'll Do
							</h2>
							<ul className="space-y-3">
								{job.whatYouWillDo.map((item, idx) => (
									<li key={idx} className="flex gap-3 text-[#6b7280]">
										<span className="text-[#c99e2e] font-bold mt-1">•</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</section>

						{/* What We're Looking For */}
						<section>
							<h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
								What We're Looking For
							</h2>
							<ul className="space-y-3">
								{job.whatWeAreLookingFor.map((item, idx) => (
									<li key={idx} className="flex gap-3 text-[#6b7280]">
										<span className="text-[#c99e2e] font-bold mt-1">•</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</section>

						{/* Nice to Have */}
						<section>
							<h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
								Nice to Have
							</h2>
							<ul className="space-y-3">
								{job.niceToHave.map((item, idx) => (
									<li key={idx} className="flex gap-3 text-[#6b7280]">
										<span className="text-[#c99e2e] font-bold mt-1">•</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</section>
					</div>

					<div className="lg:col-span-1">
						<div className="rounded-lg px-6 py-4 border border-[#E5E7EB] sticky">
							<div className="flex flex-col gap-4">
								<Button
									size="lg"
									onPress={() => setShowApplicationForm(true)}
									className="w-full bg-[#E2BA51] text-[#111827] rounded-xl"
								>
									Apply for this Position
								</Button>
								<div className="grid grid-cols-2 gap-3">
									<Button
										className="rounded-xl border border-[#E5E7EB] bg-transparent text-[#374151]"
									>
										<FiBookmark /> Save
									</Button>
									<Button
										className="rounded-xl border border-[#E5E7EB] bg-transparent text-[#374151]"
									>
										<FiShare2 /> Share
									</Button>
								</div>
								<Separator />
								<h3 className="text-lg font-bold text-[#111827]">
									Job Summary
								</h3>

								<div className="space-y-3">
									<div>
										<p className="text-xs font-semibold text-[#9CA3AF]">
											Location
										</p>
										<p className="text-[#111827]">{job.location}</p>
									</div>

									<div>
										<p className="text-xs font-semibold text-[#9CA3AF]">
											Job Type
										</p>
										<p className="text-[#111827]">{job.type}</p>
									</div>

									<div>
										<p className="text-xs font-semibold text-[#9CA3AF]">
											Department
										</p>
										<p className="text-[#111827]">{job.department}</p>
									</div>

									<div>
										<p className="text-xs font-semibold text-[#9CA3AF]">
											Posted
										</p>
										<p className="text-[#111827]">{job.posted}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<section className="mt-16">
					<h2 className="text-3xl font-bold text-[#111827] mb-10">
						Benefits & Perks
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{job.benefits.map((benefit, idx) => (
							<div
								key={idx}
								className="bg-white rounded-lg border border-[#e5e7eb] p-6 flex flex-col gap-4"
							>
								<div className="bg-[#E2BA511A] h-10 w-10 rounded-lg flex items-center justify-center">
									<div className="bg-[#E2BA51] h-5 w-5 rounded"></div>
								</div>
								<div>
									{" "}
									<h3 className="font-semibold text-[#111827] mb-2">
										{benefit.title}
									</h3>
									<p className="text-sm text-[#6b7280]">
										{benefit.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
