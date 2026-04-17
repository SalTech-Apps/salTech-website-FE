import { homePageAssets } from "@/data/homePageAssets";

export function SalTechShowcase() {
  return (
    <section className="relative min-h-[480px] overflow-hidden bg-[#fafafa] md:min-h-[620px] lg:min-h-[779px]">
      <div className="absolute inset-0" aria-hidden>
        <img
          src={homePageAssets.showcaseBg}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/85" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-10 lg:block lg:min-h-[620px] lg:px-8 lg:pb-24 lg:pt-20">
        <div className="relative z-[1] mx-auto w-full max-w-[735px] lg:absolute lg:left-1/2 lg:top-[79px] lg:mx-0 lg:-translate-x-1/2">
          <img
            src={homePageAssets.showcaseMain}
            alt="Product dashboard preview"
            className="w-full rounded-2xl object-cover shadow-2xl shadow-black/20"
          />
        </div>

        <div className="relative z-[2] mt-6 flex w-full max-w-lg justify-center lg:absolute lg:right-[8%] lg:top-[107px] lg:mt-0 lg:max-w-[250px] lg:justify-end xl:right-[6%]">
          <img
            src={homePageAssets.showcaseFloatRight}
            alt=""
            className="w-[min(100%,250px)] rounded-[14px] object-cover shadow-xl"
          />
        </div>

        <div className="relative z-[2] mt-4 flex w-full max-w-lg justify-center lg:absolute lg:left-[4%] lg:top-[428px] lg:mt-0 lg:max-w-[242px] lg:justify-start">
          <img
            src={homePageAssets.showcaseFloatLeft}
            alt=""
            className="w-[min(100%,242px)] rounded-2xl object-cover shadow-xl"
          />
        </div>

        <div
          className="mt-8 flex justify-center gap-2 lg:absolute lg:bottom-10 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
          aria-hidden
        >
          <span className="h-4 w-10 rounded-full bg-[#e2ba51]" />
          <span className="h-4 w-10 rounded-full bg-[#d9d9d9]" />
        </div>
      </div>
    </section>
  );
}
