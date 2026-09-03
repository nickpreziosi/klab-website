import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  buildCompanyHeroTranslations,
  buildCompanyWhatWeBuiltTranslations,
  buildJourneyTimelineTranslations,
} from "@/ui/company/types";
import { CompanyView } from "@/ui/company/views/CompanyView/CompanyView";
import { EMPLOYEES_STATIC, BOARD_STATIC } from "@/ui/company/views/CompanyView/company-staff-data";
import type { StaffMember } from "@/ui/company/components/company-staff-section/company-staff-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CompanyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [tHero, tWhatWeBuilt, tJourney, tStaff] = await Promise.all([
    getTranslations("companyHero"),
    getTranslations("companyWhatWeBuilt"),
    getTranslations("journeyTimeline"),
    getTranslations("companyStaff"),
  ]);
  const companyHeroTranslations = buildCompanyHeroTranslations(tHero);
  const companyWhatWeBuiltTranslations = buildCompanyWhatWeBuiltTranslations(tWhatWeBuilt);
  const journeyTimelineTranslations = buildJourneyTimelineTranslations(tJourney);

  const employees: StaffMember[] = EMPLOYEES_STATIC.map((e) => ({
    name: e.name,
    position: tStaff(`employees.${e.key}.position`),
    bio: tStaff(`employees.${e.key}.bio`),
    image: e.image,
    imageLight: e.imageLight,
    imageDark: e.imageDark,
    email: e.email,
  }));

  const board: StaffMember[] = BOARD_STATIC.map((b) => ({
    name: b.name,
    bio: tStaff(`board.${b.key}.bio`),
    image: b.image,
    imageLight: b.imageLight,
    imageDark: b.imageDark,
    email: b.email,
  }));

  return (
    <CompanyView
      companyHeroTranslations={companyHeroTranslations}
      companyWhatWeBuiltTranslations={companyWhatWeBuiltTranslations}
      journeyTimelineTranslations={journeyTimelineTranslations}
      employees={employees}
      board={board}
    />
  );
}
