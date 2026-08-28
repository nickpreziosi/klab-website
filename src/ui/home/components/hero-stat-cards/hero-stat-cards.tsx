"use client";

import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HeroTranslations } from "@/ui/home/types";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./hero-stat-cards.module.css";

const LATIN_OR_DOLLAR = /[A-Za-z$]/;

type HeroStatCardsProps = {
  translations: HeroTranslations;
  skipAnimation?: boolean;
  isLoaded: boolean;
};

export function HeroStatCards({
  translations,
  skipAnimation = false,
  isLoaded,
}: HeroStatCardsProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);

  const stats = [
    { title: translations.statBillionTitle, body: translations.statBillionBody },
    { title: translations.statYearsTitle, body: translations.statYearsBody },
    { title: translations.statLiveTitle, body: translations.statLiveBody },
  ];

  return (
    <ul
      dir={dir}
      data-allow-transition
      className={cn(styles.list, isLoaded && styles.loaded, skipAnimation && styles.skip)}
    >
      {stats.map((stat) => {
        const isolateTitle = LATIN_OR_DOLLAR.test(stat.title);
        return (
          <li key={stat.title} className={styles.card}>
            <p
              dir={isolateTitle ? "ltr" : undefined}
              className={cn(styles.title, isolateTitle && styles.titleLtr)}
            >
              {stat.title}
            </p>
            <p className={styles.body}>{stat.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
