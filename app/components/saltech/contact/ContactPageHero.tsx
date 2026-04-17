import { Hero } from "@/components/ui/Hero";
import { saltechAssets } from "@/data/saltechAssets";

export function ContactPageHero() {
  return (
    <Hero
      eyebrow={
        <span className="inline-flex rounded-full bg-primary-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-primary-gold">
          Contact us
        </span>
      }
      title="Let's talk about what you're building."
      subtitle={
        <p className="max-w-xl text-balance text-gray-400">
          A rough idea is enough to start. You don&apos;t need a full spec to
          reach out — just a problem worth solving.
        </p>
      }
      backgroundImage={saltechAssets.contactHero}
      overlay="dark"
      size="full"
      backgroundBlur
      titleVariant="white"
      showDivider={false}
      contentMaxWidth="wide"
    />
  );
}
