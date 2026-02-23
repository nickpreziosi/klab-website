"use client";

import { KenaAvatar } from "@/ui/kena/components/kena-avatar/kena-avatar";
import SectionHeader from "@/ui/shared/components/section-header/section-header";
import styles from "./kena-3d-section.module.css";
import type { KenaTranslations } from "@/ui/kena/views/KenaView/KenaView";
import Image from "next/image";
const steps = (t: KenaTranslations): { heading: string; text: string }[] => [
  { heading: t.step0Heading, text: t.step0Text },
  { heading: t.step1Heading, text: t.step1Text },
  { heading: t.step2Heading, text: t.step2Text },
  { heading: t.step3Heading, text: t.step3Text },
  { heading: t.step4Heading, text: t.step4Text },
];

export default function Kena3dSection({
  translations,
  skipAnimation = false,
}: {
  translations: KenaTranslations;
  skipAnimation?: boolean;
}) {
  const stepList = steps(translations);
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.headerWrapper}>
          <SectionHeader
            maxWidth={560}
            heading={translations.section3dHeading}
            align="center"
            animateOnce={true}
            skipAnimation={skipAnimation}
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            {stepList.map((step, i) => (
              <div key={i} className={styles.leftColumnItem}>
                <h3 className={styles.leftColumnItemHeading}>{step.heading}</h3>
                <p className={styles.leftColumnItemText}>{step.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.rightColumn}>
            <Image
              className={styles.kenaImage}
              src="/images/kena.webp"
              alt="Kena 3D Section"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
