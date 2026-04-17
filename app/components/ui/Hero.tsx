import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { useEffect, useState, type ReactNode } from "react";

/** Overlay style for the background image (or solid background). */
export type HeroOverlay =
  | "dark" // from-black to-transparent
  | "video" // from-black to-transparent
  | "light" // from-main-background via-main-background/20 to-transparent
  | "solid-75" // bg-main-background/75
  | "solid-70" // bg-main-background/70
  | "none";

/** Height preset: full (80vh/600px), compact (70vh/480px), flexible (60–90vh), minimal (padding only, no fixed height). */
export type HeroSize = "full" | "compact" | "flexible" | "minimal";

/** Where to show the gold divider line. */
export type HeroDividerPosition = "aboveTitle" | "belowTitle" | "belowSubtitle";

export interface HeroProps {
  /** Main heading. Can include <br /> for line breaks. */
  title: ReactNode;
  /** Optional subtitle/description. Pass string or ReactNode (e.g. multiple <p>). */
  subtitle?: ReactNode;
  /** Optional background image URL (or imported asset). */
  backgroundImage?: string;
  /** Optional background video URL (YouTube or direct video). */
  backgroundVideoUrl?: string;
  /** Overlay when using background image; ignored when no image. Use "none" for no overlay. */
  overlay?: HeroOverlay;
  /** Height preset. */
  size?: HeroSize | any;
  /** Optional custom section height class (e.g. "min-h-[70vh]"). Overrides size when set. */
  heightClass?: string;
  /** When true, background image uses blur-xs. */
  backgroundBlur?: boolean;
  /** When true, background video is also shown on small screens. Defaults to false (video only from sm+). */
  showVideoOnMobile?: boolean;
  /** Fallback background color (e.g. when using backgroundImage with backgroundColor in style). */
  backgroundColor?: string;
  /** Show the gold accent line. */
  showDivider?: boolean;
  /** Position of the divider relative to title/subtitle. */
  dividerPosition?: HeroDividerPosition;
  /** Optional custom class for the divider (e.g. width). */
  dividerClassName?: string;
  /** Title color: headlines (default), gold, or white. */
  titleVariant?: "headlines" | "gold" | "white";
  /** Optional CTA(s): buttons or other content below subtitle. */
  actions?: ReactNode;
  /** Small label above the title (e.g. uppercase gold “OUR PRODUCTS”). */
  eyebrow?: ReactNode;
  /** Optional custom content (e.g. multiple paragraphs). Rendered below subtitle, above actions. */
  children?: ReactNode;
  /** Max width of content area: "narrow" (max-w-3xl), "default" (max-w-4xl), "wide" (max-w-7xl). */
  contentMaxWidth?: "narrow" | "default" | "wide";
  /** When true, section has no background image and uses solid bg + border (e.g. FAQ, Rentals). */
  minimalStyle?: boolean;
  /** Extra class for the section. */
  className?: string;
  /** Extra class for the content wrapper. */
  contentClassName?: string;
}

const overlayClasses: Record<HeroOverlay, string> = {
  dark: "bg-linear-to-t from-[#111827] to-transparent",
  video:
    "bg-linear-to-t from-[#111827] via-[#111827]/50 via-[60%] to-transparent",
  light:
    "bg-linear-to-t from-main-background via-main-background/20 to-transparent",
  "solid-75": "bg-main-background/75",
  "solid-70": "bg-main-background/70",
  none: "",
};

const sizeClasses: Record<HeroSize | any, string> = {
  full: "min-h-[50vh] sm:min-h-[60vh] h-[80vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] 2xl:min-h-[55vh] 2xl:max-h-[65vh]",
  compact:
    "min-h-[40vh] sm:min-h-[50vh] h-[70vh] min-h-[360px] sm:min-h-[480px]",
  flexible: "min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] xl:min-h-[90vh]",
  minimal: "py-12 sm:py-20 lg:py-28",
};

const contentMaxWidthClasses = {
  narrow: "max-w-3xl",
  default: "max-w-4xl",
  wide: "max-w-7xl",
};

const titleVariantClasses = {
  headlines: "text-main-text-headlines",
  gold: "text-primary-gold",
  white: "text-white",
};

const defaultDividerClass = "mx-auto h-0.5 w-24 bg-primary-gold";

/** Parse YouTube time format (e.g. 90, 90s, 1m30s) to seconds. */
function parseYoutubeTimeToSeconds(raw: string): number | undefined {
  const s = raw.trim();
  if (!s) return undefined;
  // Plain seconds: "90" or "90s"
  const plainMatch = /^(\d+)s?$/.exec(s);
  if (plainMatch) return parseInt(plainMatch[1], 10);
  // Minutes and seconds: "1m30s" or "1m30"
  const mmssMatch = /^(\d+)m(\d*)s?$/.exec(s);
  if (mmssMatch) {
    const mins = parseInt(mmssMatch[1], 10);
    const secs = mmssMatch[2] ? parseInt(mmssMatch[2], 10) : 0;
    return mins * 60 + secs;
  }
  // Hours: "1h30m" etc. - basic support
  const hmsMatch = /^(\d+)h(?:(\d+)m)?(?:(\d+)s?)?$/.exec(s);
  if (hmsMatch) {
    const h = parseInt(hmsMatch[1], 10);
    const m = hmsMatch[2] ? parseInt(hmsMatch[2], 10) : 0;
    const sec = hmsMatch[3] ? parseInt(hmsMatch[3], 10) : 0;
    return h * 3600 + m * 60 + sec;
  }
  const num = Number(s);
  return Number.isFinite(num) ? num : undefined;
}

