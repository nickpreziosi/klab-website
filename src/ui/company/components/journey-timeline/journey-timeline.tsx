"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import type { JourneyTimelineTranslations } from "@/ui/company/types";
import { buildJourneyTimelineTranslations } from "@/ui/company/types";
import styles from "./journey-timeline.module.css";

export default function JourneyTimeline({
  translations: serverTranslations,
  skipAnimation = false,
}: {
  /** When provided (from server), copy is SSR'd; otherwise use client useTranslations */
  translations?: JourneyTimelineTranslations;
  skipAnimation?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const effectiveInView = skipAnimation || inView;
  const t = useTranslations("journeyTimeline");
  const translations = serverTranslations ?? buildJourneyTimelineTranslations(t);
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);

  return (
    <div className={styles.outerContainer}>
      <section ref={sectionRef} className={styles.section} dir={dir}>
        <div className={styles.container}>
          <div className={styles.header}>
            <CompanySectionTitle title={translations.title} inView={effectiveInView} skipAnimation={skipAnimation} />
          </div>

          <div className={styles.intro}>
            <p className={styles.subtitle}>{translations.subtitle}</p>
            <div className={styles.paragraphs}>
              <p className={styles.paragraph}>{translations.paragraph1}</p>
              <p className={styles.paragraph}>{translations.paragraph2}</p>
            </div>
          </div>

          <motion.div
            className={styles.timelineWrapper}
            initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
            animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.timelineBar}>
              <div className={styles.badgesRow}>
                <div className={styles.badgeWithYear}>
                  <span className={styles.yearLabel}>{translations.year2020}</span>
                  <div className={styles.circularBadge}>
                    <Image
                      src="/logos/keo-logo.png"
                      alt={tCommon("keoAlt")}
                      width={64}
                      height={64}
                      className={styles.keoLogo}
                    />
                  </div>
                </div>
                <span className={`${styles.arrow} rtlFlipH`}>→</span>
                <div className={styles.badgeWithYear}>
                  <span className={styles.yearLabel}>{translations.year2025}</span>
                  <span className={styles.soldLabel}>{translations.sold}</span>
                </div>
                <span className={`${styles.arrow} rtlFlipH`}>→</span>
              </div>
              <div className={styles.futureZone}>
                <span className={styles.futureOverlay} aria-hidden>
                  {translations.future}
                </span>
              </div>
            </div>
            <div className={styles.eventsRow}>
              <div className={styles.event}>
                <span className={`${styles.eventArrow} rtlFlipH`}>→</span>
                <span>{translations.event1}</span>
              </div>
              <div className={styles.event}>
                <span className={`${styles.eventArrow} rtlFlipH`}>→</span>
                <span>{translations.event2}</span>
              </div>
              <div className={styles.event}>
                <span className={`${styles.eventArrow} rtlFlipH`}>→</span>
                <span>{translations.event3}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
