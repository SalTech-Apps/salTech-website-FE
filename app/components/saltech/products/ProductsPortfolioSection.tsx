import {
  SALTECH_PRODUCTS,
  SALTECH_PRODUCTS_PORTFOLIO_EYEBROW,
  SALTECH_PRODUCTS_PORTFOLIO_HEADING,
  SALTECH_PRODUCTS_PORTFOLIO_SUB,
} from "@/data/saltechProducts";

export function ProductsPortfolioSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-buttons uppercase tracking-widest text-primary-gold">
            {SALTECH_PRODUCTS_PORTFOLIO_EYEBROW}
          </p>
          <h2 className="mt-4 font-heading text-heading-h2 text-[#111827]">
            {SALTECH_PRODUCTS_PORTFOLIO_HEADING}
          </h2>
          <p className="mt-4 text-body text-[#4b5563]">
            {SALTECH_PRODUCTS_PORTFOLIO_SUB}
          </p>
        </div>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SALTECH_PRODUCTS.map((product) => (
            <li
              key={product.id}
              className="flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f4f6]">
                <img
                  src={product.imageSrc}
                  alt=""
                  className={`h-full w-full object-cover ${product.comingSoon ? "grayscale" : ""}`}
                />
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  {product.industryTags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tag.className}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-heading text-xl font-semibold text-[#111827]">
                  {product.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4b5563]">
                  {product.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {product.techTags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1 text-xs font-medium text-[#374151]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
