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
    linkedin: "https://linkedin.com/in/paolofidanza",
    x: "https://x.com/KeoWorld",
    email: "paolof@keo.com",
  },
  {
    name: "Farid Shidfar",
    position: "Innovation",
    bio: "As a serial entrepreneur and a visionary leader, Farid has 30 years of experience launching innovative technologies. He spent over 15 years at Accenture helping companies achieve higher value.",
    image: "/images/people/farid-shidfar-black.webp",
    imageLight: "/images/people/farid-shidfar.webp",
    imageDark: "/images/people/farid-shidfar-black.webp",
    linkedin: "https://linkedin.com/in/faridshidfar",
    twitter: "https://twitter.com/faridshidfar",
    x: "https://x.com/KeoWorld",
    email: "farids@keo.com",
  },
  {
    name: "Hernan Magarinos",
    position: "Corporate Development",
    bio: "Hernan brings more than 20 years of financial advisory and transactional experience to KEO. Hernan has led the acquisition and disposition of dozens of companies and assets with an aggregate value of over $20 billion.",
    image: "/images/people/hernan-magarinos-black.webp",
    imageLight: "/images/people/hernan-magarinos.webp",
    imageDark: "/images/people/hernan-magarinos-black.webp",
    linkedin: "https://linkedin.com/in/hernanmagarinos",
    x: "https://x.com/KeoWorld",
    email: "hernanm@keo.com",
  },
  {
    name: "Andres Rosso",
    position: "Technology",
    bio: "AI-based models expert with a PhD in Computer Science and deep learning methods for NLP. Andres has led data science, development and technology teams for more than 10 years.",
    image: "/images/people/andres-rosso-black.webp",
    imageLight: "/images/people/andres-rosso.webp",
    imageDark: "/images/people/andres-rosso-black.webp",
    linkedin: "https://linkedin.com/in/andresrosso",
    x: "https://x.com/KeoWorld",
    email: "andresr@keo.com",
  },
  {
    name: "Gabriel Sinopoli",
    position: "Financial & HR",
    bio: "Gabriel spent 17 years at American Express acting as the CFO for Spain. He successfully directed responsible and sustainable growth at SafetyPay and 4Finance, delivering more than 11MM loans valued at 5B Euros.",
    image: "/images/people/gabriel-sinopoli-black.webp",
    imageLight: "/images/people/gabriel-sinopoli.webp",
    imageDark: "/images/people/gabriel-sinopoli-black.webp",
    linkedin: "https://linkedin.com/in/gabrielsinopoli",
    x: "https://x.com/KeoWorld",
    email: "gabriels@keo.com",
  },
  {
    name: "Juan Silva",
    position: "Legal",
    bio: "Alessandro is a senior financial executive based in Switzerland, advisor to many Financial bodies and Government institutions, and expert on international banking and Government relations. Alessandro is a founding member and sits on KEO's board.",
    image: "/images/people/andres-rosso-black.webp",
    imageLight: "/images/people/andres-rosso.webp",
    imageDark: "/images/people/andres-rosso-black.webp",
    linkedin: "https://linkedin.com/in/alessandrociacchini",
    x: "https://x.com/KeoWorld",
    email: "alessandroc@keo.com",
  },
];

const board = [
  {
    name: "Paolo Fidanza",
    bio: "A serial entrepreneur and aerospace engineer, with a passion for making the world a better place. Paolo has been leading and developing revolutionary technology companies for the past two decades.",
    image: "/images/people/paolo-fidanza.webp",
    imageLight: "/images/people/paolo-fidanza.webp",
    imageDark: "/images/people/paolo-fidanza-black.webp",
    linkedin: "https://linkedin.com/in/paolofidanza",
    x: "https://x.com/KeoWorld",
    email: "paolof@keo.com",
  },
  {
    name: "Farid Shidfar",
    bio: "As a serial entrepreneur and a visionary leader, Farid has 30 years of experience launching innovative technologies. He spent over 15 years at Accenture helping companies achieve higher value.",
    image: "/images/people/farid-shidfar.webp",
    imageLight: "/images/people/farid-shidfar.webp",
    imageDark: "/images/people/farid-shidfar-black.webp",
    linkedin: "https://linkedin.com/in/faridshidfar",
    twitter: "https://twitter.com/faridshidfar",
    x: "https://x.com/KeoWorld",
    email: "farids@keo.com",
  },
  {
    name: "Alessandro Ciacchini",
    bio: "Alessandro is a senior financial executive based in Switzerland, advisor to many Financial bodies and Government institutions, and expert on international banking and Government relations. Alessandro is a founding member and sits on KEO's board.",
    image: "/images/people/alessandro_ciacchin.webp",
    linkedin: "https://linkedin.com/in/alessandrociacchini",
    x: "https://x.com/KeoWorld",
    email: "alessandroc@keo.com",
  },
  {
    name: "Dan Turner",
    bio: "Gabriel spent 17 years at American Express acting as the CFO for Spain. He successfully directed responsible and sustainable growth at SafetyPay and 4Finance, delivering more than 11MM loans valued at 5B Euros.",
    image: "/images/people/dan-turner-black.webp",
    imageLight: "/images/people/dan-turner.webp",
    imageDark: "/images/people/dan-turner-black.webp",
    linkedin: "https://linkedin.com/in/gabrielsinopoli",
    x: "https://x.com/KeoWorld",
    email: "gabriels@keo.com",
  },
  {
    name: "Chris Preziosi",
    bio: "Hernan brings more than 20 years of financial advisory and transactional experience to KEO. Hernan has led the acquisition and disposition of dozens of companies and assets with an aggregate value of over $20 billion.",
    image: "/images/people/chris-preziosi-black.webp",
    imageLight: "/images/people/chris-preziosi.webp",
    imageDark: "/images/people/chris-preziosi-black.webp",
    linkedin: "https://linkedin.com/in/hernanmagarinos",
    x: "https://x.com/KeoWorld",
    email: "hernanm@keo.com",
  },

  {
    name: "Davide Tomassoni",
    bio: "AI-based models expert with a PhD in Computer Science and deep learning methods for NLP. Andres has led data science, development and technology teams for more than 10 years.",
    image: "/images/people/andres-rosso.webp",
    linkedin: "https://linkedin.com/in/andresrosso",
    x: "https://x.com/KeoWorld",
    email: "andresr@keo.com",
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
