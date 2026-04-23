import { WHY_SALTECH_ITEMS } from "@/data/saltechCareers";

export function WhySalTechSection() {
	return (
		<section className="bg-[#faf7ef] px-4 py-16 md:px-8 lg:px-12">
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<div className="mb-12 flex flex-col items-center gap-3 text-center">
					<p className="text-xs font-bold uppercase tracking-[0.12em] text-[#c99e2e]">
						WHY SALTECH
					</p>
					<h2 className="font-saltech-display text-3xl md:text-4xl font-normal tracking-tight text-[#111827]">
						What it's like to work here.
					</h2>
				</div>

				{/* Grid of cards */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
					{WHY_SALTECH_ITEMS.map((item) => (
						<div
							key={item.id}
							className="rounded-lg border border-[#E5E7EB] bg-white p-6 md:p-8 duration-300"
						>
							<h3 className="font-semibold text-lg text-[#111827] mb-2">
								{item.title}
							</h3>
							<p className="text-[#6b7280] leading-relaxed">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
