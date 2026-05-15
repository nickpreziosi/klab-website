import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { HeroTranslations } from "@/ui/home/types";
import { buildHeroTranslations } from "@/ui/home/types";
import { HomeView } from "@/ui/home/views/HomeView/HomeView";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "homeMetadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHero = await getTranslations("hero");
  const heroTranslations: HeroTranslations = buildHeroTranslations(tHero);
  return <HomeView heroTranslations={heroTranslations} />;
}
