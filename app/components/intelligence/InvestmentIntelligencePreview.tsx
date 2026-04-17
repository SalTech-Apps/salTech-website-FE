import { IntelligenceCard } from "./IntelligenceCard";
import type { PropertyDetailsValues } from "./PropertyDetailsForm";
import {
  MARKET_DATA_DISCLAIMER,
  getBenchmarkPriceWarning,
  getBedroomMultiplier,
  getLocationBenchmarkFromFormSlug,
} from "@/lib/locationBenchmarks";
import {
  buildCapitalHorizonValues,
  buildRentalMetrics,
  getAdjustedGrowthRates,
  getHorizonYears,
  hasIntelPreviewInputs,
  parseBedroomsForIntel,
  parsePurchasePrice,
} from "@/lib/intelligenceCalculations";
import {
  IoCalculatorOutline,
  IoInformationCircleOutline,
  IoLocationOutline,
  IoShieldCheckmarkOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";

function formatNaira(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "₦0";
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

function formatNairaShort(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "₦0";
  if (n >= 1_000_000) return "₦" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return "₦" + (n / 1_000).toFixed(1) + "K";
  return "₦" + Math.round(n).toLocaleString();
}

function horizonLabel(horizon: string): string {
  const h = horizon.toLowerCase();
  if (h === "short") return "Short term (1–3 years)";
  if (h === "medium") return "Medium term (3–5 years)";
  if (h === "long") return "Long term (5+ years)";
  return "Selected horizon";
}

export interface InvestmentIntelligencePreviewProps {
  values: PropertyDetailsValues;
}

export function InvestmentIntelligencePreview({
  values,
}: InvestmentIntelligencePreviewProps) {
  const ready = hasIntelPreviewInputs(values);
  const goal = values.investmentGoal;
  const benchmark = ready
    ? getLocationBenchmarkFromFormSlug(values.location)
    : null;
  const priceNum = ready ? parsePurchasePrice(values.purchasePrice) : 0;
  const bedMult = ready
    ? getBedroomMultiplier(parseBedroomsForIntel(values.bedrooms))
    : 1;

  const priceWarning =
    ready && benchmark && priceNum > 0
      ? getBenchmarkPriceWarning(priceNum, benchmark.price_mid)
      : null;

  const rental = ready && benchmark && priceNum > 0
    ? buildRentalMetrics(benchmark, priceNum, bedMult)
    : null;

  const horizonYears = values.investmentHorizon
    ? getHorizonYears(values.investmentHorizon)
    : 5;
  const growthRates =
    ready && benchmark
      ? getAdjustedGrowthRates(benchmark, values.offPlan)
      : null;
  const horizonFv =
    ready && benchmark && priceNum > 0 && growthRates
      ? buildCapitalHorizonValues(priceNum, growthRates, horizonYears)
      : null;

  const placeholder =
    "Enter area, purchase price, and bedrooms to see live projections. Click Generate to email the full report.";

  return (
    <div className="flex flex-col gap-6">
      {goal === "rent" && (
        <>
          <IntelligenceCard
            icon={IoCalculatorOutline}
            title="Rental Income Projection"
            description="Annual rent from area benchmark × bedroom multiplier, applied to your purchase price for yield."
            placeholder={placeholder}
          >
            {ready && rental && benchmark ? (
              <div className="space-y-4">
                {priceWarning === "above" && (
                  <BenchmarkNote kind="above" goal="rent" />
                )}
                {priceWarning === "below" && (
                  <BenchmarkNote kind="below" goal="rent" />
                )}
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-buttons uppercase tracking-wider text-muted-labels">
                      Annual revenue estimate
                    </dt>
                    <dd className="mt-1 font-heading text-heading-h4 text-primary-gold">
                      {formatNairaShort(rental.annualRent)}
                    </dd>
                    <dd className="mt-1 text-sm text-muted-labels">
                      Benchmark: {benchmark.location} · Bed multiplier {bedMult}×
                    </dd>
                  </div>
                  <div>
                    <dt className="text-buttons uppercase tracking-wider text-muted-labels">
                      Gross yield
                    </dt>
                    <dd className="mt-1 font-heading text-heading-h4 text-primary-gold">
                      {(rental.grossYield * 100).toFixed(2)}%
                    </dd>
                  </div>
                  <div>
                    <dt className="text-buttons uppercase tracking-wider text-muted-labels">
                      Net yield
                    </dt>
                    <dd className="mt-1 font-heading text-heading-h4 text-primary-gold">
                      {(rental.netYield * 100).toFixed(2)}%
                    </dd>
                    <dd className="mt-1 text-sm text-muted-labels">
                      After typical operating costs (
                      {Math.round(benchmark.expense_ratio * 100)}%)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-buttons uppercase tracking-wider text-muted-labels">
                      Monthly cashflow (net)
                    </dt>
                    <dd className="mt-1 font-heading text-heading-h4 text-primary-gold">
                      {formatNaira(rental.netMonthly)}
                    </dd>
                  </div>
                </dl>
                <p className="text-sm text-muted-labels">
                  Dataset confidence score:{" "}
                  {(benchmark.confidence * 100).toFixed(0)}%
                </p>
              </div>
            ) : null}
          </IntelligenceCard>
        </>
      )}

      {goal === "resell" && (
        <>
          <IntelligenceCard
            icon={IoTrendingUpOutline}
            title="Capital Growth & Future Value"
            description="Compound growth from location benchmark rates (conservative / base / optimistic), adjusted for your horizon."
            placeholder={placeholder}
          >
            {ready && horizonFv && benchmark && growthRates ? (
              <div className="space-y-4">
                {priceWarning === "above" && (
                  <BenchmarkNote kind="above" goal="resell" />
                )}
                {priceWarning === "below" && (
                  <BenchmarkNote kind="below" goal="resell" />
                )}
                <p className="text-body text-secondary-text-body-paragraphs">
                  {horizonLabel(values.investmentHorizon)} ·{" "}
                  <span className="text-main-text-headlines font-medium">
                    {horizonYears} years
                  </span>{" "}
                  projection
                  {values.offPlan === "yes"
                    ? " · off-plan growth adjustment applied"
                    : ""}
                </p>
                <dl className="space-y-3">
                  <div className="flex justify-between gap-4 border-b border-soft-divider-line/60 pb-3">
                    <dt className="text-muted-labels">Conservative</dt>
                    <dd className="text-right font-medium text-primary-gold">
                      {formatNairaShort(horizonFv.conservative)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-soft-divider-line/60 pb-3">
                    <dt className="text-muted-labels">Base</dt>
                    <dd className="text-right font-medium text-primary-gold">
                      {formatNairaShort(horizonFv.base)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-labels">Optimistic</dt>
                    <dd className="text-right font-medium text-primary-gold">
                      {formatNairaShort(horizonFv.optimistic)}
                    </dd>
                  </div>
                </dl>
                <p className="text-sm text-muted-labels">
                  Annual growth assumptions:{" "}
                  {(growthRates.conservative * 100).toFixed(1)}% /{" "}
                  {(growthRates.base * 100).toFixed(1)}% /{" "}
                  {(growthRates.optimistic * 100).toFixed(1)}% p.a.
                </p>
                <p className="text-sm text-muted-labels">
                  Dataset confidence score:{" "}
                  {(benchmark.confidence * 100).toFixed(0)}%
                </p>
              </div>
            ) : null}
          </IntelligenceCard>

          <IntelligenceCard
            icon={IoLocationOutline}
            title="Location Intelligence"
            description="Area signals from the benchmark dataset for this location."
            placeholder={placeholder}
          >
            {ready && benchmark ? (
              <ul className="space-y-2 text-body text-main-text-headlines">
                <li>
                  <span className="text-muted-labels">Infrastructure rating: </span>
                  {benchmark.infrastructure_rating}/10
                </li>
                <li>
                  <span className="text-muted-labels">Demand index: </span>
                  {benchmark.demand_index}
                </li>
                <li>
                  <span className="text-muted-labels">Connectivity status: </span>
                  {benchmark.connectivity_status}
                </li>
                <li>
                  <span className="text-muted-labels">Security level: </span>
                  {benchmark.security_level}
                </li>
                <li>
                  <span className="text-muted-labels">Market confidence score: </span>
                  {(benchmark.confidence * 100).toFixed(0)}%
                </li>
              </ul>
            ) : null}
          </IntelligenceCard>

          <IntelligenceCard
            icon={IoShieldCheckmarkOutline}
            title="Legal & Regulatory Brief"
            description="Standard Lagos transaction context — not a substitute for professional legal advice."
            placeholder={placeholder}
          >
            {ready ? (
              <LegalBriefSnippet purchasePrice={priceNum} />
            ) : null}
          </IntelligenceCard>
        </>
      )}

      <div className="flex flex-col gap-2 border border-soft-divider-line bg-main-background/40 p-4 text-sm text-muted-labels">
        <p className="flex items-start gap-2">
          <IoInformationCircleOutline
            className="mt-0.5 h-4 w-4 shrink-0 text-primary-gold"
            aria-hidden
          />
          <span>
            Market Data Last Updated: {MARKET_DATA_DISCLAIMER.lastUpdatedYear}.
            Sources: {MARKET_DATA_DISCLAIMER.sourcesLine}.
          </span>
        </p>
      </div>
    </div>
  );
}

function BenchmarkNote({
  kind,
  goal,
}: {
  kind: "above" | "below";
  goal: "rent" | "resell";
}) {
  const text =
    kind === "above"
      ? goal === "rent"
        ? "The entered purchase price is above the typical benchmark for this area. Projected yields may appear lower than average."
        : "The entered purchase price is above the typical benchmark for this area. Capital growth projections may appear lower than typical for this area."
      : goal === "rent"
        ? "The entered purchase price is below the typical benchmark for this area. Projected yields may appear higher than average."
        : "The entered purchase price is below the typical benchmark for this area. Capital growth projections may appear higher than typical for this area.";
  return (
    <div
      className="border border-primary-gold/40 bg-primary-gold/10 px-3 py-2 text-body text-main-text-headlines"
      role="status"
    >
      <p className="text-buttons font-medium text-primary-gold">
        Market benchmark note
      </p>
      <p className="mt-1 text-sm text-secondary-text-body-paragraphs">{text}</p>
    </div>
  );
}

function LegalBriefSnippet({ purchasePrice }: { purchasePrice: number }) {
  const transferTaxEst =
    purchasePrice > 0
      ? `${formatNairaShort(purchasePrice * 0.015)} – ${formatNairaShort(purchasePrice * 0.02)}`
      : "—";
  return (
    <ul className="list-disc space-y-2 pl-5 text-body text-secondary-text-body-paragraphs">
      <li>
        Governor&apos;s Consent is typically required for valid transfer of
        legal title in Lagos State.
      </li>
      <li>
        Budget for transfer-related costs (often cited around 1.5%–2% of
        consideration): {transferTaxEst}.
      </li>
      <li>
        Verify title chain, survey plan, and building approvals before
        completion — engage a qualified lawyer for your specific transaction.
      </li>
    </ul>
  );
}
