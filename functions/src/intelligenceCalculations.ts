import { compoundFutureValue, type LocationBenchmark } from "./locationBenchmarks";

export function parsePurchasePrice(raw: string): number {
  return parseFloat(String(raw || "0").replace(/,/g, "")) || 0;
}

export function parseBedroomsForIntel(beds: string): number {
  if (beds === "5+") return 5;
  const n = parseInt(beds, 10);
  return Number.isFinite(n) && n > 0 ? n : 2;
}

export function getHorizonYears(horizon: string): number {
  const h = horizon.toLowerCase();
  if (h === "short") return 3;
  if (h === "medium") return 5;
  if (h === "long") return 10;
  return 5;
}

const OFF_PLAN_GROWTH_BUMP = 0.005;

export function getAdjustedGrowthRates(
  benchmark: LocationBenchmark,
  offPlan: string
): { conservative: number; base: number; optimistic: number } {
  const bump = offPlan.toLowerCase() === "yes" ? OFF_PLAN_GROWTH_BUMP : 0;
  return {
    conservative: benchmark.growth_conservative + bump,
    base: benchmark.growth_base + bump,
    optimistic: benchmark.growth_optimistic + bump,
  };
}

export function buildRentalMetrics(
  benchmark: LocationBenchmark,
  purchasePrice: number,
  bedMult: number
) {
  const annualRent = benchmark.rent_mid * bedMult;
  const grossYield = purchasePrice > 0 ? annualRent / purchasePrice : 0;
  const netYield =
    purchasePrice > 0
      ? (annualRent * (1 - benchmark.expense_ratio)) / purchasePrice
      : 0;
  const netMonthly = (annualRent * (1 - benchmark.expense_ratio)) / 12;
  return { annualRent, grossYield, netYield, netMonthly };
}

export function buildCapitalHorizonValues(
  purchasePrice: number,
  rates: ReturnType<typeof getAdjustedGrowthRates>,
  years: number
) {
  return {
    conservative: compoundFutureValue(
      purchasePrice,
      rates.conservative,
      years
    ),
    base: compoundFutureValue(purchasePrice, rates.base, years),
    optimistic: compoundFutureValue(
      purchasePrice,
      rates.optimistic,
      years
    ),
  };
}
