import {
  FaqHeroSection,
  FaqAccordionSection,
  FaqCtaSection,
  ScrollToTopButton,
} from "@/components/faq";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";

const FAQ_ITEMS = [
  { question: "What does Jesfem do?", answer: "Jesfem is a Lagos-based construction and real estate company. We help clients with buying, selling, renting, and managing property, and we deliver construction projects with transparent reporting." },
  { question: "Where is Jesfem located?", answer: "We are headquartered in Lagos, Nigeria, with our office in Victoria Island. We serve clients locally and across the diaspora." },
  { question: "How do I start the process of buying property with Jesfem?", answer: "Start by booking a consultation. We'll understand your goals, budget, and preferences, then guide you through verified listings, site visits, and due diligence including title verification." },
  { question: "Do you verify title documents?", answer: "Yes. We help verify key documents including C of O, Governor's Consent, and survey plans before you commit. We can also recommend legal professionals for full due diligence." },
  { question: "What is off-plan and how does Jesfem handle it?", answer: "Off-plan means buying a property before it's completed. We work with vetted developers and structure payments to milestones. You get clarity on timelines, documentation, and what's included." },
  { question: "What if the project is delayed?", answer: "We align with developers who have a track record of delivery. Your contract will outline timelines and, where applicable, delay clauses. We keep you updated on progress throughout." },
  { question: "What does property management include?", answer: "Our management service includes tenant sourcing, rent collection, maintenance coordination, reporting, and handling disputes. We keep your asset productive and your paperwork in order." },
  { question: "Can I get reports if I live abroad?", answer: "Yes. You receive regular reports by email and can request access to a secure portal. We also offer WhatsApp and scheduled calls for updates." },
  { question: "I want to invest from abroad. Can Jesfem help?", answer: "Yes. We work with diaspora investors on off-plan and completed property. We handle viewings, documentation, and can coordinate with your legal and tax advisors." },
  { question: "Do you offer investment advice?", answer: "We provide market context and help you compare options. For formal financial or tax advice we recommend you consult licensed advisors; we focus on property sourcing, construction, and management." },
  { question: "How are your fees structured?", answer: "Fees depend on the service—sales, lettings, management, or project delivery. We'll give you a clear breakdown during your consultation with no hidden costs." },
  { question: "What payment methods do you accept?", answer: "We accept bank transfers and other agreed methods. For off-plan, payments are typically linked to construction milestones. We'll confirm options when you engage our services." },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "FAQ",
    description:
      "Frequently asked questions about JESFEM's real estate services, property investments, rentals, and off-plan purchases.",
    path: location.pathname,
  });
}

export default function Faq() {
  return (
    <div className="flex flex-col w-full">
      <JsonLd
        data={[
          webPageSchema({
            name: "FAQ",
            description: "Frequently asked questions about JESFEM's real estate services, property investments, rentals, and off-plan purchases.",
            path: "/faq",
          }),
          FAQ_JSON_LD,
        ]}
      />
      <FaqHeroSection />
      <FaqAccordionSection />
      <FaqCtaSection />
      <ScrollToTopButton />
    </div>
  );
}
