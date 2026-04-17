"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendIntelligenceReport = exports.sendSurveySubmissionEmail = exports.sendContactFormNotification = exports.sendNewsletterEmail = void 0;
const nodemailer = require("nodemailer");
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const firestore_1 = require("firebase-admin/firestore");
const app_1 = require("firebase-admin/app");
const locationBenchmarks_1 = require("./locationBenchmarks");
const intelligenceCalculations_1 = require("./intelligenceCalculations");
// SMTP credentials from Google Cloud Secret Manager
const smtpUser = (0, params_1.defineSecret)("SMTP_USER");
const smtpPass = (0, params_1.defineSecret)("SMTP_PASS");
const smtpHost = (0, params_1.defineSecret)("SMTP_HOST");
const smtpPort = (0, params_1.defineSecret)("SMTP_PORT");
if (!(0, app_1.getApps)().length) {
    (0, app_1.initializeApp)();
}
/** Admin emails allowed to send newsletter. Must match firestore.rules / storage.rules. */
const ADMIN_EMAILS = ["emmajnr1000@gmail.com", "olubiyoolamide@gmail.com"];
/**
 * Callable Cloud Function that sends newsletter emails via Nodemailer.
 * Requires SMTP_USER and SMTP_PASS secrets to be set.
 *
 * Example SMTP providers:
 * - Gmail: smtp.gmail.com:465 (use App Password)
 * - SendGrid: smtp.sendgrid.net:587
 * - Mailgun: smtp.mailgun.org:587
 * - Resend: smtp.resend.com:465
 */
exports.sendNewsletterEmail = (0, https_1.onCall)({ secrets: [smtpUser, smtpPass, smtpHost, smtpPort] }, async (request) => {
    const email = request.auth?.token?.email;
    if (!email || !ADMIN_EMAILS.includes(email)) {
        throw new https_1.HttpsError("permission-denied", "Only admins can send newsletter emails");
    }
    const { to, subject, text, html } = request.data;
    if (!to || (Array.isArray(to) && to.length === 0)) {
        throw new https_1.HttpsError("invalid-argument", "Missing or empty recipient(s)");
    }
    if (!subject || typeof subject !== "string" || !subject.trim()) {
        throw new https_1.HttpsError("invalid-argument", "Missing or empty subject");
    }
    const recipients = Array.isArray(to) ? to : [to];
    const body = (html || text || "").trim() || undefined;
    const user = smtpUser.value();
    const pass = smtpPass.value();
    if (!user || !pass) {
        throw new https_1.HttpsError("failed-precondition", "SMTP credentials not configured. Set SMTP_USER and SMTP_PASS secrets.");
    }
    const host = smtpHost.value() || "smtp.gmail.com";
    const port = parseInt(smtpPort.value() || "465", 10);
    const from = process.env.SMTP_FROM || user;
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass,
        },
    });
    const mailOptions = {
        from,
        subject: subject.trim(),
        ...(body && (html ? { html: body } : { text: body })),
    };
    // Use BCC for multiple recipients so subscribers don't see each other's emails
    if (recipients.length === 1) {
        mailOptions.to = recipients[0];
    }
    else {
        mailOptions.to = user; // Send to self, BCC to all subscribers
        mailOptions.bcc = recipients;
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        return {
            success: true,
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
        };
    }
    catch (err) {
        console.error("Nodemailer error:", err);
        throw new https_1.HttpsError("internal", err instanceof Error ? err.message : "Failed to send email");
    }
});
/**
 * Sends an email to the admin when a contact form is submitted.
 * Reads admin email from meta/siteConfig; falls back to SMTP_USER if not set.
 */
