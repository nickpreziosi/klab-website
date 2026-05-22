/**
 * Serializable company hero translations for SSR.
 * Passed from server (getTranslations) to client components.
 */
export type CompanyHeroTranslations = {
  headlineLine1: string;
  headlineLine2: string;
  subhead: string;
};

export function buildCompanyHeroTranslations(
  t: (key: string) => string
): CompanyHeroTranslations {
  return {
    headlineLine1: t("headlineLine1"),
    headlineLine2: t("headlineLine2"),
    subhead: t("subhead"),
  };
}
