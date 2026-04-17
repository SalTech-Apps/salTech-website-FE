import { type IconType } from "react-icons";
import { motion } from "framer-motion";
import {
  FaUserFriends,
  FaWrench,
  FaBalanceScale,
  FaDollarSign,
  FaFileAlt,
  FaHome,
} from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SERVICES: {
  icon: IconType;
  title: string;
  description: string;
}[] = [
  {
    icon: FaUserFriends,
    title: "Tenant Sourcing & Vetting",
    description:
      "We find quality tenants through targeted marketing and thorough background checks - employment verification, references, and rental history.",
  },
  {
    icon: FaDollarSign,
    title: "Rent Collection & Arrears Management",
    description:
      "We collect rent on schedule and manage any arrears with documented follow-up. You receive funds directly.",
  },
  {
    icon: FaWrench,
    title: "Maintenance & Repairs",
    description:
      "Routine inspections, emergency response, and vendor management. Every repair is documented with photos and cost breakdowns.",
  },
  {
    icon: FaFileAlt,
    title: "Monthly Reporting",
    description:
      "Financial statements, occupancy updates, maintenance logs, and property condition reports - delivered monthly without you having to ask.",
  },
  {
    icon: FaBalanceScale,
    title: "Legal & Compliance",
    description:
      "Tenancy agreements, regulatory filings, dispute resolution support, and eviction management when necessary.",
  },
  {
    icon: FaHome,
    title: "Vacancy Management",
    description:
      "When a tenant leaves, we re-list, remarket, and re-let your property to minimize vacancy periods.",
  },
];

export function WhatJesfemHandlesSection() {
  return (
    <section className="border-t border-soft-divider-line bg-main-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What JESFEM Handles for You"
          level="h2"
          goldLineAbove
          variant="headlines"
        />
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
          {SERVICES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="flex flex-col"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className=" inline-flex text-primary-gold" aria-hidden>
                    <Icon className="text-2xl" />
                  </span>
                  <h3 className="font-body text-body font-bold text-primary-gold">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-body text-secondary-text-body-paragraphs">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
