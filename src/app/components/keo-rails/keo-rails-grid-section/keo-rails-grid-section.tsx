"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import KeoRailsPhoneSlideshow from "@/app/components/keo-rails/keo-rails-phone-slideshow/keo-rails-phone-slideshow";
import styles from "./keo-rails-grid-section.module.css";
import Button from "../../ui/button/button";
import KeoRailsAnimationOne from "../keo-rails-animation-one/keo-rails-animation-one";
import KeoRailsAnimationTwo from "../keo-rails-animation-two/keo-rails-animation-two";

export default function KeoRailsGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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
        const pct =
          maxScroll > 0 ? scrolled / maxScroll : rect.top <= 0 ? 1 : 0;
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

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div style={{ display: "none" }} className={styles.topHeading}>
          <motion.h2
            className={styles.mainHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            WHY KEO RAILS?
          </motion.h2>
          <motion.p
            className={styles.subheading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            The old system makes you wait. Keo Rails makes you move.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {/* Left Column - 4 Feature Sections */}
          <div className={styles.scrollContent} ref={leftRef}>
            <motion.div
              className={styles.leftColumn}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className={styles.textBlock}>
                <motion.h2
                  className={styles.mainHeading}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  WHY KEO RAILS?
                </motion.h2>
                <motion.p
                  className={styles.subheading}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  The old system makes you wait. Keo Rails makes you move.
                </motion.p>
              </div>
              <div className={styles.textBlock}>
                <h3 className={styles.heading}>
                  CAPITAL UNLOCKED. REVENUE ACCELERATED.
                </h3>
                <p className={styles.description}>
                  We eliminate holding periods, lost transfers, and unnecessary
                  processing costs, so your business captures more revenue,
                  faster.
                </p>
              </div>

              <div className={styles.textBlock}>
                <h3 className={styles.heading}>
                  SOVEREIGNTY IN EVERY TRANSACTION.
                </h3>
                <p className={styles.description}>
                  With fully customizable, self-custody digital wallets, you
                  reclaim control. Execute domestic and cross-border payments
                  with zero friction, and seamlessly make domestic and
                  cross-border payments via stablecoins and move funds between
                  traditional bank accounts and stablecoins.
                </p>
              </div>

              <div className={styles.textBlock}>
                <h3 className={styles.heading}>
                  THE FOUNDATION OF IMMUTABLE TRUST
                </h3>
                <p className={styles.description}>
                  KEO Rails ensures enterprise-grade payment security through
                  cutting edge blockchain-powered data tokenization, smart
                  contracts, self-custody wallets and stablecoins.
                </p>
              </div>

              <div className={styles.textBlock}>
                <h3 className={styles.heading}>LENDING IN ONE SIMPLE CLICK.</h3>
                <p className={styles.description}>
                  Rails provides an integrated financing solution for lenders
                  wishing to finance B2B payments. We integrated the ability to
                  finance B2B payments directly into the rail. It&apos;s instant
                  leverage for the lenders who have the vision to move at our
                  speed.
                </p>
                <div className={styles.ctaContainer}>
                  <Button
                    text="Activate my profile"
                    variant="full"
                    iconPosition="end"
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
                  ></Button>
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
                transform: `translate(-50%, -50%) rotate(${
                  progress >= 0.75 ? 45 : 0
                }deg) scale(1)`,
              }}
            />
          </div>
          {/* Right Column - Sticky Phone with scroll progress indicator */}
          <div className={styles.rightColumn} ref={rightRef}>
            <AnimatePresence>
              {progress <= 0.25 && (
                <motion.div
                  key={0}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <KeoRailsAnimationOne></KeoRailsAnimationOne>
                </motion.div>
              )}

              {progress > 0.25 && progress <= 0.5 && (
                <motion.div
                  key={1}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <KeoRailsAnimationTwo></KeoRailsAnimationTwo>
                </motion.div>
              )}
              {progress > 0.5 && progress <= 0.75 && (
                <motion.div
                  key={0}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <KeoRailsAnimationOne></KeoRailsAnimationOne>
                </motion.div>
              )}

              {progress > 0.75 && progress <= 1 && (
                <motion.div
                  key={1}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <KeoRailsAnimationTwo></KeoRailsAnimationTwo>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
