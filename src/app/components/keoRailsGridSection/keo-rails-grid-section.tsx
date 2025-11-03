import KeoRailsPhoneSlideshow from "../keoRailsPhoneSlideshow/keo-rails-phone-slideshow";
import Button from "../ui/button/button";
import styles from "./keo-rails-grid-section.module.css";

export default function KeoRailsGridSection() {
  return (
    <section className={styles.section}>
      {/* Top heading */}
      <div className={styles.topHeading}>
        <h2 className={styles.mainHeading}>WHY KEO RAILS?</h2>
        <p className={styles.subheading}>
          The old system makes you wait. Keo Rails makes you move.
        </p>
      </div>
      <div className={styles.grid}>
        {/* Left Column - Scrolling Content */}
        <div className={styles.scrollContent}>
          <div className={styles.leftColumn}>
            <div className={styles.textBlock}>
              <h3 className={styles.heading}>
                CAPITAL UNLOCKED. REVENUE ACCELERATED.
              </h3>
              <p className={styles.description}>
                We eliminate holding periods, lost transfers, and unnecessary
                processing costs, so your business captures more revenue,
                faster.
              </p>
            </div>

            <div className={styles.textBlock}>
              <h3 className={styles.heading}>
                SOVEREIGNTY IN EVERY TRANSACTION.
              </h3>
              <p className={styles.description}>
                With fully customizable, self-custody digital wallets, you
                reclaim control. Execute domestic and cross-border payments with
                zero friction, and seamlessly make domestic and cross-border
                payments via stablecoins and move funds between traditional bank
                accounts and stablecoins.
              </p>
            </div>

            <div className={styles.textBlock}>
              <h3 className={styles.heading}>
                THE FOUNDATION OF IMMUTABLE TRUST
              </h3>
              <p className={styles.description}>
                KEO Rails ensures enterprise-grade payment security through
                cutting edge blockchain-powered data tokenization, smart
                contracts, self-custody wallets and stablecoins.
              </p>
            </div>

            <div className={styles.textBlock}>
              <h3 className={styles.heading}>LENDING IN ONE SIMPLE CLICK.</h3>
              <p className={styles.description}>
                Rails provides an integrated financing solution for lenders
                wishing to finance B2B payments. We integrated the ability to
                finance B2B payments directly into the rail. It&apos;s instant
                leverage for the lenders who have the vision (op 2 courage) to
                move at our speed.
              </p>
            </div>

            <Button
              text="Activate my profile"
              variant="full"
              iconPosition="end"
              href="/contact/sales"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10H16M16 10L10 4M16 10L10 16"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            ></Button>
          </div>
        </div>

        {/* Right Column - Sticky Content */}
        <div className={styles.stickyWrapper}>
          <div className={styles.card}>
            <KeoRailsPhoneSlideshow></KeoRailsPhoneSlideshow>
          </div>
        </div>
      </div>
    </section>
  );
}
