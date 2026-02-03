"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./keo-cards-section.module.css";
import SectionHeader from "@/ui/shared/components/section-header/section-header";

const features = [
  {
    title: "Trust",
    description:
      "KEO Rails payment infrastructure keeps a trusted record for all real-time transactions in a secure, authenticated, and verifiable manner, preventing any party from altering executed transactions.",
  },
  {
    title: "Certainty",
    description:
      "It’s not just security—it’s immutable and absolute certainty in execution for B2B trade. This is a payment record that is unbreakable and unchangeable, directly powering your growth.",
  },
];

export default function KeoCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <SectionHeader heading="ENTERPRISE TRUST. IMPOSSIBLE TO ALTER. PERIOD." align="center" />

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, filter: "blur(0px)", y: 0 }
                  : { opacity: 0, filter: "blur(10px)", y: 20 }
              }
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
