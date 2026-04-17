import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import logo from "@/assets/logo/logo-transparent.png";

/** Matches marketing header spec: gold pill, white label when active */
const PILL_ACTIVE =
  "rounded-md bg-[#E5B751] px-3 py-1.5 text-sm font-semibold text-white";
const PILL_IDLE =
  "rounded-md px-3 py-1.5 text-sm font-medium text-[#667085] transition-colors hover:text-[#333333]";

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
        className={aboutActive ? PILL_ACTIVE : PILL_IDLE}
      >
        About
      </Link>
      <Link
        to="/about#our-team"
        prefetch="intent"
        className={teamActive ? PILL_ACTIVE : PILL_IDLE}
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
      className={({ isActive }) => (isActive ? PILL_ACTIVE : PILL_IDLE)}
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#E4E7EC] bg-white">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          prefetch="intent"
          className="focus:outline-none focus:ring-2 focus:ring-[#E5B751]/50 transition-opacity hover:opacity-90"
          aria-label="SalTech Home"
        >
          <img src={logo} alt="SalTech" className="h-10 w-auto object-contain" />
        </Link>

        <nav
          className="hidden min-w-0 justify-center justify-self-center lg:flex lg:items-center lg:gap-1 xl:gap-2"
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

        <div className="flex items-center justify-end gap-3">
          <Button
            radius="lg"
            as={Link}
            to="/contact"
            prefetch="intent"
            size="sm"
            className="hidden sm:flex bg-[#E5B751] font-body text-sm font-bold text-[#333333] hover:bg-[#d9a843]"
            endContent={<FaArrowRight className="text-xs" aria-hidden />}
          >
            Start a Project
          </Button>
          <button
            type="button"
            className="lg:hidden p-2 text-[#667085] hover:text-[#333333]"
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
          className="lg:hidden border-t border-[#E4E7EC] bg-white px-4 py-4"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink
                to="/"
                prefetch="intent"
                end
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-[#E5B751] text-white"
                      : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#333333]"
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
                  `block rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-[#E5B751] text-white"
                      : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#333333]"
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
                  `block rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-[#E5B751] text-white"
                      : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#333333]"
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
                  `block rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-[#E5B751] text-white"
                      : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#333333]"
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
                className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                  aboutActive
                    ? "bg-[#E5B751] text-white"
                    : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#333333]"
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
                className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                  teamActive
                    ? "bg-[#E5B751] text-white"
                    : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#333333]"
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
                  `block rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-[#E5B751] text-white"
                      : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#333333]"
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
                className="w-full bg-[#E5B751] font-body font-bold text-[#333333]"
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
