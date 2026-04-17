import {
  SalTechHero,
  SalTechShowcase,
  SalTechCaseStudies,
  SalTechEnterprise,
  SalTechCapabilities,
  SalTechProcess,
  SalTechIndustries,
  SalTechTestimonials,
  SalTechBottomCta,
} from "@/components/home/saltech";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webSiteSchema } from "@/lib/jsonld";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Home",
    description:
      "SalTech builds mission-critical digital products for startups, enterprises, and governments — from MVP to production-grade platforms.",
    path: location.pathname,
  });
}

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-[#F9F9F9] font-saltech-sans text-[#111827] antialiased">
      <JsonLd data={webSiteSchema("/")} />
      <SalTechHero />
      <Reveal>
        <SalTechShowcase />
      </Reveal>
      <Reveal>
        <SalTechCaseStudies />
      </Reveal>
      <Reveal>
        <SalTechEnterprise />
      </Reveal>
      <Reveal>
        <SalTechCapabilities />
      </Reveal>
      <Reveal>
        <SalTechProcess />
      </Reveal>
      <Reveal>
        <SalTechIndustries />
      </Reveal>
      <Reveal>
        <SalTechTestimonials />
      </Reveal>
      <Reveal>
        <SalTechBottomCta />
      </Reveal>
    </div>
  );
}
