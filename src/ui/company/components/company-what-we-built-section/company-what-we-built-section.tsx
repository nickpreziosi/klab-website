"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import styles from "./company-what-we-built-section.module.css";

export default function CompanyWhatWeBuiltSection({
  skipAnimation = false,
}: {
  skipAnimation?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const effectiveInView = skipAnimation || inView;
  const t = useTranslations("companyWhatWeBuilt");
  const leadParagraphs = [t("leadParagraph1"), t("leadParagraph2"), t("leadParagraph3")]
    .map((p) => p.trim())
    .filter(Boolean);

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

        <motion.div
          className={styles.content}
          initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={effectiveInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.leadStack}>
            {leadParagraphs.map((p, idx) => (
              <p key={idx} className={styles.leadParagraph}>
                {p}
              </p>
            ))}
          </div>

          <p className={styles.introLine}>{t("introLine")}</p>

          <div className={styles.modulesGrid}>
            <div className={styles.module}>
              <p className={styles.moduleText}>{t("moduleRails")}</p>
            </div>
            <div className={styles.module}>
              <p className={styles.moduleText}>{t("moduleTalk")}</p>
            </div>
            <div className={styles.module}>
              <p className={styles.moduleText}>{t("moduleRisk")}</p>
            </div>
            <div className={styles.module}>
              <p className={styles.moduleText}>{t("moduleLeads")}</p>
            </div>
          </div>

          <div className={styles.valuesGrid}>
            <p className={styles.valueText}>{t("valueEnterprises")}</p>
            <p className={styles.valueText}>{t("valueBanks")}</p>
            <p className={styles.valueText}>{t("valueSuppliers")}</p>
            <p className={styles.valueText}>{t("valueKLabEarns")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

