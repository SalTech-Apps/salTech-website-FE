import type { TeamMember } from "@/types/firestore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { IoPencilOutline } from "react-icons/io5";

const GENDER_LABELS: Record<string, string> = {
  male: "Male",
  female: "Female",
  other: "Other / Prefer to self-describe",
  unspecified: "Prefer not to say",
};

interface TeamMemberDetailModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  /** When set, show an Edit button in the footer that calls this and then closes the modal. */
  onEdit?: (member: TeamMember) => void;
  /** When true, show gender and contact (admin only). */
  showPrivateFields?: boolean;
}

export function TeamMemberDetailModal({
  member,
  isOpen,
  onClose,
  onEdit,
  showPrivateFields = false,
}: TeamMemberDetailModalProps) {
  if (!member) return null;

  function handleEdit() {
    onEdit?.(member);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-secondary-background border border-soft-divider-line",
        header: "border-b border-soft-divider-line",
        body: "py-6",
        footer: "border-t border-soft-divider-line",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-left">
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-labels">
            Team member
          </span>
          <span className="font-heading text-xl text-main-text-headlines">
            {member.name}
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="shrink-0">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-xl border border-soft-divider-line bg-main-background sm:mx-0">
                {member.profileImageUrl ? (
                  <img
                    src={member.profileImageUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-labels">
                    No photo
                  </div>
                )}
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-labels">
                  Position
                </p>
                <p className="mt-1 text-body text-main-text-headlines">
                  {member.position}
                </p>
              </div>
              {showPrivateFields && member.gender && GENDER_LABELS[member.gender] && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-labels">
                    Gender
                  </p>
                  <p className="mt-1 text-body text-main-text-headlines">
                    {GENDER_LABELS[member.gender]}
                  </p>
                </div>
              )}
              {showPrivateFields && (member.email || member.phone) && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-labels">
                    Contact
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-body text-main-text-headlines">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-primary-gold underline hover:no-underline"
                      >
                        {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="text-primary-gold underline hover:no-underline"
                      >
                        {member.phone}
                      </a>
                    )}
                  </div>
                </div>
              )}
              {member.shortDescription && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-labels">
                    Short description
                  </p>
                  <p className="mt-1 text-body text-secondary-text-body-paragraphs">
                    {member.shortDescription}
                  </p>
                </div>
              )}
              {member.detailedDescription && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-labels">
                    Bio
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-body text-secondary-text-body-paragraphs">
                    {member.detailedDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-end gap-2">
          {onEdit && (
            <Button
              radius="none"
              className="bg-primary-gold text-main-background font-semibold"
              startContent={<IoPencilOutline size={16} />}
              onPress={handleEdit}
            >
              Edit
            </Button>
          )}
          <Button
            radius="none"
            variant="bordered"
            className="border-soft-divider-line text-main-text-headlines"
            onPress={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
