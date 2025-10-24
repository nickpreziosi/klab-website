"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./company-stats.module.css";

const stats = [
  {
    label: "People in five countries",
    value: 112,
    suffix: "",
  },
  {
    label: "Are women",
    value: 36,
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

function AnimatedCounter({
  value,
  delay = 0,
}: {
  value: number;
  delay?: number;
}) {
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
    <section className={styles.statsSection}>
      <motion.h2
        className={styles.statsTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        Our Diverse Team
      </motion.h2>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
            }}
            whileHover={{
              transition: { duration: 0.2 },
            }}
          >
            <div className={styles.statValueContainer}>
              <motion.span
                className={styles.statValue}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <AnimatedCounter value={stat.value} delay={index * 100 + 200} />
              </motion.span>
              {stat.suffix && (
                <span className={styles.statSuffix}>{stat.suffix}</span>
              )}
            </div>
            <p className={styles.statLabel}>{stat.label}</p>
            <div className={styles.statGlow} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
