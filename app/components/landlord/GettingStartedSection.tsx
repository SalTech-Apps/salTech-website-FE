import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    number: "Step 1",
    title: "Enquire",
    description:
      "Tell us about your property (or properties) – location, type, current status, and your goals.",
  },
  {
    number: "Step 2",
    title: "Assessment",
    description:
      "We inspect the property, assess its rental potential, and present our management recommendation and fee structure.",
  },
  {
    number: "Step 3",
    title: "Agreement",
    description:
      "We sign a clear management agreement covering scope, fees, reporting schedule, and responsibilities.",
  },
  {
    number: "Step 4",
    title: "Handover",
    description:
      "We take over. Tenant sourcing, marketing, management – all handled. You receive your first report within 30 days.",
  },
];

export function GettingStartedSection() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Getting Started is Simple"
          level="h2"
          goldLineAbove
          variant="headlines"
        />
        <div className="mt-16 space-y-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h3 className="mt-2 font-body text-lg font-bold text-primary-gold">
                {step.number} :{" "}
                <span className="text-main-text-headlines">{step.title}</span>
              </h3>
              <p className="mt-3 text-body text-secondary-text-body-paragraphs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            radius="none"
            as={Link}
            to="/contact"
            prefetch="intent"
            size="lg"
            className="bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state px-8 uppercase gap-2"
          >
            Start Your Onboarding
            <IoArrowForward className="text-lg" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
