import { motion } from "framer-motion";
import { Hero } from "@/components/ui/Hero";
import aboutHeroImage from "@/assets/about/banner.png";

export function AboutHeroSection() {
  return (
    <Hero
      title="Built on Structure. Driven by Integrity."
      overlay="dark"
      heightClass="min-h-[70vh]"
      backgroundImage={aboutHeroImage}
      backgroundBlur
      backgroundColor="var(--color-main-background)"
      contentMaxWidth="default"
      titleVariant="gold"
      contentClassName="py-20"
    >
      <motion.div
        className="mt-8 flex flex-col gap-6 text-body text-secondary-text-body-paragraphs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p>
          Jesfem Multiservice Ltd is a Lagos-based construction and real estate
          company registered with the Corporate Affairs Commission of Nigeria RC
          1689175. We operate across residential construction, property sales,
          off-plan investments, rentals, and property management.
        </p>
        <p>
          We exist because the Nigerian real estate market needs operators who
          do things properly.
        </p>
        <p>
          That means verified titles, documented processes, honest timelines,
          and clear communication – especially for investors who aren't on the
          ground.
        </p>
      </motion.div>
    </Hero>
  );
}
