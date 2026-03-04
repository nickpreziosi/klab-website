"use client";

import { Suspense } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import type { HeroTranslations } from "@/ui/home/types";
import { Hero } from "@/ui/home/components/hero/hero";
import VideoBackground from "@/ui/home/components/video-background/video-background";
import HomeSecondarySection from "@/ui/home/components/home-secondary-section/home-secondary-section";
import { LoadingProgressBar } from "@/ui/shared/components/loading-progress-bar/loading-progress-bar";
import { useHomeAnimation } from "@/ui/home/providers/home-animation-provider";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import { useEffectiveThemeSync } from "@/ui/shared/hooks/use-theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shared/components/card/card";
import styles from "./HomeView.module.css";

const FAQ_ITEMS = [
  {
    value: "what",
    question: "What does KLab do?",
    answer:
      "KLab develops technology that automates risk, payments, and financial operations in one intelligent platform.",
  },
  {
    value: "contact",
    question: "How can I get in touch?",
    answer:
      "Visit our Contact page to reach out for sales, support, or career opportunities.",
  },
  {
    value: "updates",
    question: "Where can I find product updates?",
    answer:
      "Stay up to date with the latest from KLab through our News section and newsletter.",
  },
  {
    value: "products",
    question: "What products does KLab offer?",
    answer:
      "KLab offers KCard for corporate card issuance and expense management, Kena for AI-powered risk intelligence, and KRails for payment infrastructure and B2B trade execution.",
  },
  {
    value: "integration",
    question: "How do I integrate KLab products?",
    answer:
      "Our solutions are designed for seamless integration with existing systems. Contact our sales team to discuss your requirements and deployment timeline.",
  },
  {
    value: "security",
    question: "How does KLab handle data security?",
    answer:
      "Security is at the core of our platform. We maintain robust infrastructure with authentication, verification, and immutable transaction records to protect your data.",
  },
  {
    value: "careers",
    question: "Is KLab hiring?",
    answer:
      "Yes. Check our Careers page or the Contact section for current openings. We're always looking for talented people to join our team.",
  },
] as const;

const VIDEO_DARK = "/videos/klab-home-loop.mp4";
const VIDEO_LIGHT = "/videos/klab-home-loop-light.mp4";

type HomeViewProps = {
  /** When provided (from server), hero copy is SSR'd */
  heroTranslations?: HeroTranslations;
};

export function HomeView({ heroTranslations }: HomeViewProps = {}) {
  const homeAnimation = useHomeAnimation();
  const skipFromLocaleSwitch = useSkipAnimationOnLocaleSwitch();
  const skipAnimation = skipFromLocaleSwitch || (homeAnimation?.hasAnimated ?? false);
  const effectiveTheme = useEffectiveThemeSync();
  const videoUrl = effectiveTheme === "dark" ? VIDEO_DARK : VIDEO_LIGHT;

  return (
    <>
      <Suspense fallback={null}>
        <LoadingProgressBar />
      </Suspense>
      <VideoBackground
        videoUrl={videoUrl}
        posterUrl="/images/klab-home-loop-poster.webp"
        skipAnimation={skipAnimation}
      />
      <div className={styles.page}>
        <main className={styles.main}>
          <Hero translations={heroTranslations} skipAnimation={skipAnimation} />
          <HomeSecondarySection skipAnimation={skipFromLocaleSwitch} />
          <section className={styles.faqSection}>
            <Card className={styles.faqCard}>
              <CardHeader>
                <CardTitle className={styles.faqTitle}>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className={styles.faqContent}>
                <Accordion.Root type="single" collapsible className={styles.faqAccordion}>
                  {FAQ_ITEMS.map((item) => (
                    <Accordion.Item key={item.value} value={item.value} className={styles.faqAccordionItem}>
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
          </section>
        </main>
      </div>
    </>
  );
}
