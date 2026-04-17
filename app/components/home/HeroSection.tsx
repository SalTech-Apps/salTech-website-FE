import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { Hero } from "@/components/ui/Hero";
import heroImage from "@/assets/home/banner.jpg";

export function HeroSection() {
  return (
    <Hero
      title={
        <>
          We Don't Just Sell Property.
          <br />
          We Deliver Certainty.
        </>
      }
      subtitle="Jesfem is a Lagos-based construction and real estate company trusted by local and diaspora investors for verified property transactions, structured project delivery, and transparent reporting."
      backgroundImage={heroImage}
      backgroundVideoUrl="https://firebasestorage.googleapis.com/v0/b/jesfem-f812b.firebasestorage.app/o/public_assets%2Fjesem-homes.mp4?alt=media&token=bad13ed1-1e8b-41bd-a7d1-be863d4bcd6d"
      overlay="video"
      heightClass="min-h-60vh xl:h-[calc(100vh+18vh)] w-[calc(100%+100vw)]! xl:w-full left-2/4 xl:left-none -translate-x-1/2 xl:-translate-x-none"
      backgroundBlur
      contentMaxWidth="wide"
      titleVariant="headlines"
      actions={
        <>
          <Button
            radius="none"
            as={Link}
            to="/contact"
            prefetch="intent"
            size="lg"
            className="bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state px-8 uppercase"
          >
            BOOK A CONSULTATION
          </Button>
          <Button
            radius="none"
            as={Link}
            to="/properties"
            prefetch="intent"
            variant="bordered"
            size="lg"
            className="border-2 border-primary-gold text-primary-gold bg-transparent font-body font-bold hover:bg-primary-gold/10 px-8 uppercase"
          >
            VIEW PROPERTIES
          </Button>
        </>
      }
    />
  );
}
