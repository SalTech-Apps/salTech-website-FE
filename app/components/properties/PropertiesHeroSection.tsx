import { Hero } from "@/components/ui/Hero";

export function PropertiesHeroSection() {
  return (
    <Hero
      title="Verified Properties for Sale in Lagos"
      subtitle="Every listing has passed our title verification and documentation review. What you see is what exists."
      backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
      overlay="solid-70"
      size="compact"
      backgroundColor="var(--color-main-background)"
      titleVariant="headlines"
    />
  );
}
