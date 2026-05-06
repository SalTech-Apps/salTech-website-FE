import { Link } from "react-router";
import { Button } from "@heroui/react";

export function CaseStudiesCtaSection() {
	return (
		<section className="border-t border-[#e7e5e4] bg-[#faf6ef] py-16 sm:py-24">
			<div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8 flex flex-col items-center gap-6">
				<h2 className="font-heading text-heading-h2 text-[#111827]">
					Want results like these?
				</h2>
				<p className="text-body text-[#4b5563]">
					Most of our best projects started with a founder who just wanted to
					talk through the problem.
				</p>
				<Link to="/contact" prefetch="intent">
					<Button
						size="lg"
						className="rounded-xl bg-[#E2BA51] font-body font-bold text-[#111827] hover:bg-soft-gold-hover-state"
					>
						Book a 20-Min Call
					</Button>
				</Link>
			</div>
		</section>
	);
}
