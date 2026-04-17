import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@heroui/react";
import logo from "@/assets/logo/logo-transparent.png";
import { SocialMediaLinks } from "@/components/common";
import { getPagesList } from "@/lib/pagesList";
import { getSiteConfig, whatsappUrlFromNumber } from "@/lib/siteConfig";
import type { PageListItem } from "@/types/firestore";
import type { SiteConfig } from "@/types/firestore";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import toast from "react-hot-toast";

const NAVIGATION_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Jesfem" },
  { to: "/services", label: "Services" },
  { to: "/properties", label: "Properties for Sale" },
  { to: "/off-plan", label: "Off-Plan Deals" },
  { to: "/rentals", label: "Rentals" },
  { to: "/landlords", label: "Landlords & Investors" },
  { to: "/projects", label: "Projects / Portfolio" },
  { to: "/insights", label: "Resources / Insights" },
  { to: "/contact", label: "Contact" },
  { to: "/survey", label: "Survey" },
];

const FALLBACK = {
  phone: "+2348079328164",
  email: "hello@jesfemmultiservice.com",
  location: "Victoria Island,\nLagos, Nigeria",
  whatsappUrl: "https://wa.me/2348079328164",
};

export function AppFooter() {
  const [firestorePages, setFirestorePages] = useState<PageListItem[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  useEffect(() => {
    getPagesList()
      .then((items) => setFirestorePages(items.filter((p) => p.showInFooter)))
      .catch(() => setFirestorePages([]));
  }, []);

  useEffect(() => {
    getSiteConfig()
      .then((c) => setSiteConfig(c))
      .catch(() => setSiteConfig(null));
  }, []);

  async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = newsletterEmail.trim();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmittingNewsletter(true);
      const existing = await getDocs(
        query(
          collection(db, "newsletterSubscriptions"),
          where("email", "==", email),
        ),
      );
      if (!existing.empty) {
        toast.success("You are now subscribed to Jesfem market insights.");
        setNewsletterEmail("");
        return;
      } else {
        await addDoc(collection(db, "newsletterSubscriptions"), {
          email,
          createdAt: serverTimestamp(),
          source: "footer-market-insights",
        });
        toast.success("You are now subscribed to Jesfem market insights.");
        setNewsletterEmail("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmittingNewsletter(false);
    }
  }

  const faqPage = firestorePages.find((p) => p.slug === "faq");
  const privacyPage = firestorePages.find((p) => p.slug === "privacy");
  const termsPage = firestorePages.find((p) => p.slug === "terms");

  return (
    <footer className="border-t border-soft-divider-line bg-main-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Information */}
          <div>
            <Link to="/" prefetch="intent" className="inline-block" aria-label="Jesfem Home">
              <img
                src={logo}
                alt="Jesfem"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-body text-main-text-headlines">
              Lagos-based construction and real estate
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-buttons font-bold uppercase tracking-wider text-main-text-headlines">
              NAVIGATION
            </h2>
            <ul className="mt-6 space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    prefetch="intent"
                    className="text-body text-main-text-headlines hover:text-primary-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {firestorePages
                .filter((p) => p.slug !== "terms" && p.slug !== "privacy")
                .map((page) => (
                  <li key={page.id}>
                    <Link
                      to={`/page/${page.slug}`}
                      prefetch="intent"
                      className="text-body text-main-text-headlines hover:text-primary-gold transition-colors"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-buttons font-bold uppercase tracking-wider text-main-text-headlines">
              CONTACT
            </h2>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-main-text-headlines">
                  PHONE
                </p>
                <p className="mt-1 text-body text-main-text-headlines">
                  {siteConfig?.phone?.trim() || FALLBACK.phone}
                </p>
              </div>
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-main-text-headlines">
                  EMAIL
                </p>
                <a
                  href={`mailto:${siteConfig?.email?.trim() || FALLBACK.email}`}
                  className="mt-1 block text-body text-main-text-headlines hover:text-primary-gold transition-colors"
                >
                  {siteConfig?.email?.trim() || FALLBACK.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-main-text-headlines">
                  OFFICE
                </p>
                <p className="mt-1 text-body text-main-text-headlines leading-snug whitespace-pre-line">
                  {siteConfig?.location?.trim() || FALLBACK.location}
                </p>
              </div>
              <a
                href={
                  whatsappUrlFromNumber(siteConfig?.whatsapp) ||
                  FALLBACK.whatsappUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-body text-main-text-headlines hover:text-primary-gold transition-colors"
              >
                WhatsApp Quick Connect
              </a>
              <SocialMediaLinks
                siteConfig={siteConfig}
                className="mt-4 flex items-center gap-3"
              />
            </div>
          </div>

          {/* Market Insights */}
          <div>
            <h2 className="text-buttons font-bold uppercase tracking-wider text-main-text-headlines">
              MARKET INSIGHTS
            </h2>
            <form className="mt-6 space-y-4" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder="Email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                classNames={{
                  input:
                    "text-main-text-headlines placeholder:text-secondary-text-body-paragraphs",
                  inputWrapper:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                }}
              />
              <Button
                radius="none"
                type="submit"
                size="lg"
                isLoading={isSubmittingNewsletter}
                className="w-full bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state uppercase"
              >
                GET MARKET INSIGHTS
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-soft-divider-line pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body text-muted-labels text-sm">
            © 2026 Jesfem Multiservice Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-labels">
            <Link
              to={faqPage ? `/page/${faqPage.slug}` : "/faq"}
              prefetch="intent"
              className="hover:text-primary-gold transition-colors"
            >
              FAQ
            </Link>
            <span>|</span>
            <Link
              to={privacyPage ? `/page/${privacyPage.slug}` : "/privacy"}
              prefetch="intent"
              className="hover:text-primary-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              to={termsPage ? `/page/${termsPage.slug}` : "/terms"}
              prefetch="intent"
              className="hover:text-primary-gold transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
