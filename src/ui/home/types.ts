/**
 * Serializable hero translations for SSR.
 * Passed from server (getTranslations) to client components.
 */
export type HeroTranslations = {
  title: string;
  subtitle: string;
  contactSales: string;
};

export function buildHeroTranslations(t: (key: string) => string): HeroTranslations {
  return {
    title: t("title"),
    subtitle: t("subtitle"),
    contactSales: t("contactSales"),
  };
}
