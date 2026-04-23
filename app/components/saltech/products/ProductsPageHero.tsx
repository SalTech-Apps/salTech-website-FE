import { Hero } from "@/components/ui/Hero";
import { saltechAssets } from "@/data/saltechAssets";

export function ProductsPageHero() {
	return (
		<Hero
			eyebrow={
				<span className="inline-flex rounded-full bg-[E2BA511A]/35 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-gold backdrop-blur-sm">
					OUR PRODUCTS
				</span>
			}
			title="Software built to solve real problems."
			subtitle={
				<p className="max-w-3xl text-balance text-white/90">
					A portfolio of proprietary and client products across fintech,
					govtech, healthcare, and enterprise SaaS.
				</p>
			}
			backgroundImage={saltechAssets.productsHero}
			overlay="dark"
			size="full"
			backgroundBlur
			titleVariant="white"
			showDivider={false}
			contentMaxWidth="wide"
		/>
	);
}
