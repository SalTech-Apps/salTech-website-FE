import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamMemberDetailModal } from "@/components/team/TeamMemberDetailModal";
import { db } from "@/lib/firebase.client";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import type { TeamMember } from "@/types/firestore";

function TeamMemberCard({
  member,
  onViewDetails,
}: {
  member: TeamMember;
  onViewDetails: (member: TeamMember) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onViewDetails(member)}
      className="flex w-full flex-col gap-4 cursor-pointer rounded-xl border border-soft-divider-line bg-secondary-background p-5 text-left outline-none transition-colors hover:border-primary-gold/40 focus-visible:ring-2 focus-visible:ring-primary-gold/50 sm:flex-row"
    >
      <div className="mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full border border-soft-divider-line bg-main-background sm:mx-0">
        {member.profileImageUrl ? (
          <img
            src={member.profileImageUrl}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-labels">
            Jesfem
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-body font-semibold text-main-text-headlines">
          {member.name}
        </p>
        <p className="mt-1 text-sm text-primary-gold">{member.position}</p>
        {member.shortDescription && (
          <p className="mt-3 line-clamp-3 text-sm text-secondary-text-body-paragraphs">
            {member.shortDescription}
          </p>
        )}
        <p className="mt-2 text-xs text-muted-labels">
          Click to view full profile
        </p>
      </div>
    </button>
  );
}

export function LeadershipTeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailMember, setDetailMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    async function loadTeam() {
      setLoading(true);
      try {
        const q = query(
          collection(db, "teamMembers"),
          orderBy("createdAt", "asc")
        );
        const snap = await getDocs(q);
        const items: TeamMember[] = snap.docs.map((d) => {
          const data = d.data() as Omit<TeamMember, "id">;
          return { id: d.id, ...data };
        });
        setMembers(items);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load leadership team.");
      } finally {
        setLoading(false);
      }
    }

    void loadTeam();
  }, []);

  return (
    <section
      id="our-team"
      className="border-t border-soft-divider-line bg-main-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Leadership Team" level="h2" />
        <motion.div
          className="mx-auto mt-12 max-w-5xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="flex justify-center py-10">
              <span className="text-body text-muted-labels">
                Loading leadership team…
              </span>
            </div>
          ) : error ? (
            <div className="rounded-lg border border-soft-divider-line bg-secondary-background px-6 py-8 text-center">
              <p className="text-body text-secondary-text-body-paragraphs">
                {error}
              </p>
            </div>
          ) : members.length === 0 ? (
            <div className="rounded-lg border border-soft-divider-line bg-secondary-background px-6 py-8 text-center">
              <p className="text-body text-secondary-text-body-paragraphs">
                Leadership profiles will appear here once they have been added
                in the Jesfem Console.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {members.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    onViewDetails={setDetailMember}
                  />
                ))}
              </div>
              <TeamMemberDetailModal
                member={detailMember}
                isOpen={!!detailMember}
                onClose={() => setDetailMember(null)}
              />
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
