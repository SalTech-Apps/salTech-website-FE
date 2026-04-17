import { homePageAssets } from "@/data/homePageAssets";

type Industry = {
  title: string;
  body: string;
  iconIndex: number;
  iconBg: string;
};

const INDUSTRIES: Industry[] = [
  {
    title: "Fintech",
    body: "Payment systems, lending platforms, and digital wallets built to CBN and PCI-DSS compliance standards.",
    iconIndex: 0,
    iconBg: "bg-[#eff6ff]",
  },
  {
    title: "Government & Public Sector",
    body: "Citizen portals, case management, and e-governance systems meeting audit, compliance, and accessibility mandates.",
    iconIndex: 1,
    iconBg: "bg-[#fff7ed]",
  },
  {
    title: "Healthcare",
    body: "Patient management, telehealth infrastructure, and clinical data platforms with HIPAA-equivalent privacy controls.",
    iconIndex: 2,
    iconBg: "bg-[#f0fdf4]",
  },
  {
    title: "HR Tech",
    body: "Workforce platforms, payroll engines, and onboarding systems for enterprises managing complex org structures.",
    iconIndex: 3,
    iconBg: "bg-[#faf7ef] ring-1 ring-[#edd98a]",
  },
  {
    title: "B2B SaaS",
    body: "Multi-tenant platforms, billing engines, and integrations built for growth from 10 clients to 10,000.",
    iconIndex: 4,
    iconBg: "bg-[#f5f3ff]",
  },
  {
    title: "Logistics & Supply Chain",
    body: "Tracking systems, fleet management, and last-mile delivery platforms optimized for African infrastructure realities.",
    iconIndex: 5,
    iconBg: "bg-[#fff1f2]",
  },
  {
    title: "EdTech",
    body: "Learning management systems, assessment platforms, and institutional tools serving universities and training organizations.",
    iconIndex: 0,
    iconBg: "bg-[#eff6ff]",
  },
  {
    title: "Startups & Scale-ups",
    body: "Zero-to-one product development for early-stage founders who need to move fast without accumulating technical debt.",
    iconIndex: 2,
    iconBg: "bg-[#f0fdf4]",
  },
];

export function SalTechIndustries() {
  return (
    <section className="bg-white px-4 py-16 md:px-10 md:py-[72px] lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-3.5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#c99e2e]">
            Who We work with
          </p>
          <h2 className="font-saltech-display text-3xl font-normal tracking-tight text-[#111827] md:text-[42px] md:leading-[1.15]">
            Domain expertise across regulated industries.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((row) => (
            <div
              key={row.title}
              className="flex gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-6"
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${row.iconBg}`}
              >
                <img
                  src={homePageAssets.industryIcons[row.iconIndex]}
                  alt=""
                  className="size-4"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[#111827]">
                  {row.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6b7280]">
                  {row.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
