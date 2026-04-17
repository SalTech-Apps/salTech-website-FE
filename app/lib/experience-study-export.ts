import {
  CONTENT_DEPTH_OPTIONS,
  FIRST_IMPRESSION_OPTIONS,
  SECTIONS_VISITED_OPTIONS,
  TECH_PERFORMANCE_OPTIONS,
} from "@/components/survey/survey.constants";
import { CHART_COLORS, computeExperienceStudyAnalytics } from "@/lib/experience-study-analytics";
import {
  renderHorizontalBarChartPng,
  renderPieChartPng,
  renderTrendLineChartPng,
  renderVerticalBarChartPng,
} from "@/lib/experience-study-pdf-charts";
import { formatDeviceInfoSummary } from "@/lib/survey-device-info";
import type { SectionsVisitedChoice, WebsiteExperienceStudyResponse } from "@/types/firestore";

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

function optionsToMap<T extends string>(
  options: Array<{ value: T; label: string }>,
): Record<T, string> {
  return Object.fromEntries(options.map((o) => [o.value, o.label])) as Record<T, string>;
}

const FIRST_IMPRESSION_LABELS = optionsToMap(FIRST_IMPRESSION_OPTIONS);
const CONTENT_DEPTH_LABELS = optionsToMap(CONTENT_DEPTH_OPTIONS);
const TECH_PERFORMANCE_LABELS = optionsToMap(TECH_PERFORMANCE_OPTIONS);
const SECTIONS_VISITED_LABELS = optionsToMap(SECTIONS_VISITED_OPTIONS);

