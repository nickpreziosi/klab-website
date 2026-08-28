"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { useHomeAnimation } from "@/ui/home/providers/home-animation-provider";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./skewed-carousel.module.css";

const SLIDES = [
  { id: "logo-left", src: "/images/bg-logo-left.webp" },
  { id: "logo-right", src: "/images/bg-logo-right.webp" },
  { id: "logo-zoom-left", src: "/images/bg-logo-zoom-left.webp" },
  { id: "logo-zoom-right", src: "/images/bg-logo-zoom-right.webp" },
  { id: "gradient", src: "/images/klab-gradient.webp" },
] as const;

/** Pixels per second — keeps speed stable as card size changes. */
const MARQUEE_PX_PER_SEC = 70;

type SkewedCarouselProps = {
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
};

export function SkewedCarousel({ skipAnimation = false }: SkewedCarouselProps) {
  const locale = useLocale() as Locale;
  const isRtl = getTextDirection(locale) === "rtl";
  const homeAnimation = useHomeAnimation();
  const loadingProgressFinished = homeAnimation?.loadingProgressFinished ?? true;
  const [isLoaded, setIsLoaded] = useState(skipAnimation);
  const groupRef = useRef<HTMLUListElement>(null);
  const [shiftPx, setShiftPx] = useState(0);

  useEffect(() => {
    if (skipAnimation) {
      setIsLoaded(true);
      return;
    }
    if (loadingProgressFinished) setIsLoaded(true);
  }, [skipAnimation, loadingProgressFinished]);

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
    <motion.div
      className={cn(styles.root, isRtl && styles.rtl)}
      aria-hidden
      style={
        {
          "--shift": `${shiftPx}px`,
          "--duration": `${durationSec}s`,
        } as React.CSSProperties
      }
      initial={skipAnimation ? false : { opacity: 0 }}
      animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.viewport}>
        <div className={styles.lift}>
          <div className={styles.scene}>
            <div
              className={cn(styles.track, shiftPx > 0 && styles.trackReady)}
            >
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  ref={copy === 0 ? groupRef : undefined}
                  className={styles.group}
                >
                  {SLIDES.map((item) => (
                    <li key={`${copy}-${item.id}`} className={styles.slide}>
                      <div className={styles.card}>
                        <Image
                          src={item.src}
                          alt=""
                          width={1440}
                          height={900}
                          className={styles.cardImage}
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                          sizes="(max-width: 768px) 70vw, 36vw"
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
    </motion.div>
  );
}
