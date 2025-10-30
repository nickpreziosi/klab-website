"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./kena-cards-section.module.css";
import SectionHeader from "../sectionHeader/section-header";

const features = [
  {
    title: "Human-level reasoning",
    description:
      "Understands financial logic and qualitative signals like a real risk officer.",
  },
  {
    title: "Continuous self-learning",
    description:
      "Improves accuracy and context awareness with every new dataset.",
  },
  {
    title: "Seamless integration",
    description:
      "Connects with existing workflows through chat, APIs, and core systems.",
  },
  {
    title: "Scalable risk automation",
    description:
      "From a single SME to global portfolios — KENA evolves with your business.",
  },
];

export default function KeoCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <SectionHeader
          heading="Why KENA changes everything"
          align="center"
          animateOnce={true}
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
      </div>
    </section>
  );
}
