"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import styles from "./krails-why.module.css";
import Button from "@/ui/shared/components/button/button";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../../../../../public/animations/krails.json";
import type { KRailsTranslations } from "@/ui/krails/views/KRailsView/KRailsView";
import { Briefcase, ClipboardCheck, Landmark, Network, type LucideIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerDelays = [0.1, 0.2, 0.3, 0.4, 0.5];

const viewportOnce = { once: true, margin: "-50px" as const };

/** Split localized headings on em dash / en dash: "Government — Spend Control" */
function splitUseCaseHeading(heading: string): { category: string; title: string } | null {
  const m = heading.match(/^(.+?)\s*[—–]\s*(.+)$/u);
  if (!m) return null;
  return { category: m[1]!.trim(), title: m[2]!.trim() };
}

const USE_CASE_ROWS: { Icon: LucideIcon }[] = [
  { Icon: Network },
  { Icon: Landmark },
  { Icon: ClipboardCheck },
  { Icon: Briefcase },
];

const useCaseCtaArrowIcon = (
  <svg
    className="rtlFlipH"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M4 10H16M16 10L10 4M16 10L10 16"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function KRailsWhy({
  translations,
  skipAnimation = false,
}: {
  translations: KRailsTranslations;
  skipAnimation?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [progress, setProgress] = useState(0);
  const [isSafari, setIsSafari] = useState(false);
  const locale = useLocale();
  const textDir = getTextDirection(locale as Locale) === "rtl" ? "rtl" : "ltr";

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      ua.includes("safari") && !ua.includes("chrome") && !ua.includes("android");
    setIsSafari(isSafariBrowser);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const leftEl = leftRef.current;
        if (!leftEl) return;
        const rect = leftEl.getBoundingClientRect();
        const vh = window.innerHeight;
        const contentHeight = rect.height;
        const maxScroll = Math.max(0, contentHeight - vh);
        const scrolled = Math.min(Math.max(-rect.top, 0), maxScroll);
        const pct = maxScroll > 0 ? scrolled / maxScroll : rect.top <= 0 ? 1 : 0;
        setProgress(Number.isFinite(pct) ? pct : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 4.0;
  }, []);

  useEffect(() => {
    if (lottieRef.current) lottieRef.current.setSpeed(3);
  }, []);

  return (
    <section id="video" className={styles.section} ref={sectionRef}>
      <div className={styles.gradientOverlay} />
      <div className={styles.container}>
        <div style={{ display: "none" }} className={styles.topHeading}>
          <motion.h2
            className={styles.mainHeading}
            initial={skipAnimation ? fadeUp.visible : fadeUp.hidden}
            whileInView={skipAnimation ? undefined : fadeUp.visible}
            viewport={skipAnimation ? undefined : viewportOnce}
            transition={skipAnimation ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          >
            {translations.whyHeading}
          </motion.h2>
          {translations.whySubheading ? (
            <motion.p
              className={styles.subheading}
              initial={skipAnimation ? fadeUp.visible : fadeUp.hidden}
              whileInView={skipAnimation ? undefined : fadeUp.visible}
              viewport={skipAnimation ? undefined : viewportOnce}
              transition={skipAnimation ? { duration: 0 } : { duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              {translations.whySubheading}
            </motion.p>
          ) : null}
        </div>

        <div className={styles.grid} dir="ltr">
          <div className={styles.scrollContent} ref={leftRef} dir={textDir}>
            <div className={styles.leftColumn}>
              <motion.div
                className={styles.textBlock}
                initial={skipAnimation ? fadeUp.visible : fadeUp.hidden}
                whileInView={skipAnimation ? undefined : fadeUp.visible}
                viewport={skipAnimation ? undefined : viewportOnce}
                transition={skipAnimation ? { duration: 0 } : { duration: 0.6, delay: staggerDelays[0], ease: "easeOut" }}
              >
                <h2 className={styles.mainHeading}>{translations.whyHeading}</h2>
                {translations.whySubheading ? (
                  <p className={styles.subheading}>{translations.whySubheading}</p>
                ) : null}
              </motion.div>
              {(
                [
                  { heading: translations.whyBlock0Heading, description: translations.whyBlock0Description, cta: translations.whyBlock0Cta },
                  { heading: translations.whyBlock1Heading, description: translations.whyBlock1Description, cta: translations.whyBlock1Cta },
                  { heading: translations.whyBlock2Heading, description: translations.whyBlock2Description, cta: translations.whyBlock2Cta },
                  { heading: translations.whyBlock3Heading, description: translations.whyBlock3Description, cta: translations.whyBlock3Cta },
                ] as const
              ).map((row, index) => {
                const split = splitUseCaseHeading(row.heading);
                const { Icon } = USE_CASE_ROWS[index]!;
                const delayIndex = index + 1;
                const isLast = index === 3;
                const ctaHref = index === 0 ? "#krails-video" : `/${locale}/contact/sales`;
                return (
                  <motion.div
                    key={`krails-use-case-${index}`}
                    className={`${styles.useCaseBlock} ${isLast ? styles.useCaseBlockLast : ""}`}
                    initial={skipAnimation ? fadeUp.visible : fadeUp.hidden}
                    whileInView={skipAnimation ? undefined : fadeUp.visible}
                    viewport={skipAnimation ? undefined : viewportOnce}
                    transition={
                      skipAnimation
                        ? { duration: 0 }
                        : { duration: 0.6, delay: staggerDelays[delayIndex], ease: "easeOut" }
                    }
                  >
                    <div className={styles.useCaseLeadingRow}>
                      <span className={styles.useCaseIconWrap} aria-hidden>
                        <Icon className={styles.useCaseIcon} strokeWidth={1.75} />
                      </span>
                      {split ? (
                        <p className={styles.useCaseEyebrow}>{split.category}</p>
                      ) : null}
                    </div>
                    {split ? (
                      <h3 className={styles.useCaseTitle}>{split.title}</h3>
                    ) : (
                      <h3 className={styles.useCaseTitle}>{row.heading}</h3>
                    )}
                    <p className={styles.useCaseDescription}>{row.description}</p>
                    <div className={styles.ctaContainer}>
                      <Button
                        variant="accent-brand"
                        iconPosition="right"
                        href={ctaHref}
                        icon={useCaseCtaArrowIcon}
                      >
                        {row.cta}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className={styles.progressContainer} aria-hidden>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ height: `${Math.round(progress * 100)}%` }} />
            </div>
            <div
              className={styles.progressMarker}
              style={{
                opacity: progress >= 0.5 ? 1 : 0,
                transform: `translate(-50%, -50%) rotate(${progress >= 0.75 ? 45 : 0}deg) scale(1)`,
              }}
            />
          </div>
          <div className={styles.rightColumn} ref={rightRef} dir="ltr">
            <div aria-hidden role="presentation" tabIndex={-1} className={styles.animationContainer}>
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop
                assetsPath="/animations/images/"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
