import {
  exampleApiSections,
  KeoRailsCode,
} from "../keoRailsCode/keo-rails-code";
import styles from "./keo-rails-code-section.module.css";

export default function KeoRailsCodeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          ENTERPRISE TRUST.<br></br>IMPOSSIBLE TO ALTER. PERIOD.
        </h2>
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <KeoRailsCode
              sections={exampleApiSections}
              typingSpeed={10}
              lineDelay={200}
              loop={true}
            />
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.cardsContainer}>
              <div className={styles.card}>
                <h4 className={styles.cardHeading}>Trust</h4>
                <p className={styles.cardText}>
                  KEO Rails payment infrastructure keeps a trusted record for
                  all real-time transactions in a secure, authenticated, and
                  verifiable manner, preventing any party from altering executed
                  transactions.
                </p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardHeading}>Certainty</h4>
                <p className={styles.cardText}>
                  It&apos;s not just security — it&apos;s immutable and absolute
                  certainty in execution for B2B trade. This is a payment record
                  that is unbreakable and unchangeable, directly powering your
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
