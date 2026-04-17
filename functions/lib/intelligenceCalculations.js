"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePurchasePrice = parsePurchasePrice;
exports.parseBedroomsForIntel = parseBedroomsForIntel;
exports.getHorizonYears = getHorizonYears;
exports.getAdjustedGrowthRates = getAdjustedGrowthRates;
exports.buildRentalMetrics = buildRentalMetrics;
exports.buildCapitalHorizonValues = buildCapitalHorizonValues;
const locationBenchmarks_1 = require("./locationBenchmarks");
function parsePurchasePrice(raw) {
    return parseFloat(String(raw || "0").replace(/,/g, "")) || 0;
}
function parseBedroomsForIntel(beds) {
    if (beds === "5+")
        return 5;
    const n = parseInt(beds, 10);
    return Number.isFinite(n) && n > 0 ? n : 2;
}
function getHorizonYears(horizon) {
    const h = horizon.toLowerCase();
    if (h === "short")
        return 3;
    if (h === "medium")
        return 5;
    if (h === "long")
        return 10;
    return 5;
}
const OFF_PLAN_GROWTH_BUMP = 0.005;
function getAdjustedGrowthRates(benchmark, offPlan) {
    const bump = offPlan.toLowerCase() === "yes" ? OFF_PLAN_GROWTH_BUMP : 0;
    return {
        conservative: benchmark.growth_conservative + bump,
        base: benchmark.growth_base + bump,
        optimistic: benchmark.growth_optimistic + bump,
    };
}
function buildRentalMetrics(benchmark, purchasePrice, bedMult) {
    const annualRent = benchmark.rent_mid * bedMult;
    const grossYield = purchasePrice > 0 ? annualRent / purchasePrice : 0;
    const netYield = purchasePrice > 0
        ? (annualRent * (1 - benchmark.expense_ratio)) / purchasePrice
        : 0;
    const netMonthly = (annualRent * (1 - benchmark.expense_ratio)) / 12;
    return { annualRent, grossYield, netYield, netMonthly };
}
function buildCapitalHorizonValues(purchasePrice, rates, years) {
    return {
        conservative: (0, locationBenchmarks_1.compoundFutureValue)(purchasePrice, rates.conservative, years),
        base: (0, locationBenchmarks_1.compoundFutureValue)(purchasePrice, rates.base, years),
        optimistic: (0, locationBenchmarks_1.compoundFutureValue)(purchasePrice, rates.optimistic, years),
    };
}
//# sourceMappingURL=intelligenceCalculations.js.map