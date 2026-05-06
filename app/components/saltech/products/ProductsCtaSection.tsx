import { Link } from "react-router";
import { Button } from "@heroui/react";

export function ProductsCtaSection() {
	return (
		<section className="border-t border-[#e7e5e4] bg-[#faf6ef] py-16 sm:py-24">
			<div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
				<h2 className="font-heading text-heading-h2 text-[#111827]">
					Need a custom product built?
				</h2>
				<p className="mt-4 text-body text-[#4b5563]">
					Our products are available for white-label licensing, or we can build
					something entirely new for your use case.
				</p>
				<div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
					<Link to="/contact" prefetch="intent">
						<Button className="h-12 rounded-xl bg-[#E2BA51] font-body font-bold text-[#111827]">
							Start the Conversation
						</Button>
					</Link>
					<Link to="/services" prefetch="intent">
						<Button
							variant="secondary"
							className="h-12 rounded-xl border border-gray-300 bg-transparent font-body font-bold text-[#111827]"
						>
							See Our Services
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
