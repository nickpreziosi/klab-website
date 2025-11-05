import SectionHeader from "@/app/components/ui/section-header/section-header";
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
          src="/keo-hero1.png"
        ></Image>
        <div className={styles.heroText}>
          <h1 className={styles.heroHeader}>
            We are <span className={styles.heroHeaderHighlight}>KEO</span>.
          </h1>
          <div style={{ display: "none" }}>
            <SectionHeader
              highlight={["KEO"]}
              white={true}
              size="8xl"
              heading="We are KEO."
              align="left"
              subtitle="Founded in 2020, KEO World helps buyers and suppliers accelerate business
            growth through all-digital inventory financing and B2B payment
            solutions. Headquartered in Miami, Florida, KEO World operates in the
            U.S., Canada and across LATAM."
              animateOnce={true}
            />
            <p style={{ display: "none" }} className={styles.heroTextParagraph}>
              Founded in 2020, KEO helps buyers and suppliers accelerate
              business growth through all-digital inventory financing and B2B
              payment solutions. Headquartered in Miami, Florida, KEO operates
              in the U.S., Canada and across LATAM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
