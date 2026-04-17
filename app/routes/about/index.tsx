import {
  AboutHeroSection,
  OurStorySection,
  VisionGoalsSection,
  ByTheNumbersSection,
  LeadershipTeamSection,
  ComplianceSection,
  FloatingChatButton,
} from "@/components/about";
import { WhyInvestSection, CtaSection } from "@/components/home";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "About Us",
    description:
      "Learn about JESFEM's mission, vision, and team. We deliver premium real estate solutions and investment opportunities across Nigeria.",
    path: location.pathname,
  });
}

export default function About() {
  return (
    <div className="flex flex-col w-full">
      <JsonLd
        data={webPageSchema({
          name: "About Us",
          description: "Learn about JESFEM's mission, vision, and team. We deliver premium real estate solutions across Nigeria.",
          path: "/about",
        })}
      />
      <AboutHeroSection />
      <OurStorySection />
      <VisionGoalsSection />
      <ByTheNumbersSection />
      <LeadershipTeamSection />
      <WhyInvestSection />
      <ComplianceSection />
      <CtaSection
        heading="Work With a Team That Does It Right"
        primaryButtonLabel="GET STARTED TODAY"
        primaryButtonTo="/contact"
        showSecondaryButton={false}
      />
      <FloatingChatButton />
    </div>
  );
}
