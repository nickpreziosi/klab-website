import { getTranslations, setRequestLocale } from "next-intl/server";
import { KRiskView } from "@/ui/technology-page/views/KRiskView/KRiskView";
import { buildKriskContent, kriskMockups } from "@/ui/technology-page/views/KRiskView/krisk-content";

type Props = { params: Promise<{ locale: string }> };

export default async function KRiskPage({ params }: Props) {
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
  const { hero, sections } = buildKriskContent(tTech);
  return (
    <KRiskView
      translations={translations}
      hero={hero}
      mockups={kriskMockups}
      sections={sections}
    />
  );
}
