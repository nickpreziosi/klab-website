import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPocDemo } from "@/sanity/queries/poc-demo";
import type { ResourceCollection } from "@/ui/resource-library/types";
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
  const [t, demo] = await Promise.all([getTranslations("poc"), getPocDemo()]);

  const collections: ResourceCollection[] = [
    {
      id: "krailsDemo",
      title: t("demoTitle"),
      description: t("demoDescription"),
      assets: [
        {
          id: "krails-demo-web-v5",
          type: "video",
          href: demo?.originalUrl ?? "",
          filename: demo?.originalFilename ?? "k-rails-demo-web-v5.mp4",
          title: t("demoTitle"),
          previewSrc: demo?.posterUrl ?? "/images/krails.webp",
          youtubeUrl: demo?.youtubeUrl ?? undefined,
        },
      ],
    },
  ];

  return <PocView heading={t("heading")} subtitle={t("subtitle")} collections={collections} />;
}
