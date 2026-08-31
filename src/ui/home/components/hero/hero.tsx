"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HeroTranslations } from "@/ui/home/types";
import { buildHeroTranslations } from "@/ui/home/types";
import { HeroStatCards } from "@/ui/home/components/hero-stat-cards/hero-stat-cards";
import { useHomeAnimation } from "@/ui/home/providers/home-animation-provider";
import Button from "@/ui/shared/components/button/button";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./hero.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const headlineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.8,
      ease: ENTRANCE_EASE,
    },
  },
};

const headlineLineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

type HeadlineWordToken = { word: string; highlight: boolean; isolateLtr: boolean };

/** Keep Latin brand names as one token so RTL does not render “Rails K”. */
const BRAND_PHRASES = ["K Rails", "K Lab"] as const;
const HEADLINE_TOKEN_PATTERN = new RegExp(
  `(?:${BRAND_PHRASES.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})|\\S+`,
  "gu"
);

function splitWords(segment: string, highlight: boolean): HeadlineWordToken[] {
  const tokens: HeadlineWordToken[] = [];
  for (const match of segment.matchAll(HEADLINE_TOKEN_PATTERN)) {
    const word = match[0];
    tokens.push({
      word,
      highlight,
      isolateLtr: /[A-Za-z]/.test(word),
    });
  }
  return tokens;
}

const delayedFadeTransition = { delay: 0.6, duration: 0.8, ease: ENTRANCE_EASE };

type HeroProps = {
  /** When provided (from server), copy is SSR'd; otherwise use client useTranslations */
  translations?: HeroTranslations;
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
};

export const Hero = ({
  translations: serverTranslations,
  skipAnimation = false,
}: HeroProps = {}) => {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const t = useTranslations("hero");
  const translations: HeroTranslations = serverTranslations ?? buildHeroTranslations(t);

  const homeAnimation = useHomeAnimation();
  const loadingProgressFinished = homeAnimation?.loadingProgressFinished ?? true;
  const markHomeHeroEntranceCompleted = homeAnimation?.markHomeHeroEntranceCompleted;

  const [isLoaded, setIsLoaded] = useState(skipAnimation);

  useEffect(() => {
    if (skipAnimation) {
      setIsLoaded(true);
      return;
    }
    if (loadingProgressFinished) setIsLoaded(true);
  }, [skipAnimation, loadingProgressFinished]);

  useEffect(() => {
    if (skipAnimation) {
      markHomeHeroEntranceCompleted?.();
    }
  }, [skipAnimation, markHomeHeroEntranceCompleted]);

  const headlineLines = useMemo(
    () => [splitWords(translations.titleLine1, false), splitWords(translations.titleLine2, true)],
    [translations.titleLine1, translations.titleLine2]
  );

  const faded = {
    opacity: 0,
    filter: "blur(10px)",
    y: 10,
  };
  const shown = {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
  };

  return (
    <section className={styles.hero}>
      <div className={styles.stage}>
        <div className={styles.cluster}>
          <div className={styles.content}>
            <div className={styles.mainContainer}>
              <div dir={dir} className={styles.copy}>
              <motion.p
                className={styles.eyebrow}
                initial={skipAnimation ? shown : faded}
                animate={isLoaded ? shown : faded}
                transition={delayedFadeTransition}
              >
                {translations.eyebrow}
              </motion.p>
              <motion.h1
                className={styles.headline}
                variants={headlineContainerVariants}
                initial={skipAnimation ? "visible" : "hidden"}
                animate={isLoaded ? "visible" : "hidden"}
                onAnimationComplete={() => {
                  if (isLoaded && !skipAnimation) {
                    markHomeHeroEntranceCompleted?.();
                  }
                }}
              >
                {headlineLines.map((line, lineIndex) => (
                  <motion.span
                    key={lineIndex}
                    className={styles.headlineLine}
                    variants={headlineLineVariants}
                  >
                    {line.map((token, index) => (
                      <motion.span
                        key={`${lineIndex}-${index}-${token.word}`}
                        variants={wordVariants}
                        dir={token.isolateLtr ? "ltr" : undefined}
                        className={cn(
                          styles.word,
                          token.highlight && styles.headlineHighlight,
                          token.isolateLtr && styles.wordLtr
                        )}
                      >
                        {token.word}{" "}
                      </motion.span>
                    ))}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className={styles.subtitle}
                initial={skipAnimation ? shown : faded}
                animate={isLoaded ? shown : faded}
                transition={delayedFadeTransition}
              >
                {translations.subtitle}
              </motion.p>
              <motion.div
                className={styles.ctaWrap}
                initial={skipAnimation ? shown : { opacity: 0, filter: "blur(10px)" }}
                animate={isLoaded ? shown : { opacity: 0, filter: "blur(10px)" }}
                transition={delayedFadeTransition}
              >
                <Button
                  href="/contact/sales"
                  variant="secondary"
                  size="lg"
                  className={styles.cta}
                >
                  {translations.cta}
                </Button>
              </motion.div>
              </div>
            </div>
          </div>
          <HeroStatCards
            translations={translations}
            skipAnimation={skipAnimation}
            isLoaded={isLoaded}
          />
        </div>
      </div>
    </section>
  );
};
