import { Hero } from "@/components/ui/Hero";
import { saltechAssets } from "@/data/saltechAssets";

export function AboutPageHero() {
  return (
    <Hero
      eyebrow={
        <span className="inline-flex rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-gold backdrop-blur-sm">
          ABOUT SALTECH
        </span>
      }
      title="We build the human infrastructure for a digital-first world."
      subtitle={
        <p className="max-w-3xl text-balance text-white/90">
          Designed for scale. Engineered for empathy.
        </p>
      }
      backgroundImage={saltechAssets.aboutHero}
      overlay="dark"
      size="full"
      backgroundBlur
      titleVariant="white"
      showDivider={false}
      contentMaxWidth="wide"
    />
  );
}
