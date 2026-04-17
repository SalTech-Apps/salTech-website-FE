import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatisticItem } from "@/components/ui/StatisticItem";

const STATS = [
  { value: "7+", label: "Years in Business" },
  { value: "15+", label: "Projects Delivered" },
  { value: "200+", label: "Clients Served" },
  { value: "50+", label: "Properties Under Management" },
];

export function ByTheNumbersSection() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background  py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="By the Numbers"
          goldLineAbove
          level="h2"
          variant="gold"
        />
        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <StatisticItem value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
