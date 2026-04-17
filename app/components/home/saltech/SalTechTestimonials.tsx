import { homePageAssets } from "@/data/homePageAssets";

const QUOTES = [
  {
    quote:
      "We came in with a sketch on a napkin. SalTech came back with a full brief, a scope, and a launch date. That was week one. We shipped on week eight.",
    name: "Ojubanire Olugbenga",
    role: "Founder, AgapeMate · UK",
  },
  {
    quote:
      "Every dev shop we'd spoken to talked about agile process. SalTech just showed us working software every two weeks. There's a difference.",
    name: "Ojubanire Olugbenga",
    role: "CTO, DARA · UK",
  },
  {
    quote:
      "Our investors asked who built the product. That question, in that context, is the best thing a dev agency can hear. SalTech earned it.",
    name: "Odunayo Hassan",
    role: "Founder, AgapeMate · UK",
  },
];

export function SalTechTestimonials() {
  return (
    <section className="bg-[#111827] px-4 py-16 md:px-10 md:py-[72px] lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.08em] text-[#e2ba51] md:mb-12">
          what founders say
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {QUOTES.map((t, i) => (
            <blockquote
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-[#374151] bg-[#1f2937] p-6"
            >
              <p className="text-[13px] italic leading-relaxed text-white">
                “{t.quote}”
              </p>
              <footer className="flex items-center gap-2 border-t border-transparent pt-2">
                <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#e2ba51] p-0.5">
                  <img
                    src={homePageAssets.testimonialAvatar}
                    alt=""
                    className="size-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <cite className="not-italic text-[13px] font-medium uppercase text-white">
                    {t.name}
                  </cite>
                  <p className="text-xs text-[#6b7280]">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
