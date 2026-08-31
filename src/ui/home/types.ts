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
  rebateTitle: string;
  rebateTagline: string;
  rebateBody: string;
  rebateSteps: { title: string; body: string }[];
  rebateCompareLeft: string;
  rebateCompareRight: string;
  rebateCompareCta: string;
  rebateComparePhoneAlt: string;
  faqTitle: string;
  faqItems: { id: string; question: string; answer: string }[];
  addonsEyebrow: string;
  addonsTitleLine1: string;
  addonsTitleLine2: string;
  addonsBodyLead: string;
  addonsBody: string;
  addonsCallout1: string;
  addonsCallout2: string;
  addonsCallout3: string;
  addonsCallout4: string;
  addonsDashAlt: string;
  serveTitle: string;
  serveImageAlt: string;
  serveCallout: string;
  servePrev: string;
  serveNext: string;
  serveItems: { id: string; title: string; body: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
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
    rebateTitle: t("rebateTitle"),
    rebateTagline: t("rebateTagline"),
    rebateBody: t("rebateBody"),
    rebateSteps: [
      { title: t("rebateStep1Title"), body: t("rebateStep1Body") },
      { title: t("rebateStep2Title"), body: t("rebateStep2Body") },
      { title: t("rebateStep3Title"), body: t("rebateStep3Body") },
      { title: t("rebateStep4Title"), body: t("rebateStep4Body") },
    ],
    rebateCompareLeft: t("rebateCompareLeft"),
    rebateCompareRight: t("rebateCompareRight"),
    rebateCompareCta: t("rebateCompareCta"),
    rebateComparePhoneAlt: t("rebateComparePhoneAlt"),
    addonsEyebrow: t("addonsEyebrow"),
    addonsTitleLine1: t("addonsTitleLine1"),
    addonsTitleLine2: t("addonsTitleLine2"),
    addonsBodyLead: t("addonsBodyLead"),
    addonsBody: t("addonsBody"),
    addonsCallout1: t("addonsCallout1"),
    addonsCallout2: t("addonsCallout2"),
    addonsCallout3: t("addonsCallout3"),
    addonsCallout4: t("addonsCallout4"),
    addonsDashAlt: t("addonsDashAlt"),
    serveTitle: t("serveTitle"),
    serveImageAlt: t("serveImageAlt"),
    serveCallout: t("serveCallout"),
    servePrev: t("servePrev"),
    serveNext: t("serveNext"),
    serveItems: [
      { id: "governments", title: t("serveGovernmentsTitle"), body: t("serveGovernmentsBody") },
      { id: "enterprises", title: t("serveEnterprisesTitle"), body: t("serveEnterprisesBody") },
      { id: "suppliers", title: t("serveSuppliersTitle"), body: t("serveSuppliersBody") },
      { id: "banks", title: t("serveBanksTitle"), body: t("serveBanksBody") },
      { id: "capital", title: t("serveCapitalTitle"), body: t("serveCapitalBody") },
    ],
    faqTitle: t("faqTitle"),
    faqItems: [
      { id: "factoring", question: t("faqFactoringQ"), answer: t("faqFactoringA") },
      { id: "erp", question: t("faqErpQ"), answer: t("faqErpA") },
      { id: "funding", question: t("faqFundingQ"), answer: t("faqFundingA") },
      { id: "terms", question: t("faqTermsQ"), answer: t("faqTermsA") },
      { id: "fraud", question: t("faqFraudQ"), answer: t("faqFraudA") },
      { id: "started", question: t("faqStartedQ"), answer: t("faqStartedA") },
    ],
    ctaTitle: t("ctaTitle"),
    ctaBody: t("ctaBody"),
    ctaButton: t("ctaButton"),
  };
}
