import { Button } from "@heroui/react";
import { Link } from "react-router";

export function AboutInterestedSection() {
	return (
		<section className="bg-[#faf6ef] pb-16 pt-4 sm:pb-24">
			<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
				<h2 className="font-heading text-heading-h2 text-[#111827]">
					Interested in working with us?
				</h2>
				<p className="mt-4 text-body text-[#4b5563]">
					Whether as a client, partner, or team member — we&apos;d like to hear
					from you.
				</p>
				<div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
					<Link to="/contact">
						<Button
							size="lg"
							className="rounded-xl bg-primary-gold font-body font-bold text-[#111827] hover:bg-soft-gold-hover-state"
						>
							Start a Project →
						</Button>
					</Link>
					<Link to="/team">
						<Button
							size="lg"
							variant="outline"
							className="rounded-xl border-[#E5E7EB] bg-transparent font-body font-semibold text-[#111827]"
						>
							Meet the Team
						</Button>
					</Link>
					<Link to="/careers">
						<Button
							size="lg"
							variant="outline"
							className="rounded-xl border-[#E5E7EB] bg-transparent font-body font-semibold text-[#111827]"
						>
							View Open Roles
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
