import { Hero } from "@/components/ui/Hero";

export function FaqHeroSection() {
  return (
    <Hero
      title="Answers to Common Questions"
      subtitle="Everything you need to know about Jesfem"
      minimalStyle
      size="minimal"
      contentMaxWidth="narrow"
      showDivider
      dividerPosition="belowSubtitle"
      titleVariant="white"
    />
  );
}
