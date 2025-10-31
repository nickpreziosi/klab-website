"use client";

import { motion } from "framer-motion";
import styles from "./keo-rails-demo.module.css";
import KeoRailsPhoneSlideshow from "../keoRailsPhoneSlideshow/keo-rails-phone-slideshow";
import Button from "../ui/button/button";

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
          <h2 className={styles.mainHeading}>FEEL THE CASH FLOW</h2>
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
                The old system makes you wait. Keo Rails makes you move. Our
                infrastructure is designed for the modern instinct: if the deal
                is closed, the money is moved. We eliminate holding periods,
                lost transfers, and unnecessary processing costs, so your
                business captures more revenue, faster. Start capturing revenue
                at the speed of thought.
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
                wishing to finance B2B payments. When a purchasing opportunity
                appears, your financing should be there immediately. We
                integrated the ability to finance B2B payments directly into the
                rail. It’s instant leverage for the lenders who have the vision
                (op 2 courage) to move at our speed.
              </p>
            </div>

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

          {/* Right column - Phone mockup */}
          <div className={styles.rightColumn}>
            <KeoRailsPhoneSlideshow />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
