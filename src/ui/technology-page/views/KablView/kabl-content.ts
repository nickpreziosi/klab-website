import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
  TechPageTranslator,
} from "@/ui/technology-page/types";

export const kablMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kabl.png",
    variant: "desktop",
    alt: "KABL ecosystem overview",
  },
];

export function buildKablContent(t: TechPageTranslator): {
  hero: TechnologyHero;
  sections: TechnologyInfoSection[];
} {
  return {
    hero: {
      title: t("kabl.heroTitle"),
      highlights: [],
    },
    sections: [],
  };
}
