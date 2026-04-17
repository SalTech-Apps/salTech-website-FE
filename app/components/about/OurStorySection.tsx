import { motion } from "framer-motion";
import JesfemCeoImage from "@/assets/about/jesfem_ceo.png";

const PARAGRAPHS = [
  "Jesfem began between 2018 and 2019, and was formally registered in 2020.",
  "What started as a family led effort to build and renovate homes, especially for Nigerians in the diaspora, grew into a trusted solution for people looking for honest and structured real estate support.",
  "Our lead developer built her first home on a strict budget during a difficult financial period. The quality and discipline behind that project caught the attention of friends, neighbours and returning Nigerians, who soon entrusted us with their own renovations and constructions.",
  "As demand grew, it became clear that to serve people properly and provide real accountability, we needed a formal, credible, structured company.",
  "That was the birth of Jesfem Multiservice Limited. A property and construction company built on transparency, trust and results.",
];

export function OurStorySection() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background  pt-16 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="flex flex-col pb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-heading-h2 text-main-text-headlines">
              Our Story
            </h2>
            <div className="mt-3 h-0.5 w-16 bg-primary-gold" aria-hidden />
            <div className="mt-8 flex flex-col gap-6">
              {PARAGRAPHS.map((text, i) => (
                <p
                  key={i}
                  className="text-body text-secondary-text-body-paragraphs"
                >
                  {text}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={JesfemCeoImage}
              alt="Jesfem team in a professional meeting"
              loading="lazy"
              className="max-h-168 w-full object-cover object-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
