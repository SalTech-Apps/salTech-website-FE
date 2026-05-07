import { FiBriefcase } from "react-icons/fi";
import { HiOutlineBriefcase, HiOutlineUserGroup } from "react-icons/hi";
import { LuUserRoundPlus } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import {
	CandidateStageChip,
	ConsolePageHeader,
	ConsolePanel,
	ConsoleStatCard,
} from "@/components/console/ConsoleShared";
import { getStats } from "@/api/admin";

export default function ConsoleDashboardPage() {
	const dashboardQuery = useQuery({
		queryKey: ["console-dashboard"],
		queryFn: () => getStats(),
	});

	const overview = dashboardQuery.data;
	const recentApplications = overview?.recentApplications ?? [];

	return (
		<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-2">
			<ConsolePageHeader
				title="Dashboard"
				description="Overview of your hiring pipeline"
			/>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<ConsoleStatCard
					label="Total Jobs"
					value={overview?.totalJobs ?? 0}
					change="+2 this month"
					icon={HiOutlineBriefcase}
					tone="gold"
				/>
				<ConsoleStatCard
					label="Active Jobs"
					value={overview?.activeJobs ?? 0}
					change="80% active rate"
					icon={FiBriefcase}
					tone="green"
				/>
				<ConsoleStatCard
					label="Total Applicants"
					value={overview?.totalApplicants ?? 0}
					change="+12 this week"
					icon={HiOutlineUserGroup}
					tone="blue"
				/>
				<ConsoleStatCard
					label="New This Week"
					value={overview?.newThisWeek ?? 0}
					change="+25% from last week"
					icon={LuUserRoundPlus}
					tone="orange"
				/>
			</div>

			<ConsolePanel>
				<div className="border-b border-[#ECE8DF] px-6 py-5">
					<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
						Recent Applications
					</h2>
				</div>
				<div className="divide-y divide-[#ECE8DF] px-6">
					{recentApplications.map((application) => (
						<div
							key={application.id}
							className="grid gap-3 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
						>
							<div>
								<p className="text-base font-semibold text-[#1F2534]">
									{application.fullName}
								</p>
								<p className="mt-1 text-sm text-[#8A90A0]">
									Applied for {application.position}
								</p>
							</div>
							<div className="flex flex-col items-start gap-2 text-left md:items-end md:text-right">
								<CandidateStageChip stage={application.statusLabel} />
								<p className="text-sm text-[#B1B6C3]">
									{application.appliedDate}
								</p>
							</div>
						</div>
					))}
					{recentApplications.length === 0 && (
						<div className="py-5 text-sm text-[#8A90A0]">
							No recent applications yet.
						</div>
					)}
				</div>
			</ConsolePanel>
		</div>
	);
}
