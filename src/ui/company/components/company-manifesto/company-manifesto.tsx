"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import styles from "./company-manifesto.module.css";

const MANIFESTO_ITEMS = [
  "In code we trust. In people we invest.",
  "Zero friction. Zero fraud. Zero excuses.",
  "We don't build tech. We build trust.",
  "Our architecture doesn't sleep.",
  "Success is only success if it's shared.",
  "Progress, accelerated.",
  "Incorruptible by design.",
  "We fight fraud. We fund dreams.",
  "Defending the future from the friction of the past.",
  "Infrastructure for the unhackable.",
  "The more we create, the more we give.",
];

export default function CompanyManifesto() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <CompanySectionTitle title="Manifesto" inView={inView} />
        </div>

        <div className={styles.content}>
          <div className={styles.grid}>
            {MANIFESTO_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className={styles.item}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className={styles.itemText}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
