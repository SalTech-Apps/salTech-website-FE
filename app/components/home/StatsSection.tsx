import { motion } from "framer-motion";

const STATS = [
  { label: "Registered", value: "RC-1689175", color: "text-white" },
  { label: "Established", value: "2018", color: "text-white" },
  { label: "Projects", value: "15+", color: "text-primary-gold" },
  { label: "Clients", value: "200+", color: "text-primary-gold" },
];

export function StatsSection() {
  return (
    <section className="bg-secondary-background py-12 border-b border-soft-divider-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className=" text-lg">{stat.value}</div>
              <div
                className={`mt-1 text-heading-h5 ${stat.color} uppercase tracking-widest`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
