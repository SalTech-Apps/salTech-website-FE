const STEPS = [
  {
    n: "01",
    phase: "Week 1",
    title: "Discover",
    body: "We extract the real requirements behind your brief. Product discovery, stakeholder alignment, technical scoping, and a clear delivery plan — in one week.",
  },
  {
    n: "02",
    phase: "Weeks 2–8",
    title: "Build",
    body: "Agile sprints with weekly demos. You see progress, not promises. Security reviews, QA, and compliance checks run in parallel — not as an afterthought.",
  },
  {
    n: "03",
    phase: "Week 9+",
    title: "Launch & Scale",
    body: "Production deployment, performance testing, and handoff documentation. Then ongoing support — from bug fixes to full platform scaling as your user base grows.",
  },
];

export function SalTechProcess() {
  return (
    <section className="bg-[#faf7ef] px-4 py-16 md:px-8 md:py-[90px] lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-3.5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#c99e2e]">
            how we work
          </p>
          <h2 className="font-saltech-display text-3xl font-normal tracking-tight text-[#111827] md:text-[42px] md:leading-[1.15]">
            A process built around your deadline.
          </h2>
          <p className="max-w-xl text-[17px] leading-relaxed text-[#6b7280]">
            No vague roadmaps. Clear milestones, fixed scope, and honest
            timelines from day one.
          </p>
        </div>

        <div className="relative grid gap-12 lg:grid-cols-3 lg:gap-6">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-[#e5e7eb] lg:block"
            aria-hidden
          />
          {STEPS.map((s) => (
            <div key={s.n} className="relative flex flex-col items-center text-center">
              <div className="relative z-[1] flex size-14 items-center justify-center rounded-[28px] border border-[#e5e7eb] bg-white text-xl font-bold text-[#111827] shadow-sm">
                {s.n}
              </div>
              <p className="mt-6 text-[11px] font-medium text-[#92700a]">
                {s.phase}
              </p>
              <h3 className="mt-1 text-[15px] font-semibold text-[#111827]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#6b7280]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
