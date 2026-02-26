import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";
import type { TechPageTranslator } from "@/ui/technology-page/types";

export const kcardMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kcard.png",
    variant: "desktop",
    alt: "KCard expense management",
  },
];

export function buildKcardContent(t: TechPageTranslator): {
  hero: TechnologyHero;
  sections: TechnologyInfoSection[];
} {
  return {
    hero: {
      title: t("kcard.heroTitle"),
      tagline: t("kcard.heroTagline"),
      highlights: [
        t("kcard.heroHighlight0"),
        t("kcard.heroHighlight1"),
        t("kcard.heroHighlight2"),
        t("kcard.heroHighlight3"),
      ],
    },
    sections: [],
  };
}
