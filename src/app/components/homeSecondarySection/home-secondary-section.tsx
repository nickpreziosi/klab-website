"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "../sectionHeader/section-header";
import styles from "./home-secondary-section.module.css";

interface FeatureCard {
  title: string;
  description: string;
}

interface HomeSecondarySection {
  cards?: FeatureCard[];
  animateOnce?: boolean;
}

export default function HomeSecondarySection({
  cards = [
    {
      title: "AI-Driven Decisioning:",
      description:
        "KENA, our proprietary Risk AI, replicates the reasoning of financial underwriters and continuously self-trains with global data.",
    },
    {
      title: "AI-Driven Decisioning:",
      description:
        "KENA, our proprietary Risk AI, replicates the reasoning of financial underwriters and continuously self-trains with global data.",
    },
    {
      title: "AI-Driven Decisioning:",
      description:
        "KENA, our proprietary Risk AI, replicates the reasoning of financial underwriters and continuously self-trains with global data.",
    },
  ],
  animateOnce = true,
}: HomeSecondarySection) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: animateOnce, amount: 0.2 });

  const cardVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          heading="Built for Scale."
          secondHeading="Powered by Intelligence."
          align="left"
          animateOnce={animateOnce}
        />

        <div ref={cardsRef} className={styles.cardsGrid}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={styles.card}
              variants={{
                hidden: {
                  opacity: 0,
                  filter: "blur(10px)",
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.4, 0.25, 1],
                  },
                },
              }}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{
                delay: index * 0.15, // Stagger each card by 0.15s
              }}
            >
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
