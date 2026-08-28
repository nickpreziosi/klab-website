/**
 * Serializable hero translations for SSR.
 * Passed from server (getTranslations) to client components.
 */
export type HeroTranslations = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  cta: string;
  statBillionTitle: string;
  statBillionBody: string;
  statYearsTitle: string;
  statYearsBody: string;
  statLiveTitle: string;
  statLiveBody: string;
};

export function buildHeroTranslations(t: (key: string) => string): HeroTranslations {
  return {
    eyebrow: t("eyebrow"),
    titleLine1: t("titleLine1"),
    titleLine2: t("titleLine2"),
    subtitle: t("subtitle"),
    cta: t("cta"),
    statBillionTitle: t("statBillionTitle"),
    statBillionBody: t("statBillionBody"),
    statYearsTitle: t("statYearsTitle"),
    statYearsBody: t("statYearsBody"),
    statLiveTitle: t("statLiveTitle"),
    statLiveBody: t("statLiveBody"),
  };
}
