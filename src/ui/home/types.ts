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

export type HomeKrailsTranslations = {
  whatIsPrefix: string;
  whatIsQuestionMark: string;
  whatIsBody1: string;
  whatIsBody2: string;
  whatIsImageAlt: string;
  replaceQuestion: string;
  replaceAnswer: string;
  replaceBody1: string;
  replaceBody2: string;
};

export function buildHomeKrailsTranslations(
  t: (key: string) => string
): HomeKrailsTranslations {
  return {
    whatIsPrefix: t("whatIsPrefix"),
    whatIsQuestionMark: t("whatIsQuestionMark"),
    whatIsBody1: t("whatIsBody1"),
    whatIsBody2: t("whatIsBody2"),
    whatIsImageAlt: t("whatIsImageAlt"),
    replaceQuestion: t("replaceQuestion"),
    replaceAnswer: t("replaceAnswer"),
    replaceBody1: t("replaceBody1"),
    replaceBody2: t("replaceBody2"),
  };
}
