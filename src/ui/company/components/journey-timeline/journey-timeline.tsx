"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import styles from "./journey-timeline.module.css";

export default function JourneyTimeline({ skipAnimation = false }: { skipAnimation?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const effectiveInView = skipAnimation || inView;
  const t = useTranslations("journeyTimeline");
  const tCommon = useTranslations("common");

  return (
    <div className={styles.outerContainer}>
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <CompanySectionTitle title={t("title")} inView={effectiveInView} skipAnimation={skipAnimation} />
          </div>

          <div className={styles.intro}>
            <p className={styles.subtitle}>{t("subtitle")}</p>
            <div className={styles.paragraphs}>
              <p className={styles.paragraph}>{t("paragraph1")}</p>
              <p className={styles.paragraph}>{t("paragraph2")}</p>
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
                  <span className={styles.yearLabel}>{t("year2020")}</span>
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
                <span className={styles.arrow}>→</span>
                <div className={styles.badgeWithYear}>
                  <span className={styles.yearLabel}>{t("year2025")}</span>
                  <div className={`${styles.circularBadge} ${styles.soldBadge}`}>
                    {t("sold")}
                  </div>
                </div>
                <span className={styles.arrow}>→</span>
              </div>
              <div className={styles.futureZone}>
                <span className={styles.futureOverlay} aria-hidden>
                  {t("future")}
                </span>
              </div>
            </div>
            <div className={styles.eventsRow}>
              <div className={styles.event}>
                <span className={styles.eventArrow}>→</span>
                <span>{t("event1")}</span>
              </div>
              <div className={styles.event}>
                <span className={styles.eventArrow}>→</span>
                <span>{t("event2")}</span>
              </div>
              <div className={styles.event}>
                <span className={styles.eventArrow}>→</span>
                <span>{t("event3")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
