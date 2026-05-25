import { getTranslations } from "next-intl/server";
import { FoundationView } from "@/ui/foundation/views/FoundationView/FoundationView";

export default async function FoundationPage() {
  const t = await getTranslations("foundation");
  const foundationTranslations = {
    titleBrand: t("titleBrand"),
    titleMain: t("titleMain"),
    subheading: t("subheading"),
    paragraph: t("paragraph"),
    section1: t("section1"),
    section2: t("section2"),
    section3: t("section3"),
  };
  return <FoundationView foundationTranslations={foundationTranslations} />;
}
