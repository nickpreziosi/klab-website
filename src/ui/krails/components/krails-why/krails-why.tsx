"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./krails-why.module.css";
import Button from "@/ui/shared/components/button/button";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../../../../../public/animations/krails.json";
import type { KRailsTranslations } from "@/ui/krails/views/KRailsView/KRailsView";

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

  useEffect(() => {
    // Detect Safari browser
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
        // amount the top has been scrolled past viewport top
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
    // Set video playback speed to 4x
    if (videoRef.current) {
      videoRef.current.playbackRate = 4.0;
    }
  }, []);

  useEffect(() => {
    // Set Lottie playback speed to 3x
    if (lottieRef.current) {
      lottieRef.current.setSpeed(3);
    }
  }, []);

  return (
    <section id="video" className={styles.section} ref={sectionRef}>
      <div className={styles.gradientOverlay}></div>
      <div className={styles.container}>
        <div style={{ display: "none" }} className={styles.topHeading}>
          <motion.h2
            className={styles.mainHeading}
            initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
            animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {translations.whyHeading}
          </motion.h2>
          <motion.p
            className={styles.subheading}
            initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
            animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {translations.whySubheading}
          </motion.p>
        </div>

        <div className={styles.grid}>
          {/* Left Column - 4 Feature Sections */}
          <div className={styles.scrollContent} ref={leftRef}>
            <motion.div
              className={styles.leftColumn}
              initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
              animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className={styles.textBlock}>
                <motion.h2
                  className={styles.mainHeading}
                  initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
                  animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {translations.whyHeading}
                </motion.h2>
                <motion.p
                  className={styles.subheading}
                  initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
                  animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  {translations.whySubheading}
                </motion.p>
              </div>
              <div className={styles.textBlock}>
                <h3 className={styles.heading}>{translations.whyBlock0Heading}</h3>
                <p className={styles.description}>{translations.whyBlock0Description}</p>
              </div>

              <div className={styles.textBlock}>
                <h3 className={styles.heading}>{translations.whyBlock1Heading}</h3>
                <p className={styles.description}>{translations.whyBlock1Description}</p>
              </div>

              <div className={styles.textBlock}>
                <h3 className={styles.heading}>{translations.whyBlock2Heading}</h3>
                <p className={styles.description}>{translations.whyBlock2Description}</p>
              </div>

              <div className={styles.textBlock}>
                <h3 className={styles.heading}>{translations.whyBlock3Heading}</h3>
                <p className={styles.description}>{translations.whyBlock3Description}</p>
                <div className={styles.ctaContainer}>
                  <Button
                    variant="accent-brand"
                    iconPosition="right"
                    href="/contact/sales"
                    icon={
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 10H16M16 10L10 4M16 10L10 16"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  >
                    {translations.whyCtaButton}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
          <div className={styles.progressContainer} aria-hidden>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ height: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <div
              className={styles.progressMarker}
              style={{
                opacity: progress >= 0.5 ? 1 : 0,
                transform: `translate(-50%, -50%) rotate(${progress >= 0.75 ? 45 : 0}deg) scale(1)`,
              }}
            />
          </div>
          {/* Right Column - Sticky Phone with scroll progress indicator */}
          <div className={styles.rightColumn} ref={rightRef}>
            <div
              aria-hidden="true"
              role="presentation"
              tabIndex={-1}
              className={styles.animationContainer}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                assetsPath="/animations/images/"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
