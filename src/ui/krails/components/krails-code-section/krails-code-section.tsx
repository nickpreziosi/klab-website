"use client";
import { motion } from "motion/react";
import {
  exampleApiSections,
  KRailsCodeAnimation,
} from "@/ui/krails/components/krails-code-animation/krails-code-animation";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shared/components/card/card";
import styles from "./krails-code-section.module.css";
import { useRef, useEffect } from "react";
import type { KRailsTranslations } from "@/ui/krails/views/KRailsView/KRailsView";

export default function KRailsCodeSection({
  translations,
  skipAnimation = false,
}: {
  translations: KRailsTranslations;
  skipAnimation?: boolean;
}) {
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
    <section
      id="code"
      inert
      tabIndex={-1}
      aria-hidden
      role="presentation"
      className={styles.section}
    >
      <motion.div
        className={styles.container}
        initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
        animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <h2 className={styles.heading}>
          {translations.codeSectionHeadingLine1}
          <br />
          {translations.codeSectionHeadingLine2}
        </h2>
        <div className={styles.grid}>
          <div className={styles.leftColumn} ref={leftColRef}>
            <KRailsCodeAnimation
              sections={exampleApiSections}
              typingSpeed={20}
              lineDelay={150}
              loop={true}
            />
          </div>
          <div className={styles.rightColumn}>
            <div ref={cardsContainerRef} className={styles.cardsContainer}>
              <Card>
                <CardHeader>
                  <CardTitle className={styles.cardHeading}>
                    {translations.codeSectionCardTrustTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={styles.cardText}>
                    {translations.codeSectionCardTrustDescription}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className={styles.cardHeading}>
                    {translations.codeSectionCardCertaintyTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={styles.cardText}>
                    {translations.codeSectionCardCertaintyDescription}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
