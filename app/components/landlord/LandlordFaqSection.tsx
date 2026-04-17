import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What does Jesfem charge for property management?",
    answer:
      "Our fees are transparent and based on the scope of management. We'll present a clear fee structure during the assessment step, with no hidden costs.",
  },
  {
    question: "How soon can you find a tenant?",
    answer:
      "Timing depends on the property type, location, and market conditions. We use targeted marketing and our network to minimise vacancy periods, typically within 2–4 weeks for well-priced properties.",
  },
  {
    question: "Do you handle properties outside Lagos?",
    answer:
      "We are Lagos-focused. For properties outside Lagos, we can refer you to trusted partners or discuss on a case-by-case basis.",
  },
  {
    question: "Can I see reports online?",
    answer:
      "Yes. You get monthly reports by email, and we can provide access to a secure portal for financial statements, photos, and documents.",
  },
  {
    question: "What happens if a tenant damages my property?",
    answer:
      "We document condition at move-in and move-out. Any damage beyond fair wear and tear is addressed through the security deposit process and, if needed, legal recourse. We keep you informed at every step.",
  },
  {
    question: "Do you handle legal disputes with tenants?",
    answer:
      "We support dispute resolution, tenancy agreement enforcement, and eviction management when necessary, working with legal professionals as required.",
  },
  {
    question: "How do I track my rental income from abroad?",
    answer:
      "You receive monthly financial statements showing income, expenses, and net position. Funds can be remitted to your preferred account. We also offer WhatsApp and email updates on your schedule.",
  },
  {
    question: "Can I visit my property anytime?",
    answer:
      "Yes, with reasonable notice to the tenant as per the tenancy agreement. We can coordinate access and accompany you if you're in Lagos.",
  },
];

export function LandlordFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-soft-divider-line bg-main-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="FAQ"
          level="h3"
          goldLineAbove
          variant="gold"
          className="mb-12"
        />
        <div className="divide-y divide-soft-divider-line">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5 first:pt-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="min-w-0 flex-1 text-left font-body text-body text-main-text-headlines break-words">
                    Q: {item.question}
                  </span>
                  <span
                    className={`shrink-0 text-primary-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <IoChevronDown className="text-xl" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 font-body text-body text-secondary-text-body-paragraphs">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
