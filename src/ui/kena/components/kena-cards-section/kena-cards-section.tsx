"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";
import styles from "./kena-cards-section.module.css";
import SectionHeader from "@/ui/shared/components/section-header/section-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/shared/components/card/card";

import type { KenaTranslations } from "@/ui/kena/views/KenaView/KenaView";

export default function KeoCardsSection({
  translations,
  skipAnimation = false,
}: {
  translations: KenaTranslations;
  skipAnimation?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const effectiveInView = skipAnimation || isInView;

  const features = [
    { title: translations.feature0Title, description: translations.feature0Description },
    { title: translations.feature1Title, description: translations.feature1Description },
    { title: translations.feature2Title, description: translations.feature2Description },
    { title: translations.feature3Title, description: translations.feature3Description },
  ];

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/mockups/kena.png"
              alt={translations.cardsImageAlt}
              fill
              className={styles.image}
              priority
              sizes="(max-width: 1024px) 400px, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </div>
          <div className={styles.content}>
            <SectionHeader
              heading={translations.cardsHeading}
              align="left"
              animateOnce={true}
              skipAnimation={skipAnimation}
            />
            <div className={styles.cardsContainer}>
              <div className={styles.featuresGrid}>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={
                      skipAnimation
                        ? { opacity: 1, filter: "blur(0px)", y: 0 }
                        : { opacity: 0, filter: "blur(10px)", y: 20 }
                    }
                    animate={
                      effectiveInView
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
