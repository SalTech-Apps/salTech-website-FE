import { motion } from "framer-motion";

const BULLET_POINTS = [
  "Tenants who pay late – or not at all",
  "Maintenance issues you hear about months after they happen",
  "Managing agents who go silent until it's time to collect their fee",
  "No reports, no photos, no financial statements",
  'The constant worry of "what\'s actually happening with my property?"',
];

export function StressfulSection() {
  return (
    <section className="relative border-t border-soft-divider-line bg-main-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-heading text-heading-h2 text-main-text-headlines">
              Owning Property in Lagos Shouldn't Be This Stressful.
            </h2>
            <p className="mt-6 text-body text-secondary-text-body-paragraphs">
              You bought the property. But now you're dealing with:
            </p>
            <ul className="mt-6 space-y-4">
              {BULLET_POINTS.map((text, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-body text-secondary-text-body-paragraphs"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-gold"
                    aria-hidden
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-body text-secondary-text-body-paragraphs">
              Jesfem exists to fix this.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
