import type {
  ContentDepthChoice,
  FirstImpressionChoice,
  NavigationEaseRating,
  SectionsVisitedChoice,
  TechnicalPerformanceChoice,
} from "@/types/firestore";

export const COLLECTION = "websiteExperienceStudyResponses";
export const SURVEY_SUBMISSION_LOCAL_KEY = "jesfem_survey_submitted_week_v2";

export const FIRST_IMPRESSION_OPTIONS: Array<{
  value: FirstImpressionChoice;
  label: string;
}> = [
  { value: "crystal_clear", label: "Yes, crystal clear." },
  { value: "somewhat_clear", label: "Somewhat clear." },
  { value: "not_clear", label: "No, I was a bit confused." },
];

export const CONTENT_DEPTH_OPTIONS: Array<{
  value: ContentDepthChoice;
  label: string;
}> = [
  { value: "very_informative", label: "Yes, very informative." },
  { value: "good_start_need_more", label: "It’s a good start, but needs more data." },
  { value: "not_enough", label: "Not enough information yet." },
];

export const TECH_PERFORMANCE_OPTIONS: Array<{
  value: TechnicalPerformanceChoice;
  label: string;
}> = [
  { value: "perfect", label: "Everything worked perfectly." },
  { value: "minor_glitches", label: "I noticed a few minor glitches." },
  {
    value: "significant_issues",
    label: "I had significant issues (Please specify below).",
  },
];

export const NAVIGATION_RATING_OPTIONS: Array<{
  value: NavigationEaseRating;
  label: string;
}> = [1, 2, 3, 4, 5].map((n) => ({
  value: n as NavigationEaseRating,
  label: String(n),
}));

export const SECTIONS_VISITED_OPTIONS: Array<{
  value: SectionsVisitedChoice;
  label: string;
}> = [
  { value: "property_listings", label: "Property Listings" },
  { value: "investment_intelligence", label: "Investment Intelligence" },
  { value: "insights_blog", label: "Insights Blog" },
];
