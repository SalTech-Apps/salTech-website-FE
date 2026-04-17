import { useState } from "react";
import type { InvestmentData, Property } from "@/types/firestore";
import { parsePriceToNumber } from "@/lib/properties";
import { INVESTMENT_DATA_DEFAULTS } from "@/lib/investmentDefaults";
import {
  IoDocumentTextOutline,
  IoTrendingUpOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import {
  getLocationBenchmark,
  getBedroomMultiplier,
  compoundFutureValue,
} from "@/lib/locationBenchmarks.ts";

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

export interface InvestmentIntelligenceProps {
  price: string;
  location: string;
  beds: number;
  investmentData?: Property["investmentData"];
}

type TabId = "rental" | "capital" | "location" | "legal";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "rental", label: "RENTAL PROJECTION", icon: IoDocumentTextOutline },
  { id: "capital", label: "CAPITAL GROWTH", icon: IoTrendingUpOutline },
  { id: "location", label: "LOCATION BRIEF", icon: IoGlobeOutline },
  { id: "legal", label: "LEGAL SUMMARY", icon: IoShieldCheckmarkOutline },
];

export function InvestmentIntelligence({
  price,
  location,
  beds,
  investmentData,
}: InvestmentIntelligenceProps) {
  const [activeTab, setActiveTab] = useState<TabId>("rental");
  const priceNum = parsePriceToNumber(price);
  const defaults = INVESTMENT_DATA_DEFAULTS;

  const inv = (key: keyof InvestmentData): string | string[] | boolean | undefined =>
    (investmentData?.[key] as string | string[] | boolean | undefined) ??
    (defaults[key] as string | string[] | boolean | undefined);

  const invStr = (key: keyof InvestmentData): string =>
    String(inv(key) ?? "");

  // Location benchmark-driven projections
  const benchmark = getLocationBenchmark(location);
  const bedMult = getBedroomMultiplier(beds);
  const annualRent = benchmark.rent_mid * bedMult;
  const grossYield = priceNum > 0 ? annualRent / priceNum : 0;
  const netYield =
    priceNum > 0
      ? (annualRent * (1 - benchmark.expense_ratio)) / priceNum
      : 0;
  const netMonthly = (annualRent * (1 - benchmark.expense_ratio)) / 12;

  // Capital growth projections (compound growth)
  const conservativeY1 = compoundFutureValue(
    priceNum,
    benchmark.growth_conservative,
    1
  );
  const conservativeY3 = compoundFutureValue(
    priceNum,
    benchmark.growth_conservative,
    3
  );
  const conservativeY5 = compoundFutureValue(
    priceNum,
    benchmark.growth_conservative,
    5
  );
  const baseY1 = compoundFutureValue(priceNum, benchmark.growth_base, 1);
  const baseY3 = compoundFutureValue(priceNum, benchmark.growth_base, 3);
  const baseY5 = compoundFutureValue(priceNum, benchmark.growth_base, 5);
  const optimisticY1 = compoundFutureValue(
    priceNum,
    benchmark.growth_optimistic,
    1
  );
  const optimisticY3 = compoundFutureValue(
    priceNum,
    benchmark.growth_optimistic,
    3
  );
  const optimisticY5 = compoundFutureValue(
    priceNum,
    benchmark.growth_optimistic,
    5
  );
  const pct = (v: number) =>
    priceNum > 0 ? (((v - priceNum) / priceNum) * 100).toFixed(1) : "0.0";

  return (
    <section className="border-t border-soft-divider-line pt-16">
      <h2 className="font-heading text-heading-h2 text-main-text-headlines mb-2">
        <span className="border-b-2 border-primary-gold pb-0.5">INVESTMENT</span> INTELLIGENCE
      </h2>
      <div className="mt-6 flex flex-wrap gap-1 border-b border-soft-divider-line">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-buttons font-medium uppercase tracking-wide transition-colors ${
              activeTab === id
                ? "border-b-2 border-primary-gold text-primary-gold"
                : "text-secondary-text-body-paragraphs hover:text-main-text-headlines"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-soft-divider-line bg-secondary-background p-6">
        {activeTab === "rental" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-buttons uppercase tracking-wider text-muted-labels">Rental Income (Annual)</p>
                <p className="mt-1 font-heading text-heading-h4 text-primary-gold">
                  {formatNairaShort(annualRent)}
                </p>
                <p className="mt-1 text-sm text-muted-labels uppercase">
                  Benchmark: {benchmark.location} · Beds: {beds} · Multiplier: {bedMult}×
                </p>
              </div>
              <div>
                <p className="text-buttons uppercase tracking-wider text-muted-labels">Gross Yield</p>
                <p className="mt-1 font-heading text-heading-h4 text-primary-gold">
                  {(grossYield * 100).toFixed(2)}%
                </p>
                <p className="mt-1 text-sm text-muted-labels uppercase">
                  Rent ÷ Purchase Price
                </p>
              </div>
              <div>
                <p className="text-buttons uppercase tracking-wider text-muted-labels">Net Yield</p>
                <p className="mt-1 font-heading text-heading-h4 text-primary-gold">
                  {(netYield * 100).toFixed(2)}%
                </p>
                <p className="mt-1 text-sm text-muted-labels uppercase">
                  After expenses ({Math.round(benchmark.expense_ratio * 100)}%)
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-heading-h4 text-main-text-headlines mb-4">Monthly Cash Flow Projection</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-body text-main-text-headlines">
                  <thead>
                    <tr className="border-b border-soft-divider-line">
                      <th className="text-left py-3 font-medium">Item Description</th>
                      <th className="text-right py-3 font-medium">Value (₦)</th>
                    </tr>
                  </thead>
                  <tbody className="text-secondary-text-body-paragraphs">
                    <tr className="border-b border-soft-divider-line/60">
                      <td className="py-3">Gross Monthly Rent</td>
                      <td className="text-right py-3">{Math.round(annualRent / 12).toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-soft-divider-line/60">
                      <td className="py-3">Operating Expenses ({Math.round(benchmark.expense_ratio * 100)}%)</td>
                      <td className="text-right py-3 text-red-400">
                        (
                        {Math.round((annualRent * benchmark.expense_ratio) / 12).toLocaleString()}
                        )
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-main-text-headlines">Net Monthly Cash Flow</td>
                      <td className="text-right py-3 font-medium text-main-text-headlines">
                        {Math.round(netMonthly).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-sm text-muted-labels">
              Confidence: {(benchmark.confidence * 100).toFixed(0)}% · Source: Location benchmark dataset
            </div>
          </div>
        )}

        {activeTab === "capital" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-heading-h4 text-main-text-headlines mb-4">5-Year Value Appreciation Projection</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-body mb-1">
                    <span className="text-secondary-text-body-paragraphs">
                      Conservative ({(benchmark.growth_conservative * 100).toFixed(1)}% P.A.)
                    </span>
                    <span className="text-primary-gold font-medium">{formatNairaShort(conservativeY5)}</span>
                  </div>
                  <div className="h-2 bg-soft-divider-line rounded-full overflow-hidden">
                    <div className="h-full bg-primary-gold/60 rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-body mb-1">
                    <span className="text-secondary-text-body-paragraphs">
                      Base ({(benchmark.growth_base * 100).toFixed(1)}% P.A.)
                    </span>
                    <span className="text-primary-gold font-medium">{formatNairaShort(baseY5)}</span>
                  </div>
                  <div className="h-2 bg-soft-divider-line rounded-full overflow-hidden">
                    <div className="h-full bg-primary-gold rounded-full" style={{ width: "65%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-body mb-1">
                    <span className="text-secondary-text-body-paragraphs">
                      Optimistic ({(benchmark.growth_optimistic * 100).toFixed(1)}% P.A.)
                    </span>
                    <span className="text-primary-gold font-medium">{formatNairaShort(optimisticY5)}</span>
                  </div>
                  <div className="h-2 bg-soft-divider-line rounded-full overflow-hidden">
                    <div className="h-full bg-primary-gold rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-heading-h4 text-main-text-headlines mb-4">Time Horizon Projection</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-body text-main-text-headlines">
                  <thead>
                    <tr className="border-b border-soft-divider-line">
                      <th className="text-left py-3 font-medium">Period</th>
                      <th className="text-right py-3 font-medium">
                        Conservative ({(benchmark.growth_conservative * 100).toFixed(1)}%)
                      </th>
                      <th className="text-right py-3 font-medium">
                        Base ({(benchmark.growth_base * 100).toFixed(1)}%)
                      </th>
                      <th className="text-right py-3 font-medium">
                        Optimistic ({(benchmark.growth_optimistic * 100).toFixed(1)}%)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-secondary-text-body-paragraphs">
                    <tr className="border-b border-soft-divider-line/60">
                      <td className="py-3">Year 1</td>
                      <td className="text-right py-3">{formatNaira(conservativeY1)}</td>
                      <td className="text-right py-3">{formatNaira(baseY1)}</td>
                      <td className="text-right py-3">{formatNaira(optimisticY1)}</td>
                    </tr>
                    <tr className="border-b border-soft-divider-line/60">
                      <td className="py-3">Year 3</td>
                      <td className="text-right py-3">{formatNaira(conservativeY3)}</td>
                      <td className="text-right py-3">{formatNaira(baseY3)}</td>
                      <td className="text-right py-3">{formatNaira(optimisticY3)}</td>
                    </tr>
                    <tr>
                      <td className="py-3">Year 5</td>
                      <td className="text-right py-3">{formatNaira(conservativeY5)}</td>
                      <td className="text-right py-3">{formatNaira(baseY5)}</td>
                      <td className="text-right py-3">{formatNaira(optimisticY5)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-muted-labels">
                Total appreciation (Base): +{pct(baseY5)}% over 5 years
              </p>
            </div>
            <div className="text-sm text-muted-labels">
              Benchmark: {benchmark.location} · Confidence: {(benchmark.confidence * 100).toFixed(0)}%
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-soft-divider-line bg-main-background p-5 rounded-lg">
              <h4 className="flex items-center gap-2 text-heading-h4 text-main-text-headlines mb-4">
                <IoGlobeOutline className="h-5 w-5 text-primary-gold" />
                Infrastructure & Amenities
              </h4>
              <dl className="space-y-2 text-body">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-labels">Fiber Connectivity</dt>
                  <dd className="text-main-text-headlines text-right">{invStr("fiberConnectivity")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-labels">Commercial Proximity</dt>
                  <dd className="text-main-text-headlines text-right">{invStr("commercialProximity")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-labels">Road Network</dt>
                  <dd className="text-main-text-headlines text-right">{invStr("roadNetwork")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-labels">Power Supply</dt>
                  <dd className="text-main-text-headlines text-right">{invStr("powerSupply")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-labels">Water Supply</dt>
                  <dd className="text-main-text-headlines text-right">{invStr("waterSupply")}</dd>
                </div>
                {invStr("nearestLandmark") && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-labels">Nearest Landmark</dt>
                    <dd className="text-main-text-headlines text-right">{invStr("nearestLandmark")}</dd>
                  </div>
                )}
                {invStr("estateName") && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-labels">Estate</dt>
                    <dd className="text-main-text-headlines text-right">{invStr("estateName")}</dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="border border-soft-divider-line bg-main-background p-5 rounded-lg">
              <h4 className="flex items-center gap-2 text-heading-h4 text-main-text-headlines mb-4">
                <IoInformationCircleOutline className="h-5 w-5 text-primary-gold" />
                Environmental Risk Analysis
              </h4>
              <dl className="space-y-2 text-body">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-labels">Flood Risk Profile</dt>
                  <dd className="text-right text-green-400 font-medium">{invStr("floodRiskProfile")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-labels">Erosion Susceptibility</dt>
                  <dd className="text-right text-green-400 font-medium">{invStr("erosionSusceptibility")}</dd>
                </div>
              </dl>
            </div>
            <div className="border border-soft-divider-line bg-main-background p-5 rounded-lg">
              <h4 className="flex items-center gap-2 text-heading-h4 text-main-text-headlines mb-4">
                <IoShieldCheckmarkOutline className="h-5 w-5 text-primary-gold" />
                Security Rating
              </h4>
              <p className="font-heading text-4xl text-primary-gold">{invStr("securityRating")}/10</p>
              <p className="mt-2 text-body text-secondary-text-body-paragraphs uppercase">
                {invStr("securityDescription")}
              </p>
            </div>
            <div className="border border-soft-divider-line bg-main-background p-5 rounded-lg">
              <h4 className="flex items-center gap-2 text-heading-h4 text-main-text-headlines mb-4">
                <IoTrendingUpOutline className="h-5 w-5 text-primary-gold" />
                Market Demand Index
              </h4>
              <p className="font-heading text-2xl text-primary-gold">{invStr("marketDemand")}</p>
              <p className="mt-2 text-body text-secondary-text-body-paragraphs uppercase">
                {invStr("marketDemandDescription")}
              </p>
            </div>
          </div>
        )}

        {activeTab === "legal" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-heading-h4 text-main-text-headlines mb-2">Primary Title Documentation</h4>
                <p className="font-heading text-xl text-primary-gold">{invStr("titleDocument")}</p>
                <p className="mt-1 text-sm text-muted-labels uppercase">{invStr("titleVerificationNote")}</p>
              </div>
              <div>
                <h4 className="text-heading-h4 text-main-text-headlines mb-3">Estimated Transaction Costs</h4>
                <dl className="space-y-2 text-body">
                  <div className="flex justify-between">
                    <dt className="text-muted-labels">Legal Fees (5%)</dt>
                    <dd className="text-main-text-headlines">{formatNaira(priceNum * 0.05)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-labels">Agency Commission (5%)</dt>
                    <dd className="text-main-text-headlines">{formatNaira(priceNum * 0.05)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-labels">Stamp Duty & Registration (1.5%)</dt>
                    <dd className="text-main-text-headlines">{formatNaira(priceNum * 0.015)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div>
              <h4 className="text-heading-h4 text-main-text-headlines mb-3">Strategic Compliance Notes</h4>
              <ul className="space-y-2 text-body text-secondary-text-body-paragraphs">
                {(Array.isArray(inv("complianceNotes")) ? (inv("complianceNotes") as string[]) : invStr("complianceNotes") ? [invStr("complianceNotes")] : []).map((note, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary-gold">•</span>
                    <span className="uppercase">{note}</span>
                  </li>
                ))}
                {inv("scumlRequired") && (
                  <li className="flex gap-2">
                    <span className="text-primary-gold">•</span>
                    <span className="uppercase">SCUML registration mandatory for regulatory financial compliance.</span>
                  </li>
                )}
              </ul>
              <p className="mt-4 text-sm text-muted-labels">Tenure: {invStr("tenure")}. Survey: {invStr("surveyPlanStatus")}. Building plan: {invStr("buildingPlanStatus")}.</p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center justify-center border-2 border-primary-gold px-6 py-3 text-buttons font-bold uppercase text-primary-gold hover:bg-primary-gold/10 transition-colors"
              >
                Access Verified Legal Documentation
              </a>
            </div>
          </div>
        )}
      </div>

      <p className="mt-6 flex items-center gap-2 text-sm text-muted-labels">
        <IoInformationCircleOutline className="h-4 w-4 shrink-0" />
        Estimates based on market data and assumptions. Not financial advice. Not a guarantee of future performance. All figures are illustrative of current market intelligence.
      </p>
    </section>
  );
}
