import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

export function AbroadSection() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-heading-h2 text-main-text-headlines font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Investing From Abroad? We Built Our Process Around You.
          </motion.h2>
          <motion.p
            className="mt-6 text-body text-secondary-text-body-paragraphs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Jesfem provides diaspora investors with verified listings, legal
            documentation, structured payment plans, and monthly progress
            reports – so you never have to wonder what's happening with your
            investment.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              radius="none"
              as={Link}
              to="/contact"
              prefetch="intent"
              size="lg"
              className="bg-primary-gold text-main-text-headlines font-body font-bold hover:bg-soft-gold-hover-state px-10 uppercase"
            >
              JOIN OUR INVESTOR LIST
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
