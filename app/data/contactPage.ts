export const SALTECH_CONTACT = {
  email: "support@saltechapps.com",
  phoneDisplay: "+1 (844) 877-1078",
  phoneE164: "+18448771078",
  addressLines: [
    "3203 McKnight East Drive, STE 138",
    "Pittsburgh, PA 15237, United States",
  ],
} as const;

export const ROLE_OPTIONS = [
  { value: "founder", label: "Founder / CEO" },
  { value: "product", label: "Product" },
  { value: "engineering", label: "Engineering / CTO" },
  { value: "operations", label: "Operations" },
  { value: "other", label: "Other" },
] as const;

export const BUILD_OPTIONS = [
  { value: "mvp", label: "MVP or new product" },
  { value: "platform", label: "Platform / internal tools" },
  { value: "ai", label: "AI & automation" },
  { value: "design", label: "Product design / UX" },
  { value: "legacy", label: "Legacy modernisation / audit" },
  { value: "other", label: "Something else" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1-3mo", label: "1–3 months" },
  { value: "3-6mo", label: "3–6 months" },
  { value: "6mo+", label: "6+ months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "unspecified", label: "Prefer not to say" },
  { value: "under25k", label: "Under $25k" },
  { value: "25k-100k", label: "$25k – $100k" },
  { value: "100k-500k", label: "$100k – $500k" },
  { value: "500k+", label: "$500k+" },
] as const;

export const CONTACT_FAQ_ITEMS = [
  {
    question: "Do I need a full spec?",
    answer:
      "No. A rough idea is enough to start. We help shape it into a proper brief during the first call.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "A senior team member reviews your brief and responds within one business day.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. Many of our best products started at idea stage with founders who needed to move fast.",
  },
  {
    question: "Can we sign an NDA first?",
    answer:
      "Absolutely. NDA available on request before any technical discussion.",
  },
  {
    question: "Do you work with government?",
    answer:
      "Yes. We have experience with government procurement and can provide compliance documentation.",
  },
  {
    question: "What if we have an existing system?",
    answer:
      "We take on legacy modernisation, code audits, and platform scaling engagements.",
  },
] as const;

export const QUICK_ANSWERS = [
  "No completed spec required to reach out",
  "NDA available before any technical discussion",
  "Fixed-scope projects, no hidden costs",
  "Government procurement documentation available",
] as const;
