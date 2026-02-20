import { getTranslations, setRequestLocale } from "next-intl/server";
import { KTalkView } from "@/ui/technology-page/views/KTalkView/KTalkView";
import { buildKtalkContent, ktalkMockups } from "@/ui/technology-page/views/KTalkView/ktalk-content";

type Props = { params: Promise<{ locale: string }> };

export default async function KTalkPage({ params }: Props) {
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
  const { hero, sections } = buildKtalkContent(tTech);
  return (
    <KTalkView
      translations={translations}
      hero={hero}
      mockups={ktalkMockups}
      sections={sections}
    />
  );
}
