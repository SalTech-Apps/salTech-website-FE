import { useCallback, useId, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "photoswipe/dist/photoswipe.css";
interface ImageGalleryProps {
  mainImage: string;
  thumbnails: string[];
  /** Alt text for the main property image (e.g. property title) */
  alt?: string;
}

export function ImageGallery({
  mainImage,
  thumbnails,
  alt = "Property",
}: ImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  /** Natural size per src so PhotoSwipe uses correct aspect (fixed w/h was squishing). */
  const [lightboxDims, setLightboxDims] = useState<
    Record<string, { w: number; h: number }>
  >({});

  const onSlideImageLoad = useCallback(
    (src: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
      if (!w || !h) return;
      setLightboxDims((prev) =>
        prev[src]?.w === w && prev[src]?.h === h
          ? prev
          : { ...prev, [src]: { w, h } },
      );
    },
    [],
  );

  const images = [mainImage, ...thumbnails];
  const galleryId = useId().replace(/:/g, "");
  const prevButtonClass = `property-gallery-prev-${galleryId}`;
  const nextButtonClass = `property-gallery-next-${galleryId}`;

  return (
    <div className="w-screen lg:w-full min-w-0 max-w-full space-y-3 overflow-hidden sm:space-y-4">
      <div className="relative w-full max-w-full overflow-hidden">
        <Gallery
          withDownloadButton={false}
          options={{
            arrowNext: true,
            arrowKeys: true,
            arrowPrev: true,
            bgClickAction: "close",
            tapAction: "close",
          }}
        >
          <Swiper
            spaceBetween={8}
            navigation={{
              prevEl: `.${prevButtonClass}`,
              nextEl: `.${nextButtonClass}`,
            }}
            modules={[Navigation, Thumbs]}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            className="w-full max-w-full overflow-hidden lg:rounded-lg border border-soft-divider-line bg-secondary-background"
          >
            {images.map((src, i) => {
              const dims = lightboxDims[src];
              return (
                <SwiperSlide key={i}>
                  <Item
                    original={src}
                    thumbnail={src}
                    width={dims?.w ?? 1600}
                    height={dims?.h ?? 1200}
                  >
                    {({ ref, open }) => (
                      <button
                        type="button"
                        ref={ref}
                        onClick={open}
                        className="relative aspect-4/3 w-full cursor-zoom-in overflow-hidden sm:aspect-16/10"
                      >
                        <img
                          src={src}
                          alt={`${alt} image ${i + 1}`}
                          className="h-full w-full object-cover"
                          onLoad={onSlideImageLoad(src)}
                        />
                      </button>
                    )}
                  </Item>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button
            type="button"
            aria-label="Previous image"
            className={`${prevButtonClass} absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-soft-divider-line bg-main-background/80 px-2 py-1 text-lg leading-none text-main-text-headlines backdrop-blur transition-colors hover:bg-main-background sm:left-3 sm:px-3 sm:py-2 sm:text-xl`}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            className={`${nextButtonClass} absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-soft-divider-line bg-main-background/80 px-2 py-1 text-lg leading-none text-main-text-headlines backdrop-blur transition-colors hover:bg-main-background sm:right-3 sm:px-3 sm:py-2 sm:text-xl`}
          >
            ›
          </button>
        </Gallery>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={6}
        slidesPerView={4}
        freeMode
        // watchSlidesProgress
        modules={[Navigation, Thumbs]}
        breakpoints={{
          320: { slidesPerView: 3.1, spaceBetween: 6 },
          480: { slidesPerView: 4.1, spaceBetween: 6 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="w-full max-w-full overflow-hidden pb-2 [&_.swiper-slide-thumb-active_div]:border-primary-gold"
      >
        {images.map((src, i) => (
          <SwiperSlide key={`thumb-${i}`} className="h-20! px-1">
            <div className="relative h-full w-full overflow-hidden rounded-lg border-2 border-soft-divider-line transition-colors hover:border-primary-gold/50 sm:h-20">
              <img
                src={src}
                alt={`${alt} image ${i + 1}`}
                className="pointer-events-none max-w-full max-h-full w-full h-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
