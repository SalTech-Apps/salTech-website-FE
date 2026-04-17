import { Link, useLoaderData } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { Spinner, Progress } from "@heroui/react";
import {
  IoArrowBackOutline,
  IoLocationOutline,
  IoBusinessOutline,
  IoCalendarOutline,
  IoConstructOutline,
} from "react-icons/io5";
import type { Project } from "@/types/firestore";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { projectSchema, breadcrumbSchema } from "@/lib/jsonld";

export function meta({
  params,
  location,
  matches,
}: {
  params: { id: string };
  location: { pathname: string };
  matches: Array<{ data?: { project: Project | null } }>;
}) {
  const loaderData = matches.at(-1)?.data;
  const project = loaderData?.project;
  if (project) {
    return buildMetaTags({
      title: project.title,
      description: project.description?.slice(0, 160) || `${project.title} - JESFEM project portfolio`,
      image: project.image,
      path: location.pathname,
    });
  }
  return buildMetaTags({
    title: "Project",
    description: "View JESFEM real estate project details.",
    path: location.pathname,
  });
}

export async function clientLoader({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return { project: null };
  const snap = await getDoc(doc(db, "projects", id));
  const project = snap.exists()
    ? ({ id: snap.id, ...snap.data() } as Project)
    : null;
  return { project };
}

clientLoader.hydrate = true;

export function HydrateFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-main-background">
      <Spinner size="lg" color="warning" />
    </div>
  );
}

export default function ProjectDetail() {
  const { project } = useLoaderData() as { project: Project | null };

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-main-background">
        <h1 className="font-heading text-heading-h2 text-main-text-headlines">
          Project Not Found
        </h1>
        <Link
          to="/projects"
          prefetch="intent"
          className="mt-4 text-primary-gold hover:underline"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main-background">
      <JsonLd
        data={[
          projectSchema({
            name: project.title,
            description: project.description,
            image: project.image,
            location: project.location,
            path: `/projects/${project.id}`,
            status: project.status,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.id}` },
          ]),
        ]}
      />
      {/* Hero image */}
      {project.image && (
        <div className="relative h-[45vh] w-full overflow-hidden bg-secondary-background">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-main-background/80 via-transparent to-transparent" />
          {/* Status badge */}
          <div className="absolute bottom-6 left-6">
            {project.status === "ongoing" ? (
              <span className="rounded-full bg-primary-gold px-4 py-1.5 text-sm font-semibold text-main-background">
                Ongoing
              </span>
            ) : (
              <span className="rounded-full bg-green-500 px-4 py-1.5 text-sm font-semibold text-white">
                Completed
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          to="/projects"
          prefetch="intent"
          className="mb-8 inline-flex items-center gap-2 text-sm text-secondary-text-body-paragraphs hover:text-primary-gold transition-colors"
        >
          <IoArrowBackOutline />
          Back to Projects
        </Link>

        <h1 className="mt-2 font-heading text-heading-h1 text-main-text-headlines">
          {project.title}
        </h1>

        {/* Key details */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-lg border border-soft-divider-line bg-secondary-background p-4">
            <IoLocationOutline
              size={20}
              className="mt-0.5 shrink-0 text-primary-gold"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-labels">
                Location
              </p>
              <p className="mt-1 text-body text-main-text-headlines">
                {project.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-soft-divider-line bg-secondary-background p-4">
            <IoBusinessOutline
              size={20}
              className="mt-0.5 shrink-0 text-primary-gold"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-labels">
                Type
              </p>
              <p className="mt-1 text-body text-main-text-headlines">
                {project.type}
              </p>
            </div>
          </div>

          {project.status === "completed" && project.yearCompleted && (
            <div className="flex items-start gap-3 rounded-lg border border-soft-divider-line bg-secondary-background p-4">
              <IoCalendarOutline
                size={20}
                className="mt-0.5 shrink-0 text-primary-gold"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-labels">
                  Year Completed
                </p>
                <p className="mt-1 text-body text-main-text-headlines">
                  {project.yearCompleted}
                </p>
              </div>
            </div>
          )}

          {project.status === "ongoing" && project.expectedCompletion && (
            <div className="flex items-start gap-3 rounded-lg border border-soft-divider-line bg-secondary-background p-4">
              <IoCalendarOutline
                size={20}
                className="mt-0.5 shrink-0 text-primary-gold"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-labels">
                  Expected Completion
                </p>
                <p className="mt-1 text-body text-main-text-headlines">
                  {project.expectedCompletion}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Progress bar for ongoing */}
        {project.status === "ongoing" &&
          project.progressPercent !== undefined && (
            <div className="mt-8 rounded-xl border border-soft-divider-line bg-secondary-background p-6">
              <div className="mb-3 flex items-center gap-2">
                <IoConstructOutline className="text-primary-gold" size={18} />
                <p className="font-semibold text-main-text-headlines">
                  Construction Progress
                </p>
              </div>
              <Progress
                value={project.progressPercent}
                size="md"
                classNames={{
                  base: "max-w-full",
                  track: "bg-soft-divider-line",
                  indicator: "bg-primary-gold",
                }}
              />
              <p className="mt-3 text-sm font-semibold text-primary-gold">
                {project.progressPercent}% Complete
              </p>
            </div>
          )}

        {/* Description */}
        {project.description && (
          <div className="mt-10">
            <h2 className="mb-4 font-heading text-heading-h3 text-main-text-headlines">
              About This Project
            </h2>
            <p className="whitespace-pre-line text-body leading-relaxed text-secondary-text-body-paragraphs">
              {project.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
