"use client";

import Link from "next/link";
import { MailIcon, ArrowDown } from "lucide-react";
import Button from "@/app/components/ui/button/button";
import { TechnologiesShowcase } from "@/app/components/technologies-showcase/technologies-showcase";
import { LocaleSwitcher } from "@/app/components/ui/locale-switcher/locale-switcher";
import { useTranslations } from "@/app/lib/use-translations";
import { KlabLogo } from "@/app/components/ui/klab-logo/klab-logo";
import styles from "./landing-page-content.module.css";

export type LandingVariant = "orange" | "wave";

export default function LandingPageContent({ variant }: { variant: LandingVariant }) {
  const { t } = useTranslations();

  return (
    <main className={`${styles.page} ${styles[`page${variant === "orange" ? "Orange" : "Wave"}`]}`} data-variant={variant}>
      <div className={styles.backgroundOverlay} />
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.brand}>
            <KlabLogo color="orange" format="full" height={160} className={styles.brandLogo} />
          </div>
          <div className={styles.localeSwitcherWrap}>
            <LocaleSwitcher />
          </div>
        </div>

        <div className={styles.statusBar}>
          <span className={styles.statusDot} aria-hidden />
          <span>{t("landing.statusBar")}</span>
        </div>

        <h1 className={styles.headline}>
          {t("landing.headline")}
        </h1>

        <div className={styles.divider} />

        <p className={styles.subline}>
          {t("landing.subline")}
        </p>

        <div className={styles.ctaRow}>
          <Button asChild variant="ghost" size="lg">
            <Link href="#products">
              <ArrowDown className={styles.mailIcon} />
              {t("landing.learnMore")}
            </Link>
          </Button>
        </div>
      </div>
      <div id="products" className={`${styles.container} ${styles.productsSection}`}>
        <h2 className={styles.headline}>
          {t("landing.ourTechnologies")}
        </h2>

        <div className={styles.divider} />

        <p className={styles.subline}>
          {t("landing.subline")}
        </p>

        <div className={styles.productsShowcaseWrap}>
          <TechnologiesShowcase
            expandOnFirstTap={true}
          />
        </div>

        <div className={styles.ctaRow}>
          <Button asChild variant="ghost" size="lg">
            <Link href="mailto:sales@k-lab.com">
              <MailIcon className={styles.mailIcon} />
              {t("landing.contactSales")}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
