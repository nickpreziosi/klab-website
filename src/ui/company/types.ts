/**
 * Serializable company hero translations for SSR.
 * Passed from server (getTranslations) to client components.
 */
export type CompanyHeroTranslations = {
  headlineLine1: string;
  headlineLine2: string;
  tagline1: string;
  tagline2: string;
  tagline3: string;
};

export function buildCompanyHeroTranslations(
  t: (key: string) => string
): CompanyHeroTranslations {
  return {
    headlineLine1: t("headlineLine1"),
    headlineLine2: t("headlineLine2"),
    tagline1: t("tagline1"),
    tagline2: t("tagline2"),
    tagline3: t("tagline3"),
  };
}
