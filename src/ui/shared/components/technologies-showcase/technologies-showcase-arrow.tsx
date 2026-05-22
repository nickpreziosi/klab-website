import { MoveRight } from "lucide-react";
import styles from "./technologies-showcase-arrow.module.css";

/** Forward arrow below a tech logo; mirrors in RTL via `rtlFlipH`. */
export function TechnologiesShowcaseLogoArrow({ className }: { className?: string }) {
  return (
    <span className={[styles.arrow, className].filter(Boolean).join(" ")} aria-hidden>
      <MoveRight
        className={`${styles.icon} rtlFlipH`}
        color="var(--tech-showcase-arrow-color)"
        strokeWidth={2}
        aria-hidden
      />
    </span>
  );
}
