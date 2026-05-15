import { getTranslations, setRequestLocale } from "next-intl/server";
import { KRailsView } from "@/ui/krails/views/KRailsView/KRailsView";

type Props = { params: Promise<{ locale: string }> };

export default async function KRailsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("krails");
  const translations = {
    heroHeading: t("heroHeading"),
    heroDescription: t("heroDescription"),
    heroButtonPrimary: t("heroButtonPrimary"),
    heroButtonSecondary: t("heroButtonSecondary"),
    logoAlt: t("logoAlt"),
    whyHeading: t("whyHeading"),
    whySubheading: t("whySubheading"),
    whyBlock0Heading: t("whyBlock0Heading"),
    whyBlock0Description: t("whyBlock0Description"),
    whyBlock1Heading: t("whyBlock1Heading"),
    whyBlock1Description: t("whyBlock1Description"),
    whyBlock2Heading: t("whyBlock2Heading"),
    whyBlock2Description: t("whyBlock2Description"),
    whyBlock3Heading: t("whyBlock3Heading"),
    whyBlock3Description: t("whyBlock3Description"),
    whyBlock0Cta: t("whyBlock0Cta"),
    whyBlock1Cta: t("whyBlock1Cta"),
    whyBlock2Cta: t("whyBlock2Cta"),
    whyBlock3Cta: t("whyBlock3Cta"),
    builtWithHeading: t("builtWithHeading"),
    ctaSubheading: t("ctaSubheading"),
    ctaButton: t("ctaButton"),
    codeSectionHeadingLine1: t("codeSectionHeadingLine1"),
    codeSectionHeadingLine2: t("codeSectionHeadingLine2"),
    codeSectionHowCard0Title: t("codeSectionHowCard0Title"),
    codeSectionHowCard0Description: t("codeSectionHowCard0Description"),
    codeSectionHowCard1Title: t("codeSectionHowCard1Title"),
    codeSectionHowCard1Description: t("codeSectionHowCard1Description"),
    codeSectionHowCard2Title: t("codeSectionHowCard2Title"),
    codeSectionHowCard2Description: t("codeSectionHowCard2Description"),
    codeSectionHowCard3Title: t("codeSectionHowCard3Title"),
    codeSectionHowCard3Description: t("codeSectionHowCard3Description"),
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
