import { Hero } from "@/components/ui/Hero";
import CONTACT_BANNER from "@/assets/contact/contact.png";

export function ContactHeroSection() {
  return (
    <Hero
      title="Let's Talk Property."
      subtitle="We help you with buying, investing, renting or managing your real estate."
      backgroundImage={CONTACT_BANNER}
      overlay="dark"
      size="full"
      backgroundColor="var(--color-main-background)"
      titleVariant="headlines"
    />
  );
}
