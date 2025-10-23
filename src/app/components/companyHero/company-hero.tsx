import styles from "./company-hero.module.css";
import Image from "next/image";

export const CompanyHero = () => {
  return (
    <section className={styles.content}>
      <div className={styles.hero}>
        <Image
          priority
          className={styles.heroImage}
          width={1200}
          height={1405}
          alt="KEO Employee Image"
          src="/keo-company-hero.jpeg"
        ></Image>
        <div className={styles.overlay}></div>
        <div className={styles.heroText}>
          <h1 className={styles.heroTextHeader}>
            We are <span>KEO</span>.
          </h1>
          <p className={styles.heroTextParagraph}>
            Founded in 2020, KEO helps buyers and suppliers accelerate business
            growth through all-digital inventory financing and B2B payment
            solutions. Headquartered in Miami, Florida, KEO operates in the
            U.S., Canada and across LATAM.
          </p>
        </div>
      </div>
    </section>
  );
};
