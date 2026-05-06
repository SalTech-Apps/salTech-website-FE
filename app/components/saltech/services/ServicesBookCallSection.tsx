import { Link } from "react-router";
import { Button } from "@heroui/react";

export function ServicesBookCallSection() {
	return (
		<section className="border-t border-[#e7e5e4] bg-[#faf6ef] py-16 sm:py-24">
			<div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8 flex flex-col items-center gap-6">
				<h2 className="font-heading text-heading-h2 text-[#111827]">
					Not sure which service fits?
				</h2>
				<p className="text-body text-[#4b5563]">
					Tell us the problem. We&apos;ll match the right capability to it — no
					upsell, no bloat.
				</p>
				<Link to="/contact" prefetch="intent">
					<Button
						size="lg"
						className="h-12 rounded-xl bg-[#E2BA51] font-body font-bold text-[#111827]"
					>
						Book a Free Scoping Call
					</Button>
				</Link>
			</div>
		</section>
	);
}
