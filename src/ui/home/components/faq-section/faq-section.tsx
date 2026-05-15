"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shared/components/card/card";
import styles from "./faq-section.module.css";

const FAQ_ITEMS = [
  {
    value: "what",
    question: "What does K Lab do?",
    answer:
      "K Lab develops technology that automates risk, payments, and financial operations in one intelligent platform.",
  },
  {
    value: "contact",
    question: "How can I get in touch?",
    answer: "Visit our Contact page to reach out for sales, support, or career opportunities.",
  },
  {
    value: "updates",
    question: "Where can I find product updates?",
    answer: "Stay up to date with the latest from K Lab through our News section and newsletter.",
  },
  {
    value: "products",
    question: "What products does K Lab offer?",
    answer:
      "K Lab offers KCard for corporate card issuance and expense management, Kena for AI-powered risk intelligence, and KRails for payment infrastructure and B2B trade execution.",
  },
  {
    value: "integration",
    question: "How do I integrate K Lab products?",
    answer:
      "Our solutions are designed for seamless integration with existing systems. Contact our sales team to discuss your requirements and deployment timeline.",
  },
  {
    value: "security",
    question: "How does K Lab handle data security?",
    answer:
      "Security is at the core of our platform. We maintain robust infrastructure with authentication, verification, and immutable transaction records to protect your data.",
  },
  {
    value: "careers",
    question: "Is K Lab hiring?",
    answer:
      "Yes. Check our Careers page or the Contact section for current openings. We're always looking for talented people to join our team.",
  },
] as const;

export default function FaqSection() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.faqLayout}>
        <div className={styles.faqCardColumn}>
          <Card className={styles.faqCard}>
            <CardHeader>
              <CardTitle className={styles.faqTitle}>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className={styles.faqContent}>
              <Accordion.Root type="single" collapsible className={styles.faqAccordion}>
                {FAQ_ITEMS.map((item) => (
                  <Accordion.Item
                    key={item.value}
                    value={item.value}
                    className={styles.faqAccordionItem}
                  >
                    <Accordion.Header className={styles.faqAccordionHeader}>
                      <Accordion.Trigger className={styles.faqAccordionTrigger}>
                        <span className={styles.faqQuestion}>{item.question}</span>
                        <svg
                          className={styles.faqCaret}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className={styles.faqAccordionContent}>
                      <p className={styles.faqAnswer}>{item.answer}</p>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
