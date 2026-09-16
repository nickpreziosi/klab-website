"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import Button from "@/ui/shared/components/button/button";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./who-we-serve.module.css";

const GOVERNMENT_VIDEO = "/videos/who-we-serve-government.mp4";
const PRIVATE_CAPITAL_VIDEO = "/videos/who-we-serve-private-capital.mp4";
const SME_VIDEO = "/videos/who-we-serve-sme.mp4";
const PRIVATE_CAPITAL_IMAGE = "/images/who-we-serve/private-capital.webp";
const DESKTOP_MQ = "(min-width: 1025px)";
const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const AUDIENCES: readonly { id: string; icon: string; rotate?: boolean }[] = [
  { id: "governments", icon: "/images/who-we-serve/icon-governments.svg" },
  { id: "enterprises", icon: "/images/who-we-serve/icon-enterprises.svg" },
  { id: "suppliers", icon: "/images/who-we-serve/icon-suppliers.svg", rotate: true },
  { id: "banks", icon: "/images/who-we-serve/icon-banks.svg", rotate: true },
  { id: "capital", icon: "/images/who-we-serve/icon-capital.svg" },
];

const AUDIENCE_MEDIA: Record<string, { src: string; type: "video" | "image" }> = {
  governments: { src: GOVERNMENT_VIDEO, type: "video" },
  enterprises: { src: PRIVATE_CAPITAL_VIDEO, type: "video" },
  suppliers: { src: SME_VIDEO, type: "video" },
  banks: { src: PRIVATE_CAPITAL_VIDEO, type: "video" },
  capital: { src: PRIVATE_CAPITAL_IMAGE, type: "image" },
};

type ServeMediaProps = {
  audienceId: string;
  alt: string;
  className?: string;
  active?: boolean;
};

function ServeMedia({
  audienceId,
  alt,
  className,
  active = true,
}: ServeMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const media = AUDIENCE_MEDIA[audienceId] ?? {
    src: PRIVATE_CAPITAL_VIDEO,
    type: "video" as const,
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || media.type !== "video") return;
    if (active) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, media.type]);

  if (media.type === "image") {
    return (
      <img
        className={className}
        src={media.src}
        alt={active ? alt : ""}
        decoding="async"
        aria-hidden={!active}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      key={media.src}
      className={className}
      src={media.src}
      muted
      loop
      playsInline
      autoPlay={active}
      preload={active ? "auto" : "none"}
      aria-label={active ? alt : undefined}
      aria-hidden={!active}
    />
  );
}

const panelVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.04,
    },
  },
};

const layoutVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ENTRANCE_EASE },
  },
};

const fadeUpInstant = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export type WhoWeServeTranslations = {
  serveTitle: string;
  serveImageAlt: string;
  serveCallout: string;
  servePrev: string;
  serveNext: string;
  serveItems: { id: string; title: string; body: string }[];
};

type ServeItem = WhoWeServeTranslations["serveItems"][number];

type WhoWeServeProps = {
  translations: WhoWeServeTranslations;
  skipAnimation?: boolean;
  className?: string;
};

type AudienceCopyProps = {
  item: ServeItem;
  icon?: string;
  rotate?: boolean;
  active?: boolean;
  collapseBody?: boolean;
};

function isDesktopViewport() {
  return window.matchMedia(DESKTOP_MQ).matches;
}

function shotTransition(skip: boolean, delay: number, duration: number) {
  return skip
    ? { duration: 0 }
    : { duration, delay, ease: ENTRANCE_EASE };
}

