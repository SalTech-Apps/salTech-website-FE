import { useParams } from "react-router";
import { JobDetail } from "@/components/saltech/career";
import { JOB_OPENINGS } from "@/data/saltechCareers";
import { buildMetaTags } from "@/lib/seo";

export function meta({
	params,
	location,
}: {
	params: { jobId: string };
	location: { pathname: string };
}) {
	const job = JOB_OPENINGS.find((j) => j.id === params.jobId);

	return buildMetaTags({
		title: job ? `${job.title} · Careers` : "Job Not Found",
		description: job
			? job.description
			: "The job you're looking for doesn't exist.",
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
