import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { IoLocationOutline, IoBusinessOutline } from "react-icons/io5";
import { HiArrowRight } from "react-icons/hi2";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spinner } from "@heroui/react";
import type { Project } from "@/types/firestore";

function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  return (
    <article className="overflow-hidden border border-soft-divider-line bg-secondary-background transition-colors hover:border-primary-gold/40">
      <div className="aspect-4/3 w-full overflow-hidden bg-soft-divider-line">
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full w-full bg-secondary-background" aria-hidden />
        )}
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="font-heading text-heading-h3 text-main-text-headlines">
          {project.title}
        </h3>
        <div className="mt-4 space-y-2">
          <p className="flex items-center gap-2 text-body text-secondary-text-body-paragraphs">
            <IoLocationOutline className="shrink-0 text-primary-gold" />
            {project.location}
          </p>
          <p className="flex items-center gap-2 text-body text-secondary-text-body-paragraphs">
            <IoBusinessOutline className="shrink-0 text-primary-gold" />
            {project.type}
          </p>
          {project.yearCompleted && (
            <p className="text-body text-secondary-text-body-paragraphs">
              Year Completed: {project.yearCompleted}
            </p>
          )}
        </div>
        <Link
          to={`/projects/${project.id}`}
          prefetch="intent"
          className="mt-6 inline-flex items-center gap-2 text-body font-semibold text-primary-gold hover:text-soft-gold-hover-state transition-colors"
        >
          View Details
          <HiArrowRight className="text-lg" />
        </Link>
      </div>
    </article>
  );
}

export function CompletedProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const q = query(
          collection(db, "projects"),
          where("status", "==", "completed"),
          orderBy("order", "asc")
        );
        const snap = await getDocs(q);
        setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)));
      } catch (err) {
        console.error("Failed to load completed projects:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="border-t border-soft-divider-line bg-main-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Completed Projects" level="h2" goldLineAbove className="mb-14" />
          <div className="flex justify-center py-12">
            <Spinner size="lg" color="warning" />
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="border-t border-soft-divider-line bg-main-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Completed Projects"
          level="h2"
          goldLineAbove
          className="mb-14"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
