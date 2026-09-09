"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Building2, Landmark, Package } from "lucide-react";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import type { CompanyWhatWeBuiltTranslations } from "@/ui/company/types";
import { buildCompanyWhatWeBuiltTranslations } from "@/ui/company/types";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import { AddonSphereRow } from "@/ui/shared/components/addon-spheres/addon-sphere-row";
import styles from "./company-what-we-built-section.module.css";

const VALUES: {
  textKey: "valueEnterprises" | "valueBanks" | "valueSuppliers" | "valueKLabEarns";
  icon: ReactNode;
  fillBadge?: boolean;
}[] = [
  {
    textKey: "valueEnterprises",
    icon: <Building2 className={styles.valueIcon} strokeWidth={1.75} />,
  },
  {
    textKey: "valueBanks",
    icon: <Landmark className={styles.valueIcon} strokeWidth={1.75} />,
  },
  {
    textKey: "valueSuppliers",
    icon: <Package className={styles.valueIcon} strokeWidth={1.75} />,
  },
  {
    textKey: "valueKLabEarns",
    fillBadge: true,
    icon: (
      <KlabLogo
        color="orange"
        format="default"
        width="100%"
        height="100%"
        alt=""
        className={styles.valueKlabLogo}
      />
    ),
  },
];

export default function CompanyWhatWeBuiltSection({
  translations: serverTranslations,
  skipAnimation = false,
}: {
  /** When provided (from server), copy is SSR'd; otherwise use client useTranslations */
  translations?: CompanyWhatWeBuiltTranslations;
  skipAnimation?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const effectiveInView = skipAnimation || inView;
  const t = useTranslations("companyWhatWeBuilt");
  const translations = serverTranslations ?? buildCompanyWhatWeBuiltTranslations(t);
  const leadParagraphs = [
    translations.leadParagraph1,
    translations.leadParagraph2,
    translations.leadParagraph3,
  ]
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <CompanySectionTitle
            title={translations.title}
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

          <p className={styles.introLine}>{translations.introLine}</p>

          <AddonSphereRow className={styles.modules} />

          <div className={styles.valuesCard}>
            <div className={styles.valuesPills}>
              <h3 className={styles.valuesQuestion}>{translations.valuesQuestion}</h3>
              <p className={styles.valuesAnswer}>{translations.valuesAnswer}</p>
            </div>
            <div className={styles.valuesGrid}>
              {VALUES.map(({ icon, textKey, fillBadge }, index) => (
                <div key={textKey} className={styles.valueItem}>
                  <span
                    className={`${styles.valueBadge}${fillBadge ? ` ${styles.valueBadgeFill}` : ""}`}
                    aria-hidden
                  >
                    <span className={styles.valueNumber}>{index + 1}</span>
                    {icon}
                  </span>
                  <p className={styles.valueText}>{translations[textKey]}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
