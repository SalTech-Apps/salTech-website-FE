import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import logo from "@/assets/logo/logo-transparent.png";

const PILL_ACTIVE = "bg-primary-gold text-[#111827]";
const PILL_IDLE =
  "text-[#374151] hover:text-[#111827]";

function AboutNavLinks() {
  const { pathname, hash } = useLocation();
  const onAbout = pathname === "/about";
  const teamActive = onAbout && hash === "#our-team";
  const aboutActive = onAbout && !teamActive;

  return (
    <>
      <Link
        to="/about"
        prefetch="intent"
        className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
          aboutActive ? PILL_ACTIVE : PILL_IDLE
        }`}
      >
        About
      </Link>
      <Link
        to="/about#our-team"
        prefetch="intent"
        className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
          teamActive ? PILL_ACTIVE : PILL_IDLE
        }`}
      >
        Our Team
      </Link>
    </>
  );
}

function NavLinkWithActive({
  to,
  label,
  end,
}: {
  to: string;
  label: string;
  end: boolean;
}) {
  return (
    <NavLink
      to={to}
      prefetch="intent"
      end={end}
      className={({ isActive }) =>
        `rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
          isActive ? PILL_ACTIVE : PILL_IDLE
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const onAbout = pathname === "/about";
  const teamActive = onAbout && hash === "#our-team";
  const aboutActive = onAbout && !teamActive;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#e5e7eb] bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          prefetch="intent"
          className="focus:outline-none focus:ring-2 focus:ring-primary-gold/50 transition-opacity hover:opacity-90"
          aria-label="SalTech Home"
        >
          <img src={logo} alt="SalTech" className="h-10 w-auto object-contain" />
        </Link>

        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2"
          aria-label="Main"
        >
          <NavLinkWithActive to="/" label="Home" end />
          <NavLinkWithActive to="/projects" label="Products" end={false} />
          <NavLinkWithActive to="/services" label="Services" end={false} />
          <NavLinkWithActive
            to="/case-studies"
            label="Case Studies"
            end={false}
          />
          <AboutNavLinks />
          <NavLinkWithActive to="/contact" label="Contact" end={false} />
        </nav>

        <div className="flex items-center gap-3">
          <Button
            radius="full"
            as={Link}
            to="/contact"
            prefetch="intent"
            size="sm"
            className="hidden sm:flex bg-primary-gold font-body font-bold text-[#111827] hover:bg-soft-gold-hover-state"
            endContent={<FaArrowRight className="text-xs" aria-hidden />}
          >
            Start a Project
          </Button>
          <button
            type="button"
            className="lg:hidden p-2 text-[#374151] hover:text-[#111827]"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          className="lg:hidden border-t border-[#e5e7eb] bg-white px-4 py-4"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink
                to="/"
                prefetch="intent"
                end
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive
                      ? "bg-primary-gold/20 text-[#111827]"
                      : "text-[#374151] hover:bg-[#f9fafb]"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                prefetch="intent"
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive
                      ? "bg-primary-gold/20 text-[#111827]"
                      : "text-[#374151] hover:bg-[#f9fafb]"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                prefetch="intent"
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive
                      ? "bg-primary-gold/20 text-[#111827]"
                      : "text-[#374151] hover:bg-[#f9fafb]"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/case-studies"
                prefetch="intent"
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive
                      ? "bg-primary-gold/20 text-[#111827]"
                      : "text-[#374151] hover:bg-[#f9fafb]"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </NavLink>
            </li>
            <li>
              <Link
                to="/about"
                prefetch="intent"
                className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                  aboutActive
                    ? "bg-primary-gold/20 text-[#111827]"
                    : "text-[#374151] hover:bg-[#f9fafb]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/about#our-team"
                prefetch="intent"
                className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                  teamActive
                    ? "bg-primary-gold/20 text-[#111827]"
                    : "text-[#374151] hover:bg-[#f9fafb]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Team
              </Link>
            </li>
            <li>
              <NavLink
                to="/contact"
                prefetch="intent"
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive
                      ? "bg-primary-gold/20 text-[#111827]"
                      : "text-[#374151] hover:bg-[#f9fafb]"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            <li className="pt-2">
              <Button
                radius="lg"
                as={Link}
                to="/contact"
                prefetch="intent"
                className="w-full bg-primary-gold font-body font-bold text-[#111827]"
                endContent={<FaArrowRight className="text-xs" aria-hidden />}
                onPress={() => setMobileMenuOpen(false)}
              >
                Start a Project
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
