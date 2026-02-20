import { getTranslations, setRequestLocale } from "next-intl/server";
import { KimView } from "@/ui/technology-page/views/KimView/KimView";
import { buildKimContent, kimMockups } from "@/ui/technology-page/views/KimView/kim-content";

type Props = { params: Promise<{ locale: string }> };

export default async function KimPage({ params }: Props) {
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
  const { hero, sections } = buildKimContent(tTech);
  return (
    <KimView
      translations={translations}
      hero={hero}
      mockups={kimMockups}
      sections={sections}
    />
  );
}
