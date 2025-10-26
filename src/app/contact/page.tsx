"use client";

import { motion } from "framer-motion";
import { ContactLink } from "../components/contactLink/contact-link";
import styles from "./page.module.css";
import SectionHeader from "../components/sectionHeader/section-header";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <SectionHeader
            heading="How can we help?"
            subtitle="Get in touch with our sales and support teams for demos,
              onboarding support, or product questions."
            align="center"
            animateOnce={true}
          />

          <div className={styles.cardsGrid}>
            <ContactLink
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
              title="Sales"
              description="Speak to our sales team about plans, pricing, enterprise contracts, or request a demo."
              href="/contact/sales"
              buttonText="Talk to sales"
            />
            <ContactLink
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
              title="Help & support"
              description="Ask product questions, report problems, or leave feedback."
              href="/contact/support"
              buttonText="Contact support"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
