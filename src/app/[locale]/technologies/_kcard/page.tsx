import { getTranslations, setRequestLocale } from "next-intl/server";
import { KCardView } from "@/ui/technology-page/views/KCardView/KCardView";
import { buildKcardContent, kcardMockups } from "@/ui/technology-page/views/KCardView/kcard-content";

type Props = { params: Promise<{ locale: string }> };

export default async function KCardPage({ params }: Props) {
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
  const { hero, sections } = buildKcardContent(tTech);
  return (
    <KCardView
      translations={translations}
      hero={hero}
      mockups={kcardMockups}
      sections={sections}
    />
  );
}
