import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";
import type { TechPageTranslator } from "@/ui/technology-page/types";

export const kaiMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kai.png",
    variant: "desktop",
    alt: "Kai platform overview",
  },
];

export function buildKaiContent(t: TechPageTranslator): {
  hero: TechnologyHero;
  sections: TechnologyInfoSection[];
} {
  const benefitColumns: Extract<TechnologyInfoSection, { type: "benefit-columns" }> = {
    type: "benefit-columns",
    categoryLabels: [
      t("kai.benefitCategory0"),
      t("kai.benefitCategory1"),
      t("kai.benefitCategory2"),
      t("kai.benefitCategory3"),
      t("kai.benefitCategory4"),
    ],
    columns: [
      {
        title: t("kai.benefitCategory0"),
        mainPoint: t("kai.benefit0MainPoint"),
        subPoints: [t("kai.benefit0Sub0"), t("kai.benefit0Sub1")],
      },
      {
        title: t("kai.benefitCategory1"),
        mainPoint: t("kai.benefit1MainPoint"),
        subPoints: [t("kai.benefit1Sub0"), t("kai.benefit1Sub1")],
      },
      {
        title: t("kai.benefitCategory2"),
        mainPoint: t("kai.benefit2MainPoint"),
        subPoints: [t("kai.benefit2Sub0"), t("kai.benefit2Sub1")],
      },
      {
        title: t("kai.benefitCategory3"),
        mainPoint: t("kai.benefit3MainPoint"),
        subPoints: [t("kai.benefit3Sub0"), t("kai.benefit3Sub1")],
      },
      {
        title: t("kai.benefitCategory4"),
        mainPoint: t("kai.benefit4MainPoint"),
        subPoints: [t("kai.benefit4Sub0"), t("kai.benefit4Sub1")],
      },
    ],
  };

  const modulesSection: Extract<TechnologyInfoSection, { type: "modules" }> = {
    type: "modules",
    header: t("kai.modulesHeader"),
    modules: [
      { title: t("kai.module0Title"), description: t("kai.module0Description") },
      { title: t("kai.module1Title"), description: t("kai.module1Description") },
      { title: t("kai.module2Title"), description: t("kai.module2Description") },
      { title: t("kai.module3Title"), description: t("kai.module3Description") },
      { title: t("kai.module4Title"), description: t("kai.module4Description") },
      { title: t("kai.module5Title"), description: t("kai.module5Description") },
      { title: t("kai.module6Title"), description: t("kai.module6Description") },
      { title: t("kai.module7Title"), description: t("kai.module7Description") },
    ],
  };

  const blocksSection: Extract<TechnologyInfoSection, { type: "blocks" }> = {
    type: "blocks",
    featureTitle: t("kai.blocksFeatureTitle"),
    featureSubline: t("kai.blocksFeatureSubline"),
    blocks: [
      {
        heading: t("kai.block0Heading"),
        subheading: t("kai.block0Subheading"),
        bullets: [
          t("kai.block0Bullet0"),
          t("kai.block0Bullet1"),
          t("kai.block0Bullet2"),
        ],
      },
      {
        heading: t("kai.block1Heading"),
        subheading: t("kai.block1Subheading"),
        bullets: [
          t("kai.block1Bullet0"),
          t("kai.block1Bullet1"),
          t("kai.block1Bullet2"),
        ],
      },
      {
        heading: t("kai.block2Heading"),
        subheading: t("kai.block2Subheading"),
        bullets: [
          t("kai.block2Bullet0"),
          t("kai.block2Bullet1"),
          t("kai.block2Bullet2"),
        ],
      },
    ],
  };

  return {
    hero: {
      title: t("kai.heroTitle"),
      tagline: t("kai.heroTagline"),
    },
    sections: [benefitColumns, modulesSection, blocksSection],
  };
}
