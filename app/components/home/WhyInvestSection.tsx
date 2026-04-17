import { motion } from "framer-motion";
import { FaShieldAlt, FaFileAlt, FaSyncAlt, FaScroll } from "react-icons/fa";

const REASONS = [
  {
    icon: FaShieldAlt,
    title: "Verified Listings Only",
    description: "Every property goes through title search, survey verification, and legal review before listing. No guesswork.",
  },
  {
    icon: FaFileAlt,
    title: "Transparent Reporting",
    description: "Diaspora investors receive monthly photo and video updates, financial reports, and milestone summaries.",
  },
  {
    icon: FaSyncAlt,
    title: "Structured Transactions",
    description: "From first enquiry to final handover, every step is documented, timestamped, and shared with you.",
  },
  {
    icon: FaScroll,
    title: "Legal Documentation",
    description: "We handle or verify: C of O, Governor's Consent, survey plans, building approvals, and deed of assignment. You see everything.",
  },
];

export function WhyInvestSection() {
  return (
    <section className="bg-secondary-background  py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-heading-h2 text-main-text-headlines font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Investors Choose Jesfem
          </motion.h2>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-primary-gold" />
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary-gold text-primary-gold text-2xl mb-6">
                <reason.icon />
              </div>
              <h3 className="text-heading-h3 text-main-text-headlines text-center font-heading mb-4">
                {reason.title}
              </h3>
              <p className="text-body text-secondary-text-body-paragraphs text-center">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
