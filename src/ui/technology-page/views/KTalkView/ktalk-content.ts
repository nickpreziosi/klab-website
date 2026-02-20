import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";
import type { TechPageTranslator } from "@/ui/technology-page/types";

export const ktalkMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/ktalk2.png",
    variant: "phone",
    alt: "KTalk app interface",
  },
];

export function buildKtalkContent(t: TechPageTranslator): {
  hero: TechnologyHero;
  sections: TechnologyInfoSection[];
} {
  return {
    hero: {
      title: t("ktalk.heroTitle"),
      tagline: t("ktalk.heroTagline"),
      highlights: [
        t("ktalk.heroHighlight0"),
        t("ktalk.heroHighlight1"),
        t("ktalk.heroHighlight2"),
        t("ktalk.heroHighlight3"),
      ],
    },
    sections: [],
  };
}
