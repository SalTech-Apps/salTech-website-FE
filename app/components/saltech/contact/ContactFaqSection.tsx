import { CONTACT_FAQ_ITEMS } from "@/data/contactPage";

export function ContactFaqSection() {
  return (
    <section className="bg-[#faf7ef]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-[90px]">
        <h2 className="font-heading text-center text-3xl font-normal tracking-tight text-[#111827] sm:text-[42px] sm:leading-tight">
          Common questions before reaching out
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACT_FAQ_ITEMS.map((item) => (
            <article
              key={item.question}
              className="flex flex-col gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-[#111827]">
                {item.question}
              </h3>
              <p className="text-xs leading-relaxed text-[#6b7280]">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
