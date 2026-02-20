import { getTranslations, setRequestLocale } from "next-intl/server";
import { KablView } from "@/ui/technology-page/views/KablView/KablView";
import { buildKablContent, kablMockups } from "@/ui/technology-page/views/KablView/kabl-content";

type Props = { params: Promise<{ locale: string }> };

export default async function KablPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [tCommon, tTech] = await Promise.all([
    getTranslations("common"),
    getTranslations("techPages"),
  ]);
  const translations = {
    contactSales: tCommon("contactSales"),
    technologyScreenshot: tCommon("technologyScreenshot"),
  };
  const { hero, sections } = buildKablContent(tTech);
  return (
    <KablView
      translations={translations}
      hero={hero}
      mockups={kablMockups}
      sections={sections}
    />
  );
}
