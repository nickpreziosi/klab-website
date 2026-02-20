import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";
import type { TechPageTranslator } from "@/ui/technology-page/types";

export const kleadsMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kleads.png",
    variant: "desktop",
    alt: "K-Leads analytics",
  },
];

export function buildKleadsContent(t: TechPageTranslator): {
  hero: TechnologyHero;
  sections: TechnologyInfoSection[];
} {
  return {
    hero: {
      title: t("kleads.heroTitle"),
      tagline: t("kleads.heroTagline"),
      highlights: [
        t("kleads.heroHighlight0"),
        t("kleads.heroHighlight1"),
        t("kleads.heroHighlight2"),
      ],
    },
    sections: [],
  };
}
