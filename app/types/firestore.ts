import type { Timestamp } from "firebase/firestore";

/** Investment intelligence data (Nigeria-relevant). All fields optional; UI uses defaults when missing. */
export interface InvestmentData {
  fiberConnectivity?: string;
  commercialProximity?: string;
  roadNetwork?: string;
  powerSupply?: string;
  waterSupply?: string;
  nearestLandmark?: string;
  estateName?: string;
  floodRiskProfile?: string;
  erosionSusceptibility?: string;
  securityRating?: string;
  securityDescription?: string;
  marketDemand?: string;
  marketDemandDescription?: string;
  titleDocument?: string;
  titleVerificationNote?: string;
  tenure?: string;
  surveyPlanStatus?: string;
  buildingPlanStatus?: string;
  complianceNotes?: string[];
  scumlRequired?: boolean;
}

export interface Property {
  id: string;
  /** URL-friendly identifier for property detail pages (e.g. /properties/luxury-villa-lekki). */
  slug?: string;
  title: string;
  location: string;
  price: string;
  status: string;
  beds: number;
  baths: number;
  sqm: number;
  image: string;
  thumbnails: string[];
  /** If true, show in Selected Listings on homepage. */
  featuredOnHomepage?: boolean;
  /** If true, show on /rentals page. */
  isRental?: boolean;
  features: string[];
  description?: string;
  /** e.g. House, Apartment — shown as a listing chip when set. */
  propertyType?: string;
  /** Short labels (e.g. Spotlight, Reduced) shown next to the status chip. */
  listingTags?: string[];
  /** EPC band letter or short label when available. */
  epcRating?: string;
  /** e.g. "Band G" — UK-style council tax; optional. */
  councilTax?: string;
  /** Broadband / connectivity note (overrides investment fiber line when set). */
  broadband?: string;
  /** Matterport or other 3D virtual tour URL. */
  virtualTourUrl?: string;
  /** Primary video tour URL (YouTube, Vimeo, etc.). */
  videoTourUrl?: string;
  /** Investment intelligence (location brief, legal summary, etc.). */
  investmentData?: InvestmentData;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

/** Working hours for a single day. Empty hours = closed or by appointment. */
export interface WorkingDayHours {
  day: string;
  hours: string;
}

/** Site-wide contact and business info (meta/siteConfig). */
export interface SiteConfig {
  phone?: string;
  whatsapp?: string;
  email?: string;
  location?: string;
  workingDays?: WorkingDayHours[];
  /** Social media profile URLs. Only shown in footer when configured. */
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  x?: string;
  linkedin?: string;
  /** WhatsApp Business channel URL (e.g. https://whatsapp.com/channel/xxx). */
  whatsappChannel?: string;
  /** Google Maps embed iframe `src` (Share → Embed a map). Contact page map. */
  mapEmbedUrl?: string;
  updatedAt: Timestamp | null;
}

export interface Consultation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: Timestamp | null;
  /** Admin's reply (stored when admin sends a reply from the console). */
  adminReply?: string;
  adminReplyAt?: Timestamp | null;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  source?: string;
  createdAt: Timestamp | null;
}

export interface TeamMember {
  id: string;
  /** Public-facing name of the team member. */
  name: string;
  /** Role or position, e.g. “Founder & CEO”. */
  position: string;
  /** Optional gender label (for internal use or filtering). */
  gender?: string;
  /** Contact phone number (optional for public display). */
  phone?: string;
  /** Contact email (optional for public display). */
  email?: string;
  /** Short, 1–2 line summary shown in list views. */
  shortDescription?: string;
  /** Longer biography or detailed description. */
  detailedDescription?: string;
  /** Firebase Storage URL for profile image. */
  profileImageUrl?: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface Insight {
  id: string;
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  /** SEO meta title (falls back to title when empty). */
  seoTitle?: string;
  /** SEO meta description (falls back to content excerpt when empty). */
  seoDescription?: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface PageContent {
  id: string;
  content: string;
  updatedAt: Timestamp | null;
}

/** Full page document in `pages` collection */
export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  /** Optional banner image URL (e.g. for page hero) */
  bannerImageUrl?: string;
  order: number;
  showInFooter: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  /** e.g. "15-Unit Residential Development" */
  type: string;
  status: "completed" | "ongoing";
  /** Year completed (e.g. "2025") — for completed projects */
  yearCompleted?: string;
  /** Human-readable expected completion (e.g. "December 2027") — for ongoing projects */
  expectedCompletion?: string;
  /** Completion percentage 0–100 — for ongoing projects */
  progressPercent?: number;
  /** Optional rich-text description (markdown) */
  description?: string;
  image: string;
  /** Used for sort order in the listings */
  order?: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

/** Lightweight item in meta/pagesList for fast footer loading */
export interface PageListItem {
  id: string;
  slug: string;
  title: string;
  order: number;
  showInFooter: boolean;
}

export interface OffPlan {
  id: string;
  slug?: string;
  title: string;
  location: string;
  price: string;
  status: string;
  developer?: string;
  apartmentType?: string;
  completion?: string;
  progress?: number;
  image: string;
  thumbnails?: string[];
  beds: number;
  baths: number;
  garages?: number;
  completionDate?: string;
  features?: string[];
  description?: string;
  order?: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface OffPlanWishlist {
  id: string;
  offPlanId: string;
  offPlanTitle: string;
  fullName: string;
  email: string;
  createdAt: Timestamp | null;
}

/** Review moderation: only `approved` appears on the public homepage. */
export type ReviewModerationStatus = "pending" | "approved" | "declined";

/** Testimonial in `reviews` (public sees approved only; admin manages all). */
export interface SiteReview {
  id: string;
  text: string;
  authorName: string;
  role?: string;
  moderationStatus: ReviewModerationStatus;
  createdAt: Timestamp | null;
  updatedAt?: Timestamp | null;
}

/** Visitor responses for the Website Experience Study (`/survey`). */
export type FirstImpressionChoice = "crystal_clear" | "somewhat_clear" | "not_clear";
export type NavigationEaseRating = 1 | 2 | 3 | 4 | 5;
export type ContentDepthChoice = "very_informative" | "good_start_need_more" | "not_enough";
export type TechnicalPerformanceChoice =
  | "perfect"
  | "minor_glitches"
  | "significant_issues";

export type SectionsVisitedChoice =
  | "property_listings"
  | "investment_intelligence"
  | "insights_blog";

export type LikelihoodToInvest = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface WebsiteExperienceStudyResponse {
  id: string;
  /**
   * Used for de-duplicating submissions within a time window.
   * (May be missing on older documents created before this field existed.)
   */
  email?: string;
  /** Client-side computed week bucket (milliseconds-based). */
  weekKey?: number;
  /** Lightweight device summary stored for analytics/prevention. */
  deviceInfo?: string;
  firstImpression: FirstImpressionChoice;
  navigationEaseRating: NavigationEaseRating;
  contentDepth: ContentDepthChoice;
  technicalPerformance: TechnicalPerformanceChoice;
  technicalPerformanceDetails?: string;
  investorLensText: string;
  futureInterest: boolean;
  sectionsVisited: SectionsVisitedChoice[];
  likelihoodToInvest: LikelihoodToInvest;
  missingMostText: string;
  createdAt: Timestamp | null;
  updatedAt?: Timestamp | null;
}
