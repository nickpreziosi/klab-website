"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import KeoRailsPhoneSlideshow from "../keoRailsPhoneSlideshow/keo-rails-phone-slideshow";
import styles from "./keo-rails-grid-section.module.css";
import Button from "../ui/button/button";

export default function KeoRailsGridSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.topHeading}>
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
          <div className={styles.scrollContent}>
            <div className={styles.leftColumn}>
              <motion.div
                className={styles.textBlock}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className={styles.heading}>
                  CAPITAL UNLOCKED. REVENUE ACCELERATED.
                </h3>
                <p className={styles.description}>
                  We eliminate holding periods, lost transfers, and unnecessary
                  processing costs, so your business captures more revenue,
                  faster.
                </p>
              </motion.div>

              <motion.div
                className={styles.textBlock}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
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
              </motion.div>

              <motion.div
                className={styles.textBlock}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className={styles.heading}>
                  THE FOUNDATION OF IMMUTABLE TRUST
                </h3>
                <p className={styles.description}>
                  KEO Rails ensures enterprise-grade payment security through
                  cutting edge blockchain-powered data tokenization, smart
                  contracts, self-custody wallets and stablecoins.
                </p>
              </motion.div>

              <motion.div
                className={styles.textBlock}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className={styles.heading}>LENDING IN ONE SIMPLE CLICK.</h3>
                <p className={styles.description}>
                  Rails provides an integrated financing solution for lenders
                  wishing to finance B2B payments. We integrated the ability to
                  finance B2B payments directly into the rail. It&apos;s instant
                  leverage for the lenders who have the vision to move at our
                  speed.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Sticky Phone */}
          <div className={styles.rightColumn}>
            <KeoRailsPhoneSlideshow />
          </div>
        </div>

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
    </section>
  );
}
