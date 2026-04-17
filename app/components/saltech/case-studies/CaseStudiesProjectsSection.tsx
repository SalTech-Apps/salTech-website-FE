import {
  CASE_STUDIES_INTRO_EYEBROW,
  CASE_STUDIES_INTRO_HEADING,
  CASE_STUDIES_INTRO_SUB,
  SALTECH_CASE_STUDIES,
} from "@/data/saltechCaseStudies";

function CaseStudyMockupPanel({
  imageSrc,
  imageAlt,
  industryLabel,
  panelClassName,
}: {
  imageSrc: string;
  imageAlt: string;
  industryLabel: string;
  panelClassName: string;
}) {
  return (
    <div
      className={`relative flex min-h-[260px] flex-1 flex-col items-center justify-center overflow-hidden px-6 pb-14 pt-10 sm:min-h-[300px] sm:px-10 sm:pb-16 sm:pt-12 lg:max-w-[48%] ${panelClassName}`}
    >
      <div className="relative z-1 w-full max-w-[min(100%,420px)] perspective-distant">
        <div className="origin-center rotate-[-4deg] transform rounded-xl border border-black/6 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] transition-transform duration-300 will-change-transform sm:rotate-[-5deg] sm:scale-[1.02]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-16/10 w-full rounded-[inherit] object-cover object-top"
          />
        </div>
      </div>
      <span className="absolute bottom-5 left-5 z-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-md sm:bottom-6 sm:left-8">
        {industryLabel}
      </span>
    </div>
  );
}

export function CaseStudiesProjectsSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-buttons uppercase tracking-[0.2em] text-primary-gold">
            {CASE_STUDIES_INTRO_EYEBROW}
          </p>
          <h2 className="mt-4 font-heading text-heading-h2 text-[#111827]">
            {CASE_STUDIES_INTRO_HEADING}
          </h2>
          <p className="mt-4 text-body text-[#4b5563]">
            {CASE_STUDIES_INTRO_SUB}
          </p>
        </div>

        <ul className="mt-14 flex flex-col gap-10 lg:gap-12">
          {SALTECH_CASE_STUDIES.map((study) => {
            const stats = study.stats ?? [];
            const hasStats = stats.length > 0;

            return (
              <li
                key={study.id}
                className="overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <div className="flex flex-col lg:flex-row lg:items-stretch">
                  <CaseStudyMockupPanel
                    imageSrc={study.imageSrc}
                    imageAlt={study.imageAlt}
                    industryLabel={study.industryLabel}
                    panelClassName={study.panelClassName}
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-center border-t border-[#eef0f3] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:py-10 lg:pl-10 lg:pr-12">
                    <div className="flex min-h-0 flex-1 flex-col">
                      <span className="inline-flex w-fit rounded-full bg-primary-gold px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#111827]">
                        {study.badge}
                      </span>
                      <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-[#111827] sm:text-[1.75rem]">
                        {study.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4b5563] sm:text-base">
                        {study.description}
                      </p>

                      {hasStats ? (
                        <>
                          <div
                            className="my-8 h-px w-full bg-[#e5e7eb]"
                            aria-hidden
                          />
                          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-3">
                            {stats.map((s) => (
                              <div
                                key={`${study.id}-${s.label}`}
                                className="flex flex-col text-left"
                              >
                                <span className="font-body text-lg font-bold tabular-nums text-primary-gold sm:text-xl">
                                  {s.value}
                                </span>
                                <span className="mt-1.5 text-[11px] font-medium uppercase leading-snug tracking-wide text-[#6b7280]">
                                  {s.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="flex-1" aria-hidden />
                      )}

                      <div
                        className={`flex flex-wrap gap-2 ${hasStats ? "mt-2" : "mt-10"}`}
                      >
                        {study.techTags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-[#d1d5db] bg-white px-2.5 py-1.5 text-xs font-medium text-[#374151] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
