import type { LandingTranslations } from "@/ui/landing-page/types";
import LandingPageContent from "@/ui/landing-page/components/landing-page-content";

type LandingPageVariant = "orange" | "wave";

interface LandingPageViewProps {
  variant: LandingPageVariant;
  translations: LandingTranslations;
}

export function LandingPageView({ variant, translations }: LandingPageViewProps) {
  return <LandingPageContent variant={variant} translations={translations} />;
}
