import { Hero } from "@/components/ui/Hero";
import INSIGHTS_BANNER from "@/assets/insights/Image-banner.png";

export function InsightsHeroSection() {
  return (
    <Hero
      title="Insights for Smarter Property Decisions"
      subtitle="Guides, market analysis, and practical advice from the Jesfem team."
      backgroundImage={INSIGHTS_BANNER}
      overlay="dark"
      size="full"
      backgroundColor="var(--color-main-background)"
      showDivider
      dividerPosition="aboveTitle"
      dividerClassName="mx-auto mt-6 h-0.5 w-16 bg-primary-gold"
      titleVariant="headlines"
    />
  );
}
