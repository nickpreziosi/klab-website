import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPocDocuments } from "@/sanity/queries/poc-demo";
import { PocView } from "@/ui/poc/views/PocView/PocView";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pocMetadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PocPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, collections] = await Promise.all([
    getTranslations("poc"),
    getPocDocuments(locale),
  ]);

  return (
    <PocView
      heading={t("heading")}
      subtitle={t("subtitle")}
      collections={collections}
      emptyMessage={t("empty")}
    />
  );
}
