import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import type { Property } from "@/types/firestore";
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  SelectedListingsSection,
  WhyInvestSection,
  AbroadSection,
  HowWeWorkSection,
  TestimonialsSection,
  // TrustedDevelopersSection,
  JournalSection,
  CtaSection,
} from "@/components/home";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webSiteSchema } from "@/lib/jsonld";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Home",
    description:
      "Discover premium real estate and property investment opportunities in Nigeria. JESFEM offers luxury properties, off-plan deals, rentals, and expert investment guidance.",
    path: location.pathname,
  });
}

export default function Home() {
  const [featuredListings, setFeaturedListings] = useState<Property[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchFeatured() {
      try {
        const q = query(
          collection(db, "properties"),
          where("featuredOnHomepage", "==", true),
          orderBy("createdAt", "desc"),
        );
        const snap = await getDocs(q);
        if (cancelled) return;
        setFeaturedListings(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Property),
        );
      } catch {
        if (!cancelled) setFeaturedListings([]);
      } finally {
        if (!cancelled) setLoadingFeatured(false);
      }
    }
    fetchFeatured();
    return () => {
      cancelled = true;
    };
  }, []);
  // console.log({ featuredListings });
  return (
    <div className="flex flex-col w-full">
      <JsonLd data={webSiteSchema("/")} />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <SelectedListingsSection
        listings={featuredListings}
        loading={loadingFeatured}
      />
      <WhyInvestSection />
      <AbroadSection />
      <HowWeWorkSection />
      {/* <TestimonialsSection /> */}
      {/* <TrustedDevelopersSection /> */}
      <JournalSection />
      <CtaSection />
    </div>
  );
}