function formatWeekKey(weekKey?: number): string {
  if (typeof weekKey !== "number" || !Number.isFinite(weekKey)) return "";
  try {
    const start = new Date(weekKey * MS_PER_WEEK);
    return start.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function submittedIso(createdAt: WebsiteExperienceStudyResponse["createdAt"]): string {
  if (!createdAt || typeof createdAt.toDate !== "function") return "";
  try {
    return createdAt.toDate().toISOString();
  } catch {
    return "";
  }
}

function formatSubmittedForPdf(createdAt: WebsiteExperienceStudyResponse["createdAt"]): string {
  if (!createdAt || typeof createdAt.toDate !== "function") return "—";
  try {
    return createdAt.toDate().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function sectionsLabelled(sections: SectionsVisitedChoice[]): string {
  if (!sections.length) return "";
  return sections.map((s) => SECTIONS_VISITED_LABELS[s]).join("; ");
}

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function exportFilenameStem(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `jesfem-experience-study-${y}-${m}-${day}`;
}

function triggerTextDownload(filename: string, content: string, mime: string) {
  const blob = new Blob(["\uFEFF", content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function experienceStudyExportRow(r: WebsiteExperienceStudyResponse): string[] {
  return [
    submittedIso(r.createdAt),
    r.email ?? "",
    formatWeekKey(r.weekKey),
    FIRST_IMPRESSION_LABELS[r.firstImpression] ?? r.firstImpression,
    String(r.navigationEaseRating),
    CONTENT_DEPTH_LABELS[r.contentDepth] ?? r.contentDepth,
    TECH_PERFORMANCE_LABELS[r.technicalPerformance] ?? r.technicalPerformance,
    r.technicalPerformanceDetails ?? "",
    sectionsLabelled(r.sectionsVisited),
    String(r.likelihoodToInvest),
    r.investorLensText ?? "",
    r.missingMostText ?? "",
    r.futureInterest ? "Yes" : "No",
    formatDeviceInfoSummary(r.deviceInfo),
  ];
}

const CSV_HEADERS = [
  "submitted_at",
  "email",
  "week_bucket",
  "first_impression",
  "navigation_ease_1_5",
  "content_depth",
  "technical_performance",
  "technical_performance_details",
  "sections_visited",
  "likelihood_to_invest_1_10",
  "investor_lens",
  "missing_most",
  "future_interest",
  "os_browser",
] as const;

export function downloadExperienceStudyCsv(items: WebsiteExperienceStudyResponse[]): void {
  if (!items.length) return;
  const lines = [
    CSV_HEADERS.map(escapeCsvCell).join(","),
    ...items.map((r) => experienceStudyExportRow(r).map(escapeCsvCell).join(",")),
  ];
  triggerTextDownload(`${exportFilenameStem()}.csv`, lines.join("\r\n"), "text/csv;charset=utf-8");
}

const PAGE_TOP = 16;
const PAGE_BOTTOM = 282;
const LINE_H = 4.2;

function ensureSpace(doc: import("jspdf").default, y: number, neededMm: number): number {
  if (y + neededMm > PAGE_BOTTOM) {
    doc.addPage();
    return PAGE_TOP;
  }
  return y;
}

function writeFieldBlock(
  doc: import("jspdf").default,
  margin: number,
  contentW: number,
  y: number,
  label: string,
  value: string,
): number {
  y = ensureSpace(doc, y, LINE_H * 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(label, margin, y);
  y += LINE_H;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  const lines = doc.splitTextToSize(value || "—", contentW);
  for (const line of lines) {
    y = ensureSpace(doc, y, LINE_H);
    doc.text(line, margin, y);
    y += LINE_H;
  }
  y += 2;
  return y;
}

function appendResponseToPdf(
  doc: import("jspdf").default,
  r: WebsiteExperienceStudyResponse,
  index: number,
  margin: number,
  contentW: number,
  y: number,
): number {
  y = ensureSpace(doc, y, 28);
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y - 4, contentW, 9, "F");
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.rect(margin, y - 4, contentW, 9, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`Response ${index + 1} · ${formatSubmittedForPdf(r.createdAt)}`, margin + 2, y + 2.5);
  y += 14;

  y = writeFieldBlock(doc, margin, contentW, y, "Email", r.email ?? "—");
  y = writeFieldBlock(
    doc,
    margin,
    contentW,
    y,
    "Week bucket",
    typeof r.weekKey === "number" ? formatWeekKey(r.weekKey) : "—",
  );
  y = writeFieldBlock(
    doc,
    margin,
    contentW,
    y,
    "First impression",
    FIRST_IMPRESSION_LABELS[r.firstImpression] ?? r.firstImpression,
  );
  y = writeFieldBlock(
    doc,
    margin,
    contentW,
    y,
    "Navigation ease (1–5)",
    String(r.navigationEaseRating),
  );
  y = writeFieldBlock(
    doc,
    margin,
    contentW,
    y,
    "Content depth",
    CONTENT_DEPTH_LABELS[r.contentDepth] ?? r.contentDepth,
  );
  y = writeFieldBlock(
    doc,
    margin,
    contentW,
    y,
    "Technical performance",
    TECH_PERFORMANCE_LABELS[r.technicalPerformance] ?? r.technicalPerformance,
  );
  if (r.technicalPerformanceDetails?.trim()) {
    y = writeFieldBlock(doc, margin, contentW, y, "Technical details", r.technicalPerformanceDetails);
  }
  y = writeFieldBlock(
    doc,
    margin,
    contentW,
    y,
    "Sections visited",
    r.sectionsVisited.length ? sectionsLabelled(r.sectionsVisited) : "—",
  );
  y = writeFieldBlock(doc, margin, contentW, y, "Likelihood to invest (1–10)", String(r.likelihoodToInvest));
  y = writeFieldBlock(doc, margin, contentW, y, "Investor lens", r.investorLensText ?? "");
  if (r.missingMostText?.trim()) {
    y = writeFieldBlock(doc, margin, contentW, y, "What’s missing most", r.missingMostText);
  }
  y = writeFieldBlock(
    doc,
    margin,
    contentW,
    y,
    "Future interest",
    r.futureInterest ? "Yes, keep me in the loop." : "No, thank you.",
  );
  y = writeFieldBlock(doc, margin, contentW, y, "OS & browser", formatDeviceInfoSummary(r.deviceInfo));

  y += 6;
  return y;
}

export async function downloadExperienceStudyPdf(items: WebsiteExperienceStudyResponse[]): Promise<void> {
  if (!items.length) return;
  const { default: jsPDF } = await import("jspdf");

  const analytics = computeExperienceStudyAnalytics(items);
  const pngTrend = renderTrendLineChartPng(analytics.responseTrendData, "Responses over time");
  const pngNav = renderVerticalBarChartPng(
    analytics.navigationChartData,
    "Navigation rating distribution",
    "#3b82f6",
  );
  const pngPie = renderPieChartPng(analytics.firstImpressionChartData, "First impression breakdown", CHART_COLORS);
  const pngSections = renderHorizontalBarChartPng(
    analytics.sectionsVisitedChartData,
    "Sections visited",
    "#22c55e",
  );
  const pngDepth = renderVerticalBarChartPng(
    analytics.contentDepthChartData,
    "Content depth feedback",
    "#a855f7",
  );

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const margin = 14;
  const contentW = 210 - margin * 2;
  let y = 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(15, 23, 42);
  doc.text("JESFEM — Website Experience Study", margin, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Exported ${new Date().toLocaleString("en-GB")} · ${items.length} response(s)`, margin, y);
  y += 10;

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Summary", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const summaryLines = [
    `Total responses: ${analytics.totalResponses}`,
    `Average navigation ease: ${analytics.averageNavigation} / 5`,
    `Average likelihood to invest: ${analytics.averageInvestmentLikelihood} / 10`,
    `Future interest opt-in: ${analytics.interestedCount} / ${analytics.totalResponses}`,
  ];
  for (const line of summaryLines) {
    doc.text(line, margin, y);
    y += 5;
  }
  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Charts", margin, y);
  y += 6;

  const addImageScaled = (dataUrl: string, pxW: number, pxH: number, widthMm: number, startY: number): number => {
    const hMm = (widthMm * pxH) / pxW;
    const ny = ensureSpace(doc, startY, hMm + 6);
    doc.addImage(dataUrl, "PNG", margin, ny, widthMm, hMm);
    return ny + hMm + 8;
  };

  y = addImageScaled(pngTrend, 640, 220, contentW, y);

  const gap = 5;
  const halfW = (contentW - gap) / 2;
  const hHalfLeft = (halfW * 220) / 520;
  const hHalfRight = (halfW * 220) / 520;
  y = ensureSpace(doc, y, Math.max(hHalfLeft, hHalfRight) + 8);
  doc.addImage(pngNav, "PNG", margin, y, halfW, hHalfLeft);
  doc.addImage(pngPie, "PNG", margin + halfW + gap, y, halfW, hHalfRight);
  y += Math.max(hHalfLeft, hHalfRight) + 8;

  const hRow2Left = (halfW * 200) / 520;
  const hRow2Right = (halfW * 220) / 520;
  y = ensureSpace(doc, y, Math.max(hRow2Left, hRow2Right) + 8);
  doc.addImage(pngSections, "PNG", margin, y, halfW, hRow2Left);
  doc.addImage(pngDepth, "PNG", margin + halfW + gap, y, halfW, hRow2Right);
  y += Math.max(hRow2Left, hRow2Right) + 10;

  y = ensureSpace(doc, y, 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("Individual responses", margin, y);
  y += 10;

  items.forEach((r, i) => {
    y = appendResponseToPdf(doc, r, i + 1, margin, contentW, y);
  });

  doc.save(`${exportFilenameStem()}.pdf`);
}
