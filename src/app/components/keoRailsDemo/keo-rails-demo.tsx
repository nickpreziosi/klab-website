import styles from "./keo-rails-demo.module.css";
import KeoRailsPhoneSlideshow from "../keoRailsPhoneSlideshow/keo-rails-phone-slideshow";
import Link from "next/link";
import Button from "../ui/button/button";

export default function KeoRailsDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Top heading */}
        <div className={styles.topHeading}>
          <h2 className={styles.mainHeading}>
            T+1 is not a strategy.
            <br />
            It is a liability
          </h2>
        </div>

        {/* Two column layout */}
        <div className={styles.content}>
          {/* Left column - Text content */}
          <div className={styles.leftColumn}>
            <div className={styles.textBlock}>
              <h3 className={styles.heading}>The power to extend time.</h3>
              <p className={styles.description}>
                Control payment terms. Use our instant liquidity as your
                greatest negotiation weapon
              </p>
            </div>

            <div className={styles.textBlock}>
              <h3 className={styles.heading}>
                Zero DSO is not a goal, it is a right.
              </h3>
              <p className={styles.description}>
                Instantly convert invoices into cash. Eliminate credit risk from
                your balance sheet.
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

          {/* Right column - Phone mockup */}
          <div className={styles.rightColumn}>
            <KeoRailsPhoneSlideshow />
          </div>
        </div>
      </div>
    </section>
  );
}
