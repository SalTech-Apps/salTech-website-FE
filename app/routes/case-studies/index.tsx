import {
  CaseStudiesCtaSection,
  CaseStudiesPageHero,
  CaseStudiesProjectsSection,
} from "@/components/saltech/case-studies";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetaTags } from "@/lib/seo";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Case Studies",
    description:
      "Real SalTech projects and outcomes across health tech, events, and emerging platforms — named where we can, anonymised where we must.",
    path: location.pathname,
  });
}

export default function CaseStudiesPage() {
  return (
    <div className="flex w-full flex-col">
      <JsonLd
        data={webPageSchema({
          name: "Case Studies",
          description:
            "Explore representative engagements: product metrics, delivery timelines, and the stacks we used to ship.",
          path: "/case-studies",
        })}
      />
      <CaseStudiesPageHero />
      <Reveal>
        <CaseStudiesProjectsSection />
      </Reveal>
      <Reveal>
        <CaseStudiesCtaSection />
      </Reveal>
    </div>
  );
}
