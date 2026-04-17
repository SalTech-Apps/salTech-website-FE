import { Link } from "react-router-dom";

export function SalTechBottomCta() {
  return (
    <section className="bg-[#faf7ef] px-4 py-16 md:px-10 md:py-[90px] lg:px-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#edd98a] bg-white px-4 py-1.5">
          <span
            className="size-1.5 rounded-sm bg-[#e2ba51]"
            aria-hidden
          />
          <span className="text-xs font-medium uppercase tracking-wide text-[#92700a]">
            Let&apos;s Build Together
          </span>
        </div>
        <h2 className="font-saltech-display text-3xl font-normal leading-tight text-[#111827] md:text-[46px] md:leading-[1.15]">
          Your next product launch starts with one conversation.
        </h2>
        <p className="text-[17px] leading-relaxed text-[#6b7280]">
          Whether you&apos;re a founder with a rough sketch or an enterprise team
          with a full brief — we want to hear it. The first call is always free,
          always direct.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <Link
            to="/contact"
            prefetch="intent"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#e2ba51] px-8 py-3.5 text-base font-bold text-[#111827] transition-opacity hover:opacity-95"
          >
            Book a 30-Min Call →
          </Link>
          <Link
            to="/case-studies"
            prefetch="intent"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-8 py-3.5 text-base font-bold text-[#111827] transition-colors hover:bg-[#fafafa]"
          >
            See Our Work
          </Link>
        </div>
        <p className="mt-2 max-w-xl text-xs text-[#9ca3af]">
          No commitment required. NDA available on request. Response within 1
          business day. Fixed-scope. No hidden costs.
        </p>
      </div>
    </section>
  );
}
