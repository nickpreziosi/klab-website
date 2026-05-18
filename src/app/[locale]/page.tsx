import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { HeroTranslations } from "@/ui/home/types";
import { buildHeroTranslations } from "@/ui/home/types";
import { buildKRailsWhyTranslations } from "@/ui/krails/types/krails-why-translations";
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
  const [tHero, tKrails] = await Promise.all([
    getTranslations("hero"),
    getTranslations("krails"),
  ]);
  const heroTranslations: HeroTranslations = buildHeroTranslations(tHero);
  const krailsWhyTranslations = buildKRailsWhyTranslations(tKrails);
  return (
    <HomeView heroTranslations={heroTranslations} krailsWhyTranslations={krailsWhyTranslations} />
  );
}
