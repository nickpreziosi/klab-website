/**
 * Serializable company section translations for SSR.
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

export type CompanyWhatWeBuiltTranslations = {
  title: string;
  leadParagraph1: string;
  leadParagraph2: string;
  leadParagraph3: string;
  introLine: string;
  moduleRailsAlt: string;
  moduleTalkAlt: string;
  moduleRiskAlt: string;
  moduleLeadsAlt: string;
  moduleRails: string;
  moduleTalk: string;
  moduleRisk: string;
  moduleLeads: string;
  valuesQuestion: string;
  valuesAnswer: string;
  valueEnterprises: string;
  valueBanks: string;
  valueSuppliers: string;
  valueKLabEarns: string;
};

export function buildCompanyWhatWeBuiltTranslations(
  t: (key: string) => string
): CompanyWhatWeBuiltTranslations {
  return {
    title: t("title"),
    leadParagraph1: t("leadParagraph1"),
    leadParagraph2: t("leadParagraph2"),
    leadParagraph3: t("leadParagraph3"),
    introLine: t("introLine"),
    moduleRailsAlt: t("moduleRailsAlt"),
    moduleTalkAlt: t("moduleTalkAlt"),
    moduleRiskAlt: t("moduleRiskAlt"),
    moduleLeadsAlt: t("moduleLeadsAlt"),
    moduleRails: t("moduleRails"),
    moduleTalk: t("moduleTalk"),
    moduleRisk: t("moduleRisk"),
    moduleLeads: t("moduleLeads"),
    valuesQuestion: t("valuesQuestion"),
    valuesAnswer: t("valuesAnswer"),
    valueEnterprises: t("valueEnterprises"),
    valueBanks: t("valueBanks"),
    valueSuppliers: t("valueSuppliers"),
    valueKLabEarns: t("valueKLabEarns"),
  };
}

export type JourneyTimelineTranslations = {
  title: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  year2020: string;
  year2025: string;
  sold: string;
  future: string;
  event1: string;
  event2: string;
  event3: string;
};

export function buildJourneyTimelineTranslations(
  t: (key: string) => string
): JourneyTimelineTranslations {
  return {
    title: t("title"),
    subtitle: t("subtitle"),
    paragraph1: t("paragraph1"),
    paragraph2: t("paragraph2"),
    year2020: t("year2020"),
    year2025: t("year2025"),
    sold: t("sold"),
    future: t("future"),
    event1: t("event1"),
    event2: t("event2"),
    event3: t("event3"),
  };
}
