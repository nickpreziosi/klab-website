"use client";

import { motion } from "framer-motion";
import styles from "./keo-rails-demo.module.css";
import KeoRailsPhoneSlideshow from "@/app/components/keo-rails/keo-rails-phone-slideshow/keo-rails-phone-slideshow";
import Button from "../../ui/button/button";

export default function KeoRailsDemo() {
  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={styles.container}>
        {/* Top heading */}
        <div className={styles.topHeading}>
          <h2 className={styles.mainHeading}>WHY KEO RAILS?</h2>
          <p className={styles.subheading}>
            The old system makes you wait. Keo Rails makes you move.
          </p>
        </div>

        {/* Two column layout */}
        <div className={styles.content}>
          {/* Left column - Text content */}
          <div className={styles.leftColumn}>
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
                reclaim control. Execute domestic and cross-border payments with
                zero friction, and seamlessly make domestic and cross-border
                payments via stablecoins and move funds between traditional bank
                accounts and stablecoins.
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
                leverage for the lenders who have the vision (op 2 courage) to
                move at our speed.
              </p>
            </div>

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
              Activate my profile
            </Button>
          </div>

          {/* Right column - Phone mockup */}
          <div className={styles.rightColumn}>
            <KeoRailsPhoneSlideshow />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