function parseYoutubeSegmentTimes(url: string): {
  start?: number;
  end?: number;
} {
  try {
    const parsed = new URL(url);
    const rawStart =
      parsed.searchParams.get("start") ?? parsed.searchParams.get("t");
    const rawEnd = parsed.searchParams.get("end");

    const start =
      rawStart != null ? parseYoutubeTimeToSeconds(rawStart) : undefined;
    const end =
      rawEnd != null ? parseYoutubeTimeToSeconds(rawEnd) : undefined;

    return {
      start: start != null && Number.isFinite(start) ? start : undefined,
      end: end != null && Number.isFinite(end) ? end : undefined,
    };
  } catch {
    return { start: undefined, end: undefined };
  }
}

function BackgroundYoutubeSegment({ url }: { url: string }) {
  const { start, end } = parseYoutubeSegmentTimes(url);

  const handleLoadedMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement>,
  ) => {
    if (start != null) {
      event.currentTarget.currentTime = start;
    }
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    if (end != null) {
      const current = event.currentTarget.currentTime;
      if (current >= end) {
        const target = start ?? 0;
        event.currentTarget.currentTime = target;
        if (event.currentTarget.paused) {
          void event.currentTarget.play().catch(() => {});
        }
      }
    }
  };

  return (
    <div className="absolute inset-0">
      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        playing
        muted
        loop={true}
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        config={
          {
            youtube: {
              controls: 0,
              rel: 0,
              showinfo: 0,
              modestbranding: 1,
              disablekb: 1,
              fs: 0,
              playsinline: 1,
            },
          } as any
        }
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  backgroundVideoUrl,
  overlay = "dark",
  size = "full",
  heightClass,
  backgroundBlur = false,
  backgroundColor,
  showDivider = false,
  dividerPosition = "belowSubtitle",
  dividerClassName = defaultDividerClass,
  titleVariant = "headlines",
  actions,
  children,
  contentMaxWidth = "default",
  minimalStyle = false,
  className = "",
  contentClassName = "",
  showVideoOnMobile = true,
}: HeroProps) {
  const hasBackgroundImage = Boolean(backgroundImage);
  const hasBackgroundVideo = Boolean(backgroundVideoUrl);
  const [videoStarted, setVideoStarted] = useState(false);
  const sizeClass = heightClass ?? sizeClasses[size];

  useEffect(() => {
    if (backgroundVideoUrl) setVideoStarted(false);
  }, [backgroundVideoUrl]);
  const contentWidthClass = contentMaxWidthClasses[contentMaxWidth];

  const contentInner = (
    <>
      {eyebrow != null && (
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {typeof eyebrow === "string" ? (
            <p className="text-buttons uppercase tracking-widest text-primary-gold">
              {eyebrow}
            </p>
          ) : (
            eyebrow
          )}
        </motion.div>
      )}
      {showDivider && dividerPosition === "aboveTitle" && (
        <motion.div
          className={dividerClassName}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <motion.h1
        className={`font-heading text-heading-h1 ${titleVariantClasses[titleVariant]} ${contentMaxWidth === "wide" ? "w-screen max-w-4xl" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>
      {showDivider && dividerPosition === "belowTitle" && (
        <motion.div
          className={dividerClassName}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}
      {subtitle != null && (
        <motion.div
          className=" container w-screen xl:w-fit xl:max-w-5xl text-center mx-auto mt-6 text-body text-secondary-text-body-paragraphs [&_.text-main-text-headlines]:text-main-text-headlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
        </motion.div>
      )}

      {showDivider && dividerPosition === "belowSubtitle" && (
        <motion.div
          className={`mt-8 ${dividerClassName}`}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      )}

      {children}
      {actions != null && (
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {actions}
        </motion.div>
      )}
    </>
  );

  if (minimalStyle) {
    return (
      <section
        className={`relative w-full border-b border-soft-divider-line bg-main-background ${sizeClass} ${className}`}
      >
        <div
          className={`mx-auto px-4 text-center sm:px-6 lg:px-8 ${contentWidthClass} ${contentClassName}`}
        >
          {contentInner}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative flex flex-col items-center justify-center w-full overflow-hidden ${sizeClass} ${className}`}
    >
      <div className="absolute inset-0 z-0">
        {hasBackgroundImage ? (
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover object-center ${backgroundBlur ? "blur-xs" : ""}`}
            style={backgroundColor ? { backgroundColor } : undefined}
          />
        ) : (
          <div className="absolute inset-0 bg-main-background" />
        )}

        {hasBackgroundVideo && backgroundVideoUrl && (
          <div
            className={`absolute inset-0 ${showVideoOnMobile ? "block" : "hidden sm:block"}`}
            aria-hidden
          >
            {backgroundVideoUrl.includes("youtube") ||
            backgroundVideoUrl.includes("youtu.be") ? (
              <BackgroundYoutubeSegment url={backgroundVideoUrl} />
            ) : (
              <motion.video
                className="h-full w-full object-cover"
                src={backgroundVideoUrl}
                autoPlay
                muted
                loop
                playsInline
                poster={
                  hasBackgroundImage ? String(backgroundImage) : undefined
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: videoStarted ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeIn" }}
                onPlay={() => setVideoStarted(true)}
              />
            )}
          </div>
        )}

        {overlay !== "none" && (
          <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
        )}
      </div>

      <div
        className={`relative z-10 mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-12 sm:py-16 lg:py-20 text-center sm:px-6 lg:px-8 ${contentWidthClass} ${contentClassName}`}
      >
        {contentInner}
      </div>
    </section>
  );
}
