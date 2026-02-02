import SectionHeader from "@/app/components/ui/section-header/section-header";
import styles from "./company-hero.module.css";
import Image from "next/image";
import { KlabLogo } from "@/app/components/ui/klab-logo/klab-logo";

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
          src="/landing-bg-orange-2.png"
          style={{ objectPosition: "center right" }}
        ></Image>
        <div className={styles.heroText}>
          <div className={styles.heroHeaderContainer}>
            <h1 className={styles.heroHeader}>
              Where Capital Meets Code.
            </h1>
            <KlabLogo color="orange" format="default" height={120} />
          </div>
          
          
          <div className={styles.heroTaglinesContainer}>
            <p>Programmable Trust for Global Trade.​</p>
            <p>Finance, Rewritten.​</p>
            <p>Smart Contracts. Real Impact.​</p>
          </div>
        </div>
        
      </div>
    </section>
  );
};
