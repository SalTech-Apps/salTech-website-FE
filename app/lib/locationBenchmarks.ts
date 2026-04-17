/** Per-area qualitative signals (aligned with Lagos market briefs). */
export type LocationIntelMeta = {
  infrastructure_rating: number;
  demand_index: string;
  connectivity_status: string;
  security_level: string;
};

export type LocationBenchmark = {
  location: string;
  price_mid: number;
  rent_mid: number;
  expense_ratio: number;
  growth_conservative: number;
  growth_base: number;
  growth_optimistic: number;
  confidence: number;
} & LocationIntelMeta;

type LocationBenchmarkRow = {
  location: string;
  price_mid: number;
  rent_mid: number;
  expense_ratio: number;
  growth_conservative: number;
  growth_base: number;
  growth_optimistic: number;
  confidence: number;
};

const DEFAULT_INTEL: LocationIntelMeta = {
  infrastructure_rating: 8,
  demand_index: "High",
  connectivity_status: "Good",
  security_level: "8/10",
};

/** Normalized location name → intelligence display fields */
const LOCATION_INTEL_BY_KEY: Record<string, LocationIntelMeta> = {
  "banana island": {
    infrastructure_rating: 10,
    demand_index: "Extremely High",
    connectivity_status: "Prime",
    security_level: "10/10",
  },
  ikoyi: {
    infrastructure_rating: 9,
    demand_index: "Very High",
    connectivity_status: "Prime",
    security_level: "9/10",
  },
  "victoria island": {
    infrastructure_rating: 9,
    demand_index: "Very High",
    connectivity_status: "Prime",
    security_level: "8/10",
  },
  "lekki phase 1": {
    infrastructure_rating: 8,
    demand_index: "Very High",
    connectivity_status: "Prime",
    security_level: "8/10",
  },
  oniru: {
    infrastructure_rating: 8,
    demand_index: "High",
    connectivity_status: "Good",
    security_level: "8/10",
  },
  "eko atlantic": {
    infrastructure_rating: 10,
    demand_index: "High",
    connectivity_status: "Prime",
    security_level: "10/10",
  },
  "ikeja gra": {
    infrastructure_rating: 8,
    demand_index: "High",
    connectivity_status: "Good",
    security_level: "9/10",
  },
  maryland: {
    infrastructure_rating: 7,
    demand_index: "Medium-High",
    connectivity_status: "Good",
    security_level: "7/10",
  },
  "magodo phase 2": {
    infrastructure_rating: 7,
    demand_index: "High",
    connectivity_status: "Good",
    security_level: "8/10",
  },
  "omole phase 2": {
    infrastructure_rating: 7,
    demand_index: "High",
    connectivity_status: "Good",
    security_level: "8/10",
  },
  yaba: {
    infrastructure_rating: 6,
    demand_index: "Very High",
    connectivity_status: "Developing",
    security_level: "6/10",
  },
  gbagada: {
    infrastructure_rating: 7,
    demand_index: "High",
    connectivity_status: "Good",
    security_level: "7/10",
  },
  surulere: {
    infrastructure_rating: 6,
    demand_index: "Medium-High",
    connectivity_status: "Developing",
    security_level: "6/10",
  },
  ogudu: {
    infrastructure_rating: 7,
    demand_index: "High",
    connectivity_status: "Good",
    security_level: "7/10",
  },
  ajah: {
    infrastructure_rating: 6,
    demand_index: "High",
    connectivity_status: "Developing",
    security_level: "6/10",
  },
  sangotedo: {
    infrastructure_rating: 6,
    demand_index: "High",
    connectivity_status: "Developing",
    security_level: "6/10",
  },
  "ibeju-lekki": {
    infrastructure_rating: 5,
    demand_index: "Medium",
    connectivity_status: "Emerging",
    security_level: "5/10",
  },
  epe: {
    infrastructure_rating: 5,
    demand_index: "Medium-Low",
    connectivity_status: "Emerging",
    security_level: "6/10",
  },
  ikorodu: {
    infrastructure_rating: 5,
    demand_index: "Medium",
    connectivity_status: "Emerging",
    security_level: "5/10",
  },
  ogba: {
    infrastructure_rating: 6,
    demand_index: "Medium",
    connectivity_status: "Developing",
    security_level: "6/10",
  },
  festac: {
    infrastructure_rating: 6,
    demand_index: "Medium",
    connectivity_status: "Developing",
    security_level: "6/10",
  },
  ipaja: {
    infrastructure_rating: 4,
    demand_index: "Medium",
    connectivity_status: "Emerging",
    security_level: "5/10",
  },
  apapa: {
    infrastructure_rating: 5,
    demand_index: "Low",
    connectivity_status: "Developing",
    security_level: "5/10",
  },
  ojo: {
    infrastructure_rating: 5,
    demand_index: "Medium",
    connectivity_status: "Emerging",
    security_level: "5/10",
  },
  agege: {
    infrastructure_rating: 5,
    demand_index: "Medium",
    connectivity_status: "Emerging",
    security_level: "5/10",
  },
};

