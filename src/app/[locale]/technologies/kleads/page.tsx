import { getTranslations, setRequestLocale } from "next-intl/server";
import { KLeadsView } from "@/ui/technology-page/views/KLeadsView/KLeadsView";
import { buildKleadsContent, kleadsMockups } from "@/ui/technology-page/views/KLeadsView/kleads-content";

type Props = { params: Promise<{ locale: string }> };

export default async function KLeadsPage({ params }: Props) {
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
  const { hero, sections } = buildKleadsContent(tTech);
  return (
    <KLeadsView
      translations={translations}
      hero={hero}
      mockups={kleadsMockups}
      sections={sections}
    />
  );
}
