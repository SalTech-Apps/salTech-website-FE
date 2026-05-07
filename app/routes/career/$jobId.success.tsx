import { useParams } from "react-router";
import { ApplicationSuccess } from "@/components/saltech/career";
import { JOB_OPENINGS } from "@/data/saltechCareers";
import { buildMetaTags } from "@/lib/seo";

export function meta({
	location,
}: {
	location: { pathname: string };
}) {
	return [
		...buildMetaTags({
		title: "Application Submitted · Careers",
		description: "Thank you for submitting your application to SalTech.",
		path: location.pathname,
		}),
		{ name: "robots", content: "noindex, nofollow" },
	];
}

export default function ApplicationSuccessPage() {
	const { jobId } = useParams();
	const job = JOB_OPENINGS.find((j) => j.id === jobId);

	return <ApplicationSuccess jobTitle={job?.title} />;
}
