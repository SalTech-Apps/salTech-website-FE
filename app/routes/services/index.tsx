import {
  ServicesBookCallSection,
  ServicesCoreSection,
  ServicesPageHero,
} from "@/components/saltech/services";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Services",
    description:
      "SalTech capabilities: MVP delivery, platform engineering, AI & automation, product design, and compliance-first engineering.",
    path: location.pathname,
  });
}

export default function ServicesPage() {
  return (
    <div className="flex w-full flex-col">
      <JsonLd
        data={webPageSchema({
          name: "Services",
          description:
            "Explore SalTech core services from rapid MVP delivery to compliance and security engineering.",
          path: "/services",
        })}
      />
      <ServicesPageHero />
      <ServicesCoreSection />
      <ServicesBookCallSection />
    </div>
  );
}
