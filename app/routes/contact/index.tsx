import {
  ContactBriefSection,
  ContactFaqSection,
  ContactPageHero,
} from "@/components/saltech/contact";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetaTags } from "@/lib/seo";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Contact",
    description:
      "Reach SalTech for MVP delivery, platforms, and mission-critical software. We respond within one business day.",
    path: location.pathname,
  });
}

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col bg-white">
      <JsonLd
        data={webPageSchema({
          name: "Contact SalTech",
          description:
            "Send a project brief or get in touch — email, phone, and Pittsburgh office.",
          path: "/contact",
        })}
      />
      <ContactPageHero />
      <ContactBriefSection />
      <ContactFaqSection />
    </div>
  );
}
