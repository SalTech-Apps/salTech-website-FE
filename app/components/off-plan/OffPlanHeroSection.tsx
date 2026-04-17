import { Hero } from "@/components/ui/Hero";
import offPlanHeroImage from "@/assets/off_plan/banner.jpg";

export function OffPlanHeroSection() {
  return (
    <Hero
      title="Off-Plan Investment Opportunities"
      subtitle={
        <p className="text-main-text-headlines">
          Strategically acquire future-proof assets with transparent payment
          structures designed for your maximum benefit and convenience.
        </p>
      }
      backgroundImage={offPlanHeroImage}
      overlay="solid-75"
      size="compact"
      backgroundColor="var(--color-main-background)"
      titleVariant="gold"
    />
  );
}
