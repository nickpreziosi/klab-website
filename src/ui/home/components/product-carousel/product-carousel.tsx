"use client";

import { SkewedCarousel } from "@/ui/home/components/skewed-carousel/skewed-carousel";
import styles from "./product-carousel.module.css";

export function ProductCarousel() {
  return (
    <section className={styles.section} aria-hidden>
      <SkewedCarousel inFlow />
    </section>
  );
}
