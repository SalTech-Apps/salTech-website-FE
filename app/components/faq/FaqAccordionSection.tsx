import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "General",
    items: [
      {
        question: "What does Jesfem do?",
        answer:
          "Jesfem is a Lagos-based construction and real estate company. We help clients with buying, selling, renting, and managing property, and we deliver construction projects with transparent reporting.",
      },
      {
        question: "Where is Jesfem located?",
        answer:
          "We are headquartered in Lagos, Nigeria, with our office in Victoria Island. We serve clients locally and across the diaspora.",
      },
    ],
  },
  {
    title: "Buying Property",
    items: [
      {
        question: "How do I start the process of buying property with Jesfem?",
        answer:
          "Start by booking a consultation. We'll understand your goals, budget, and preferences, then guide you through verified listings, site visits, and due diligence including title verification.",
      },
      {
        question: "Do you verify title documents?",
        answer:
          "Yes. We help verify key documents including C of O, Governor's Consent, and survey plans before you commit. We can also recommend legal professionals for full due diligence.",
      },
    ],
  },
  {
    title: "Off-Plan Investments",
    items: [
      {
        question: "What is off-plan and how does Jesfem handle it?",
        answer:
          "Off-plan means buying a property before it's completed. We work with vetted developers and structure payments to milestones. You get clarity on timelines, documentation, and what's included.",
      },
      {
        question: "What if the project is delayed?",
        answer:
          "We align with developers who have a track record of delivery. Your contract will outline timelines and, where applicable, delay clauses. We keep you updated on progress throughout.",
      },
    ],
  },
  {
    title: "Property Management",
    items: [
      {
        question: "What does property management include?",
        answer:
          "Our management service includes tenant sourcing, rent collection, maintenance coordination, reporting, and handling disputes. We keep your asset productive and your paperwork in order.",
      },
      {
        question: "Can I get reports if I live abroad?",
        answer:
          "Yes. You receive regular reports by email and can request access to a secure portal. We also offer WhatsApp and scheduled calls for updates.",
      },
    ],
  },
  {
    title: "Goals",
    items: [
      {
        question: "I want to invest from abroad. Can Jesfem help?",
        answer:
          "Yes. We work with diaspora investors on off-plan and completed property. We handle viewings, documentation, and can coordinate with your legal and tax advisors.",
      },
      {
        question: "Do you offer investment advice?",
        answer:
          "We provide market context and help you compare options. For formal financial or tax advice we recommend you consult licensed advisors; we focus on property sourcing, construction, and management.",
      },
    ],
  },
  {
    title: "Payments & Fees",
    items: [
      {
        question: "How are your fees structured?",
        answer:
          "Fees depend on the service—sales, lettings, management, or project delivery. We'll give you a clear breakdown during your consultation with no hidden costs.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers and other agreed methods. For off-plan, payments are typically linked to construction milestones. We'll confirm options when you engage our services.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  id,
}: FaqItem & { isOpen: boolean; onToggle: () => void; id: string }) {
  return (
    <div className="border-b border-soft-divider-line last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
      >
        <span className="min-w-0 flex-1 text-left text-body text-secondary-text-body-paragraphs break-words">
          {question}
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
            id={`faq-answer-${id}`}
            role="region"
            aria-labelledby={`faq-question-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-body text-secondary-text-body-paragraphs">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqCategoryBlock({
  category,
  categoryIndex,
  openKey,
  setOpenKey,
}: {
  category: FaqCategory;
  categoryIndex: number;
  openKey: string | null;
  setOpenKey: (key: string | null) => void;
}) {
  return (
    <div className="mb-12 last:mb-0">
      <h2 className="mb-6 font-heading text-heading-h3 text-primary-gold">
        {category.title}
      </h2>
      <div className="border border-soft-divider-line bg-secondary-background px-6">
        {category.items.map((item, idx) => {
          const key = `${categoryIndex}-${idx}`;
          const isOpen = openKey === key;
          return (
            <AccordionItem
              key={idx}
              question={item.question}
              answer={item.answer}
              isOpen={isOpen}
              onToggle={() => setOpenKey(isOpen ? null : key)}
              id={key}
            />
          );
        })}
      </div>
    </div>
  );
}

export function FaqAccordionSection() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {FAQ_CATEGORIES.map((category, categoryIndex) => (
          <FaqCategoryBlock
            key={category.title}
            category={category}
            categoryIndex={categoryIndex}
            openKey={openKey}
            setOpenKey={setOpenKey}
          />
        ))}
      </div>
    </section>
  );
}

export function FaqCtaSection() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-heading-h2 text-main-text-headlines">
          Still Have Questions?
        </h2>
        <p className="mt-4 text-body text-secondary-text-body-paragraphs">
          Can't find what you're looking for? Contact our team.
        </p>
        <Button
          radius="none"
          as={Link}
          to="/contact"
          prefetch="intent"
          size="lg"
          className="mt-8 bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state px-8 uppercase"
        >
          Contact Us
        </Button>
      </div>
    </section>
  );
}
