"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./skewed-carousel.module.css";

const SLIDES = [
  {
    id: "sending-contract",
    light: "/images/hero-mockups/krails-sending-contract-light.webp",
    dark: "/images/hero-mockups/krails-sending-contract-dark.webp",
  },
  {
    id: "contract-validation",
    light: "/images/hero-mockups/krails-contract-validation-light.webp",
    dark: "/images/hero-mockups/krails-contract-validation-dark.webp",
  },
  {
    id: "approval-queue",
    light: "/images/hero-mockups/krails-approval-queue-light.webp",
    dark: "/images/hero-mockups/krails-approval-queue-dark.webp",
  },
] as const;

/** Pixels per second — keeps speed stable as card size changes. */
const MARQUEE_PX_PER_SEC = 70;

type SkewedCarouselProps = {
  /** In-flow homepage band (not absolutely pinned to the hero). */
  inFlow?: boolean;
};

export function SkewedCarousel({ inFlow = false }: SkewedCarouselProps) {
  const locale = useLocale() as Locale;
  const isRtl = getTextDirection(locale) === "rtl";
  const groupRef = useRef<HTMLUListElement>(null);
  const [shiftPx, setShiftPx] = useState(0);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;

    const measure = () => {
      const width = el.offsetWidth;
      if (width > 0) setShiftPx(width);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const durationSec = shiftPx > 0 ? Math.max(18, shiftPx / MARQUEE_PX_PER_SEC) : 30;

  return (
    <div
      className={cn(styles.root, isRtl && styles.rtl, inFlow && styles.inFlow)}
      aria-hidden
      style={
        {
          "--shift": `${shiftPx}px`,
          "--duration": `${durationSec}s`,
        } as React.CSSProperties
      }
    >
      <div className={styles.viewport}>
        <div className={styles.lift}>
          <div className={styles.scene}>
            <div className={cn(styles.track, shiftPx > 0 && styles.trackReady)}>
              {[0, 1, 2].map((copy) => (
                <ul
                  key={copy}
                  ref={copy === 0 ? groupRef : undefined}
                  className={styles.group}
                >
                  {SLIDES.map((item) => (
                    <li key={`${copy}-${item.id}`} className={styles.slide}>
                      <div className={styles.card}>
                        <img
                          className={cn(styles.cardImage, styles.cardImageLight)}
                          src={item.light}
                          alt=""
                          decoding="async"
                        />
                        <img
                          className={cn(styles.cardImage, styles.cardImageDark)}
                          src={item.dark}
                          alt=""
                          decoding="async"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
