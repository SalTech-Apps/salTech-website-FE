import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ListItemWithIcon } from "@/components/ui/ListItemWithIcon";

const COMPLIANCE_ITEMS = [
  "Certificate of Occupancy (C of O) – Confirmed with the Lagos State Land Registry",
  "Governor's Consent – Verified for all secondary market transactions",
  "Survey Plan – Cross-referenced with the Surveyor General's office",
  "Building Approval – Confirmed with relevant planning authorities",
  "Deed of Assignment – Reviewed by our legal partners",
  "Developer Verification – Track record, CAC registration, and project history reviewed",
];

export function ComplianceSection() {
  return (
    <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Compliance & Documentation" level="h2" />
        <motion.p
          className="mt-4 text-center text-body text-secondary-text-body-paragraphs"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          We Verify Everything. Here's What That Means.
        </motion.p>

        <motion.div
          className="mt-10 rounded-lg border border-soft-divider-line bg-secondary-background p-8 sm:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-body text-main-text-headlines">
            Before any property is listed, sold, or recommended by Jesfem, we
            conduct or verify the following:
          </p>
          <ul className="mt-6 space-y-4">
            {COMPLIANCE_ITEMS.map((item, i) => (
              <ListItemWithIcon key={i} icon={IoCheckmarkCircle}>
                {item}
              </ListItemWithIcon>
            ))}
          </ul>
          <p className="mt-6 text-body text-main-text-headlines">
            We share documentation with clients at every stage. No hidden steps.
          </p>
        </motion.div>
      </div>
      {/* <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <Link
          to="/how-we-work"
          className="inline-flex items-center gap-1 border-b border-primary-gold pb-0.5 font-body text-buttons text-primary-gold hover:text-soft-gold-hover-state"
        >
          See How We Work →
        </Link>
      </div> */}
    </section>
  );
}
