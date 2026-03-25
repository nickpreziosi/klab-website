import { getTranslations, setRequestLocale } from "next-intl/server";
import { KBpmView } from "@/ui/technology-page/views/KBpmView/KBpmView";
import { buildKbpmContent, kbpmMockups } from "@/ui/technology-page/views/KBpmView/kbpm-content";

type Props = { params: Promise<{ locale: string }> };

export default async function KBpmPage({ params }: Props) {
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
  const { hero, sections } = buildKbpmContent(tTech);
  return (
    <KBpmView
      translations={translations}
      hero={hero}
      mockups={kbpmMockups}
      sections={sections}
    />
  );
}
