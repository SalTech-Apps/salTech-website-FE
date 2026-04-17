import type { OffPlan } from "@/types/firestore";
import { parsePriceToNumber } from "@/lib/properties";

export const OFF_PLAN_FILTER_KEYS = [
  "q",
  "location",
  "apartmentType",
  "status",
  "minBeds",
  "minPrice",
  "maxPrice",
  "sort",
] as const;

export type OffPlanFilterKey = (typeof OFF_PLAN_FILTER_KEYS)[number];

export interface OffPlanFilters {
  q: string;
  location: string;
  apartmentType: string;
  status: string;
  minBeds: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

export const DEFAULT_OFF_PLAN_FILTERS: OffPlanFilters = {
  q: "",
  location: "",
  apartmentType: "",
  status: "",
  minBeds: "",
  minPrice: "",
  maxPrice: "",
  sort: "featured",
};

/** Same bands as property listing filters for consistency. */
export const OFF_PLAN_PRICE_RANGES: {
  value: string;
  label: string;
  min?: string;
  max?: string;
}[] = [
  { value: "", label: "Any price" },
  { value: "under-50", label: "Under ₦50m", max: "50000000" },
  { value: "50-100", label: "₦50m – ₦100m", min: "50000000", max: "100000000" },
  {
    value: "100-200",
    label: "₦100m – ₦200m",
    min: "100000000",
    max: "200000000",
  },
  {
    value: "200-500",
    label: "₦200m – ₦500m",
    min: "200000000",
    max: "500000000",
  },
  { value: "over-500", label: "Over ₦500m", min: "500000000" },
];

export function offPlanPriceRangeKey(f: OffPlanFilters): string {
  const r = OFF_PLAN_PRICE_RANGES.find(
    (row) =>
      row.min === (f.minPrice || undefined) &&
      row.max === (f.maxPrice || undefined),
  );
  if (r) return r.value;
  if (f.minPrice || f.maxPrice) return "custom";
  return "";
}

export function offPlanHasActiveFilters(f: OffPlanFilters): boolean {
  return (
    !!f.q.trim() ||
    !!f.location ||
    !!f.apartmentType ||
    !!f.status ||
    !!f.minBeds ||
    !!f.minPrice ||
    !!f.maxPrice ||
    (f.sort !== "" && f.sort !== "featured")
  );
}

export function filtersFromOffPlanSearchParams(
  params: URLSearchParams,
): OffPlanFilters {
  const base = { ...DEFAULT_OFF_PLAN_FILTERS };
  OFF_PLAN_FILTER_KEYS.forEach((key) => {
    const v = params.get(key);
    if (v != null) base[key] = v;
  });
  return base;
}

export function searchParamsFromOffPlanFilters(
  f: OffPlanFilters,
): URLSearchParams {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.location) p.set("location", f.location);
  if (f.apartmentType) p.set("apartmentType", f.apartmentType);
  if (f.status) p.set("status", f.status);
  if (f.minBeds) p.set("minBeds", f.minBeds);
  if (f.minPrice) p.set("minPrice", f.minPrice);
  if (f.maxPrice) p.set("maxPrice", f.maxPrice);
  if (f.sort && f.sort !== "featured") p.set("sort", f.sort);
  return p;
}

export function sortOffPlans(items: OffPlan[], sort: string): OffPlan[] {
  const copy = [...items];
  const s = sort || "featured";

  switch (s) {
    case "price-asc":
      return copy.sort(
        (a, b) =>
          parsePriceToNumber(a.price) - parsePriceToNumber(b.price) ||
          a.title.localeCompare(b.title),
      );
    case "price-desc":
      return copy.sort(
        (a, b) =>
          parsePriceToNumber(b.price) - parsePriceToNumber(a.price) ||
          a.title.localeCompare(b.title),
      );
    case "title-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "beds-desc":
      return copy.sort(
        (a, b) =>
          (b.beds ?? 0) - (a.beds ?? 0) ||
          a.title.localeCompare(b.title),
      );
    case "featured":
    default:
      return copy.sort(
        (a, b) =>
          (a.order ?? 9999) - (b.order ?? 9999) ||
          a.title.localeCompare(b.title),
      );
  }
}

export function filterOffPlans(
  items: OffPlan[],
  f: OffPlanFilters,
): OffPlan[] {
  const q = f.q.trim().toLowerCase();
  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

  const filtered = items.filter((p) => {
    if (tokens.length > 0) {
      const hay = [p.title, p.location, p.developer ?? "", p.apartmentType ?? ""]
        .join(" ")
        .toLowerCase();
      if (!tokens.every((t) => hay.includes(t))) return false;
    }
    if (f.location && p.location !== f.location) return false;
    if (
      f.apartmentType &&
      (p.apartmentType ?? "").trim() !== f.apartmentType
    ) {
      return false;
    }
    if (f.status && p.status !== f.status) return false;
    const minBeds = f.minBeds ? Number(f.minBeds) : 0;
    if (minBeds > 0 && (p.beds ?? 0) < minBeds) return false;

    const price = parsePriceToNumber(p.price);
    const minP = f.minPrice ? parsePriceToNumber(f.minPrice) : 0;
    const maxP = f.maxPrice ? parsePriceToNumber(f.maxPrice) : Infinity;
    if (minP > 0 && price < minP) return false;
    if (maxP !== Infinity && price > maxP) return false;
    return true;
  });

  return sortOffPlans(filtered, f.sort);
}