function CalloutLeader({
  className,
  play,
  skip,
}: {
  className?: string;
  play: boolean;
  skip: boolean;
}) {
  const shown = skip || play;

  return (
    <svg
      className={className}
      viewBox="0 0 74.3486 27.1667"
      fill="none"
      preserveAspectRatio="none"
      overflow="visible"
      aria-hidden
    >
      <motion.circle
        cx="2.66667"
        cy="2.66667"
        r="2.66667"
        fill="currentColor"
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: shown ? 1 : 0 }}
        transition={shotTransition(skip, 0.28, 0.25)}
      />
      <motion.path
        d="M2.667 2.667 H64.667 A6 6 0 0 1 70.667 8.667 V26.667"
        stroke="currentColor"
        strokeWidth="1"
        initial={skip ? false : { pathLength: 0 }}
        animate={{ pathLength: shown ? 1 : 0 }}
        transition={shotTransition(skip, 0.32, 0.55)}
      />
      <motion.path
        d="M67.838 23.131 L70.667 26.667 L73.495 23.131"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="miter"
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: shown ? 1 : 0 }}
        transition={shotTransition(skip, 0.82, 0.2)}
      />
    </svg>
  );
}

function AudienceCopy({
  item,
  icon,
  rotate,
  active = true,
  collapseBody = false,
}: AudienceCopyProps) {
  const collapsed = collapseBody && !active;

  return (
    <>
      <span className={styles.iconBox} aria-hidden>
        {icon ? (
          <span
            className={cn(styles.icon, rotate && styles.iconRotated)}
            style={{
              maskImage: `url(${icon})`,
              WebkitMaskImage: `url(${icon})`,
            }}
          />
        ) : null}
      </span>
      <span className={styles.itemCopy}>
        <span className={styles.itemTitle}>{item.title}</span>
        <span className={styles.itemBody} aria-hidden={collapsed} inert={collapsed}>
          <span className={styles.itemBodyInner}>
            {item.body.split("\n\n").map((paragraph, paragraphIndex) => (
              <span key={paragraphIndex} className={styles.itemPara}>
                {withBrandLtr(paragraph, styles.brandLtr)}
              </span>
            ))}
          </span>
        </span>
      </span>
    </>
  );
}

