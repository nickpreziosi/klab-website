"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./who-we-serve.module.css";

const DASHBOARD = "/images/who-we-serve/dashboard.png";
const AUTOPLAY_MS = 8000;
const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: ENTRANCE_EASE },
  },
};

const AUDIENCES: readonly { id: string; icon: string; rotate?: boolean }[] = [
  { id: "governments", icon: "/images/who-we-serve/icon-governments.svg" },
  { id: "enterprises", icon: "/images/who-we-serve/icon-enterprises.svg" },
  { id: "suppliers", icon: "/images/who-we-serve/icon-suppliers.svg", rotate: true },
  { id: "banks", icon: "/images/who-we-serve/icon-banks.svg", rotate: true },
  { id: "capital", icon: "/images/who-we-serve/icon-capital.svg" },
];

type WhoWeServeProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function WhoWeServe({ translations, skipAnimation = false }: WhoWeServeProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    duration: 22,
    direction: dir,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [dir, emblaApi]);

  const items = translations.serveItems;

  useEffect(() => {
    if (!emblaApi || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setTimeout(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(id);
  }, [emblaApi, items.length, selected]);

  const goTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  const goPrev = () => {
    emblaApi?.scrollPrev();
  };

  const goNext = () => {
    emblaApi?.scrollNext();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
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
    <motion.section
      className={styles.section}
      dir={dir}
      aria-labelledby="who-we-serve-heading"
      initial={skipAnimation ? false : "hidden"}
      whileInView={skipAnimation ? undefined : "visible"}
      animate={skipAnimation ? "visible" : undefined}
      viewport={skipAnimation ? undefined : { once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <div className={styles.header}>
        <h2 id="who-we-serve-heading" className={styles.heading}>
          {translations.serveTitle}
        </h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            aria-label={translations.servePrev}
            onClick={goPrev}
          >
            <ChevronLeft className="rtlFlipH" aria-hidden />
          </button>
          <button
            type="button"
            className={styles.navButton}
            aria-label={translations.serveNext}
            onClick={goNext}
          >
            <ChevronRight className="rtlFlipH" aria-hidden />
          </button>
        </div>
      </div>

      <div className={styles.layout}>
        <div
          className={styles.list}
          role="tablist"
          aria-label={translations.serveTitle}
          aria-orientation="vertical"
        >
          {items.map((item, index) => {
            const active = index === selected;
            const icon = AUDIENCES[index]?.icon;
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
                <span className={styles.iconBox} aria-hidden>
                  {icon ? (
                    <span
                      className={cn(
                        styles.icon,
                        AUDIENCES[index]?.rotate && styles.iconRotated
                      )}
                      style={{
                        maskImage: `url(${icon})`,
                        WebkitMaskImage: `url(${icon})`,
                      }}
                    />
                  ) : null}
                </span>
                <span className={styles.itemCopy}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemBody}>
                    {item.body.split("\n\n").map((paragraph, paragraphIndex) => (
                      <span key={paragraphIndex} className={styles.itemPara}>
                        {withBrandLtr(paragraph, styles.brandLtr)}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.media}>
          <div className={styles.stage}>
            <div className={styles.glow} aria-hidden />
            <div className={styles.viewport} ref={emblaRef}>
              <div className={styles.container}>
                {items.map((item, index) => {
                  const active = index === selected;
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
                      <img
                        src={DASHBOARD}
                        alt={active ? translations.serveImageAlt : ""}
                        className={styles.image}
                        decoding="async"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <span className={styles.leader} aria-hidden>
            <img
              src="/images/who-we-serve/callout-leader.svg"
              alt=""
              className={styles.leaderImg}
            />
          </span>
          <p className={styles.callout}>{translations.serveCallout}</p>
        </div>
      </div>
    </motion.section>
  );
}
