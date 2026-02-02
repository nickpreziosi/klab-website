import styles from "./page.module.css";
import { StaffCard } from "@/app/components/company/staff-card/staff-card";
import { CompanyHero } from "@/app/components/company/company-hero/company-hero";
import TimelineCarousel from "@/app/components/company/timeline-carousel/timeline-carousel";
import CompanyStats from "@/app/components/company/company-stats/company-stats";
import CompanyCulture from "@/app/components/company/company-culture/company-culture";
import SectionHeader from "@/app/components/ui/section-header/section-header";
import CompanyVideoSection from "@/app/components/company/company-video-section/company-video-section";
import KlabFoundationSection from "@/app/components/company/klab-foundation-section/klab-foundation-section";
import CompanyManifesto from "@/app/components/company/company-manifesto/company-manifesto";

export default function Home() {
  const employees = [
    {
      name: "Paolo Fidanza",
      position: "CEO & Founder",
      bio: "A serial entrepreneur and aerospace engineer, with a passion for making the world a better place. Paolo has been leading and developing revolutionary technology companies for the past two decades.",
      image: "/paolo_fidanza.jpeg",
      linkedin: "https://linkedin.com/in/paolofidanza",
      x: "https://x.com/KeoWorld",
      email: "paolof@keo.com",
    },
    {
      name: "Farid Shidfar",
      position: "Innovation",
      bio: "As a serial entrepreneur and a visionary leader, Farid has 30 years of experience launching innovative technologies. He spent over 15 years at Accenture helping companies achieve higher value.",
      image: "/farid_shidfar.jpeg",
      linkedin: "https://linkedin.com/in/faridshidfar",
      twitter: "https://twitter.com/faridshidfar",
      x: "https://x.com/KeoWorld",
      email: "farids@keo.com",
    },
    {
      name: "Hernan Magarinos",
      position: "Corporate Development",
      bio: "Hernan brings more than 20 years of financial advisory and transactional experience to KEO. Hernan has led the acquisition and disposition of dozens of companies and assets with an aggregate value of over $20 billion.",
      image: "/hernan_hagarinos.jpeg",
      linkedin: "https://linkedin.com/in/hernanmagarinos",
      x: "https://x.com/KeoWorld",
      email: "hernanm@keo.com",
    },
    {
      name: "Andres Rosso",
      position: "Technology",
      bio: "AI-based models expert with a PhD in Computer Science and deep learning methods for NLP. Andres has led data science, development and technology teams for more than 10 years.",
      image: "/andres_rosso.jpeg",
      linkedin: "https://linkedin.com/in/andresrosso",
      x: "https://x.com/KeoWorld",
      email: "andresr@keo.com",
    },
    {
      name: "Gabriel Sinopoli",
      position: "Financial & HR",
      bio: "Gabriel spent 17 years at American Express acting as the CFO for Spain. He successfully directed responsible and sustainable growth at SafetyPay and 4Finance, delivering more than 11MM loans valued at 5B Euros.",
      image: "/gabriel_sinopoli.jpeg",
      linkedin: "https://linkedin.com/in/gabrielsinopoli",
      x: "https://x.com/KeoWorld",
      email: "gabriels@keo.com",
    },
    {
      name: "Juan Silva",
      position: "Legal",
      bio: "Alessandro is a senior financial executive based in Switzerland, advisor to many Financial bodies and Government institutions, and expert on international banking and Government relations. Alessandro is a founding member and sits on KEO's board.",
      image: "/alessandro_ciacchin.jpeg",
      linkedin: "https://linkedin.com/in/alessandrociacchini",
      x: "https://x.com/KeoWorld",
      email: "alessandroc@keo.com",
    },
  ];

  const board = [
    {
      name: "Paolo Fidanza",
      position: "CEO & Founder",
      bio: "A serial entrepreneur and aerospace engineer, with a passion for making the world a better place. Paolo has been leading and developing revolutionary technology companies for the past two decades.",
      image: "/paolo_fidanza.jpeg",
      linkedin: "https://linkedin.com/in/paolofidanza",
      x: "https://x.com/KeoWorld",
      email: "paolof@keo.com",
    },
    {
      name: "Farid Shidfar",
      position: "Chief Innovation Officer & Co-Founder",
      bio: "As a serial entrepreneur and a visionary leader, Farid has 30 years of experience launching innovative technologies. He spent over 15 years at Accenture helping companies achieve higher value.",
      image: "/farid_shidfar.jpeg",
      linkedin: "https://linkedin.com/in/faridshidfar",
      twitter: "https://twitter.com/faridshidfar",
      x: "https://x.com/KeoWorld",
      email: "farids@keo.com",
    },
    {
      name: "Chris Preziosi",
      position: "Chief Corporate Development Officer",
      bio: "Hernan brings more than 20 years of financial advisory and transactional experience to KEO. Hernan has led the acquisition and disposition of dozens of companies and assets with an aggregate value of over $20 billion.",
      image: "/hernan_hagarinos.jpeg",
      linkedin: "https://linkedin.com/in/hernanmagarinos",
      x: "https://x.com/KeoWorld",
      email: "hernanm@keo.com",
    },
    {
      name: "Davide Tomassoni",
      position: "Chief Technology Officer",
      bio: "AI-based models expert with a PhD in Computer Science and deep learning methods for NLP. Andres has led data science, development and technology teams for more than 10 years.",
      image: "/andres_rosso.jpeg",
      linkedin: "https://linkedin.com/in/andresrosso",
      x: "https://x.com/KeoWorld",
      email: "andresr@keo.com",
    },
    {
      name: "Dan Turner",
      position: "Chief Financial Officer",
      bio: "Gabriel spent 17 years at American Express acting as the CFO for Spain. He successfully directed responsible and sustainable growth at SafetyPay and 4Finance, delivering more than 11MM loans valued at 5B Euros.",
      image: "/gabriel_sinopoli.jpeg",
      linkedin: "https://linkedin.com/in/gabrielsinopoli",
      x: "https://x.com/KeoWorld",
      email: "gabriels@keo.com",
    },
    {
      name: "Alessandro Ciacchini",
      position: "Investor Relations",
      bio: "Alessandro is a senior financial executive based in Switzerland, advisor to many Financial bodies and Government institutions, and expert on international banking and Government relations. Alessandro is a founding member and sits on KEO's board.",
      image: "/alessandro_ciacchin.jpeg",
      linkedin: "https://linkedin.com/in/alessandrociacchini",
      x: "https://x.com/KeoWorld",
      email: "alessandroc@keo.com",
    },
  ];

  const otherEmployees = [
    {
      name: "Giovanni Calvi",
      position: "Chief Credit Officer",
      bio: "Giovanni is an international expert in the field of B2B and SME financing. He has founded and led financial and commercial companies focused on projects across LATAM. Giovanni is one of the founders of KEO and member of the Board.",
      image: "/giovanni_calvi.jpeg",
      linkedin: "https://linkedin.com/in/giovannicalvi",
      x: "https://x.com/KeoWorld",
      email: "giovannic@keo.com",
    },
    {
      name: "Pablo Ribas",
      position: "Chief Commercial Officer",
      bio: "Pablo spent over 20 years at American Express, where he worked in international markets leading fintech response and AP automation strategy. He brings extensive industry experience leading cross-functional teams with full profit and loss management and accountability.",
      image: "/pablo_ribas.jpeg",
      linkedin: "https://linkedin.com/in/pabloribas",
      x: "https://x.com/KeoWorld",
      email: "pablor@keo.com",
    },
  ];

  return (
    <div className={styles.page}>
      <CompanyHero></CompanyHero>
      <main className={styles.main}>
        <TimelineCarousel></TimelineCarousel>
        <CompanyManifesto></CompanyManifesto>
        <KlabFoundationSection />
        <CompanyCulture></CompanyCulture>
        <CompanyStats></CompanyStats>
        <div className={styles.staffContainer}>
          <section className={styles.staffSection}>
            <SectionHeader
              heading="Leadership Team"
              align="left"
              animateOnce={true}
            />
            <div className={styles.cardGrid}>
              {employees.map((employee) => (
                <StaffCard
                  key={employee.email}
                  name={employee.name}
                  position={employee.position}
                  bio={employee.bio}
                  image={employee.image}
                  linkedin={employee.linkedin}
                  email={employee.email}
                  x={employee.x}
                ></StaffCard>
              ))}
            </div>
            <div style={{ marginTop: "var(--padding-desktop)" }}></div>
            
          </section>
          </div>
          <div className={styles.staffContainer}>
          <section className={styles.staffSection}>
          <SectionHeader
              heading="Board Members"
              align="left"
              animateOnce={true}
            />
            <div className={styles.cardGrid}>
              {board.map((employee) => (
                <StaffCard
                  key={employee.email}
                  name={employee.name}
                  position={employee.position}
                  bio={employee.bio}
                  image={employee.image}
                  linkedin={employee.linkedin}
                  email={employee.email}
                  x={employee.x}
                ></StaffCard>
              ))}
            </div>
            </section>
            
        </div>
      </main>
    </div>
  );
}
