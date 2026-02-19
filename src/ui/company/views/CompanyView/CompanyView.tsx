import type { CompanyHeroTranslations } from "@/ui/company/types";
import { CompanyHero } from "@/ui/company/components/company-hero/company-hero";
import styles from "./CompanyView.module.css";
import JourneyTimeline from "@/ui/company/components/journey-timeline/journey-timeline";
import CompanyCulture from "@/ui/company/components/company-culture/company-culture";
import KlabFoundationSection from "@/ui/company/components/klab-foundation-section/klab-foundation-section";
import CompanyManifesto from "@/ui/company/components/company-manifesto/company-manifesto";
import CompanyStaffSection from "@/ui/company/components/company-staff-section/company-staff-section";

const employees = [
  {
    name: "Paolo Fidanza",
    position: "CEO & Founder",
    bio: "A serial entrepreneur and aerospace engineer, with a passion for making the world a better place. Paolo has been leading and developing revolutionary technology companies for the past two decades.",
    image: "/images/people/paolo-fidanza-black.webp",
    imageLight: "/images/people/paolo-fidanza.webp",
    imageDark: "/images/people/paolo-fidanza-black.webp",
    email: "paolo@k-lab.ai",
  },
  {
    name: "Farid Shidfar",
    position: "Innovation",
    bio: "As a serial entrepreneur and a visionary leader, Farid has 30 years of experience launching innovative technologies. He spent over 15 years at Accenture helping companies achieve higher value.",
    image: "/images/people/farid-shidfar-black.webp",
    imageLight: "/images/people/farid-shidfar.webp",
    imageDark: "/images/people/farid-shidfar-black.webp",
    email: "farid@k-lab.ai",
  },
  {
    name: "Hernan Magarinos",
    position: "Corporate Development",
    bio: "Hernan brings more than 20 years of financial advisory and transactional experience to KEO. Hernan has led the acquisition and disposition of dozens of companies and assets with an aggregate value of over $20 billion.",
    image: "/images/people/hernan-magarinos-black.webp",
    imageLight: "/images/people/hernan-magarinos.webp",
    imageDark: "/images/people/hernan-magarinos-black.webp",
    email: "hernan@k-lab.ai",
  },
  {
    name: "Andres Rosso",
    position: "Technology",
    bio: "AI-based models expert with a PhD in Computer Science and deep learning methods for NLP. Andres has led data science, development and technology teams for more than 10 years.",
    image: "/images/people/andres-rosso-black.webp",
    imageLight: "/images/people/andres-rosso.webp",
    imageDark: "/images/people/andres-rosso-black.webp",
    email: "andres@k-lab.ai",
  },
  {
    name: "Gabriel Sinopoli",
    position: "Financial & HR",
    bio: "Gabriel spent 17 years at American Express acting as the CFO for Spain. He successfully directed responsible and sustainable growth at SafetyPay and 4Finance, delivering more than 11MM loans valued at 5B Euros.",
    image: "/images/people/gabriel-sinopoli-black.webp",
    imageLight: "/images/people/gabriel-sinopoli.webp",
    imageDark: "/images/people/gabriel-sinopoli-black.webp",
    email: "gabriel@k-lab.ai",
  },
  {
    name: "Juan Silva",
    position: "Legal",
    bio: "Alessandro is a senior financial executive based in Switzerland, advisor to many Financial bodies and Government institutions, and expert on international banking and Government relations. Alessandro is a founding member and sits on KEO's board.",
    image: "/images/people/juan-silva.webp",
    imageLight: "/images/people/juan-silva.webp",
    imageDark: "/images/people/juan-silva-black.webp",
    email: "juan@k-lab.ai",
  },
  {
    name: "Tomas Guzman",
    position: "Government & Institutional Relations",
    bio: "Alessandro is a senior financial executive based in Switzerland, advisor to many Financial bodies and Government institutions, and expert on international banking and Government relations. Alessandro is a founding member and sits on KEO's board.",
    image: "/images/people/tomas-guzman.webp",
    imageLight: "/images/people/tomas-guzman.webp",
    imageDark: "/images/people/tomas-guzman-black.webp",
    email: "tomas@k-lab.ai",
  },
];

