import { Hero } from "@/components/ui/Hero";
import { saltechAssets } from "@/data/saltechAssets";

export function CaseStudiesPageHero() {
  return (
    <Hero
      eyebrow={
        <span className="inline-flex rounded-full border border-primary-gold/60 bg-primary-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111827]">
          CASE STUDIES
        </span>
      }
      title="Work that speaks for itself."
      subtitle={
        <p className="max-w-3xl text-balance text-white/90">
          Real projects. Real outcomes. Named where we can, anonymised where we
          must.
        </p>
      }
      backgroundImage={saltechAssets.caseStudiesHero}
      overlay="dark"
      size="full"
      backgroundBlur
      titleVariant="white"
      showDivider={false}
      contentMaxWidth="wide"
    />
  );
}
