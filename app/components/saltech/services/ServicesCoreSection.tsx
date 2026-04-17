import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FaCheck } from "react-icons/fa";
import {
  HiOutlineBolt,
  HiOutlineComputerDesktop,
  HiOutlinePaintBrush,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi2";
import {
  SALTECH_SERVICES,
  SALTECH_SERVICES_CORE_EYEBROW,
  SALTECH_SERVICES_CORE_HEADING,
  SALTECH_SERVICES_CORE_SUB,
  statusTagClassName,
  type SaltechServiceCard,
  type SaltechServiceId,
} from "@/data/saltechServices";

const SERVICE_CORE_ICONS: Record<SaltechServiceId, IconType> = {
  mvp: HiOutlineBolt,
  platform: HiOutlineComputerDesktop,
  ai: HiOutlineSparkles,
  design: HiOutlinePaintBrush,
  compliance: HiOutlineShieldCheck,
};

function ServiceCoreIcon({ id }: { id: SaltechServiceId }) {
  const Icon = SERVICE_CORE_ICONS[id];
  return <Icon className="h-6 w-6 text-[#374151]" aria-hidden />;
}

function CheckRow({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-[#111827]">
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-primary-gold/40 bg-primary-gold/10 text-primary-gold"
        aria-hidden
      >
        <FaCheck className="h-2.5 w-2.5" strokeWidth={2.5} />
      </span>
      <span className="text-[#374151]">{children}</span>
    </li>
  );
}

function CoreServiceCardBody({ service }: { service: SaltechServiceCard }) {
  return (
    <div className="flex flex-col gap-5 p-6 sm:p-8">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-gold/12">
        <ServiceCoreIcon id={service.id} />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-body text-lg font-bold tracking-tight text-[#111827]">
            {service.title}
          </h3>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusTagClassName[service.statusTag.variant]}`}
          >
            {service.statusTag.label}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
          {service.description}
        </p>
      </div>

      <ul className="space-y-2.5">
        {service.features.map((f) => (
          <CheckRow key={f}>{f}</CheckRow>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 border-t border-[#e5e7eb] pt-5">
        {service.techTags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs font-medium text-[#374151]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ServicesCoreSection() {
  const gridServices = SALTECH_SERVICES.filter((s) => !s.testimonial);
  const fullWidthService = SALTECH_SERVICES.find((s) => s.testimonial);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-buttons uppercase tracking-widest text-primary-gold">
            {SALTECH_SERVICES_CORE_EYEBROW}
          </p>
          <h2 className="mt-4 font-heading text-heading-h2 text-[#111827]">
            {SALTECH_SERVICES_CORE_HEADING}
          </h2>
          <p className="mt-4 text-body text-[#4b5563]">
            {SALTECH_SERVICES_CORE_SUB}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {gridServices.map((service) => (
            <article
              key={service.id}
              className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
            >
              <CoreServiceCardBody service={service} />
            </article>
          ))}
        </div>

        {fullWidthService?.testimonial ? (
          <article className="mt-6 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white md:mt-8">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="lg:border-r lg:border-[#e5e7eb]">
                <CoreServiceCardBody service={fullWidthService} />
              </div>
              <aside className="flex flex-col justify-center bg-[#f5f2eb] p-6 sm:p-8 lg:min-h-[320px] lg:p-10">
                <blockquote className="font-body text-base leading-relaxed text-[#111827] sm:text-lg">
                  &ldquo;{fullWidthService.testimonial.quote}&rdquo;
                </blockquote>
                <p className="mt-6 text-sm font-medium text-[#4b5563]">
                  {fullWidthService.testimonial.attribution}
                </p>
              </aside>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
