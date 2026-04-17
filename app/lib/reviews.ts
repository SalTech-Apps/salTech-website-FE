import type { DocumentData } from "firebase/firestore";

import type { ReviewModerationStatus, SiteReview } from "@/types/firestore";

export const REVIEWS_PAGE_SIZE = 10;

/** Max length for review body on public submit and in console (keep in sync with `firestore.rules`). */
export const REVIEW_TEXT_MAX_LENGTH = 500;

function normalizeModerationStatus(data: DocumentData): ReviewModerationStatus {
  const s = data.moderationStatus;
  if (s === "pending" || s === "approved" || s === "declined") return s;
  // Legacy docs that used `published`
  if (data.published === true) return "approved";
  return "pending";
}

export function mapReviewDoc(id: string, data: DocumentData): SiteReview {
  return {
    id,
    text: String(data.text ?? ""),
    authorName: String(data.authorName ?? ""),
    role: data.role != null && String(data.role).trim() !== "" ? String(data.role) : undefined,
    moderationStatus: normalizeModerationStatus(data),
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
}
