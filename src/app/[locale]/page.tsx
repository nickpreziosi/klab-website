import { getTranslations } from "next-intl/server";
import { buildHeroTranslations } from "@/ui/home/types";
import { HomeView } from "@/ui/home/views/HomeView/HomeView";

export default async function Home() {
  const t = await getTranslations("hero");
  const heroTranslations = buildHeroTranslations(t);
  return <HomeView heroTranslations={heroTranslations} />;
}
