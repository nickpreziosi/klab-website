"use client";

import { motion } from "framer-motion";
import { FileText, Landmark, Package } from "lucide-react";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import { HomeAddons } from "@/ui/home/components/home-addons/home-addons";
import { WhoWeServe } from "@/ui/home/components/who-we-serve/who-we-serve";
import { WhyKLab } from "@/ui/home/components/why-k-lab/why-k-lab";
import styles from "./invoice-rebate.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

/** K Rails chevron, matching the Figma node inside the second circle. */
function KrailsKMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 108"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M0.384 4.867C1.12 3.121 2.739 2.037 4.609 2.037h24.817c1.201 0 2.405.501 3.175 1.298l30.842 26.961c2.034 2.084 2.034 5.474 0 7.557L51.988 49.587c-.997 1.021-2.326 1.583-3.74 1.583-1.416 0-2.733-.552-3.678-1.525L1.346 9.997C0 8.619-.368 6.653.384 4.867z"
      />
      <path
        fill="currentColor"
        d="M47.563 57.732l-.047-.049 17.209-17.352c1.334-1.346 3.241-1.73 4.978-1.008 1.776.739 2.87 2.409 2.856 4.36l-.196 25.421c-.009 1.241-.492 2.406-1.359 3.278l-1.308 1.318c-.91.918-2.117 1.424-3.436 1.424-1.297-.01-2.51-.535-3.416-1.478l-2.335-2.43v10.016c0 1.24-.473 2.408-1.333 3.29L39.342 104.84c-.857.877-2.046 1.381-3.263 1.381H11.263c-1.871 0-3.489-1.085-4.224-2.831-.752-1.786-.384-3.752.961-5.131L47.563 57.732z"
      />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: ENTRANCE_EASE },
  },
};

type InvoiceRebateProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function InvoiceRebate({ translations, skipAnimation = false }: InvoiceRebateProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const steps = translations.rebateSteps;

  return (
    <motion.section
      className={styles.section}
      dir={dir}
      aria-labelledby="invoice-rebate-heading"
      initial={skipAnimation ? false : "hidden"}
      whileInView={skipAnimation ? undefined : "visible"}
      animate={skipAnimation ? "visible" : undefined}
      viewport={skipAnimation ? undefined : { once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <header className={styles.intro}>
        <h2 id="invoice-rebate-heading" className={styles.title}>
          {translations.rebateTitle}
        </h2>
        <p className={styles.tagline}>{translations.rebateTagline}</p>
        <p className={styles.lede}>{translations.rebateBody}</p>
      </header>

      <div className={styles.stepperWrap}>
        <div className={styles.track} aria-hidden>
          <span className={styles.beam} />
        </div>
        <ol className={styles.stepper}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.node}>
                {index === 0 ? (
                  <FileText className={styles.icon} strokeWidth={1.5} aria-hidden />
                ) : null}
                {index === 1 ? <KrailsKMark className={styles.krailsMark} /> : null}
                {index === 2 ? (
                  <Landmark className={styles.icon} strokeWidth={1.5} aria-hidden />
                ) : null}
                {index === 3 ? (
                  <Package className={styles.icon} strokeWidth={1.5} aria-hidden />
                ) : null}
              </span>
              <div className={styles.copy}>
                <p className={styles.stepTitle}>{withBrandLtr(step.title, styles.brandLtr)}</p>
                <p className={styles.stepBody}>{withBrandLtr(step.body, styles.brandLtr)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.compare}>
        <img
          src="/images/krails-rebate-waves.webp"
          alt=""
          className={styles.waves}
          aria-hidden
        />
        <div className={styles.tint} aria-hidden />
        <div className={styles.compareLeft}>
          <p className={styles.compareCopy}>{translations.rebateCompareLeft}</p>
        </div>
        <div className={styles.phone}>
          <img
            src="/images/krails-rebate-phone.png"
            alt={translations.rebateComparePhoneAlt}
            width={448}
            height={918}
          />
        </div>
        <div className={styles.compareRight}>
          <p className={styles.compareCopy}>
            {withBrandLtr(translations.rebateCompareRight, styles.brandLtr)}
          </p>
          <a href="#home-faq" className={styles.cta}>
            {translations.rebateCompareCta}
          </a>
        </div>
      </div>

      <HomeAddons translations={translations} skipAnimation={skipAnimation} />
      <WhoWeServe translations={translations} skipAnimation={skipAnimation} />
      <WhyKLab translations={translations} skipAnimation={skipAnimation} />
    </motion.section>
  );
}