export function WhoWeServe({
  translations,
  skipAnimation = false,
  className,
}: WhoWeServeProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const reduceMotion = useReducedMotion();
  const disableEntrance = skipAnimation || Boolean(reduceMotion);
  const stickyRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedRef = useRef(0);
  const [selected, setSelected] = useState(0);
  const panelInView = useInView(stickyRef, { once: true, amount: 0.25 });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    duration: 22,
    direction: dir,
  });

  const items = translations.serveItems;
  const count = items.length;
  selectedRef.current = selected;
  const showEntrance = disableEntrance || panelInView;
  const itemVariants = disableEntrance ? fadeUpInstant : fadeUp;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    if (isDesktopViewport()) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [dir, emblaApi]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => {
      if (mq.matches) return;
      emblaApi?.reInit();
      emblaApi?.scrollTo(selectedRef.current, true);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [emblaApi]);

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(count - 1, index));
      if (isDesktopViewport()) {
        setSelected(next);
        return;
      }

      emblaApi?.scrollTo(next);
    },
    [count, emblaApi],
  );

  const goPrev = () => {
    emblaApi?.scrollPrev();
  };

  const goNext = () => {
    emblaApi?.scrollNext();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = count - 1;
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = last;
    } else {
      return;
    }
    goTo(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="who-we-serve"
      className={cn(styles.section, className)}
      dir={dir}
      aria-labelledby="who-we-serve-heading"
    >
      <motion.div
        ref={stickyRef}
        className={styles.sticky}
        initial={disableEntrance ? "visible" : "hidden"}
        animate={showEntrance ? "visible" : "hidden"}
        variants={disableEntrance ? undefined : panelVariants}
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <h2 id="who-we-serve-heading" className={styles.heading}>
            {translations.serveTitle}
          </h2>
          <div className={styles.controls}>
            <Button
              type="button"
              variant="accent-brand-outline"
              size="icon"
              className={styles.navButton}
              aria-label={translations.servePrev}
              onClick={goPrev}
              icon={<ChevronLeft className="rtlFlipH" aria-hidden />}
            />
            <Button
              type="button"
              variant="accent-brand-outline"
              size="icon"
              className={styles.navButton}
              aria-label={translations.serveNext}
              onClick={goNext}
              icon={<ChevronRight className="rtlFlipH" aria-hidden />}
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.layout}
          variants={disableEntrance ? undefined : layoutVariants}
        >
          <motion.div
            className={styles.list}
            role="tablist"
            aria-label={translations.serveTitle}
            aria-orientation="vertical"
            variants={itemVariants}
          >
            {items.map((item, index) => {
              const active = index === selected;
              const audience = AUDIENCES[index];
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`serve-tab-${item.id}`}
                  tabIndex={active ? 0 : -1}
                  aria-selected={active}
                  aria-controls={`serve-panel-${item.id}`}
                  className={cn(styles.item, active && styles.itemActive)}
                  onClick={() => goTo(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  <AudienceCopy
                    item={item}
                    icon={audience?.icon}
                    rotate={audience?.rotate}
                    active={active}
                    collapseBody
                  />
                </button>
              );
            })}
          </motion.div>

          <motion.div className={styles.media} variants={itemVariants}>
            <div className={styles.stage}>
              <div className={styles.imageFrame} dir="ltr">
                <div className={styles.shotStack}>
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={disableEntrance ? "static" : selected}
                      className={styles.shotLayer}
                      initial={disableEntrance ? false : { opacity: 0 }}
                      animate={{ opacity: showEntrance ? 1 : 0 }}
                      exit={disableEntrance ? undefined : { opacity: 0 }}
                      transition={shotTransition(disableEntrance, 0, 0.2)}
                    >
                      <div className={styles.glow} aria-hidden />
                      <div className={styles.desktopShot}>
                        <ServeMedia
                          key={AUDIENCES[selected]?.id ?? "governments"}
                          audienceId={AUDIENCES[selected]?.id ?? "governments"}
                          alt={translations.serveImageAlt}
                          className={styles.image}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <Fragment key={disableEntrance ? "static" : selected}>
                  <span className={styles.leader} aria-hidden>
                    <CalloutLeader
                      className={styles.leaderImg}
                      play={showEntrance}
                      skip={disableEntrance}
                    />
                  </span>
                  <motion.p
                    className={cn(styles.callout, styles.overlayCallout)}
                    initial={disableEntrance ? false : { opacity: 0 }}
                    animate={{ opacity: showEntrance ? 1 : 0 }}
                    transition={shotTransition(disableEntrance, 0.5, 0.45)}
                  >
                    {translations.serveCallout}
                  </motion.p>
                </Fragment>
                <div className={styles.viewport} ref={emblaRef}>
                  <div className={styles.container}>
                    {items.map((item, index) => {
                      const active = index === selected;
                      const audience = AUDIENCES[index];
                      return (
                        <div
                          key={item.id}
                          className={styles.slide}
                          role="tabpanel"
                          id={`serve-panel-${item.id}`}
                          aria-labelledby={`serve-tab-${item.id}`}
                          aria-hidden={!active}
                          inert={!active}
                        >
                          <ServeMedia
                            audienceId={audience?.id ?? item.id}
                            alt={translations.serveImageAlt}
                            className={styles.image}
                            active={active}
                          />
                          <motion.p
                            className={cn(styles.callout, styles.slideCallout)}
                            initial={disableEntrance ? false : { opacity: 0 }}
                            animate={{ opacity: active && showEntrance ? 1 : 0 }}
                            transition={shotTransition(disableEntrance, 0.2, 0.45)}
                          >
                            {translations.serveCallout}
                          </motion.p>
                          <motion.div
                            className={cn(styles.slideCopy, styles.itemActive)}
                            initial={disableEntrance ? false : { opacity: 0 }}
                            animate={{ opacity: active && showEntrance ? 1 : 0 }}
                            transition={shotTransition(disableEntrance, 0.28, 0.45)}
                          >
                            <AudienceCopy
                              item={item}
                              icon={audience?.icon}
                              rotate={audience?.rotate}
                            />
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
