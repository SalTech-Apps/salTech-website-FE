import { FiBriefcase } from "react-icons/fi";
import { HiOutlineBriefcase, HiOutlineUserGroup } from "react-icons/hi";
import { LuUserRoundPlus } from "react-icons/lu";
import {
	CandidateStageChip,
	ConsolePageHeader,
	ConsolePanel,
	ConsoleStatCard,
} from "@/components/console/ConsoleShared";
import {
	CANDIDATE_APPLICATIONS,
	DASHBOARD_OVERVIEW,
	getJobTitle,
} from "@/data/consoleDashboard";

export default function ConsoleDashboardPage() {
	return (
		<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-8">
			<ConsolePageHeader
				title="Dashboard"
				description="Overview of your hiring pipeline"
			/>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<ConsoleStatCard
					label="Total Jobs"
					value={DASHBOARD_OVERVIEW.totalJobs}
					change="+2 this month"
					icon={HiOutlineBriefcase}
					tone="gold"
				/>
				<ConsoleStatCard
					label="Active Jobs"
					value={DASHBOARD_OVERVIEW.activeJobs}
					change="80% active rate"
					icon={FiBriefcase}
					tone="green"
				/>
				<ConsoleStatCard
					label="Total Applicants"
					value={DASHBOARD_OVERVIEW.totalApplicants}
					change="+12 this week"
					icon={HiOutlineUserGroup}
					tone="blue"
				/>
				<ConsoleStatCard
					label="New This Week"
					value={DASHBOARD_OVERVIEW.newThisWeek}
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
					{CANDIDATE_APPLICATIONS.map((application) => (
						<div
							key={application.id}
							className="grid gap-3 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
						>
							<div>
								<p className="text-base font-semibold text-[#1F2534]">
									{application.name}
								</p>
								<p className="mt-1 text-sm text-[#8A90A0]">
									Applied for {getJobTitle(application.positionId)}
								</p>
							</div>
							<div className="flex flex-col items-start gap-2 text-left md:items-end md:text-right">
								<CandidateStageChip stage={application.stage} />
								<p className="text-sm text-[#B1B6C3]">{application.date}</p>
							</div>
						</div>
					))}
				</div>
			</ConsolePanel>
		</div>
	);
}
