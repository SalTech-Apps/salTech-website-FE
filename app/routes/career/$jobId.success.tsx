import { useParams } from "react-router";
import { ApplicationSuccess } from "@/components/saltech/career";
import { JOB_OPENINGS } from "@/data/saltechCareers";
import { buildMetaTags } from "@/lib/seo";

export function meta({
	params,
	location,
}: {
	params: { jobId: string };
	location: { pathname: string };
}) {
	return buildMetaTags({
		title: "Application Submitted · Careers",
		description: "Thank you for submitting your application to SalTech.",
		path: location.pathname,
		noindex: true,
	});
}

export default function ApplicationSuccessPage() {
	const { jobId } = useParams();
	const job = JOB_OPENINGS.find((j) => j.id === jobId);

	return <ApplicationSuccess jobTitle={job?.title} />;
}
