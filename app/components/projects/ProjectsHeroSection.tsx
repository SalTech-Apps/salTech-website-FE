import { Hero } from "@/components/ui/Hero";
import PROJECTS_BANNER from "@/assets/service/service-banner.png";

export function ProjectsHeroSection() {
  return (
    <Hero
      title="See What We've Built."
      subtitle="A record of delivery. Browse our completed and ongoing construction projects."
      backgroundImage={PROJECTS_BANNER}
      overlay="dark"
      size="flexible"
      backgroundColor="var(--color-main-background)"
      showDivider
      dividerPosition="belowSubtitle"
      titleVariant="headlines"
      contentClassName="py-24"
    />
  );
}