const board = [
  {
    name: "Paolo Fidanza",
    bio: "A serial entrepreneur and aerospace engineer, with a passion for making the world a better place. Paolo has been leading and developing revolutionary technology companies for the past two decades.",
    image: "/images/people/paolo-fidanza.webp",
    imageLight: "/images/people/paolo-fidanza.webp",
    imageDark: "/images/people/paolo-fidanza-black.webp",
    email: "paolo@k-lab.ai",
  },
  {
    name: "Farid Shidfar",
    bio: "As a serial entrepreneur and a visionary leader, Farid has 30 years of experience launching innovative technologies. He spent over 15 years at Accenture helping companies achieve higher value.",
    image: "/images/people/farid-shidfar.webp",
    imageLight: "/images/people/farid-shidfar.webp",
    imageDark: "/images/people/farid-shidfar-black.webp",
    email: "farid@k-lab.ai",
  },
  {
    name: "Alessandro Ciacchini",
    bio: "Alessandro is a senior financial executive based in Switzerland, advisor to many Financial bodies and Government institutions, and expert on international banking and Government relations. Alessandro is a founding member and sits on KEO's board.",
    image: "/images/people/alessandro-ciacchini.webp",
    imageLight: "/images/people/alessandro-ciacchini.webp",
    imageDark: "/images/people/alessandro-ciacchini-black.webp",
    email: "alessandro@k-lab.ai",
  },
  {
    name: "Dan Turner",
    bio: "DAN is an entrepreneur and venture capitalist / private equity investor for over 30 years, building leading companies across multiple industries, including fintech and AI.",
    image: "/images/people/dan-turner-black.webp",
    imageLight: "/images/people/dan-turner.webp",
    imageDark: "/images/people/dan-turner-black.webp",
    email: "dan@k-lab.ai",
  },
  {
    name: "Chris Preziosi",
    bio: "Hernan brings more than 20 years of financial advisory and transactional experience to KEO. Hernan has led the acquisition and disposition of dozens of companies and assets with an aggregate value of over $20 billion.",
    image: "/images/people/chris-preziosi-black.webp",
    imageLight: "/images/people/chris-preziosi.webp",
    imageDark: "/images/people/chris-preziosi-black.webp",
    email: "chris@k-lab.ai",
  },

  {
    name: "Davide Tomassoni",
    bio: "Board Member and Lead Director of Global Affairs at KLabs Inc., Davide brings his deep entrepreneurial experience in international relations, strategic partnerships, and cross-border initiatives. He advises on geopolitical strategy, stakeholder engagement, and global market expansion, aligning policy insight with commercial execution across technology, finance, and innovation-driven enterprises.",
    image: "/images/people/davide-tomassoni.webp",
    imageLight: "/images/people/davide-tomassoni.webp",
    imageDark: "/images/people/davide-tomassoni-black.webp",
    email: "davide@k-lab.ai",
  },
];

type CompanyViewProps = {
  /** When provided (from server), company hero copy is SSR'd */
  companyHeroTranslations?: CompanyHeroTranslations;
};

export function CompanyView({ companyHeroTranslations }: CompanyViewProps = {}) {
  return (
    <div className={styles.page}>
      <CompanyHero translations={companyHeroTranslations} />
      <main className={styles.main}>
        <JourneyTimeline />
        <CompanyManifesto />
        <KlabFoundationSection />
        <CompanyCulture />
        <div className={styles.staffContainer}>
          <section className={styles.staffSection}>
            <CompanyStaffSection employees={employees} board={board} />
          </section>
        </div>
      </main>
    </div>
  );
}
