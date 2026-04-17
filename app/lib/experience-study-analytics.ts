import { SECTIONS_VISITED_OPTIONS } from "@/components/survey/survey.constants";
import type {
  ContentDepthChoice,
  FirstImpressionChoice,
  NavigationEaseRating,
  SectionsVisitedChoice,
  WebsiteExperienceStudyResponse,
} from "@/types/firestore";

/** Matches dashboard Recharts fills (line, bars, pie slices). */
export const CHART_COLORS = ["#f59e0b", "#22c55e", "#3b82f6", "#ef4444", "#a855f7", "#14b8a6"];

const FIRST_IMPRESSION_SHORT_LABELS: Record<FirstImpressionChoice, string> = {
  crystal_clear: "Clear",
  somewhat_clear: "Somewhat",
  not_clear: "Confused",
};

const CONTENT_DEPTH_SHORT_LABELS: Record<ContentDepthChoice, string> = {
  very_informative: "Very informative",
  good_start_need_more: "Good start",
  not_enough: "Not enough",
};

const SECTIONS_VISITED_LABELS: Record<SectionsVisitedChoice, string> = Object.fromEntries(
  SECTIONS_VISITED_OPTIONS.map((o) => [o.value, o.label]),
) as Record<SectionsVisitedChoice, string>;

export type TrendPoint = { name: string; count: number };
export type NamedCount = { name: string; count: number };
export type NamedValue = { name: string; value: number };

export function computeExperienceStudyAnalytics(items: WebsiteExperienceStudyResponse[]) {
  const totalResponses = items.length;
  const averageNavigation =
    items.length > 0
      ? (items.reduce((sum, r) => sum + Number(r.navigationEaseRating), 0) / items.length).toFixed(1)
      : "0.0";
  const averageInvestmentLikelihood =
    items.length > 0
      ? (items.reduce((sum, r) => sum + Number(r.likelihoodToInvest), 0) / items.length).toFixed(1)
      : "0.0";
  const interestedCount = items.filter((r) => r.futureInterest).length;

  const countsByDay = new Map<string, number>();
  for (const r of items) {
    if (!r.createdAt || typeof r.createdAt.toDate !== "function") continue;
    const date = r.createdAt.toDate();
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    countsByDay.set(key, (countsByDay.get(key) ?? 0) + 1);
  }
  const responseTrendData: TrendPoint[] = [...countsByDay.entries()]
    .map(([key, count]) => {
      const [y, m, d] = key.split("-").map(Number);
      const date = new Date(y, m, d);
      return {
        name: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
        count,
        timestamp: date.getTime(),
      };
    })
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ name, count }) => ({ name, count }));

  const firstCounts: Record<FirstImpressionChoice, number> = {
    crystal_clear: 0,
    somewhat_clear: 0,
    not_clear: 0,
  };
  for (const r of items) firstCounts[r.firstImpression] += 1;
  const firstImpressionChartData: NamedValue[] = (Object.keys(firstCounts) as FirstImpressionChoice[]).map(
    (k) => ({
      name: FIRST_IMPRESSION_SHORT_LABELS[k],
      value: firstCounts[k],
    }),
  );

  const navCounts: Record<NavigationEaseRating, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of items) navCounts[r.navigationEaseRating as NavigationEaseRating] += 1;
  const navigationChartData: NamedCount[] = (Object.keys(navCounts) as unknown as NavigationEaseRating[]).map(
    (rating) => ({
      name: `${rating}/5`,
      count: navCounts[rating],
    }),
  );

  const sectionCounts: Record<SectionsVisitedChoice, number> = {
    property_listings: 0,
    investment_intelligence: 0,
    insights_blog: 0,
  };
  for (const r of items) {
    for (const section of r.sectionsVisited) sectionCounts[section] += 1;
  }
  const sectionsVisitedChartData: NamedCount[] = (Object.keys(sectionCounts) as SectionsVisitedChoice[]).map(
    (k) => ({
      name: SECTIONS_VISITED_LABELS[k],
      count: sectionCounts[k],
    }),
  );

  const depthCounts: Record<ContentDepthChoice, number> = {
    very_informative: 0,
    good_start_need_more: 0,
    not_enough: 0,
  };
  for (const r of items) depthCounts[r.contentDepth] += 1;
  const contentDepthChartData: NamedCount[] = (Object.keys(depthCounts) as ContentDepthChoice[]).map((k) => ({
    name: CONTENT_DEPTH_SHORT_LABELS[k],
    count: depthCounts[k],
  }));

  return {
    totalResponses,
    averageNavigation,
    averageInvestmentLikelihood,
    interestedCount,
    responseTrendData,
    firstImpressionChartData,
    navigationChartData,
    sectionsVisitedChartData,
    contentDepthChartData,
  };
}
