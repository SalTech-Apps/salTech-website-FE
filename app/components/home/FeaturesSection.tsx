import { motion } from "framer-motion";
import { FaHome, FaHandshake, FaChartLine } from "react-icons/fa";

const FEATURES = [
  {
    icon: FaHome,
    title: "Curated listings",
    description: "Handpicked properties that match your criteria and lifestyle.",
  },
  {
    icon: FaHandshake,
    title: "Personalized service",
    description: "Dedicated support from first inquiry to keys in hand.",
  },
  {
    icon: FaChartLine,
    title: "Market insight",
    description: "Data-driven guidance for buying, selling, or investing.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-heading-h2 text-main-text-headlines font-heading">
            Why choose Jesfem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body text-secondary-text-body-paragraphs">
            We combine local expertise with a client-first approach to deliver
            results that matter.
          </p>
        </motion.div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              className="rounded-lg border border-soft-divider-line bg-main-background p-8 transition-colors hover:border-primary-gold/30"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-subtle-gold-background text-primary-gold">
                <Icon className="text-xl" />
              </div>
              <h3 className="mt-5 text-heading-h3 text-main-text-headlines font-heading">
                {title}
              </h3>
              <p className="mt-3 text-body text-secondary-text-body-paragraphs">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
