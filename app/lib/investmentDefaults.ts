import type { InvestmentData } from "@/types/firestore";

/** Nigeria-specific default values for investment intelligence. Used to prefill forms and display fallbacks when a field is missing. */
export const INVESTMENT_DATA_DEFAULTS: InvestmentData = {
  fiberConnectivity: "Ready (High)",
  commercialProximity: "2km",
  roadNetwork: "Good",
  powerSupply: "PHCN + Generator backup",
  waterSupply: "Borehole / Estate supply",
  floodRiskProfile: "LOW (ZONE A)",
  erosionSusceptibility: "MINIMAL",
  securityRating: "8.0",
  securityDescription: "Gated community with 24/7 security and access control.",
  marketDemand: "HIGH",
  marketDemandDescription:
    "Strong rental demand in the area; occupancy rates typically high.",
  titleDocument: "Governor's Consent",
  titleVerificationNote: "To be verified by Jesfem Legal Compliance Team.",
  tenure: "Freehold",
  surveyPlanStatus: "Available",
  buildingPlanStatus: "State approved",
  complianceNotes: [
    "SCUML registration mandatory for regulatory financial compliance.",
    "Building structural integrity certification to be verified.",
    "Asset to be confirmed free from government acquisition or third-party encumbrance.",
  ],
  scumlRequired: true,
};
