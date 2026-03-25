import { getTranslations, setRequestLocale } from "next-intl/server";
import { KaiView } from "@/ui/technology-page/views/KaiView/KaiView";
import { buildKaiContent, kaiMockups } from "@/ui/technology-page/views/KaiView/kai-content";

type Props = { params: Promise<{ locale: string }> };

export default async function KaiPage({ params }: Props) {
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
  const { hero, sections } = buildKaiContent(tTech);
  return (
    <KaiView
      translations={translations}
      hero={hero}
      mockups={kaiMockups}
      sections={sections}
    />
  );
}
