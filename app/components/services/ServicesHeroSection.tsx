import { Hero } from "@/components/ui/Hero";
import serviceBanner from "@/assets/service/service-banner.png";

export function ServicesHeroSection() {
  return (
    <Hero
      title={
        <>
          Five Pillars of Real Estate,
          <br />
          One Standard of Excellence.
        </>
      }
      backgroundImage={serviceBanner}
      overlay="dark"
      size="full"
      backgroundBlur
      contentMaxWidth="wide"
      showDivider
      dividerPosition="aboveTitle"
      dividerClassName="mt-8 mx-auto h-0.5 w-24 bg-primary-gold"
      titleVariant="white"
    />
  );
}
