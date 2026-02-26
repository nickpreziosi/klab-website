import { getTranslations, setRequestLocale } from "next-intl/server";
import { KRailsView } from "@/ui/krails/views/KRailsView/KRailsView";

type Props = { params: Promise<{ locale: string }> };

export default async function KRailsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("krails");
  const translations = {
    heroHeading: t("heroHeading"),
    heroSubheading: t("heroSubheading"),
    heroDescription: t("heroDescription"),
    heroButtonPrimary: t("heroButtonPrimary"),
    heroButtonSecondary: t("heroButtonSecondary"),
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
    whyCtaButton: t("whyCtaButton"),
    builtWithHeading: t("builtWithHeading"),
    ctaHeading: t("ctaHeading"),
    ctaSubheading: t("ctaSubheading"),
    ctaHighlight: t("ctaHighlight"),
    ctaButton: t("ctaButton"),
    codeSectionHeadingLine1: t("codeSectionHeadingLine1"),
    codeSectionHeadingLine2: t("codeSectionHeadingLine2"),
    codeSectionCardTrustTitle: t("codeSectionCardTrustTitle"),
    codeSectionCardTrustDescription: t("codeSectionCardTrustDescription"),
    codeSectionCardCertaintyTitle: t("codeSectionCardCertaintyTitle"),
    codeSectionCardCertaintyDescription: t("codeSectionCardCertaintyDescription"),
  };
  return <KRailsView translations={translations} />;
}
