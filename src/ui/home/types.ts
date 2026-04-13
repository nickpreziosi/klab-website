/**
 * Serializable hero translations for SSR.
 * Passed from server (getTranslations) to client components.
 */
export type HeroTranslations = {
  title: string;
  subtitle: string;
  contactSales: string;
  /** Typically `common.learnMore`; merged in the home page server component. */
  learnMore: string;
};

export function buildHeroTranslations(t: (key: string) => string): Omit<HeroTranslations, "learnMore"> {
  return {
    title: t("title"),
    subtitle: t("subtitle"),
    contactSales: t("contactSales"),
  };
}
