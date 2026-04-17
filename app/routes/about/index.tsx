import {
  AboutInterestedSection,
  AboutMissionSection,
  AboutPageHero,
  AboutValuesSection,
} from "@/components/saltech/about";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetaTags } from "@/lib/seo";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "About",
    description:
      "SalTech builds mission-critical digital products for Africa and beyond — execution, security, and long-term ownership baked in.",
    path: location.pathname,
  });
}

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col">
      <JsonLd
        data={webPageSchema({
          name: "About SalTech",
          description:
            "Our mission, values, and the team behind production-grade software delivery.",
          path: "/about",
        })}
      />
      <AboutPageHero />
      <Reveal>
        <AboutMissionSection />
      </Reveal>
      <Reveal>
        <AboutValuesSection />
      </Reveal>
      <Reveal>
        <AboutInterestedSection />
      </Reveal>
    </div>
  );
}
