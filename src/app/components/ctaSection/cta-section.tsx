import styles from "./cta-section.module.css";
import { LineGraph } from "../lineGraph/line-graph";

export const CtaSection = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.chartGrid}>
          <div className={styles.textContent}>
            <h2>Tailored to Your Business Needs</h2>
            <p>
              KEO offers customized supply finance solutions that result in
              improved cash management, increased working capital, and faster
              B2B transactions that boost business growth.
            </p>
          </div>
          <LineGraph
            title="Your Account"
            subtitle=""
            showProjected={true}
          ></LineGraph>
        </div>
      </div>
    </>
  );
};
