import { useNavigate } from "react-router";
import { Button } from "@heroui/react";

interface ApplicationSuccessProps {
	jobTitle?: string;
}

export function ApplicationSuccess({ jobTitle }: ApplicationSuccessProps) {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
			<div className="text-center max-w-2xl">
				{/* Success icon */}
				<div className="mb-8 flex justify-center">
					<div className="w-20 h-20 rounded-full bg-[#d1fae5] flex items-center justify-center">
						<svg
							className="w-10 h-10 text-[#10b981]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={3}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				</div>

				{/* Heading */}
				<h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
					Application Submitted!
				</h1>

				{/* Message */}
				<p className="text-lg text-[#6b7280] mb-8">
					Thank you for applying to SalTech. We've received your application for
					the{" "}
					<span className="font-semibold text-[#111827]">
						{jobTitle || "position"}
					</span>
					.
				</p>

				{/* Info box */}
				<div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-lg p-6 md:p-8 mb-8">
					<h3 className="text-lg font-semibold text-[#111827] mb-4">
						What happens next?
					</h3>
					<ul className="text-left space-y-3 text-[#6b7280]">
						<li className="flex gap-3">
							<span className="text-[#c99e2e] font-bold">•</span>
							<span>
								Our hiring team will review your application within 3-5 business
								days
							</span>
						</li>
						<li className="flex gap-3">
							<span className="text-[#c99e2e] font-bold">•</span>
							<span>
								If your profile matches our requirements, we'll reach out to
								schedule an initial conversation
							</span>
						</li>
						<li className="flex gap-3">
							<span className="text-[#c99e2e] font-bold">•</span>
							<span>
								We'll keep you updated on your application status via email at{" "}
								<span className="font-mono text-sm">akanji@gmail.com</span>
							</span>
						</li>
					</ul>
				</div>

				{/* Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						onClick={() => navigate("/career")}
						className="bg-[#c99e2e] text-[#111827] hover:bg-[#d4a84a] font-semibold px-8 py-3 h-auto"
					>
						Back to Careers
					</Button>
					<Button
						onClick={() => navigate("/")}
						className="border border-[#e5e7eb] text-[#111827] hover:bg-[#f9fafb] font-semibold px-8 py-3 h-auto"
						variant="bordered"
					>
						Back to Home
					</Button>
				</div>

				{/* Footer note */}
				<p className="text-sm text-[#9ca3af] mt-8">
					Questions? Email us at{" "}
					<a
						href="mailto:careers@saltech.com"
						className="text-[#c99e2e] hover:underline"
					>
						careers@saltech.com
					</a>
				</p>
			</div>
		</div>
	);
}
