import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

const BULLET_POINTS = [
  "Monthly Photo & Video Reports – See the actual condition of your property, not just words.",
  "Financial Statements – What came in, what went out, and your net position. Clear and simple.",
  "WhatsApp / Email Updates – On your schedule. We respond within 24 hours.",
  "Legal Document Access – Digital copies of all tenancy agreements, receipts, and compliance documents.",
  "Annual Property Review – A comprehensive assessment of your property's condition, market value, and recommended actions.",
];

export function BuiltForInvestorsSection() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-heading-h2 text-main-text-headlines"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Built for Investors Who Aren't on the Ground
        </motion.h2>
        <motion.p
          className="mt-6 text-body text-secondary-text-body-paragraphs"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          If you're investing from the UK, US, Canada, or anywhere abroad, our
          diaspora programme gives you:
        </motion.p>
        <ul className="mt-8 space-y-4">
          {BULLET_POINTS.map((text, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-body text-secondary-text-body-paragraphs"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.03 }}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-gold"
                aria-hidden
              />
              <span>{text}</span>
            </motion.li>
          ))}
        </ul>
        <motion.div
          className="mt-10"
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
            className="bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state px-8 uppercase"
          >
            Join Our Investor List
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
