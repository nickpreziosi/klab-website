import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ManualsView } from "@/ui/manuals/views/ManualsView/ManualsView";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "manualsMetadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ManualsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("manuals");
  return (
    <ManualsView heading={t("heading")} subtitle={t("subtitle")} emptyMessage={t("empty")} />
  );
}
