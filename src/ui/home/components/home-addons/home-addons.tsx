"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./home-addons.module.css";

const PRODUCTS = [
  {
    name: "K Risk",
    href: "/technologies/krisk",
    logoLight: "/images/home-addons/krisk-logo.png",
    logoDark: "/logos/krisk-logo-light.svg",
    className: styles.krisk,
  },
  {
    name: "K Leads",
    href: "/technologies/kleads",
    logoLight: "/images/home-addons/kleads-logo.png",
    logoDark: "/logos/kleads-logo-light.svg",
    className: styles.kleads,
  },
  {
    name: "K Talk",
    href: "/technologies/ktalk",
    logoLight: "/images/home-addons/ktalk-logo.png",
    logoDark: "/logos/ktalk-logo-light.svg",
    className: styles.ktalk,
  },
] as const;

type HomeAddonsProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function HomeAddons({ translations }: HomeAddonsProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);

  return (
    <section
      className={styles.section}
      dir={dir}
      aria-labelledby="home-addons-heading"
    >
      <div className={styles.top}>
        <div className={styles.visual} dir="ltr">
          <div className={styles.dashStack}>
            <div className={styles.mockupBoard}>
              <div className={styles.glowBack} aria-hidden />
              <img
                src="/images/home-addons/dashboard-back.png"
                alt=""
                className={styles.dashBack}
                decoding="async"
              />
              <div className={styles.glowFront} aria-hidden />
              <img
                src="/images/home-addons/dashboard-front.png"
                alt={translations.addonsDashAlt}
                className={styles.dashFront}
                decoding="async"
              />
              <span className={styles.leaderLeftWrap} aria-hidden>
                <img
                  src="/images/home-addons/leader-left.svg"
                  alt=""
                  className={styles.leaderLeft}
                />
              </span>
              <span className={styles.leaderRightWrap} aria-hidden>
                <img
                  src="/images/home-addons/leader-right.svg"
                  alt=""
                  className={styles.leaderRight}
                />
              </span>
            </div>

            <div className={styles.callouts}>
              <div className={cn(styles.callout, styles.calloutLeft)} dir={dir}>
                <ul>
                  <li>{translations.addonsCallout1}</li>
                  <li>{translations.addonsCallout2}</li>
                </ul>
              </div>
              <div className={cn(styles.callout, styles.calloutRight)} dir={dir}>
                <ul>
                  <li>{translations.addonsCallout3}</li>
                  <li>{translations.addonsCallout4}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.pillLg}>
            <span className={styles.plusLg} aria-hidden>
              <img src="/images/home-addons/plus-circle-lg.svg" alt="" width={30} height={30} />
              <span className={styles.plusBarVLg} />
              <span className={styles.plusBarHLg} />
            </span>
            <span className={styles.eyebrow} dir={dir}>
              {translations.addonsEyebrow}
            </span>
          </div>
          <h2 id="home-addons-heading" className={styles.title}>
            <span className={styles.titleLine}>{translations.addonsTitleLine1}</span>
            <span className={styles.titleLine}>
              {withBrandLtr(translations.addonsTitleLine2, styles.brandLtr)}
            </span>
          </h2>
          <div className={styles.body}>
            <p className={styles.bodyLead}>
              {withBrandLtr(translations.addonsBodyLead, styles.brandLtr)}
            </p>
            <p className={styles.bodyRest}>
              {withBrandLtr(translations.addonsBody, styles.brandLtr)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.products} dir="ltr">
        {PRODUCTS.map((product) => (
          <Link
            key={product.name}
            href={product.href}
            className={cn(styles.product, product.className)}
            aria-label={product.name}
          >
            <span className={styles.pillSm} aria-hidden />
            <span className={styles.plusSm} aria-hidden>
              <img src="/images/home-addons/plus-circle-sm.svg" alt="" width={16} height={16} />
              <span className={styles.plusBarVSm} />
              <span className={styles.plusBarHSm} />
            </span>
            <span className={styles.pillSmLabel} dir={dir}>
              {translations.addonsEyebrow}
            </span>
            <img
              src={product.logoLight}
              alt=""
              className={cn(styles.productLogo, styles.logoLight)}
              decoding="async"
            />
            <img
              src={product.logoDark}
              alt=""
              className={cn(styles.productLogo, styles.logoDark)}
              decoding="async"
              aria-hidden
            />
            <span className={styles.play} aria-hidden>
              <img src="/images/home-addons/play.svg" alt="" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
