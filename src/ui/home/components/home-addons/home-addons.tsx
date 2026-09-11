"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import { AddonSphereRow } from "@/ui/shared/components/addon-spheres/addon-sphere-row";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./home-addons.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const screenFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

type HomeAddonsProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

function shotTransition(skip: boolean, delay: number, duration: number) {
  return skip
    ? { duration: 0 }
    : { duration, delay, ease: ENTRANCE_EASE };
}

function LeaderLine({
  variant,
  className,
  play,
  skip,
}: {
  variant: "left" | "right";
  className: string;
  play: boolean;
  skip: boolean;
}) {
  const shown = skip || play;

  if (variant === "left") {
    return (
      <svg
        className={className}
        viewBox="0 0 104.167 148.849"
        fill="none"
        preserveAspectRatio="none"
        overflow="visible"
        aria-hidden
      >
        <motion.circle
          cx="2.66667"
          cy="2.66667"
          r="2.66667"
          fill="#00ACFD"
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={shotTransition(skip, 0.28, 0.25)}
        />
        <motion.path
          d="M2.667 2.667 V139.167 A6 6 0 0 0 8.667 145.167 H103.5"
          stroke="#00ACFD"
          strokeWidth="1"
          initial={skip ? false : { pathLength: 0 }}
          animate={{ pathLength: shown ? 1 : 0 }}
          transition={shotTransition(skip, 0.32, 0.55)}
        />
        <motion.path
          d="M100.132 142.338 L102.96 145.167 L100.132 147.995"
          stroke="#00ACFD"
          strokeWidth="1"
          strokeLinejoin="miter"
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={shotTransition(skip, 0.82, 0.2)}
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 148.349 54.5001"
      fill="none"
      preserveAspectRatio="none"
      overflow="visible"
      aria-hidden
    >
      <motion.circle
        cx="2.66667"
        cy="30.5"
        r="2.66667"
        fill="#00ACFD"
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: shown ? 1 : 0 }}
        transition={shotTransition(skip, 0.28, 0.25)}
      />
      <motion.path
        d="M2.667 30.5 V6.5 A6 6 0 0 1 8.667 0.5 H138.667 A6 6 0 0 1 144.667 6.5 V53.5"
        stroke="#00ACFD"
        strokeWidth="1"
        initial={skip ? false : { pathLength: 0 }}
        animate={{ pathLength: shown ? 1 : 0 }}
        transition={shotTransition(skip, 0.32, 0.55)}
      />
      <motion.path
        d="M141.838 50.4646 L144.667 53.293 L147.495 50.4646"
        stroke="#00ACFD"
        strokeWidth="1"
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: shown ? 1 : 0 }}
        transition={shotTransition(skip, 0.82, 0.2)}
      />
    </svg>
  );
}

export function HomeAddons({ translations, skipAnimation = false }: HomeAddonsProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const boardRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const skip = skipAnimation || !!reduceMotion;
  const boardInView = useInView(boardRef, { once: true, amount: 0.3 });
  const calloutsInView = useInView(calloutsRef, { once: true, amount: 0.4 });
  const boardRevealed = skip || boardInView;
  const shotReady = skip || calloutsInView;

  const screenState = skip ? "visible" : boardRevealed ? "visible" : "hidden";
  const screenTransition = (delay: number) =>
    skip ? { duration: 0 } : { duration: 0.7, delay, ease: ENTRANCE_EASE };

  return (
    <section
      className={styles.section}
      dir={dir}
      aria-labelledby="home-addons-heading"
    >
      <div className={styles.scene}>
        <div className={styles.sticky}>
          <div className={styles.top}>
        <div className={styles.visual} dir="ltr">
          <div className={styles.dashStack}>
            <div className={styles.mockupBoard} ref={boardRef}>
              <motion.div
                className={styles.glowBack}
                aria-hidden
                initial={skip ? false : "hidden"}
                animate={screenState}
                variants={screenFade}
                transition={screenTransition(0)}
              />
              <motion.img
                src="/images/home-addons/dashboard-back.png"
                alt=""
                className={styles.dashBack}
                decoding="async"
                initial={skip ? false : "hidden"}
                animate={screenState}
                variants={screenFade}
                transition={screenTransition(0)}
              />
              <motion.div
                className={styles.glowFront}
                aria-hidden
                initial={skip ? false : "hidden"}
                animate={screenState}
                variants={screenFade}
                transition={screenTransition(0.15)}
              />
              <motion.img
                src="/images/home-addons/dashboard-front.png"
                alt={translations.addonsDashAlt}
                className={styles.dashFront}
                decoding="async"
                initial={skip ? false : "hidden"}
                animate={screenState}
                variants={screenFade}
                transition={screenTransition(0.15)}
              />
              <span className={styles.leaderLeftWrap} aria-hidden>
                <LeaderLine
                  variant="left"
                  className={styles.leaderLeft}
                  play={shotReady}
                  skip={skip}
                />
              </span>
              <span className={styles.leaderRightWrap} aria-hidden>
                <LeaderLine
                  variant="right"
                  className={styles.leaderRight}
                  play={shotReady}
                  skip={skip}
                />
              </span>
            </div>

            <div className={styles.callouts} ref={calloutsRef}>
              <motion.div
                className={cn(styles.callout, styles.calloutLeft)}
                dir={dir}
                initial={skip ? false : { opacity: 0 }}
                animate={{ opacity: shotReady ? 1 : 0 }}
                transition={shotTransition(skip, 0.5, 0.45)}
              >
                <ul>
                  <li>{translations.addonsCallout1}</li>
                  <li>{translations.addonsCallout2}</li>
                </ul>
              </motion.div>
              <motion.div
                className={cn(styles.callout, styles.calloutRight)}
                dir={dir}
                initial={skip ? false : { opacity: 0 }}
                animate={{ opacity: shotReady ? 1 : 0 }}
                transition={shotTransition(skip, 0.5, 0.45)}
              >
                <ul>
                  <li>{translations.addonsCallout3}</li>
                  <li>{translations.addonsCallout4}</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.pillLg}>
            <span className={styles.plusLg} aria-hidden>
              <img src="/images/home-addons/plus-circle-lg.svg" alt="" width={30} height={30} />
              <span className={styles.plusBarVLg} />
              <span className={styles.plusBarHLg} />
            </span>
            <span className={styles.eyebrow} dir={dir}>
              {translations.addonsEyebrow}
            </span>
          </div>
          <h2 id="home-addons-heading" className={styles.title}>
            <span className={styles.titleLine}>{translations.addonsTitleLine1}</span>
            <span className={styles.titleLine}>
              {withBrandLtr(translations.addonsTitleLine2, styles.brandLtr)}
            </span>
          </h2>
          <div className={styles.body}>
            <p className={styles.bodyLead}>
              {withBrandLtr(translations.addonsBodyLead, styles.brandLtr)}
            </p>
            <p className={styles.bodyRest}>
              {withBrandLtr(translations.addonsBody, styles.brandLtr)}
            </p>
          </div>
        </div>
          </div>
        </div>
      </div>

      <AddonSphereRow />
    </section>
  );
}
