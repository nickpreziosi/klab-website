/**
 * Copy for the K Rails "why" / use-cases section (homepage + K Rails page).
 */
export type KRailsWhyTranslations = {
  whyHeading: string;
  whySubheading: string;
  whyBlock0Heading: string;
  whyBlock0Description: string;
  whyBlock1Heading: string;
  whyBlock1Description: string;
  whyBlock2Heading: string;
  whyBlock2Description: string;
  whyBlock3Heading: string;
  whyBlock3Description: string;
  whyBlock0Cta: string;
  whyBlock1Cta: string;
  whyBlock2Cta: string;
  whyBlock3Cta: string;
};

export function buildKRailsWhyTranslations(
  t: (key: string) => string
): KRailsWhyTranslations {
  return {
    whyHeading: t("whyHeading"),
    whySubheading: t("whySubheading"),
    whyBlock0Heading: t("whyBlock0Heading"),
    whyBlock0Description: t("whyBlock0Description"),
    whyBlock1Heading: t("whyBlock1Heading"),
    whyBlock1Description: t("whyBlock1Description"),
    whyBlock2Heading: t("whyBlock2Heading"),
    whyBlock2Description: t("whyBlock2Description"),
    whyBlock3Heading: t("whyBlock3Heading"),
    whyBlock3Description: t("whyBlock3Description"),
    whyBlock0Cta: t("whyBlock0Cta"),
    whyBlock1Cta: t("whyBlock1Cta"),
    whyBlock2Cta: t("whyBlock2Cta"),
    whyBlock3Cta: t("whyBlock3Cta"),
  };
}
