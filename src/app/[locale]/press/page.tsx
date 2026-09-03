import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PressView } from "@/ui/press/views/PressView/PressView";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pressMetadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PressPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PressView />;
}
