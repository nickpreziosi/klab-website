"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import styles from "./timeline-carousel.module.css";
import { Separator } from "radix-ui";
import SectionHeader from "@/app/components/ui/section-header/section-header";

interface TimelineEvent {
  quarter: string;
  year: string;
  milestones: string[];
}

const timelineData: TimelineEvent[] = [
  {
    quarter: "Q1",
    year: "2020",
    milestones: [
      "KEO World founded in Miami, Florida",
      "Secured seed funding of $2M",
      "Launched beta platform for inventory financing",
    ],
  },
  {
    quarter: "Q3",
    year: "2020",
    milestones: [
      "Onboarded first 50 suppliers",
      "Expanded to Canadian market",
      "Launched mobile app for iOS and Android",
    ],
  },
  {
    quarter: "Q1",
    year: "2021",
    milestones: [
      "Series A funding round: $15M raised",
      "Opened first LATAM office in Mexico City",
      "Reached $10M in processed transactions",
    ],
  },
  {
    quarter: "Q3",
    year: "2021",
    milestones: [
      "Launched B2B payment solutions",
      "Partnership with major logistics providers",
      "Team expanded to 50+ employees",
    ],
  },
  {
    quarter: "Q1",
    year: "2022",
    milestones: [
      "Expanded to Brazil and Argentina",
      "Introduced AI-powered credit scoring",
      "Processed over $100M in transactions",
    ],
  },
  {
    quarter: "Q4",
    year: "2022",
    milestones: [
      "Series B funding: $40M raised",
      "Launched enterprise tier for large suppliers",
      'Won "Best Fintech Innovation" award',
    ],
  },
  {
    quarter: "Q2",
    year: "2023",
    milestones: [
      "Opened offices in Colombia and Chile",
      "Integrated blockchain for transaction security",
      "Reached 1,000+ active suppliers",
    ],
  },
  {
    quarter: "Q4",
    year: "2023",
    milestones: [
      "Launched real-time payment processing",
      "Partnership with major banks in LATAM",
      "Team grew to 100+ employees across 5 countries",
    ],
  },
  {
    quarter: "Q2",
    year: "2024",
    milestones: [
      "Series C funding: $75M raised",
      "Introduced multi-currency support",
      "Processed over $1B in cumulative transactions",
    ],
  },
  {
    quarter: "Q4",
    year: "2024",
    milestones: [
      "Launched KEO Analytics dashboard",
      "Expanded to Central America",
      "Achieved profitability milestone",
    ],
  },
  {
    quarter: "Q2",
    year: "2025",
    milestones: [
      "Introduced embedded finance solutions",
      "Partnership with e-commerce platforms",
      "Launched API marketplace for developers",
    ],
  },
  {
    quarter: "Q4",
    year: "2025",
    milestones: [
      "Reached 5,000+ active suppliers",
      "Opened innovation lab in Miami",
      "Launched sustainability financing program",
    ],
  },
];

export default function TimelineCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: true,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.overlay} />

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <SectionHeader
              heading="Our Journey"
              align="left"
              animateOnce={true}
            />
            <div className={styles.controls}>
              <button
                className={styles.navButton}
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous slide"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <button
                className={styles.navButton}
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next slide"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {timelineData.map((event, index) => (
                <div
                  key={`${event.quarter}-${event.year}`}
                  className={styles.emblaSlide}
                >
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    {index < timelineData.length - 1 && (
                      <div className={styles.timelineLine} />
                    )}
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineDate}>
                        <span className={styles.quarter}>{event.quarter}</span>
                        <Separator.Root
                          className={styles.separatorRoot}
                          decorative
                          orientation="vertical"
                        />
                        <span className={styles.year}>{event.year}</span>
                      </div>
                      <ul className={styles.milestones}>
                        {event.milestones.map((milestone, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                          >
                            {milestone}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
