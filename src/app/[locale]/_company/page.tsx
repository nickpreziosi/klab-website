import { getTranslations } from "next-intl/server";
import { buildCompanyHeroTranslations } from "@/ui/company/types";
import { CompanyView } from "@/ui/company/views/CompanyView/CompanyView";

export default async function CompanyPage() {
  const t = await getTranslations("companyHero");
  const companyHeroTranslations = buildCompanyHeroTranslations(t);
  return <CompanyView companyHeroTranslations={companyHeroTranslations} />;
}
