import { Hero } from "@/components/ui/Hero";
import { saltechAssets } from "@/data/saltechAssets";

export function CareerPageHero() {
	return (
		<Hero
			eyebrow={
				<span className="inline-flex rounded-full bg-[E2BA511A]/35 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-gold backdrop-blur-sm">
					CAREERS AT SALTECH
				</span>
			}
			title="Build the infrastructure that powers Africa's digital future."
			subtitle={
				<p className="max-w-3xl text-balance text-white/90">
					Small team. High-impact work. Real systems used by real people across
					14 countries.
				</p>
			}
			backgroundImage={saltechAssets.aboutHero}
			overlay="dark"
			size="full"
			backgroundBlur
			titleVariant="white"
			showDivider={false}
			contentMaxWidth="wide"
			backgroundColor="#111827"
		/>
	);
}
