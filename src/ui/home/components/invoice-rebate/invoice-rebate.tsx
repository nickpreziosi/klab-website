"use client";

import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import { HomeAddons } from "@/ui/home/components/home-addons/home-addons";
import { WhoWeServe } from "@/ui/home/components/who-we-serve/who-we-serve";
import { WhyKLab } from "@/ui/home/components/why-k-lab/why-k-lab";
import {
  RebateBankIcon,
  RebateInvoiceIcon,
  RebateKrailsIcon,
  RebatePackageIcon,
} from "@/ui/shared/components/rebate-step-icons/rebate-step-icons";
import styles from "./invoice-rebate.module.css";

type InvoiceRebateProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function InvoiceRebate({ translations, skipAnimation = false }: InvoiceRebateProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const steps = translations.rebateSteps;

  return (
    <section
      className={styles.section}
      dir={dir}
      aria-labelledby="invoice-rebate-heading"
    >
      <div className={styles.inner}>
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
                {index === 0 ? <RebateInvoiceIcon /> : null}
                {index === 1 ? <RebateKrailsIcon /> : null}
                {index === 2 ? <RebateBankIcon /> : null}
                {index === 3 ? <RebatePackageIcon /> : null}
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
      </div>
    </section>
  );
}
