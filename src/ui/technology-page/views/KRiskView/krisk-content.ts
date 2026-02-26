import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";
import type { TechPageTranslator } from "@/ui/technology-page/types";

export const kriskMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/krisk.png",
    variant: "desktop",
    alt: "KRisk platform overview",
  },
];

export function buildKriskContent(t: TechPageTranslator): {
  hero: TechnologyHero;
  sections: TechnologyInfoSection[];
} {
  const blocksSection: Extract<TechnologyInfoSection, { type: "blocks" }> = {
    type: "blocks",
    featureTitle: t("krisk.blocksFeatureTitle"),
    blocks: [
      { heading: t("krisk.block0Heading"), subheading: t("krisk.block0Subheading"), bullets: [] },
      { heading: t("krisk.block1Heading"), subheading: t("krisk.block1Subheading"), bullets: [] },
      { heading: t("krisk.block2Heading"), subheading: t("krisk.block2Subheading"), bullets: [] },
      { heading: t("krisk.block3Heading"), subheading: t("krisk.block3Subheading"), bullets: [] },
    ],
  };
  return {
    hero: {
      title: t("krisk.heroTitle"),
      tagline: t("krisk.heroTagline"),
      highlights: [
        t("krisk.heroHighlight0"),
        t("krisk.heroHighlight1"),
        t("krisk.heroHighlight2"),
      ],
    },
    sections: [blocksSection],
  };
}
