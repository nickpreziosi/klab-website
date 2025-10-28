"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./keo-cards-section.module.css";
import SectionHeader from "../sectionHeader/section-header";

const features = [
  {
    title: "T+0",
    description: "Money moves in seconds. We use complete trust.",
  },
  {
    title: "Digital traceability allows no lies.",
    description:
      "Every transaction is recorded, verified, and immutable on the blockchain.",
  },
  {
    title: "it's no magic, it's design.",
    description:
      "You pay less because we do less. We cut out the friction, and we give the saving back to you. It's not magic, it's design.",
  },
  {
    title: "Your system stays in place.",
    description: "Your risk and cost disappear.",
  },
];

export default function KeoCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <SectionHeader
          heading="The tech is the tool to get you to ZERO RISK."
          align="center"
        />

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

        <motion.div
          className={styles.tagline}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(10px)" }
          }
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          Our ledger is the code. Our code is the truth.
        </motion.div>
      </div>
    </section>
  );
}
