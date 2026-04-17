import { motion } from "framer-motion";
import { FaBullseye, FaEye } from "react-icons/fa";
import { FeatureCard } from "@/components/ui/FeatureCard";

const CARDS = [
  {
    icon: FaBullseye,
    title: "Our Mission",
    description:
      "To provide structured, transparent, and professionally managed real estate services that protect our clients' investments and deliver measurable results.",
  },
  {
    icon: FaEye,
    title: "Our Vision",
    description:
      "To become the most trusted name in Nigerian real estate for diaspora and local investors seeking verified, well-managed property transactions.",
  },
];

export function VisionGoalsSection() {
  return (
    <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <FeatureCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                iconCircle
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
