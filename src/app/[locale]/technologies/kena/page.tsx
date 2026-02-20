import { getTranslations, setRequestLocale } from "next-intl/server";
import { KenaView } from "@/ui/kena/views/KenaView/KenaView";

type Props = { params: Promise<{ locale: string }> };

export default async function KenaAIPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kena");
  const translations = {
    heroHeading: t("heroHeading"),
    heroSecondHeading: t("heroSecondHeading"),
    heroSubtitle: t("heroSubtitle"),
    twoColLeft: t("twoColLeft"),
    twoColRight: t("twoColRight"),
    cardsHeading: t("cardsHeading"),
    cardsImageAlt: t("cardsImageAlt"),
    feature0Title: t("feature0Title"),
    feature0Description: t("feature0Description"),
    feature1Title: t("feature1Title"),
    feature1Description: t("feature1Description"),
    feature2Title: t("feature2Title"),
    feature2Description: t("feature2Description"),
    feature3Title: t("feature3Title"),
    feature3Description: t("feature3Description"),
    section3dHeading: t("section3dHeading"),
    step0Heading: t("step0Heading"),
    step0Text: t("step0Text"),
    step1Heading: t("step1Heading"),
    step1Text: t("step1Text"),
    step2Heading: t("step2Heading"),
    step2Text: t("step2Text"),
    step3Heading: t("step3Heading"),
    step3Text: t("step3Text"),
    step4Heading: t("step4Heading"),
    step4Text: t("step4Text"),
    ctaHeading: t("ctaHeading"),
    ctaButton: t("ctaButton"),
  };
  return <KenaView translations={translations} />;
}
