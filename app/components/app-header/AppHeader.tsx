import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/assets/logo/logo-transparent.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/properties", label: "Properties" },
  { to: "/off-plan", label: "Off-Plan" },
  { to: "/rentals", label: "Rentals" },
  { to: "/landlords", label: "Landlords" },
  { to: "/projects", label: "Projects" },
  { to: "/intelligence", label: "Intelligence" },
  { to: "/insights", label: "Insights" },
  { to: "/survey", label: "Survey" },
] as const;

function NavLinkWithActive({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      prefetch="intent"
      end={to === "/"}
      className={({ isActive }) =>
        `text-buttons transition-colors hover:text-primary-gold ${
          isActive ? "text-primary-gold border-b-2 border-primary-gold pb-0.5" : "text-secondary-text-body-paragraphs"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-main-background/50 backdrop-blur supports-backdrop-filter:bg-main-background/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          prefetch="intent"
          className="focus:outline-none focus:ring-2 focus:ring-primary-gold/50 transition-opacity hover:opacity-90"
          aria-label="Jesfem Home"
        >
          <img src={logo} alt="Jesfem" className="h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {NAV_LINKS.filter(({ to }) => to !== "/").map(({ to, label }) => (
            <NavLinkWithActive key={to} to={to} label={label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            radius="none"
            as={Link}
            to="/contact"
            prefetch="intent"
            size="sm"
            className="bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state uppercase text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4"
          >
            <span className="sm:hidden">BOOK</span>
            <span className="hidden sm:inline">BOOK CONSULTATION</span>
          </Button>
          <button
            type="button"
            className="md:hidden p-2 text-main-text-headlines hover:text-primary-gold"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          className="md:hidden border-t border-soft-divider-line bg-secondary-background px-4 py-4"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  prefetch="intent"
                  end={to === "/"}
                  className={({ isActive }) =>
                    `block py-2 text-body hover:text-primary-gold ${
                      isActive
                        ? "text-primary-gold"
                        : "text-secondary-text-body-paragraphs"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
