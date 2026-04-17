import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { Hero } from "@/components/ui/Hero";
import LANDLORD_BANNER from "@/assets/landlord/banner.png";

export function LandlordHeroSection() {
  return (
    <Hero
      title="Your Property. Professionally Managed."
      subtitle="Whether you're across town or across the world, Jesfem keeps your investment productive, protected, and transparent."
      backgroundImage={LANDLORD_BANNER}
      overlay="light"
      heightClass="min-h-[70vh]"
      backgroundBlur
      showDivider
      dividerPosition="aboveTitle"
      dividerClassName="mx-auto mb-6 h-0.5 w-14 bg-primary-gold"
      titleVariant="headlines"
      actions={
        <Button
          radius="none"
          as={Link}
          to="/properties"
          prefetch="intent"
          size="lg"
          className="bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state px-8 uppercase"
        >
          View Properties
        </Button>
      }
    />
  );
}
