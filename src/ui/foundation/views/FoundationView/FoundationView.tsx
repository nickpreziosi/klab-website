"use client";

import styles from "./FoundationView.module.css";

export type FoundationTranslations = {
  titleBrand: string;
  titleMain: string;
  subheading: string;
  paragraph: string;
  section2: string;
  section3: string;
};

type FoundationViewProps = {
  foundationTranslations?: FoundationTranslations;
};

export function FoundationView({ foundationTranslations }: FoundationViewProps = {}) {
  if (!foundationTranslations) {
    return null;
  }
  const t = foundationTranslations;
  const rightSections = [t.section2, t.section3];
  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.leftColumn}>
              <h1 className={styles.title}>
                <span className={styles.titleBrand}>{t.titleBrand}</span>
                <br />
                <span className={styles.titleMain}>{t.titleMain}</span>
              </h1>
              <h2 className={styles.subheading}>{t.subheading}</h2>
              <p className={styles.paragraph}>{t.paragraph}</p>
            </div>
            <div className={styles.rightColumn}>
              {rightSections.map((text, index) => (
                <div key={index} className={styles.rightBlock}>
                  <div className={styles.paragraphRow}>
                    <p className={styles.rightParagraph}>{text}</p>
                  </div>
                  {index < rightSections.length - 1 && <hr className={styles.divider} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
