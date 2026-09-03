"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ProductLogo } from "@k-lab/components";
import { Building2, Landmark, Package } from "lucide-react";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import styles from "./company-what-we-built-section.module.css";

const MODULES = [
  {
    product: "k-rails" as const,
    altKey: "moduleRailsAlt" as const,
    textKey: "moduleRails" as const,
  },
  {
    product: "k-talk" as const,
    altKey: "moduleTalkAlt" as const,
    textKey: "moduleTalk" as const,
  },
  {
    product: "k-risk" as const,
    altKey: "moduleRiskAlt" as const,
    textKey: "moduleRisk" as const,
  },
  {
    product: "k-leads" as const,
    altKey: "moduleLeadsAlt" as const,
    textKey: "moduleLeads" as const,
  },
];

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
            {MODULES.map((module) => (
              <div key={module.product} className={styles.module}>
                <div className={styles.moduleLogoWrap} dir="ltr">
                  <ProductLogo
                    product={module.product}
                    variant="theme-aware"
                    alt={t(module.altKey)}
                    className={styles.moduleLogo}
                    wrapperClassName={styles.moduleLogoInner}
                  />
                </div>
                <p className={styles.moduleText}>{t(module.textKey)}</p>
              </div>
            ))}
          </div>

          <div className={styles.valuesCard}>
            <div className={styles.valuesPills}>
              <h3 className={styles.valuesQuestion}>{t("valuesQuestion")}</h3>
              <p className={styles.valuesAnswer}>{t("valuesAnswer")}</p>
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
                  <p className={styles.valueText}>{t(textKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
