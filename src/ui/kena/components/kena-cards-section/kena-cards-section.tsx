"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import styles from "./kena-cards-section.module.css";
import SectionHeader from "@/ui/shared/components/section-header/section-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/shared/components/card/card";

const features = [
  {
    title: "Human-level reasoning",
    description: "Understands financial logic and qualitative signals like a real risk officer.",
  },
  {
    title: "Continuous self-learning",
    description: "Improves accuracy and context awareness with every new dataset.",
  },
  {
    title: "Seamless integration",
    description: "Connects with existing workflows through chat, APIs, and core systems.",
  },
  {
    title: "Scalable risk automation",
    description: "From a single SME to global portfolios — Kena evolves with your business.",
  },
];

export default function KeoCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/mockups/kena.png"
              alt="Kena — AI-powered risk intelligence"
              fill
              className={styles.image}
              priority
              sizes="(max-width: 1024px) 400px, 50vw"
            />
          </div>
          <div className={styles.content}>
            <SectionHeader heading="Why Kena changes everything" align="left" animateOnce={true} />
            <div className={styles.cardsContainer}>
              <div className={styles.featuresGrid}>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
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
                    <Card>
                      <CardHeader>
                        <CardTitle>{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
