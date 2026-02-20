"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./company-stats.module.css";
import SectionHeader from "@/ui/shared/components/section-header/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shared/components/card/card";

const stats = [
  {
    label: "People in six countries",
    value: 40,
    suffix: "+",
  },
  {
    label: "Are women",
    value: 25,
    suffix: "%",
  },
  {
    label: "Different nationalities",
    value: 10,
    suffix: "+",
  },
  {
    label: "Languages spoken",
    value: 7,
    suffix: "+",
  },
];

function AnimatedCounter({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.5,
  });
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function CompanyStats() {
  return (
    <div className={styles.statsContainer}>
      <section className={styles.statsSection}>
        <SectionHeader heading="Our Diverse Team" align="left" animateOnce={true} />

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={stat.label} className={styles.statCard}>
              <CardHeader>
                <CardTitle>
                  <motion.span
                    className={styles.statValue}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <AnimatedCounter value={stat.value} delay={index * 100 + 200} />
                  </motion.span>
                </CardTitle>
              </CardHeader>
              <CardContent className={styles.statCardContent}>
                <div className={styles.statValueContainer}>
                  {stat.suffix && <span className={styles.statSuffix}>{stat.suffix}</span>}
                </div>
                <p className={styles.statLabel}>{stat.label}</p>
              </CardContent>
              <div className={styles.statGlow} />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
