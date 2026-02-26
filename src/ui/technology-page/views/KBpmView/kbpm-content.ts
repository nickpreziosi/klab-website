import type {
  TechnologyHero,
  TechnologyMockup,
  TechnologyInfoSection,
} from "@/ui/technology-page/types";
import type { TechPageTranslator } from "@/ui/technology-page/types";

export const kbpmMockups: TechnologyMockup[] = [
  {
    src: "/images/mockups/kbpm.png",
    variant: "laptop",
    alt: "KBpm platform overview",
  },
];

export function buildKbpmContent(t: TechPageTranslator): {
  hero: TechnologyHero;
  sections: TechnologyInfoSection[];
} {
  const modulesSection: Extract<TechnologyInfoSection, { type: "modules" }> = {
    type: "modules",
    modules: [
      { title: t("kbpm.module0Title"), description: t("kbpm.module0Description") },
      { title: t("kbpm.module1Title"), description: t("kbpm.module1Description") },
      { title: t("kbpm.module2Title"), description: t("kbpm.module2Description") },
      { title: t("kbpm.module3Title"), description: t("kbpm.module3Description") },
      { title: t("kbpm.module4Title"), description: t("kbpm.module4Description") },
      { title: t("kbpm.module5Title"), description: t("kbpm.module5Description") },
      { title: t("kbpm.module6Title"), description: t("kbpm.module6Description") },
      { title: t("kbpm.module7Title"), description: t("kbpm.module7Description") },
    ],
  };
  return {
    hero: {
      title: t("kbpm.heroTitle"),
      tagline: t("kbpm.heroTagline"),
    },
    sections: [modulesSection],
  };
}
