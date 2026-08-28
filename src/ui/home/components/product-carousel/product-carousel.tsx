"use client";

import { motion } from "framer-motion";
import { SkewedCarousel } from "@/ui/home/components/skewed-carousel/skewed-carousel";
import styles from "./product-carousel.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

type ProductCarouselProps = {
  skipAnimation?: boolean;
};

export function ProductCarousel({ skipAnimation = false }: ProductCarouselProps) {
  return (
    <motion.section
      className={styles.section}
      aria-hidden
      initial={skipAnimation ? false : { opacity: 0 }}
      whileInView={skipAnimation ? undefined : { opacity: 1 }}
      animate={skipAnimation ? { opacity: 1 } : undefined}
      viewport={skipAnimation ? undefined : { once: true, amount: 0.15 }}
      transition={
        skipAnimation ? { duration: 0 } : { duration: 0.7, ease: ENTRANCE_EASE }
      }
    >
      <SkewedCarousel inFlow skipAnimation={skipAnimation} />
    </motion.section>
  );
}
