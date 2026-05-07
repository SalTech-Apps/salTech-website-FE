import {
	SALTECH_PRODUCTS,
	SALTECH_PRODUCTS_PORTFOLIO_EYEBROW,
	SALTECH_PRODUCTS_PORTFOLIO_HEADING,
	SALTECH_PRODUCTS_PORTFOLIO_SUB,
} from "@/data/saltechProducts";

export function ProductsPortfolioSection() {
	return (
		<section className="bg-white py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-buttons uppercase tracking-widest text-primary-gold">
						{SALTECH_PRODUCTS_PORTFOLIO_EYEBROW}
					</p>
					<h2 className="mt-4 font-heading text-heading-h2 text-[#111827]">
						{SALTECH_PRODUCTS_PORTFOLIO_HEADING}
					</h2>
					<p className="mt-4 text-body text-[#4b5563]">
						{SALTECH_PRODUCTS_PORTFOLIO_SUB}
					</p>
				</div>

				<ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{SALTECH_PRODUCTS.map((product) => (
						<li
							key={product.id}
							className="flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition-shadow"
						>
							<div className="relative aspect-16/10 overflow-hidden bg-[#f3f4f6]">
								<img
									src={product.imageSrc}
									alt=""
									className={`h-full w-full object-cover rotate-8 ${product.comingSoon ? "grayscale" : ""}`}
									loading="lazy"
								/>
								{product.industryTags.map((tag) => (
									<span className="absolute z-10 bottom-3 left-3 rounded-lg border border-[#e5e7eb] bg-white px-2.5 py-1.5 text-xs font-bold text-[#111827]">
										{tag.label}
									</span>
								))}
							</div>
							<div className="flex flex-1 flex-col gap-3 p-6">
								<h3 className="font-heading text-xl font-semibold text-[#111827]">
									{product.title}
								</h3>
								<p className="text-sm leading-relaxed text-[#4b5563]">
									{product.description}
								</p>
								<div className="mb-1 h-px w-full bg-gray-300" />
								<div className="flex flex-wrap gap-2">
									{product.techTags.map((t) => (
										<span
											key={t}
											className="rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1 text-xs font-medium text-[#374151]"
										>
											{t}
										</span>
									))}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
