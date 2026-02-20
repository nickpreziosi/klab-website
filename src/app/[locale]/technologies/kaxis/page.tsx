import { getTranslations, setRequestLocale } from "next-intl/server";
import { KAxisView } from "@/ui/technology-page/views/KAxisView/KAxisView";
import { buildKaxisContent, kaxisMockups } from "@/ui/technology-page/views/KAxisView/kaxis-content";

type Props = { params: Promise<{ locale: string }> };

export default async function KAxisPage({ params }: Props) {
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
  const { hero, sections } = buildKaxisContent(tTech);
  return (
    <KAxisView
      translations={translations}
      hero={hero}
      mockups={kaxisMockups}
      sections={sections}
    />
  );
}
