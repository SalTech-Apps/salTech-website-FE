import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    number: "01",
    title: "Consultation",
    description: "Tell us what you're looking for – purchase, investment, construction, or management. We listen first.",
  },
  {
    number: "02",
    title: "Verification",
    description: "We verify every property, title, and developer before presenting options. No shortcuts.",
  },
  {
    number: "03",
    title: "Transaction",
    description: "Structured payment, legal documentation, and full transparency from offer to completion.",
  },
  {
    number: "04",
    title: "Ongoing Support",
    description: "Post-purchase management, tenant placement, or progress reporting. We stay with you after the deal closes.",
  },
];

export function HowWeWorkSection() {
  return (
    <section className="bg-secondary-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="mx-auto h-0.5 w-16 bg-primary-gold mb-6" />
          <motion.h2
            className="text-heading-h2 text-main-text-headlines font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How We Work
          </motion.h2>
          <motion.p
            className="mt-4 text-body text-secondary-text-body-paragraphs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            A structured approach to property investment, from first contact to
            ongoing support
          </motion.p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl font-bold text-primary-gold font-body mb-2">
                {step.number}
              </div>
              <h3 className="text-heading-h3 text-main-text-headlines font-heading mb-4">
                {step.title}
              </h3>
              <p className="text-body text-secondary-text-body-paragraphs leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button
            radius="none"
            as={Link}
            to="/contact"
            prefetch="intent"
            variant="bordered"
            size="lg"
            className="border-2 border-primary-gold text-primary-gold bg-transparent font-body font-bold hover:bg-primary-gold/10 px-8 uppercase"
          >
            START WITH A CONSULTATION
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
