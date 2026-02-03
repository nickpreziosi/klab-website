"use client";
import { motion } from "motion/react";
import {
  exampleApiSections,
  KeoRailsCode,
} from "@/ui/keo-rails/components/keo-rails-code/keo-rails-code";
import styles from "./keo-rails-code-section.module.css";
import { useRef, useEffect } from "react";

export default function KeoRailsCodeSection() {
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!leftColRef.current || !cardsContainerRef.current) return;

    const sync = () => {
      if (window.innerWidth <= 1024) {
        leftColRef.current!.style.maxHeight = `500px`;
        leftColRef.current!.style.height = `500px`;
      } else {
        const cardsContainerHeight = cardsContainerRef.current?.getBoundingClientRect().height;
        leftColRef.current!.style.maxHeight = `${cardsContainerHeight}px`;
        leftColRef.current!.style.height = `${cardsContainerHeight}px`;
        leftColRef.current!.style.overflow = "hidden";
      }
    };

    sync();

    const ro = new ResizeObserver(() => sync());
    ro.observe(cardsContainerRef.current);

    window.addEventListener("resize", sync);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section inert tabIndex={-1} aria-hidden role="presentation" className={styles.section}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <h2 className={styles.heading}>
          ENTERPRISE TRUST.
          <br />
          IMPOSSIBLE TO ALTER. PERIOD.
        </h2>
        <div className={styles.grid}>
          <div className={styles.leftColumn} ref={leftColRef}>
            <KeoRailsCode
              sections={exampleApiSections}
              typingSpeed={20}
              lineDelay={150}
              loop={true}
            />
          </div>
          <div className={styles.rightColumn}>
            <div ref={cardsContainerRef} className={styles.cardsContainer}>
              <div className={styles.card}>
                <h3 className={styles.cardHeading}>TRUST</h3>
                <p className={styles.cardText}>
                  KRails payment infrastructure keeps a trusted record for all real-time
                  transactions in a secure, authenticated, and verifiable manner, preventing any
                  party from altering executed transactions.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardHeading}>CERTAINTY</h3>
                <p className={styles.cardText}>
                  It&apos;s not just security — it&apos;s immutable and absolute certainty in
                  execution for B2B trade. This is a payment record that is unbreakable and
                  unchangeable, directly powering your growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
