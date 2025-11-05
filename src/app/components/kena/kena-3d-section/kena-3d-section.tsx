"use client";

import { KenaAvatar } from "@/app/components/kena/kena-avatar/kena-avatar";
import SectionHeader from "@/app/components/ui/section-header/section-header";
import styles from "./kena-3d-section.module.css";

export default function Kena3dSection() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.headerWrapper}>
          <SectionHeader
            heading="How Kena Thinks, Learns, and Decides"
            align="center"
            animateOnce={true}
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <div className={styles.leftColumnItem}>
              <h3 className={styles.leftColumnItemHeading}>Input & Context</h3>
              <p className={styles.leftColumnItemText}>
                Users share data and documents via chat or system integration.
              </p>
            </div>
            <div className={styles.leftColumnItem}>
              <h3 className={styles.leftColumnItemHeading}>
                Understanding & Reasoning
              </h3>
              <p className={styles.leftColumnItemText}>
                Kena interprets each case as an underwriter would - assesing
                logic, ratios, and narrative.
              </p>
            </div>
            <div className={styles.leftColumnItem}>
              <h3 className={styles.leftColumnItemHeading}>Decisioning</h3>
              <p className={styles.leftColumnItemText}>
                Generates real-time credit risk outcomes with transparent,
                explainable logic.
              </p>
            </div>
            <div className={styles.leftColumnItem}>
              <h3 className={styles.leftColumnItemHeading}>Learning Loop</h3>
              <p className={styles.leftColumnItemText}>
                Every decision and outcome feeds back into her neural framework
                - refining accuracy continuously.
              </p>
            </div>
            <div className={styles.leftColumnItem}>
              <h3 className={styles.leftColumnItemHeading}>Scale & Deploy</h3>
              <p className={styles.leftColumnItemText}>
                Organizations can train Kena models for new markets, products,
                or regulations.
              </p>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <KenaAvatar />
          </div>
        </div>
      </section>
    </div>
  );
}
