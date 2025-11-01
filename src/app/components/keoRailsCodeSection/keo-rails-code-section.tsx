"use client";
import {
  exampleApiSections,
  KeoRailsCode,
} from "../keoRailsCode/keo-rails-code";
import styles from "./keo-rails-code-section.module.css";
import { useRef, useEffect } from "react";

export default function KeoRailsCodeSection() {
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!leftColRef.current || !cardsContainerRef.current) return;

    const sync = () => {
      // On smaller screens cap the left column to 400px; otherwise use right column height
      if (window.innerWidth <= 1024) {
        leftColRef.current!.style.maxHeight = `400px`;
        leftColRef.current!.style.height = `400px`;
      } else {
        const cardsContainerHeight =
          cardsContainerRef.current?.getBoundingClientRect().height;
        leftColRef.current!.style.maxHeight = `${cardsContainerHeight}px`;
        leftColRef.current!.style.overflow = "hidden";
      }
    };

    // Initial sync
    sync();

    // Observe right column size changes
    const ro = new ResizeObserver(() => sync());
    ro.observe(cardsContainerRef.current);

    // Also sync on window resize
    window.addEventListener("resize", sync);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          ENTERPRISE TRUST.<br></br>IMPOSSIBLE TO ALTER. PERIOD.
        </h2>
        <div className={styles.grid}>
          <div className={styles.leftColumn} ref={leftColRef}>
            <KeoRailsCode
              sections={exampleApiSections}
              typingSpeed={10}
              lineDelay={200}
              loop={true}
            />
          </div>
          <div className={styles.rightColumn}>
            <div ref={cardsContainerRef} className={styles.cardsContainer}>
              <div className={styles.card}>
                <h3 className={styles.cardHeading}>Trust</h3>
                <p className={styles.cardText}>
                  KEO Rails payment infrastructure keeps a trusted record for
                  all real-time transactions in a secure, authenticated, and
                  verifiable manner, preventing any party from altering executed
                  transactions.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardHeading}>Certainty</h3>
                <p className={styles.cardText}>
                  It&apos;s not just security — it&apos;s immutable and absolute
                  certainty in execution for B2B trade. This is a payment record
                  that is unbreakable and unchangeable, directly powering your
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
