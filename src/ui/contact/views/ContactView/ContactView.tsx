"use client";

import { useLocale } from "next-intl";
import { ContactLink } from "@/ui/contact/components/contact-link/contact-link";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./ContactView.module.css";
import SectionHeader from "@/ui/shared/components/section-header/section-header";

export type ContactTranslations = {
  heading: string;
  subtitle: string;
  salesTitle: string;
  salesDescription: string;
  salesButton: string;
  supportTitle: string;
  supportDescription: string;
  supportButton: string;
  careersTitle: string;
  careersDescription: string;
  careersButton: string;
};

type ContactViewProps = {
  contactTranslations?: ContactTranslations;
};

export function ContactView({ contactTranslations }: ContactViewProps = {}) {
  const locale = useLocale();
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  if (!contactTranslations) {
    return null;
  }
  const t = contactTranslations;
  const emailIcon = (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <SectionHeader
            heading={t.heading}
            subtitle={t.subtitle}
            align="center"
            animateOnce={true}
            skipAnimation={skipAnimation}
          />
          <div className={styles.cardsGrid}>
            <ContactLink
              title={t.salesTitle}
              email="sales@k-lab.ai"
              description={t.salesDescription}
              buttonText={t.salesButton}
              skipAnimation={skipAnimation}
              icon={emailIcon}
              href={`/${locale}/contact/sales`}
            />
            <ContactLink
              skipAnimation={skipAnimation}
              icon={emailIcon}
              title={t.supportTitle}
              email="support@k-lab.ai"
              description={t.supportDescription}
              buttonText={t.supportButton}
              href={`/${locale}/contact/support`}
            />
            <ContactLink
              skipAnimation={skipAnimation}
              icon={emailIcon}
              title={t.careersTitle}
              email="careers@k-lab.ai"
              description={t.careersDescription}
              buttonText={t.careersButton}
              href={`/${locale}/contact/careers`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
