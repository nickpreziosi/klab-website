/**
 * Serializable landing translations for SSR.
 * Passed from server (getTranslations) to client components.
 */
export type LandingTranslations = {
  statusBar: string;
  headline: string;
  subline: string;
  learnMore: string;
  contactSales: string;
  ourTechnologies: string;
  technologiesSubline: string;
  technologies: Record<string, string>;
};

const TECHNOLOGY_KEYS = [
  "krails",
  "kena",
  "ktalk",
  "krisk",
  "kabl",
  "kcard",
  "kbpm",
  "kim",
  "kaxis",
  "kleads",
  "kai",
] as const;

export function buildLandingTranslations(t: (key: string) => string): LandingTranslations {
  const technologies = Object.fromEntries(
    TECHNOLOGY_KEYS.map((k) => [k, t(`technologies.${k}`)])
  ) as Record<string, string>;
  return {
    statusBar: t("statusBar"),
    headline: t("headline"),
    subline: t("subline"),
    learnMore: t("learnMore"),
    contactSales: t("contactSales"),
    ourTechnologies: t("ourTechnologies"),
    technologiesSubline: t("technologiesSubline"),
    technologies,
  };
}
