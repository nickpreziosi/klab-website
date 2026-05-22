"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./company-culture.module.css";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import SectionHeader from "@/ui/shared/components/section-header/section-header";
import Button from "@/ui/shared/components/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shared/components/card/card";

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

export default function CompanyCulture({ skipAnimation = false }: { skipAnimation?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const effectiveInView = skipAnimation || inView;
  const t = useTranslations("companyCulture");
  const stats = [
    { labelKey: "statPeople" as const, value: 40, suffix: "+" },
    { labelKey: "statNationalities" as const, value: 10, suffix: "+" },
    { labelKey: "statLanguages" as const, value: 7, suffix: "+" },
  ];

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <CompanySectionTitle
            title={t("title")}
            inView={effectiveInView}
            skipAnimation={skipAnimation}
          />
        </div>

        {/* Text Content */}
        <motion.div
          className={styles.content}
          initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
          animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            maxWidth={700}
            highlight={[t("highlight1"), t("highlight2")]}
            heading={t("heading")}
            align="center"
            animateOnce={true}
            skipAnimation={skipAnimation}
          />
          <p className={styles.description}>{t("description")}</p>
          <Button
            size="lg"
            href="https://www.linkedin.com/company/k-lab-ai/jobs/"
            variant="accent-brand"
          >
            {t("button")}
            <svg
              className="rtlFlipH"
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
            <Card key={stat.labelKey} className={styles.statCard}>
              <CardHeader className={styles.statCardHeader}>
                <CardTitle>
                  <motion.span
                    className={styles.statValue}
                    initial={skipAnimation ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    whileInView={skipAnimation ? undefined : { scale: 1, opacity: 1 }}
                    animate={skipAnimation ? { scale: 1, opacity: 1 } : undefined}
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
                <p className={styles.statLabel}>{t(stat.labelKey)}</p>
              </CardContent>
              <div className={styles.statGlow} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
