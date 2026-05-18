/**
 * Serializable hero translations for SSR.
 * Passed from server (getTranslations) to client components.
 */
export type HeroTranslations = {
  title: string;
  titleHighlight: string;
  subtitleIntro: string;
  subtitleHighlights: [string, string, string];
  contactSales: string;
  seeKRailsInAction: string;
};

export function buildHeroTranslations(t: (key: string) => string): HeroTranslations {
  return {
    title: t("title"),
    titleHighlight: t("titleHighlight"),
    subtitleIntro: t("subtitleIntro"),
    subtitleHighlights: [t("subtitleHighlight0"), t("subtitleHighlight1"), t("subtitleHighlight2")],
    contactSales: t("contactSales"),
    seeKRailsInAction: t("seeKRailsInAction"),
  };
}
