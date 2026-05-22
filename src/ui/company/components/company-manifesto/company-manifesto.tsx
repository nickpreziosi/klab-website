"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import styles from "./company-manifesto.module.css";

const MANIFESTO_KEYS = [
  "item0", "item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10",
] as const;

const MANIFESTO_LEFT_KEYS = MANIFESTO_KEYS.filter((_, i) => i % 2 === 0);
const MANIFESTO_RIGHT_KEYS = MANIFESTO_KEYS.filter((_, i) => i % 2 === 1);

function manifestoKeyIndex(key: (typeof MANIFESTO_KEYS)[number]) {
  return MANIFESTO_KEYS.indexOf(key);
}

export default function CompanyManifesto({ skipAnimation = false }: { skipAnimation?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const effectiveInView = skipAnimation || inView;
  const t = useTranslations("companyManifesto");

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <CompanySectionTitle title={t("title")} inView={effectiveInView} skipAnimation={skipAnimation} />
        </div>

        <div className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.column}>
              {MANIFESTO_LEFT_KEYS.map((key) => {
                const i = manifestoKeyIndex(key);
                return (
                  <motion.div
                    key={key}
                    className={styles.item}
                    style={{ order: manifestoKeyIndex(key) }}
                    initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    animate={effectiveInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className={styles.itemText}>{t(key)}</span>
                  </motion.div>
                );
              })}
            </div>
            <div className={styles.column}>
              {MANIFESTO_RIGHT_KEYS.map((key) => {
                const i = manifestoKeyIndex(key);
                return (
                  <motion.div
                    key={key}
                    className={styles.item}
                    style={{ order: manifestoKeyIndex(key) }}
                    initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    animate={effectiveInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className={styles.itemText}>{t(key)}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
