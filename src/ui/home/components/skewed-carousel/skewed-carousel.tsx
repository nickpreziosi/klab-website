import styles from "./skewed-carousel.module.css";

const FIGMA_MOCKUP = "/images/hero-mockups/krails-approval-queue.png";

export function SkewedCarousel() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.stage}>
        <img src={FIGMA_MOCKUP} alt="" decoding="async" />
        <img src={FIGMA_MOCKUP} alt="" decoding="async" />
        <img src={FIGMA_MOCKUP} alt="" decoding="async" />
      </div>
    </div>
  );
}
