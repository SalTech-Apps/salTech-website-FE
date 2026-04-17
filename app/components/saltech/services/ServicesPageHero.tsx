import { Hero } from "@/components/ui/Hero";
import { saltechAssets } from "@/data/saltechAssets";

export function ServicesPageHero() {
  return (
    <Hero
      eyebrow={
        <span className="inline-flex rounded-full border border-primary-gold/60 bg-primary-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111827]">
          WHAT WE DO
        </span>
      }
      title="Capabilities that deliver outcomes — not outputs."
      subtitle={
        <p className="max-w-3xl text-balance text-white/90">
          We don&apos;t sell time. We deliver working systems. Here&apos;s how we
          do it.
        </p>
      }
      backgroundImage={saltechAssets.servicesHero}
      overlay="dark"
      size="full"
      backgroundBlur
      titleVariant="white"
      showDivider={false}
      contentMaxWidth="wide"
    />
  );
}
