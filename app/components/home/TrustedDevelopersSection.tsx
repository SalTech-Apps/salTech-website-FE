import { motion } from "framer-motion";

const DEVELOPERS = ["Developer 1", "Developer 2", "Developer 3", "Developer 4"];

export function TrustedDevelopersSection() {
  return (
    <section className="bg-secondary-background py-16 border-t border-soft-divider-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-heading-h3 text-main-text-headlines font-heading uppercase tracking-widest">
            We Work With Trusted Developers
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          {DEVELOPERS.map((dev, i) => (
            <motion.div
              key={dev}
              className="text-heading-h3 text-muted-labels font-heading"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {dev}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