const LOCATION_DATASET: LocationBenchmarkRow[] = [
  {
    location: "Banana Island",
    price_mid: 900000000,
    rent_mid: 47500000,
    expense_ratio: 0.24,
    growth_conservative: 0.04,
    growth_base: 0.06,
    growth_optimistic: 0.08,
    confidence: 0.9,
  },
  {
    location: "Ikoyi",
    price_mid: 800000000,
    rent_mid: 38500000,
    expense_ratio: 0.22,
    growth_conservative: 0.045,
    growth_base: 0.065,
    growth_optimistic: 0.085,
    confidence: 0.88,
  },
  {
    location: "Victoria Island",
    price_mid: 500000000,
    rent_mid: 30000000,
    expense_ratio: 0.21,
    growth_conservative: 0.045,
    growth_base: 0.07,
    growth_optimistic: 0.09,
    confidence: 0.85,
  },
  {
    location: "Lekki Phase 1",
    price_mid: 350000000,
    rent_mid: 23000000,
    expense_ratio: 0.2,
    growth_conservative: 0.06,
    growth_base: 0.085,
    growth_optimistic: 0.11,
    confidence: 0.86,
  },
  {
    location: "Oniru",
    price_mid: 400000000,
    rent_mid: 24000000,
    expense_ratio: 0.21,
    growth_conservative: 0.055,
    growth_base: 0.08,
    growth_optimistic: 0.1,
    confidence: 0.83,
  },
  {
    location: "Eko Atlantic",
    price_mid: 1200000000,
    rent_mid: 55000000,
    expense_ratio: 0.25,
    growth_conservative: 0.06,
    growth_base: 0.085,
    growth_optimistic: 0.11,
    confidence: 0.78,
  },
  {
    location: "Ikeja GRA",
    price_mid: 400000000,
    rent_mid: 20000000,
    expense_ratio: 0.2,
    growth_conservative: 0.045,
    growth_base: 0.065,
    growth_optimistic: 0.085,
    confidence: 0.8,
  },
  {
    location: "Maryland",
    price_mid: 180000000,
    rent_mid: 9000000,
    expense_ratio: 0.19,
    growth_conservative: 0.05,
    growth_base: 0.07,
    growth_optimistic: 0.09,
    confidence: 0.75,
  },
  {
    location: "Magodo Phase 2",
    price_mid: 200000000,
    rent_mid: 10000000,
    expense_ratio: 0.19,
    growth_conservative: 0.055,
    growth_base: 0.075,
    growth_optimistic: 0.095,
    confidence: 0.75,
  },
  {
    location: "Omole Phase 2",
    price_mid: 170000000,
    rent_mid: 9000000,
    expense_ratio: 0.18,
    growth_conservative: 0.055,
    growth_base: 0.075,
    growth_optimistic: 0.095,
    confidence: 0.73,
  },
  {
    location: "Yaba",
    price_mid: 160000000,
    rent_mid: 6000000,
    expense_ratio: 0.18,
    growth_conservative: 0.06,
    growth_base: 0.08,
    growth_optimistic: 0.1,
    confidence: 0.78,
  },
  {
    location: "Gbagada",
    price_mid: 150000000,
    rent_mid: 6000000,
    expense_ratio: 0.18,
    growth_conservative: 0.055,
    growth_base: 0.07,
    growth_optimistic: 0.09,
    confidence: 0.76,
  },
  {
    location: "Surulere",
    price_mid: 120000000,
    rent_mid: 5000000,
    expense_ratio: 0.18,
    growth_conservative: 0.055,
    growth_base: 0.075,
    growth_optimistic: 0.095,
    confidence: 0.75,
  },
  {
    location: "Ogudu",
    price_mid: 170000000,
    rent_mid: 8000000,
    expense_ratio: 0.18,
    growth_conservative: 0.055,
    growth_base: 0.075,
    growth_optimistic: 0.095,
    confidence: 0.74,
  },
  {
    location: "Ajah",
    price_mid: 85000000,
    rent_mid: 5500000,
    expense_ratio: 0.2,
    growth_conservative: 0.07,
    growth_base: 0.1,
    growth_optimistic: 0.13,
    confidence: 0.8,
  },
  {
    location: "Sangotedo",
    price_mid: 70000000,
    rent_mid: 4500000,
    expense_ratio: 0.2,
    growth_conservative: 0.075,
    growth_base: 0.105,
    growth_optimistic: 0.135,
    confidence: 0.78,
  },
  {
    location: "Ibeju-Lekki",
    price_mid: 40000000,
    rent_mid: 2500000,
    expense_ratio: 0.2,
    growth_conservative: 0.1,
    growth_base: 0.14,
    growth_optimistic: 0.18,
    confidence: 0.7,
  },
  {
    location: "Epe",
    price_mid: 25000000,
    rent_mid: 1500000,
    expense_ratio: 0.2,
    growth_conservative: 0.12,
    growth_base: 0.16,
    growth_optimistic: 0.2,
    confidence: 0.65,
  },
  {
    location: "Ikorodu",
    price_mid: 60000000,
    rent_mid: 3000000,
    expense_ratio: 0.19,
    growth_conservative: 0.07,
    growth_base: 0.09,
    growth_optimistic: 0.11,
    confidence: 0.72,
  },
  {
    location: "Ogba",
    price_mid: 100000000,
    rent_mid: 4500000,
    expense_ratio: 0.18,
    growth_conservative: 0.055,
    growth_base: 0.075,
    growth_optimistic: 0.095,
    confidence: 0.73,
  },
  {
    location: "Festac",
    price_mid: 90000000,
    rent_mid: 4000000,
    expense_ratio: 0.18,
    growth_conservative: 0.05,
    growth_base: 0.07,
    growth_optimistic: 0.09,
    confidence: 0.72,
  },
  {
    location: "Ipaja",
    price_mid: 65000000,
    rent_mid: 3000000,
    expense_ratio: 0.18,
    growth_conservative: 0.05,
    growth_base: 0.07,
    growth_optimistic: 0.09,
    confidence: 0.7,
  },
  {
    location: "Apapa",
    price_mid: 130000000,
    rent_mid: 6000000,
    expense_ratio: 0.19,
    growth_conservative: 0.04,
    growth_base: 0.06,
    growth_optimistic: 0.08,
    confidence: 0.68,
  },
  {
    location: "Ojo",
    price_mid: 55000000,
    rent_mid: 2500000,
    expense_ratio: 0.18,
    growth_conservative: 0.05,
    growth_base: 0.07,
    growth_optimistic: 0.09,
    confidence: 0.69,
  },
  {
    location: "Agege",
    price_mid: 60000000,
    rent_mid: 2800000,
    expense_ratio: 0.18,
    growth_conservative: 0.055,
    growth_base: 0.075,
    growth_optimistic: 0.095,
    confidence: 0.7,
  },
];

