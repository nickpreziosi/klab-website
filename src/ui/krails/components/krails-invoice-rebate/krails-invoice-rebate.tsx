"use client";

import type { CSSProperties } from "react";
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

const CHEVRON_COPIES = [0, 1, 2, 3] as const;
const STRIPE_SOURCES = [
  "/images/krails-rebate-deco/card5-a.svg",
  "/images/krails-rebate-deco/card5-b.svg",
  "/images/krails-rebate-deco/card5-c.svg",
  "/images/krails-rebate-deco/card5-c.svg",
] as const;
const PHONE_ARCS = [
  "/images/krails-rebate-deco/card6-a.svg",
  "/images/krails-rebate-deco/card6-b.svg",
  "/images/krails-rebate-deco/card6-c.svg",
  "/images/krails-rebate-deco/card6-c.svg",
  "/images/krails-rebate-deco/card6-d.svg",
] as const;

export type KRailsInvoiceRebateTranslations = {
  rebateBody: string;
  rebateSteps: { title: string; body: string }[];
  rebateCards: { title: string; body: string }[];
  rebatePhoneAlt: string;
};

type KRailsInvoiceRebateProps = {
  translations: KRailsInvoiceRebateTranslations;
  skipAnimation?: boolean;
};

function FeatureDeco({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className={styles.decoLayer} aria-hidden>
        <img
          className={`${styles.decoImg} ${styles.meshLeft}`}
          src="/images/krails-rebate-deco/card1-mesh-left.svg"
          alt=""
        />
        <img
          className={`${styles.decoImg} ${styles.meshRight}`}
          src="/images/krails-rebate-deco/card1-mesh-right.svg"
          alt=""
        />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className={styles.decoLayer} aria-hidden>
        <img
          className={`${styles.decoImg} ${styles.slash}`}
          src="/images/krails-rebate-deco/card2-slash.svg"
          alt=""
        />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className={styles.decoLayer} aria-hidden>
        <span className={styles.aurora} />
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className={styles.decoLayer} aria-hidden>
        {CHEVRON_COPIES.map((copy) => (
          <span key={`bl-${copy}`} className={styles.chevronBl} style={{ "--i": copy } as CSSProperties}>
            <img src="/images/krails-rebate-deco/card4-a.svg" alt="" />
          </span>
        ))}
        {CHEVRON_COPIES.map((copy) => (
          <span key={`tr-${copy}`} className={styles.chevronTr} style={{ "--i": copy } as CSSProperties}>
            <img src="/images/krails-rebate-deco/card4-b.svg" alt="" />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.decoLayer} aria-hidden>
      {STRIPE_SOURCES.map((src, copy) => (
        <span key={src + copy} className={styles.stripe} style={{ "--i": copy } as CSSProperties}>
          <img src={src} alt="" />
        </span>
      ))}
    </div>
  );
}

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
  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };
  const cardFade = skipAnimation
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.7, ease: ENTRANCE_EASE } },
      };

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

        <motion.ul
          className={styles.featureGrid}
          variants={stagger}
          initial={skipAnimation ? false : "hidden"}
          whileInView={skipAnimation ? undefined : "visible"}
          animate={skipAnimation ? "visible" : undefined}
          viewport={skipAnimation ? undefined : { once: true, amount: 0.12 }}
        >
          {translations.rebateCards.map((feature, index) => (
            <motion.li key={feature.title} className={styles.featureCard} variants={cardFade}>
              <div className={styles.featureCanvas}>
                <FeatureDeco index={index} />
                <div className={styles.featureContent}>
                  <span className={styles.featureNumber} aria-hidden>
                    {index + 1}
                  </span>
                  <div className={styles.featurePanel}>
                    <h3 className={styles.featureTitle}>{withBrandLtr(feature.title, styles.brandLtr)}</h3>
                    <p className={styles.featureBody}>{withBrandLtr(feature.body, styles.brandLtr)}</p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
          <motion.li className={`${styles.featureCard} ${styles.phoneCard}`} variants={cardFade}>
            <div className={styles.featureCanvas}>
              <div className={styles.decoLayer} aria-hidden>
                {PHONE_ARCS.map((src, copy) => (
                  <span key={src + copy} className={styles.phoneArc} style={{ "--i": copy } as CSSProperties}>
                    <img src={src} alt="" />
                  </span>
                ))}
              </div>
              <div className={styles.phoneFrame}>
                <img
                  src="/images/krails-rebate-phone.png"
                  alt={translations.rebatePhoneAlt}
                  width={448}
                  height={918}
                />
              </div>
            </div>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
}
