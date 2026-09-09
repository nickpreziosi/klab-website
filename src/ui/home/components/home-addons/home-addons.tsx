"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

function LeaderLine({
  variant,
  className,
  pathLength,
  startOpacity,
  endOpacity,
}: {
  variant: "left" | "right";
  className: string;
  pathLength: MotionValue<number> | number;
  startOpacity: MotionValue<number> | number;
  endOpacity: MotionValue<number> | number;
}) {
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
          style={{ opacity: startOpacity }}
        />
        <motion.path
          d="M2.667 2.667 V139.167 A6 6 0 0 0 8.667 145.167 H103.5"
          stroke="#00ACFD"
          strokeWidth="1"
          style={{ pathLength }}
        />
        <motion.path
          d="M100.132 142.338 L102.96 145.167 L100.132 147.995"
          stroke="#00ACFD"
          strokeWidth="1"
          strokeLinejoin="miter"
          style={{ opacity: endOpacity }}
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
        style={{ opacity: startOpacity }}
      />
      <motion.path
        d="M2.667 30.5 V6.5 A6 6 0 0 1 8.667 0.5 H138.667 A6 6 0 0 1 144.667 6.5 V53.5"
        stroke="#00ACFD"
        strokeWidth="1"
        style={{ pathLength }}
      />
      <motion.path
        d="M141.838 50.4646 L144.667 53.293 L147.495 50.4646"
        stroke="#00ACFD"
        strokeWidth="1"
        style={{ opacity: endOpacity }}
      />
    </svg>
  );
}

export function HomeAddons({ translations, skipAnimation = false }: HomeAddonsProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const sceneRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const skip = skipAnimation || !!reduceMotion;
  const inView = useInView(boardRef, { once: true, amount: 0.3 });
  const revealed = skip || inView;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const lineLength = useTransform(scrollYProgress, [0.22, 0.52], [0, 1]);
  const lineStart = useTransform(scrollYProgress, [0.18, 0.28], [0, 1]);
  const lineEnd = useTransform(scrollYProgress, [0.48, 0.58], [0, 1]);
  const calloutProgress = useTransform(scrollYProgress, [0.32, 0.52], [0, 1]);
  const boxesOpacity = useMotionValue(skip ? 1 : 0);
  const prevProgress = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const goingDown = latest >= prevProgress.current;
    prevProgress.current = latest;
    const mapped = calloutProgress.get();
    if (goingDown) {
      if (mapped > boxesOpacity.get()) boxesOpacity.set(mapped);
      return;
    }
    boxesOpacity.set(mapped);
  });

  useEffect(() => {
    if (skip) boxesOpacity.set(1);
  }, [skip, boxesOpacity]);

  const screenState = skip ? "visible" : revealed ? "visible" : "hidden";
  const screenTransition = (delay: number) =>
    skip ? { duration: 0 } : { duration: 0.7, delay, ease: ENTRANCE_EASE };
  const linePathLength = skip ? 1 : lineLength;
  const lineStartOpacity = skip ? 1 : lineStart;
  const lineEndOpacity = skip ? 1 : lineEnd;

  return (
    <section
      className={styles.section}
      dir={dir}
      aria-labelledby="home-addons-heading"
    >
      <div
        ref={sceneRef}
        className={cn(styles.scene, reduceMotion && styles.sceneStatic)}
      >
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
                  pathLength={linePathLength}
                  startOpacity={lineStartOpacity}
                  endOpacity={lineEndOpacity}
                />
              </span>
              <span className={styles.leaderRightWrap} aria-hidden>
                <LeaderLine
                  variant="right"
                  className={styles.leaderRight}
                  pathLength={linePathLength}
                  startOpacity={lineStartOpacity}
                  endOpacity={lineEndOpacity}
                />
              </span>
            </div>

            <div className={styles.callouts}>
              <motion.div
                className={cn(styles.callout, styles.calloutLeft)}
                dir={dir}
                style={{ opacity: boxesOpacity }}
              >
                <ul>
                  <li>{translations.addonsCallout1}</li>
                  <li>{translations.addonsCallout2}</li>
                </ul>
              </motion.div>
              <motion.div
                className={cn(styles.callout, styles.calloutRight)}
                dir={dir}
                style={{ opacity: boxesOpacity }}
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
