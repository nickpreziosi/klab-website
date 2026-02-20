import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";
import type { TechPageTranslator } from "@/ui/technology-page/types";

export const kaxisMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kaxis.png",
    variant: "desktop",
    alt: "KAxis CRM platform",
  },
];

export function buildKaxisContent(t: TechPageTranslator): {
  hero: TechnologyHero;
  sections: TechnologyInfoSection[];
} {
  return {
    hero: {
      title: t("kaxis.heroTitle"),
      tagline: t("kaxis.heroTagline"),
    },
    sections: [],
  };
}