exports.sendContactFormNotification = (0, https_1.onCall)({ secrets: [smtpUser, smtpPass, smtpHost, smtpPort] }, async (request) => {
    const data = request.data;
    if (!data?.fullName || !data?.email || !data?.message) {
        throw new https_1.HttpsError("invalid-argument", "Missing required contact form fields");
    }
    const user = smtpUser.value();
    const pass = smtpPass.value();
    if (!user || !pass) {
        throw new https_1.HttpsError("failed-precondition", "SMTP credentials not configured. Set SMTP_USER and SMTP_PASS secrets.");
    }
    let adminEmail = user;
    try {
        const databaseId = process.env.DATABASE_ID || process.env.VITE_FIREBASE_DATABASE_ID;
        const db = databaseId ? (0, firestore_1.getFirestore)(databaseId) : (0, firestore_1.getFirestore)();
        const siteConfigSnap = await db.doc("meta/siteConfig").get();
        const siteEmail = siteConfigSnap.data()?.email;
        if (siteEmail && typeof siteEmail === "string" && siteEmail.trim()) {
            adminEmail = siteEmail.trim();
        }
    }
    catch (e) {
        console.warn("Could not read siteConfig, using SMTP_USER as admin email:", e);
    }
    const subject = `New contact form: ${data.subject || "Consultation"}`;
    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone || "—")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject || "—")}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: sans-serif;">${escapeHtml(data.message)}</pre>
    `;
    const host = smtpHost.value() || "smtp.gmail.com";
    const port = parseInt(smtpPort.value() || "465", 10);
    const from = process.env.SMTP_FROM || user;
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });
    try {
        await transporter.sendMail({
            from,
            to: adminEmail,
            subject,
            html,
        });
        return { success: true };
    }
    catch (err) {
        console.error("Contact form notification error:", err);
        throw new https_1.HttpsError("internal", err instanceof Error ? err.message : "Failed to send notification");
    }
});
/**
 * Sends a confirmation email to the participant after survey submission.
 */
exports.sendSurveySubmissionEmail = (0, https_1.onCall)({ secrets: [smtpUser, smtpPass, smtpHost, smtpPort] }, async (request) => {
    const data = request.data;
    if (!data?.email || typeof data.email !== "string" || !data.email.trim()) {
        throw new https_1.HttpsError("invalid-argument", "Valid email is required");
    }
    const email = data.email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new https_1.HttpsError("invalid-argument", "Valid email is required");
    }
    const user = smtpUser.value();
    const pass = smtpPass.value();
    if (!user || !pass) {
        throw new https_1.HttpsError("failed-precondition", "SMTP credentials not configured. Set SMTP_USER and SMTP_PASS secrets.");
    }
    const host = smtpHost.value() || "smtp.gmail.com";
    const port = parseInt(smtpPort.value() || "465", 10);
    const from = process.env.SMTP_FROM || user;
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });
    const html = `
      <h2>Thank you for sharing your voice with JESFEM</h2>
      <p>We just received your survey response, and we truly appreciate the time and thought you put into it.</p>
      <p>Building a trusted Real estate investment experience takes honest feedback from people like you, and your input helps shape what we improve next.</p>
      <p>If you chose to hear from us, we will only send meaningful updates when we have something genuinely useful to share.</p>
      <p style="margin-top: 20px;">With appreciation,<br/>The JESFEM Team</p>
    `;
    try {
        await transporter.sendMail({
            from,
            to: email,
            subject: "JESFEM survey submission received",
            html,
        });
        return { success: true };
    }
    catch (err) {
        console.error("Survey submission email error:", err);
        throw new https_1.HttpsError("internal", err instanceof Error ? err.message : "Failed to send survey email");
    }
});
function escapeHtml(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
/**
 * Sends the investment intelligence report to the user's email.
 * Called from the public Intelligence page.
 */
exports.sendIntelligenceReport = (0, https_1.onCall)({ secrets: [smtpUser, smtpPass, smtpHost, smtpPort] }, async (request) => {
    const data = request.data;
    if (!data?.email || typeof data.email !== "string" || !data.email.trim()) {
        throw new https_1.HttpsError("invalid-argument", "Valid email is required");
    }
    const email = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new https_1.HttpsError("invalid-argument", "Valid email is required");
    }
    const user = smtpUser.value();
    const pass = smtpPass.value();
    if (!user || !pass) {
        throw new https_1.HttpsError("failed-precondition", "SMTP credentials not configured. Set SMTP_USER and SMTP_PASS secrets.");
    }
    const host = smtpHost.value() || "smtp.gmail.com";
    const port = parseInt(smtpPort.value() || "465", 10);
    const from = process.env.SMTP_FROM || user;
    const html = buildIntelligenceReportHtml(data);
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });
    try {
        await transporter.sendMail({
            from,
            to: email,
            subject: "Your Investment Intelligence Report – Jesfem",
            html,
        });
        return { success: true };
    }
    catch (err) {
        console.error("Intelligence report email error:", err);
        throw new https_1.HttpsError("internal", err instanceof Error ? err.message : "Failed to send report");
    }
});
function formatNaira(n) {
    if (n >= 1_000_000)
        return `₦${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000)
        return `₦${(n / 1_000).toFixed(1)}K`;
    return `₦${Math.round(n).toLocaleString()}`;
}
function buildIntelligenceReportHtml(data) {
    const loc = escapeHtml(data.location || "");
    const type = escapeHtml(data.propertyType || "");
    const beds = escapeHtml(data.bedrooms || "");
    const size = escapeHtml(data.sizeSqm || "");
    const priceNum = (0, intelligenceCalculations_1.parsePurchasePrice)(data.purchasePrice || "0");
    const benchmark = (0, locationBenchmarks_1.getLocationBenchmarkFromFormSlug)(data.location || "");
    const bedMult = (0, locationBenchmarks_1.getBedroomMultiplier)((0, intelligenceCalculations_1.parseBedroomsForIntel)(data.bedrooms || "2"));
    const goal = (data.investmentGoal || "").toLowerCase();
    const isResell = goal === "resell";
    const isRent = !isResell;
    const priceWarning = priceNum > 0
        ? (0, locationBenchmarks_1.getBenchmarkPriceWarning)(priceNum, benchmark.price_mid)
        : null;
    const rental = (0, intelligenceCalculations_1.buildRentalMetrics)(benchmark, priceNum, bedMult);
    const horizonYears = (0, intelligenceCalculations_1.getHorizonYears)(data.investmentHorizon || "");
    const growthRates = (0, intelligenceCalculations_1.getAdjustedGrowthRates)(benchmark, data.offPlan || "");
    const horizonFv = (0, intelligenceCalculations_1.buildCapitalHorizonValues)(priceNum, growthRates, horizonYears);
    const transferTaxPct = "1.5% – 2%";
    const transferTaxEst = priceNum > 0
        ? formatNaira(priceNum * 0.015) + " – " + formatNaira(priceNum * 0.02)
        : "—";
    function benchmarkNoteHtml(forRent) {
        if (priceWarning === "above") {
            const detail = forRent
                ? "Projected yields may appear lower than average."
                : "Capital growth projections may appear lower than typical for this area.";
            return `<p style="margin: 0 0 12px 0; padding: 10px; background: #fff8e6; border: 1px solid #e5d4a1; font-size: 0.9rem;"><strong>Market benchmark note</strong><br>The entered purchase price is above the typical benchmark for this area. ${detail}</p>`;
        }
        if (priceWarning === "below") {
            const detail = forRent
                ? "Projected yields may appear higher than average."
                : "Capital growth projections may appear higher than typical for this area.";
            return `<p style="margin: 0 0 12px 0; padding: 10px; background: #fff8e6; border: 1px solid #e5d4a1; font-size: 0.9rem;"><strong>Market benchmark note</strong><br>The entered purchase price is below the typical benchmark for this area. ${detail}</p>`;
        }
        return "";
    }
    let bodySections = "";
    if (isRent) {
        bodySections += `
  <div style="border: 1px solid #e5e5e5; padding: 16px; margin-bottom: 16px; background: #fafafa;">
    <h2 style="font-size: 1.1rem; margin: 0 0 8px 0;">Rental Income Projection</h2>
    <p style="margin: 0 0 4px 0; color: #666;">Annual rent = area benchmark rent × bedroom multiplier. Yields use your entered purchase price.</p>
    ${benchmarkNoteHtml(true)}
    <p style="margin: 8px 0 0 0; font-weight: 600; color: #b8860b;">Annual revenue estimate: ${formatNaira(rental.annualRent)}</p>
    <p style="margin: 4px 0 0 0; font-size: 0.9rem;">Gross yield: ${(rental.grossYield * 100).toFixed(2)}% · Net yield: ${(rental.netYield * 100).toFixed(2)}%</p>
    <p style="margin: 4px 0 0 0; font-size: 0.9rem;">Net monthly cashflow: ${formatNaira(rental.netMonthly)}</p>
    <p style="margin: 8px 0 0 0; font-size: 0.85rem; color: #666;">Benchmark area: ${escapeHtml(benchmark.location)} · Operating costs (typical): ${Math.round(benchmark.expense_ratio * 100)}% · Dataset confidence: ${(benchmark.confidence * 100).toFixed(0)}%</p>
  </div>`;
    }
    if (isResell) {
        bodySections += `
  <div style="border: 1px solid #e5e5e5; padding: 16px; margin-bottom: 16px; background: #fafafa;">
    <h2 style="font-size: 1.1rem; margin: 0 0 8px 0;">Capital Growth &amp; Future Value</h2>
    <p style="margin: 0 0 4px 0; color: #666;">Future value = purchase price × (1 + growth rate)^years for conservative, base, and optimistic scenarios (${horizonYears} years).</p>
    ${benchmarkNoteHtml(false)}
    <p style="margin: 8px 0 0 0; font-weight: 600; color: #b8860b;">Future value (conservative): ${formatNaira(horizonFv.conservative)}</p>
    <p style="margin: 4px 0 0 0; font-weight: 600; color: #b8860b;">Future value (base): ${formatNaira(horizonFv.base)}</p>
    <p style="margin: 4px 0 0 0; font-weight: 600; color: #b8860b;">Future value (optimistic): ${formatNaira(horizonFv.optimistic)}</p>
    <p style="margin: 8px 0 0 0; font-size: 0.85rem; color: #666;">Growth p.a.: ${(growthRates.conservative * 100).toFixed(1)}% / ${(growthRates.base * 100).toFixed(1)}% / ${(growthRates.optimistic * 100).toFixed(1)}%${(data.offPlan || "").toLowerCase() === "yes" ? " (includes off-plan adjustment)" : ""} · Dataset confidence: ${(benchmark.confidence * 100).toFixed(0)}%</p>
  </div>

  <div style="border: 1px solid #e5e5e5; padding: 16px; margin-bottom: 16px; background: #fafafa;">
    <h2 style="font-size: 1.1rem; margin: 0 0 8px 0;">Location Intelligence</h2>
    <ul style="margin: 8px 0 0 0; padding-left: 20px;">
      <li>Infrastructure rating: ${benchmark.infrastructure_rating}/10</li>
      <li>Demand index: ${escapeHtml(benchmark.demand_index)}</li>
      <li>Connectivity status: ${escapeHtml(benchmark.connectivity_status)}</li>
      <li>Security level: ${escapeHtml(benchmark.security_level)}</li>
      <li>Market confidence score: ${(benchmark.confidence * 100).toFixed(0)}%</li>
    </ul>
  </div>

  <div style="border: 1px solid #e5e5e5; padding: 16px; margin-bottom: 16px; background: #fafafa;">
    <h2 style="font-size: 1.1rem; margin: 0 0 8px 0;">Legal &amp; Regulatory Brief</h2>
    <p style="margin: 0 0 4px 0; color: #666;">Governor&apos;s Consent is typically required for valid transfer of legal title in Lagos State.</p>
    <p style="margin: 8px 0 0 0;">Estimated transfer tax: ${transferTaxPct} (${transferTaxEst})</p>
    <p style="margin: 8px 0 0 0; font-size: 0.9rem;">Verify title chain, survey plan, and building approvals before completion — engage a qualified lawyer for your transaction.</p>
  </div>`;
    }
    const dataDisclaimer = `Market Data Last Updated: ${locationBenchmarks_1.MARKET_DATA_DISCLAIMER.lastUpdatedYear}. Sources: ${locationBenchmarks_1.MARKET_DATA_DISCLAIMER.sourcesLine}.`;
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Investment Intelligence Report</title>
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #b8860b; font-size: 1.5rem; margin-bottom: 8px;">Investment Intelligence Report</h1>
  <p style="color: #666; margin-bottom: 8px;">Property: ${type} · ${beds} · ${size} sqm · ${formatNaira(priceNum)} · ${loc}</p>
  <p style="color: #666; margin-bottom: 24px; font-size: 0.9rem;">Investment goal: ${isResell ? "Resell" : "Rent out"} · Off-plan: ${escapeHtml((data.offPlan || "").toUpperCase() || "—")}</p>

  ${bodySections}

  <p style="font-size: 0.85rem; color: #666; margin-top: 20px;">${dataDisclaimer}</p>

  <p style="font-size: 0.85rem; color: #888; margin-top: 16px;">
    Estimates based on market data and assumptions. Not financial advice. Not a guarantee of future performance. All legal briefings are for information only and do not replace professional legal counsel.
  </p>

  <p style="font-size: 0.9rem; margin-top: 24px;">
    — Jesfem
  </p>
</body>
</html>
  `.trim();
}
//# sourceMappingURL=index.js.map