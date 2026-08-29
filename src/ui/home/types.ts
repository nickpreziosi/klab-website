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
  trustTitle: string;
  trustTagline: string;
  trustBody: string;
  trustEmphasis: string;
  trustEncryptTitle: string;
  trustEncryptBody: string;
  trustFailureTitle: string;
  trustFailureBody: string;
  trustPrivacyTitle: string;
  trustPrivacyBody: string;
  trustAuditTitle: string;
  trustAuditBody: string;
  trustPillConfigurable: string;
  trustPillEssential: string;
  trustPillAuditable: string;
  faqTitle: string;
  faqItems: { id: string; question: string; answer: string }[];
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
    trustTitle: t("trustTitle"),
    trustTagline: t("trustTagline"),
    trustBody: t("trustBody"),
    trustEmphasis: t("trustEmphasis"),
    trustEncryptTitle: t("trustEncryptTitle"),
    trustEncryptBody: t("trustEncryptBody"),
    trustFailureTitle: t("trustFailureTitle"),
    trustFailureBody: t("trustFailureBody"),
    trustPrivacyTitle: t("trustPrivacyTitle"),
    trustPrivacyBody: t("trustPrivacyBody"),
    trustAuditTitle: t("trustAuditTitle"),
    trustAuditBody: t("trustAuditBody"),
    trustPillConfigurable: t("trustPillConfigurable"),
    trustPillEssential: t("trustPillEssential"),
    trustPillAuditable: t("trustPillAuditable"),
    faqTitle: t("faqTitle"),
    faqItems: [
      { id: "factoring", question: t("faqFactoringQ"), answer: t("faqFactoringA") },
      { id: "erp", question: t("faqErpQ"), answer: t("faqErpA") },
      { id: "funding", question: t("faqFundingQ"), answer: t("faqFundingA") },
      { id: "terms", question: t("faqTermsQ"), answer: t("faqTermsA") },
      { id: "fraud", question: t("faqFraudQ"), answer: t("faqFraudA") },
      { id: "started", question: t("faqStartedQ"), answer: t("faqStartedA") },
    ],
  };
}
