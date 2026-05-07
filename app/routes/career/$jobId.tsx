import { useParams } from "react-router";
import { JobDetail } from "@/components/saltech/career";
import { buildMetaTags } from "@/lib/seo";

// eslint-disable-next-line react-refresh/only-export-components
export function meta({ location }: { location: { pathname: string } }) {
	return buildMetaTags({
		title: "Career Opportunity · Careers",
		description:
			"Explore this role at SalTech and apply to join our team building digital infrastructure for Africa.",
		path: location.pathname,
	});
}

export default function JobDetailPage() {
	const { jobId } = useParams();

	if (!jobId) {
		return <div>Job not found</div>;
	}

	return <JobDetail jobId={jobId} />;
}
