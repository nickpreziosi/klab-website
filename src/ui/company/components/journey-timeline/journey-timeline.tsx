"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import styles from "./journey-timeline.module.css";

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div className={styles.outerContainer}>
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <CompanySectionTitle title="Our Journey" inView={inView} />
          </div>

          <div className={styles.intro}>
            <p className={styles.subtitle}>
              BUILDING THE FUTURE OF AI ON FIVE YEARS OF PROVEN FINANCIAL INTELLIGENCE.
            </p>
            <div className={styles.paragraphs}>
              <p className={styles.paragraph}>
                WE&apos;VE INHERITED 5 YEARS OF R&D AND PROPRIETARY DATA FROM KEO
                WORLD—FOLLOWING ITS STRATEGIC ACQUISITION BY MAMA CAPITAL.
              </p>
              <p className={styles.paragraph}>
                THROUGH A DEFINITIVE AGREEMENT WITH MAHA CAPITAL, K LAB NOW
                LEVERAGES THIS MASSIVE DATA ECOSYSTEM TO TRAIN SPECIALIZED AI
                MODELS. WE ARE TURNING YEARS OF TRANSACTIONS INTO THE
                INTELLIGENCE OF TOMORROW.
              </p>
            </div>
          </div>

          <motion.div
            className={styles.timelineWrapper}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.timelineBar}>
              <div className={styles.badgesRow}>
                <div className={styles.badgeWithYear}>
                  <span className={styles.yearLabel}>2020</span>
                  <div className={styles.circularBadge}>
                    <Image
                      src="/logos/keo-logo.png"
                      alt="KEO"
                      width={64}
                      height={64}
                      className={styles.keoLogo}
                    />
                  </div>
                </div>
                <span className={styles.arrow}>→</span>
                <div className={styles.badgeWithYear}>
                  <span className={styles.yearLabel}>2025</span>
                  <div className={`${styles.circularBadge} ${styles.soldBadge}`}>
                    SOLD!
                  </div>
                </div>
                <span className={styles.arrow}>→</span>
              </div>
              <div className={styles.futureZone}>
                <span className={styles.futureOverlay} aria-hidden>
                  FUTURE
                </span>
              </div>
            </div>
            <div className={styles.eventsRow}>
              <div className={styles.event}>
                <span className={styles.eventArrow}>→</span>
                <span>ACQUIRED 5 YEARS R&D AI PROJECTS FROM KEO WORLD</span>
              </div>
              <div className={styles.event}>
                <span className={styles.eventArrow}>→</span>
                <span>
                  ACQUIRED COPY AND LICENSING RIGHTS OF BLOCKCHAIN PAYMENT
                  RAILS
                </span>
              </div>
              <div className={styles.event}>
                <span className={styles.eventArrow}>→</span>
                <span>
                  SECURED DATA ACCESS AGREEMENT TO TRAIN PROPRIETARY MODELS
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
