import { getTranslations, setRequestLocale } from "next-intl/server";
import { KRailsView } from "@/ui/krails/views/KRailsView/KRailsView";

type Props = { params: Promise<{ locale: string }> };

export default async function KRailsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("krails");
  const translations = {
    heroHeadingPrefix: t("heroHeadingPrefix"),
    heroHeadingQuestionMark: t("heroHeadingQuestionMark"),
    heroDescription1: t("heroDescription1"),
    heroDescription2: t("heroDescription2"),
    replaceQuestion: t("replaceQuestion"),
    replaceAnswer: t("replaceAnswer"),
    replaceBody: t("replaceBody"),
    rebateBody: t("rebateBody"),
    rebateSteps: [
      { title: t("rebateStep1Title"), body: t("rebateStep1Body") },
      { title: t("rebateStep2Title"), body: t("rebateStep2Body") },
      { title: t("rebateStep3Title"), body: t("rebateStep3Body") },
      { title: t("rebateStep4Title"), body: t("rebateStep4Body") },
    ],
    rebateCards: [
      { title: t("rebateCard1Title"), body: t("rebateCard1Body") },
      { title: t("rebateCard2Title"), body: t("rebateCard2Body") },
      { title: t("rebateCard3Title"), body: t("rebateCard3Body") },
      { title: t("rebateCard4Title"), body: t("rebateCard4Body") },
      { title: t("rebateCard5Title"), body: t("rebateCard5Body") },
    ],
    rebatePhoneAlt: t("rebatePhoneAlt"),
    rebateAlignTitle: t("rebateAlignTitle"),
    rebateAlignItems: [
      t("rebateAlignItem1"),
      t("rebateAlignItem2"),
      t("rebateAlignItem3"),
    ],
    rebateAlignCta: t("rebateAlignCta"),
    rebateAlignDashAlt: t("rebateAlignDashAlt"),
    videoSectionTitle: t("videoSectionTitle"),
    videoPosterAlt: t("videoPosterAlt"),
    videoChoicePrompt: t("videoChoicePrompt"),
    videoFiLabel: t("videoFiLabel"),
    videoGovLabel: t("videoGovLabel"),
    videoFiPlayAria: t("videoFiPlayAria"),
    videoGovPlayAria: t("videoGovPlayAria"),
  };
  return <KRailsView translations={translations} />;
}
