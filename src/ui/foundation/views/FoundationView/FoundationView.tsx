"use client";

import styles from "./FoundationView.module.css";

const LEFT_ARROW_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const RIGHT_SECTIONS = [
  {
    text: "Our commitment to KLab is dedicated to continuously deploying its innovative tech ecosystem and crafting advanced AI models. A core part of our mission is to pledge 10% of all profits directly to K Foundation.",
  },
  {
    text: "Empowering the next generation through the K Foundation, we strive to create opportunities for children and teenagers worldwide. Our goal is to foster their passions and talents, especially in communities where resources and means are scarce.",
  },
  {
    text: "Driven by creativity & purpose, we are a team of creatives, deeply passionate about innovation and achieving success with a profound purpose. Uniquely, KLab employees contribute their expertise to both KLab's business ventures and the impactful initiatives of K Foundation.",
  },
];

export function FoundationView() {
  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.leftColumn}>
              <h1 className={styles.title}>
                <span className={styles.titleBrand}>KFoundation</span>
                <br />
                <span className={styles.titleMain}>Giving</span>
              </h1>
              <h2 className={styles.subheading}>Innovation with Purpose</h2>
              <p className={styles.paragraph}>
                At KLab, we believe innovation is transformation, but true transformation extends
                beyond technology; it must include social impact. Our success is designed to be
                cyclical, flowing back into communities.
              </p>
            </div>
            <div className={styles.rightColumn}>
              {RIGHT_SECTIONS.map(({ text }, index) => (
                <div key={index} className={styles.rightBlock}>
                  <div className={styles.paragraphRow}>
                    <p className={styles.rightParagraph}>{text}</p>
                  </div>
                  {index < RIGHT_SECTIONS.length - 1 && <hr className={styles.divider} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
