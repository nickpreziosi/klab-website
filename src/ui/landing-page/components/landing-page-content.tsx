"use client";

import Link from "next/link";
import { MailIcon, ArrowDown } from "lucide-react";
import Button from "@/ui/shared/components/button/button";
import { LandingTechnologiesShowcase } from "@/ui/landing-page/components/landing-technologies-showcase/landing-technologies-showcase";
import { LandingLocaleSwitcher } from "@/ui/landing-page/components/landing-locale-switcher/landing-locale-switcher";
import { useTranslations } from "@/ui/shared/hooks/use-translations";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import styles from "./landing-page-content.module.css";
import { Spinner } from "@/ui/shared/components/spinner/spinner";
export type LandingVariant = "orange" | "wave";

export default function LandingPageContent({ variant }: { variant: LandingVariant }) {
  const { t, isLoading } = useTranslations();

  return (
    <main
      className={`${styles.page} ${styles[`page${variant === "orange" ? "Orange" : "Wave"}`]}`}
      data-variant={variant}
    >
      <div className={styles.backgroundOverlay} />
      {isLoading && (
        <div className={styles.translationsLoadingOverlay} aria-live="polite" aria-busy="true">
          <Spinner size="xl" brand className={styles.translationsSpinner} />
        </div>
      )}
      {!isLoading && <LandingLocaleSwitcher />}
      {!isLoading && (
        <>
          <div className={styles.container}>
            <div className={styles.topBar}>
              <div className={styles.brand}>
                <KlabLogo
                  fullLogoTheme="dark"
                  color="orange"
                  format="full"
                  height={96}
                  className={styles.brandLogo}
                />
              </div>
            </div>

            <div className={styles.statusBar}>
              <span className={styles.statusDot} aria-hidden />
              <span>{t("landing.statusBar")}</span>
            </div>

            <h1 className={styles.headline}>{t("landing.headline")}</h1>

            <div className={styles.divider} />

            <p className={styles.subline}>{t("landing.subline")}</p>

            <div className={styles.ctaRow}>
              <Button asChild variant="ghost" size="lg" className={styles.learnMoreButton}>
                <Link href="#products">
                  <ArrowDown className={styles.mailIcon} />
                  {t("landing.learnMore")}
                </Link>
              </Button>
              <Button asChild variant="accent-brand" size="lg">
                <Link href="#products">
                  <MailIcon className={styles.mailIcon} />
                  {t("landing.contactSales")}
                </Link>
              </Button>
            </div>
          </div>
          <div id="products" className={`${styles.container} ${styles.productsSection}`}>
            <h2 className={styles.headline}>{t("landing.ourTechnologies")}</h2>

            <div className={styles.divider} />

            <p className={styles.subline}>{t("landing.subline")}</p>

            <div className={styles.productsShowcaseWrap}>
              <LandingTechnologiesShowcase variant={variant} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
