"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./company-culture.module.css";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import SectionHeader from "@/ui/shared/components/section-header/section-header";
import Button from "@/ui/shared/components/button/button";
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

export default function CompanyCulture() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <CompanySectionTitle title="Company Culture" inView={inView} />
        </div>

        {/* Text Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            maxWidth={700}
            highlight={["Teamwork", "Inclusion"]}
            heading="Innovation Through Teamwork & Inclusion."
            align="center"
            animateOnce={true}
          />
          <p className={styles.description}>
            KLab combines start-up energy with extensive industry experience to develop innovative
            technologies. We have a deep commitment to advancing diversity, equality, and inclusion,
            essential to our mission of helping businesses and attracting exceptional people who
            think outside the box.
          </p>
          <Button size="lg" href="/contact/careers" variant="accent-brand">
            KLab Careers
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </motion.div>

        {/* Stats Grid */}
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
                    {stat.suffix && <span className={styles.statSuffix}>{stat.suffix}</span>}
                  </motion.span>
                </CardTitle>
              </CardHeader>
              <CardContent className={styles.statCardContent}>
                <p className={styles.statLabel}>{stat.label}</p>
              </CardContent>
              <div className={styles.statGlow} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
