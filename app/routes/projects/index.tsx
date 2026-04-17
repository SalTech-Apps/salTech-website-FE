import {
  ProjectsHeroSection,
  CompletedProjectsSection,
  OngoingProjectsSection,
} from "@/components/projects";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Projects & Portfolio",
    description:
      "Explore JESFEM's completed and ongoing real estate projects. View our portfolio of premium developments across Nigeria.",
    path: location.pathname,
  });
}

export default function Projects() {
  return (
    <div className="flex flex-col w-full">
      <JsonLd
        data={webPageSchema({
          name: "Projects & Portfolio",
          description: "Explore JESFEM's completed and ongoing real estate projects across Nigeria.",
          path: "/projects",
        })}
      />
      <ProjectsHeroSection />
      <CompletedProjectsSection />
      <OngoingProjectsSection />
    </div>
  );
}
