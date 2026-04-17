import { ABOUT_VALUES } from "@/data/saltechAbout";

export function AboutValuesSection() {
  return (
    <section className="border-t border-[#e7e5e4] bg-[#faf6ef] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-buttons uppercase tracking-widest text-primary-gold">
            WHAT WE STAND FOR
          </p>
          <h2 className="mt-4 font-heading text-heading-h2 text-[#111827]">
            Our values aren&apos;t on a wall. They&apos;re in the code.
          </h2>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {ABOUT_VALUES.map((v) => (
            <li
              key={v.id}
              className="rounded-2xl border border-[#e8e4dc] bg-white p-6 shadow-sm sm:p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-[#111827]">
                {v.title}
              </h3>
              <p className="mt-3 text-body leading-relaxed text-[#4b5563]">
                {v.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
