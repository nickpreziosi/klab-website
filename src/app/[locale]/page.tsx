import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { HeroTranslations, HomeKrailsTranslations } from "@/ui/home/types";
import { buildHeroTranslations, buildHomeKrailsTranslations } from "@/ui/home/types";
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
  const [tHero, tHomeKrails] = await Promise.all([
    getTranslations("hero"),
    getTranslations("homeKrails"),
  ]);
  const heroTranslations: HeroTranslations = buildHeroTranslations(tHero);
  const homeKrailsTranslations: HomeKrailsTranslations =
    buildHomeKrailsTranslations(tHomeKrails);
  return (
    <HomeView
      heroTranslations={heroTranslations}
      homeKrailsTranslations={homeKrailsTranslations}
    />
  );
}
