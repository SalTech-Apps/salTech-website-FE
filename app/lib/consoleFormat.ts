import { formatDistanceToNow } from "date-fns";

export function formatEnumLabel(value: string): string {
	return value
		.toLowerCase()
		.split("_")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export function formatRelativeDate(value?: string): string {
	if (!value) return "Unknown";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Unknown";
	return formatDistanceToNow(date, { addSuffix: true });
}

export function toCandidateLabel(status: string): string {
	if (status === "NEW") return "New";
	if (status === "UNDER_REVIEW") return "Under Review";
	if (status === "INTERVIEW_SCHEDULED") return "Interview Scheduled";
	if (status === "ACCEPTED") return "Accepted";
	if (status === "REJECTED") return "Rejected";
	return "New";
}
