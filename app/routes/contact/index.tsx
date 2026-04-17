import {
  ContactHeroSection,
  ContactInfoSection,
  ContactFormSection,
  ContactMapSection,
} from "@/components/contact";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { contactPageSchema } from "@/lib/jsonld";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Contact",
    description:
      "Get in touch with JESFEM for property inquiries, investment consultations, or general real estate advice. We're here to help.",
    path: location.pathname,
  });
}

export default function Contact() {
  return (
    <div className="flex flex-col w-full">
      <JsonLd data={contactPageSchema("/contact")} />
      <ContactHeroSection />
      <ContactInfoSection />
      <ContactFormSection />
      <ContactMapSection />
    </div>
  );
}
