import { Link } from "react-router-dom";
import logo from "@/assets/logo/logo-transparent.png";

const COMPANY = [
  { to: "/about", label: "About" },
  { to: "/case-studies", label: "Case Study" },
  { to: "/contact", label: "Career" },
  { to: "/contact", label: "Contact" },
];

const SERVICES_FOOTER = [
  { to: "/services", label: "MVP Development" },
  { to: "/services", label: "Platform Engineering" },
  { to: "/services", label: "AI & Automation" },
  { to: "/services", label: "Product Design" },
  { to: "/services", label: "Compliance Engineering" },
];

const PRODUCTS_FOOTER = [
  { to: "/projects", label: "All Products" },
  { to: "/projects", label: "DARA Recovery" },
  { to: "/projects", label: "Partywitme" },
  { to: "/projects", label: "Agapemate" },
];

export function AppFooter() {
  return (
    <footer className="border-t border-[#1f2937] bg-[#111827]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-1">
            <Link
              to="/"
              prefetch="intent"
              className="inline-block"
              aria-label="SalTech Home"
            >
              <img
                src={logo}
                alt="SalTech"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Building mission-critical digital products for startups,
              enterprises, and governments across Africa and beyond.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-sm text-white/60 transition-colors hover:border-primary-gold/50 hover:text-primary-gold"
                aria-label="SalTech on X"
              >
                X
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-sm text-white/60 transition-colors hover:border-primary-gold/50 hover:text-primary-gold"
                aria-label="SalTech on LinkedIn"
              >
                in
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-sm text-white/60 transition-colors hover:border-primary-gold/50 hover:text-primary-gold"
                aria-label="SalTech on Instagram"
              >
                ig
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white/40">
              Company
            </h2>
            <ul className="mt-4 space-y-3">
              {COMPANY.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    prefetch="intent"
                    className="text-sm text-white/70 transition-colors hover:text-primary-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white/40">
              Services
            </h2>
            <ul className="mt-4 space-y-3">
              {SERVICES_FOOTER.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    prefetch="intent"
                    className="text-sm text-white/70 transition-colors hover:text-primary-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white/40">
              Products
            </h2>
            <ul className="mt-4 space-y-3">
              {PRODUCTS_FOOTER.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    prefetch="intent"
                    className="text-sm text-white/70 transition-colors hover:text-primary-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white/40">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href="mailto:support@saltechapps.com"
                  className="transition-colors hover:text-primary-gold"
                >
                  support@saltechapps.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+18448771078"
                  className="transition-colors hover:text-primary-gold"
                >
                  +1 (844) 877-1078
                </a>
              </li>
              <li className="leading-snug">
                11 Stanwix Street, Suite 1200
                <br />
                Pittsburgh, PA 15222
              </li>
              <li>
                <Link
                  to="/contact"
                  prefetch="intent"
                  className="font-semibold text-primary-gold hover:text-soft-gold-hover-state"
                >
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} SalTech Innovations LLC. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/45">
            <Link
              to="/privacy"
              prefetch="intent"
              className="hover:text-primary-gold"
            >
              Privacy Policy
            </Link>
            <span aria-hidden>|</span>
            <Link
              to="/terms"
              prefetch="intent"
              className="hover:text-primary-gold"
            >
              Terms of Service
            </Link>
            <span aria-hidden>|</span>
            <Link
              to="/contact"
              prefetch="intent"
              className="hover:text-primary-gold"
            >
              Careers
            </Link>
            <span aria-hidden>|</span>
            <Link
              to="/contact"
              prefetch="intent"
              className="hover:text-primary-gold"
            >
              Contacts
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
