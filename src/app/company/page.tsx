"use client";
import { Accordion } from "radix-ui";
import styles from "./page.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { StaffCard } from "../components/staffCard/staff-card";

export default function Home() {
  const accordionContentRef = useRef<HTMLDivElement | null>(null);
  const [accordionIsOpen, setAccordionIsOpen] = useState(false);
  const handleAccordionTriggerClick = () => {
    setAccordionIsOpen(!accordionIsOpen);
  };

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
      position: "Chief Innovation Officer & Co-Founder",
      bio: "As a serial entrepreneur and a visionary leader, Farid has 30 years of experience launching innovative technologies. He spent over 15 years at Accenture helping companies achieve higher value.",
      image: "/farid_shidfar.jpeg",
      linkedin: "https://linkedin.com/in/faridshidfar",
      twitter: "https://twitter.com/faridshidfar",
      x: "https://x.com/KeoWorld",
      email: "farids@keo.com",
    },
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
    {
      name: "Hernan Magarinos",
      position: "Chief Corporate Development Officer",
      bio: "Hernan brings more than 20 years of financial advisory and transactional experience to KEO. Hernan has led the acquisition and disposition of dozens of companies and assets with an aggregate value of over $20 billion.",
      image: "/hernan_hagarinos.jpeg",
      linkedin: "https://linkedin.com/in/hernanmagarinos",
      x: "https://x.com/KeoWorld",
      email: "hernanm@keo.com",
    },
    {
      name: "Andres Rosso",
      position: "Chief Technology Officer",
      bio: "AI-based models expert with a PhD in Computer Science and deep learning methods for NLP. Andres has led data science, development and technology teams for more than 10 years.",
      image: "/andres_rosso.jpeg",
      linkedin: "https://linkedin.com/in/andresrosso",
      x: "https://x.com/KeoWorld",
      email: "andresr@keo.com",
    },
    {
      name: "Gabriel Sinopoli",
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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.staffSection}>
          <h1>Leadership Team</h1>
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
        </section>
      </main>
      {/*<div key={employee.email} className={styles.card}>
                <Image
                  src={employee.image}
                  alt="Winner Bold Award"
                  width={500}
                  height={500}
                  className={styles.cardImage}
                />
                <div className={styles.overlay}></div>
                <Accordion.Root
                  className={styles.accordionRoot}
                  type="single"
                  collapsible
                >
                  <Accordion.Item
                    className={styles.accordionItem}
                    value="item-1"
                  >
                    <Accordion.Trigger
                      onClick={handleAccordionTriggerClick}
                      className={styles.accordionTrigger}
                    >
                      <div className={styles.cardText}>
                        <h2 className={styles.cardTitle}>{employee.name}</h2>
                        <p className={styles.cardPosition}>
                          {employee.position}
                        </p>
                      </div>
                      <div className={styles.accordionTriggerBio}>
                        {!accordionIsOpen && index ? "Read Bio" : "Close Bio"}
                        <svg
                          className={styles.caretIcon}
                          width="30"
                          height="30"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 9H11L7.5 4.5L4 9Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </Accordion.Trigger>
                    <Accordion.Content
                      ref={accordionContentRef}
                      className={styles.accordionContent}
                    >
                      <p className={styles.accordionContentBio}>
                        {employee.bio}
                      </p>
                      <div className={styles.socialLinks}>
                        {socialLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label={link.name}
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </div>*/}
    </div>
  );
}
