import type { ReactNode } from "react";
import { Link } from "react-router";
import { Card, CardContent, Chip } from "@heroui/react";
import type { IconType } from "react-icons";
import { SaltechIcon } from "@/assets/SaltechIcon";

type CandidateStatus =
	| "New"
	| "Under Review"
	| "Interview Scheduled"
	| "Accepted"
	| "Rejected";

type ApiApplicantStatus =
	| "NEW"
	| "UNDER_REVIEW"
	| "INTERVIEW_SCHEDULED"
	| "ACCEPTED"
	| "REJECTED";

type ApiJobStatus = "DRAFT" | "OPEN" | "CLOSED";

export function ConsoleBrand({ to = "/console" }: { to?: string }) {
	return (
		<Link
			to={to}
			prefetch="intent"
			className="focus:outline-none focus:ring-2 focus:ring-[#E5B751]/50 transition-opacity hover:opacity-90 inline-flex items-center gap-2"
			aria-label="SalTech Home"
		>
			<SaltechIcon />
			<p className="text-2xl font-extrabold">
				<span className="text-[#E2BA51]">Sal</span>
				<span className="text-[#404040]">Tech</span>
			</p>
		</Link>
	);
}

export function ConsolePageHeader({
	title,
	description,
	action,
}: {
	title: string;
	description: string;
	action?: ReactNode;
}) {
	return (
		<div className="flex flex-col gap-4 border-b border-[#E7E2D8] md:flex-row md:items-start md:justify-between">
			<div>
				<h1 className="font-heading text-[2.25rem] font-semibold leading-none text-[#1D2433]">
					{title}
				</h1>
				<p className="text-sm text-[#7C8192]">{description}</p>
			</div>
			{action}
		</div>
	);
}

export function ConsolePanel({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<Card
			className={`rounded-[22px] border border-[#E6E2D9] bg-white shadow-none ${className}`}
		>
			<CardContent className="p-0">{children}</CardContent>
		</Card>
	);
}

export function ConsoleStatCard({
	label,
	value,
	change,
	icon: Icon,
	tone,
}: {
	label: string;
	value: string | number;
	change?: string;
	icon: IconType;
	tone: "gold" | "green" | "blue" | "orange";
}) {
	const tones = {
		gold: "text-[#E4B13E]",
		green: "text-[#1D8A4D]",
		blue: "text-[#377DFF]",
		orange: "text-[#FF9800]",
	} as const;

	return (
		<ConsolePanel className="min-h-26">
			<div className="flex h-full flex-col gap-4 p-5">
				<div className="flex items-start justify-between">
					<p className="text-xs font-medium text-[#767B8A]">{label}</p>
					<Icon className={`text-lg ${tones[tone]}`} />
				</div>
				<div>
					<p className="font-heading text-4xl font-semibold leading-none text-[#1F2534]">
						{value}
					</p>
					{change && <p className="mt-3 text-xs text-[#1BA14C]">{change}</p>}
				</div>
			</div>
		</ConsolePanel>
	);
}

function toJobStatusLabel(status: ApiJobStatus | string): {
	label: string;
	base: string;
	content: string;
} {
	if (status === "OPEN" || status === "active") {
		return {
			label: "Active",
			base: "border-[#2FA55E] bg-[#E9F9EF]",
			content: "text-[#197844] text-xs font-medium",
		};
	}

	if (status === "DRAFT" || status === "draft") {
		return {
			label: "Draft",
			base: "border-[#B4BACA] bg-[#F7F8FB]",
			content: "text-[#6F7687] text-xs font-medium",
		};
	}

	return {
		label: "Closed",
		base: "border-[#E5E1D8] bg-[#FAF7F0]",
		content: "text-[#7C8192] text-xs font-medium",
	};
}

export function JobStatusChip({
	status,
	className = "",
}: {
	status: ApiJobStatus | string;
	className?: string;
}) {
	const chip = toJobStatusLabel(status);

	return (
		<Chip
			variant="secondary"
			className={`rounded-full ${chip.base} ${className}`}
		>
			<span className={chip.content}>{chip.label}</span>
		</Chip>
	);
}

function normalizeCandidateStatus(
	stage: CandidateStatus | ApiApplicantStatus | string,
): CandidateStatus {
	if (stage === "NEW" || stage === "New") return "New";
	if (stage === "UNDER_REVIEW" || stage === "Under Review") {
		return "Under Review";
	}
	if (stage === "INTERVIEW_SCHEDULED" || stage === "Interview Scheduled") {
		return "Interview Scheduled";
	}
	if (stage === "ACCEPTED" || stage === "Accepted") return "Accepted";
	if (stage === "REJECTED" || stage === "Rejected") return "Rejected";
	return "New";
}

export function CandidateStageChip({
	stage,
}: {
	stage: CandidateStatus | ApiApplicantStatus | string;
}) {
	const normalized = normalizeCandidateStatus(stage);
	const styles: Record<CandidateStatus, string> = {
		"Under Review": "border-[#FFB22C] bg-[#FFF7E8] text-[#D98900]",
		"Interview Scheduled": "border-[#46B56F] bg-[#E8F8EC] text-[#1B8A45]",
		New: "border-[#4C86FF] bg-[#EEF4FF] text-[#2B67E6]",
		Accepted: "border-[#29A468] bg-[#EAF9F1] text-[#177A4B]",
		Rejected: "border-[#FF5A5A] bg-[#FFF0F0] text-[#DA2E2E]",
	};

	return (
		<Chip variant="secondary" className={`rounded-full ${styles[normalized]}`}>
			<span className="text-xs font-medium">{normalized}</span>
		</Chip>
	);
}

export function TableShell({ children }: { children: ReactNode }) {
	return (
		<ConsolePanel>
			<div className="overflow-hidden rounded-[22px]">{children}</div>
		</ConsolePanel>
	);
}

export function EmptyCell({ children }: { children: ReactNode }) {
	return <span className="text-sm text-[#8D92A1]">{children}</span>;
}
