import { getTranslations } from "next-intl/server";
import type { HeroTranslations } from "@/ui/home/types";
import { buildHeroTranslations } from "@/ui/home/types";
import { HomeView } from "@/ui/home/views/HomeView/HomeView";

export default async function Home() {
  const tHero = await getTranslations("hero");
  const tCommon = await getTranslations("common");
  const heroTranslations: HeroTranslations = {
    ...buildHeroTranslations(tHero),
    learnMore: tCommon("learnMore"),
  };
  return <HomeView heroTranslations={heroTranslations} />;
}