function normalizeLocationKey(s: string): string {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/,/g, " ")
    .replace(/\s+/g, " ");
}

const BENCHMARK_BY_KEY: Record<string, LocationBenchmarkRow> = Object.fromEntries(
  LOCATION_DATASET.map((b) => [normalizeLocationKey(b.location), b])
);

const FALLBACK_BENCHMARK_ROW =
  BENCHMARK_BY_KEY[normalizeLocationKey("Victoria Island")] ??
  LOCATION_DATASET[0];

function mergeBenchmarkRow(row: LocationBenchmarkRow): LocationBenchmark {
  const intelKey = normalizeLocationKey(row.location);
  const intel = LOCATION_INTEL_BY_KEY[intelKey] ?? DEFAULT_INTEL;
  return { ...row, ...intel };
}

export const LAGOS_LOCATION_BENCHMARKS: ReadonlyArray<LocationBenchmark> =
  LOCATION_DATASET.map((row) => mergeBenchmarkRow(row));

export function getLocationBenchmark(location: string): LocationBenchmark {
  const key = normalizeLocationKey(location);
  const row = BENCHMARK_BY_KEY[key] ?? FALLBACK_BENCHMARK_ROW;
  return mergeBenchmarkRow(row);
}

/** Form select values (kebab-case) → dataset `location` labels */
export const LOCATION_FORM_SLUG_TO_LABEL: Record<string, string> = {
  "banana-island": "Banana Island",
  ikoyi: "Ikoyi",
  "eko-atlantic": "Eko Atlantic",
  "victoria-island": "Victoria Island",
  oniru: "Oniru",
  "lekki-phase-1": "Lekki Phase 1",
  "ikeja-gra": "Ikeja GRA",
  "magodo-phase-2": "Magodo Phase 2",
  "omole-phase-2": "Omole Phase 2",
  ogudu: "Ogudu",
  yaba: "Yaba",
  gbagada: "Gbagada",
  surulere: "Surulere",
  maryland: "Maryland",
  ogba: "Ogba",
  lekki: "Lekki Phase 1",
  ajah: "Ajah",
  sangotedo: "Sangotedo",
  "ibeju-lekki": "Ibeju-Lekki",
  epe: "Epe",
  ikorodu: "Ikorodu",
  festac: "Festac",
  ipaja: "Ipaja",
  apapa: "Apapa",
};

