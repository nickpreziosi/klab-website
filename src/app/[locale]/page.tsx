import { getTranslations } from "next-intl/server";
import { buildLandingTranslations } from "@/ui/landing-page/types";
import { LandingPageView } from "@/ui/landing-page/views/LandingPageView/LandingPageView";

export default async function Home() {
  const t = await getTranslations("landing");
  const translations = buildLandingTranslations(t);
  return <LandingPageView variant="orange" translations={translations} />;
}
