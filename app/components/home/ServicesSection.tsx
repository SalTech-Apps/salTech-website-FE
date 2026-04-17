import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBuilding, FaHome, FaCity, FaKey, FaBriefcase } from "react-icons/fa";

const SERVICES = [
  {
    icon: FaBuilding,
    title: "Construction",
    description: "Ground-up residential construction with full project management – from foundation to finishing.",
    cta: "Learn More",
    href: "/service",
  },
  {
    icon: FaHome,
    title: "Property Sales",
    description: "Verified, title-checked properties across Lagos. Every listing goes through our due diligence process before it reaches you.",
    cta: "View Listing",
    href: "/properties",
  },
  {
    icon: FaCity,
    title: "Off-Plan Deals",
    description: "Early-entry investment opportunities with vetted developers. Structured payment plans. Milestone tracking included.",
    cta: "See Off-Plan Deals",
    href: "/properties?type=off-plan",
  },
  {
    icon: FaKey,
    title: "Rentals",
    description: "Premium rental listings for professionals and families. Guided viewings. Move-in ready options.",
    cta: "Browse Rental",
    href: "/rentals",
  },
  {
    icon: FaBriefcase,
    title: "Property Management",
    description: "End-to-end management for landlords and investors. Tenant sourcing, rent collection, maintenance, and monthly reporting.",
    cta: "Learn More",
    href: "/service",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-main-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="text-heading-h2 text-main-text-headlines font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-primary-gold" />
          <motion.p
            className="mt-4 text-body text-secondary-text-body-paragraphs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Comprehensive real estate solutions tailored to your investment
            goals
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className={`bg-secondary-background p-8 transition-all border border-transparent hover:border-primary-gold/40 ${
                i < 3 ? "lg:col-span-2" : "lg:col-span-3"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-primary-gold text-3xl mb-6">
                <service.icon />
              </div>
              <h3 className="text-heading-h3 text-main-text-headlines font-heading mb-4">
                {service.title}
              </h3>
              <p className="text-body text-secondary-text-body-paragraphs">
                {service.description}
              </p>
              <Link
                to={service.href}
                prefetch="intent"
                className="mt-6 inline-flex items-center gap-1 text-buttons font-bold text-primary-gold hover:underline"
              >
                {service.cta}
                <span className="text-primary-gold">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to="/services"
            prefetch="intent"
            className="inline-flex items-center gap-1 text-buttons font-bold text-primary-gold hover:underline"
          >
            Explore All Services
            <span className="text-primary-gold">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