export function getLocationBenchmarkFromFormSlug(slug: string): LocationBenchmark {
  const key = slug.trim().toLowerCase();
  const label = LOCATION_FORM_SLUG_TO_LABEL[key];
  if (label) return getLocationBenchmark(label);
  return getLocationBenchmark(slug.replace(/-/g, " "));
}

/** Warning when purchase price is outside 0.7–1.3× benchmark mid (informational only). */
export type BenchmarkPriceWarning = "above" | "below" | null;

export function getBenchmarkPriceWarning(
  purchasePrice: number,
  priceMid: number
): BenchmarkPriceWarning {
  if (!Number.isFinite(purchasePrice) || purchasePrice <= 0) return null;
  if (!Number.isFinite(priceMid) || priceMid <= 0) return null;
  const low = priceMid * 0.7;
  const high = priceMid * 1.3;
  if (purchasePrice > high) return "above";
  if (purchasePrice < low) return "below";
  return null;
}

export const MARKET_DATA_DISCLAIMER = {
  lastUpdatedYear: "2026",
  sourcesLine:
    "Knight Frank | Estate Intel | Nigeria Property Centre | Lagos Infrastructure Reports",
} as const;

/** Bedroom multiplier used in intelligence calculations (matches backend logic). */
export function getBedroomMultiplier(beds: number): number {
  if (!Number.isFinite(beds) || beds <= 0) return 1;
  if (beds === 1) return 0.85;
  if (beds === 2) return 1;
  if (beds === 3) return 1.1;
  if (beds === 4) return 1.2;
  return 1.35; // 5+
}

/** Standard compound growth formula: PV × (1 + r)^years */
export function compoundFutureValue(
  purchasePrice: number,
  growthRate: number,
  years: number
): number {
  if (!Number.isFinite(purchasePrice) || purchasePrice <= 0) return 0;
  if (!Number.isFinite(growthRate)) return purchasePrice;
  if (!Number.isFinite(years) || years <= 0) return purchasePrice;
  return purchasePrice * Math.pow(1 + growthRate, years);
}

