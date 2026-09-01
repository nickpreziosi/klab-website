"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import {
  RebateBankIcon,
  RebateInvoiceIcon,
  RebateKrailsIcon,
  RebatePackageIcon,
} from "@/ui/shared/components/rebate-step-icons/rebate-step-icons";
import styles from "./krails-invoice-rebate.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

export type KRailsInvoiceRebateTranslations = {
  rebateBody: string;
  rebateSteps: { title: string; body: string }[];
};

type KRailsInvoiceRebateProps = {
  translations: KRailsInvoiceRebateTranslations;
  skipAnimation?: boolean;
};

export function KRailsInvoiceRebate({
  translations,
  skipAnimation = false,
}: KRailsInvoiceRebateProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const steps = translations.rebateSteps;
  const fade = skipAnimation
    ? { duration: 0 }
    : { duration: 0.7, ease: ENTRANCE_EASE };

  return (
    <section className={styles.section} dir={dir} aria-labelledby="krails-invoice-rebate-heading">
      <div className={styles.inner}>
        <motion.div
          className={styles.card}
          initial={skipAnimation ? false : { opacity: 0 }}
          whileInView={skipAnimation ? undefined : { opacity: 1 }}
          animate={skipAnimation ? { opacity: 1 } : undefined}
          viewport={skipAnimation ? undefined : { once: true, amount: 0.2 }}
          transition={fade}
        >
          <h2 id="krails-invoice-rebate-heading" className={styles.lede}>
            {translations.rebateBody}
          </h2>
          <div className={styles.stepperWrap}>
            <div className={styles.track} aria-hidden>
              <span className={styles.beam} />
            </div>
            <ol className={styles.stepper}>
              {steps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.node}>
                    {index === 0 ? <RebatePackageIcon /> : null}
                    {index === 1 ? <RebateInvoiceIcon /> : null}
                    {index === 2 ? <RebateBankIcon /> : null}
                    {index === 3 ? <RebateKrailsIcon /> : null}
                  </span>
                  <div className={styles.copy}>
                    <p className={styles.stepTitle}>{withBrandLtr(step.title, styles.brandLtr)}</p>
                    <p className={styles.stepBody}>{withBrandLtr(step.body, styles.brandLtr)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
