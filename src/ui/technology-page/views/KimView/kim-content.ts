import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";
import type { TechPageTranslator } from "@/ui/technology-page/types";

export const kimMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kim.png",
    variant: "desktop",
    alt: "Kim invoice workflow",
  },
];

export function buildKimContent(t: TechPageTranslator): {
  hero: TechnologyHero;
  sections: TechnologyInfoSection[];
} {
  const blocksSection: Extract<TechnologyInfoSection, { type: "blocks" }> = {
    type: "blocks",
    blocks: [
      {
        heading: t("kim.block0Heading"),
        subheading: "",
        bullets: [
          t("kim.block0Bullet0"),
          t("kim.block0Bullet1"),
          t("kim.block0Bullet2"),
        ],
      },
      {
        heading: t("kim.block1Heading"),
        subheading: "",
        bullets: [
          t("kim.block1Bullet0"),
          t("kim.block1Bullet1"),
          t("kim.block1Bullet2"),
        ],
      },
      {
        heading: t("kim.block2Heading"),
        subheading: "",
        bullets: [
          t("kim.block2Bullet0"),
          t("kim.block2Bullet1"),
          t("kim.block2Bullet2"),
        ],
      },
      {
        heading: t("kim.block3Heading"),
        subheading: "",
        bullets: [
          t("kim.block3Bullet0"),
          t("kim.block3Bullet1"),
          t("kim.block3Bullet2"),
        ],
      },
    ],
  };
  return {
    hero: {
      title: t("kim.heroTitle"),
      tagline: t("kim.heroTagline"),
    },
    sections: [blocksSection],
  };
}
