"use client";
import { Accordion } from "radix-ui";
import styles from "./page.module.css";
import Image from "next/image";
import { useRef, useState } from "react";

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
      twitter: "https://twitter.com/paolofidanza",
      email: "paolof@keo.com",
    },
    {
      name: "Farid Shidfar",
      position: "Chief Innovation Officer & Co-Founder",
      bio: "As a serial entrepreneur and a visionary leader, Farid has 30 years of experience launching innovative technologies. He spent over 15 years at Accenture helping companies achieve higher value.",
      image: "/farid_shidfar.jpeg",
      linkedin: "https://linkedin.com/in/faridshidfar",
      twitter: "https://twitter.com/faridshidfar",
      email: "farids@keo.com",
    },
    {
      name: "Giovanni Calvi",
      position: "Chief Credit Officer",
      bio: "Giovanni is an international expert in the field of B2B and SME financing. He has founded and led financial and commercial companies focused on projects across LATAM. Giovanni is one of the founders of KEO and member of the Board.",
      image: "/giovanni_calvi.jpeg",
      linkedin: "https://linkedin.com/in/giovannicalvi",
      email: "giovannic@keo.com",
    },
    {
      name: "Pablo Ribas",
      position: "Chief Commercial Officer",
      bio: "Pablo spent over 20 years at American Express, where he worked in international markets leading fintech response and AP automation strategy. He brings extensive industry experience leading cross-functional teams with full profit and loss management and accountability.",
      image: "/pablo_ribas.jpeg",
      linkedin: "https://linkedin.com/in/pabloribas",
      email: "pablor@keo.com",
    },
    {
      name: "Hernan Magarinos",
      position: "Chief Corporate Development Officer",
      bio: "Hernan brings more than 20 years of financial advisory and transactional experience to KEO. Hernan has led the acquisition and disposition of dozens of companies and assets with an aggregate value of over $20 billion.",
      image: "/hernan_hagarinos.jpeg",
      linkedin: "https://linkedin.com/in/hernanmagarinos",
      email: "hernanm@keo.com",
    },
    {
      name: "Andres Rosso",
      position: "Chief Technology Officer",
      bio: "AI-based models expert with a PhD in Computer Science and deep learning methods for NLP. Andres has led data science, development and technology teams for more than 10 years.",
      image: "/andres_rosso.jpeg",
      linkedin: "https://linkedin.com/in/andresrosso",
      twitter: "https://twitter.com/andresrosso",
      email: "andresr@keo.com",
    },
    {
      name: "Gabriel Sinopoli",
      position: "Chief Financial Officer",
      bio: "Gabriel spent 17 years at American Express acting as the CFO for Spain. He successfully directed responsible and sustainable growth at SafetyPay and 4Finance, delivering more than 11MM loans valued at 5B Euros.",
      image: "/gabriel_sinopoli.jpeg",
      linkedin: "https://linkedin.com/in/gabrielsinopoli",
      email: "gabriels@keo.com",
    },
    {
      name: "Alessandro Ciacchini",
      position: "Investor Relations",
      bio: "Alessandro is a senior financial executive based in Switzerland, advisor to many Financial bodies and Government institutions, and expert on international banking and Government relations. Alessandro is a founding member and sits on KEO's board.",
      image: "/alessandro_ciacchin.jpeg",
      linkedin: "https://linkedin.com/in/alessandrociacchini",
      email: "alessandroc@keo.com",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/keo",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/keo",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/keo",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:hello@keo.com",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.staffSection}>
          <h1>Leadership Team</h1>
          <div className={styles.cardGrid}>
            {employees.map((employee, index) => (
              <div key={employee.email} className={styles.card}>
                <Image
                  src={employee.image}
                  alt="Winner Bold Award"
                  width={500}
                  height={500}
                  className={styles.cardImage}
                />
                <div className={styles.overlay}></div>
                <div className={styles.cardText}>
                  <h2>{employee.name}</h2>
                  <p>{employee.position}</p>
                </div>

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
                      {!accordionIsOpen && index ? "Read Bio ^" : "Close Bio"}
                    </Accordion.Trigger>
                    <Accordion.Content
                      ref={accordionContentRef}
                      className={styles.accordionContent}
                    >
                      <div>
                        <h2 className={styles.accordionContentHeader}>
                          {employee.name}
                        </h2>
                        <p className={styles.accordionContentTitle}>
                          {employee.position}
                        </p>
                      </div>

                      <p className={styles.accordionContentBio}>
                        {employee.bio}
                      </p>

                      {/* Social Links */}
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
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
