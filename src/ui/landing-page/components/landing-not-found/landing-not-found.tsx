"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import Button from "@/ui/shared/components/button/button";
import styles from "./landing-not-found.module.css";

export type LandingNotFoundVariant = "orange" | "wave";

type LandingNotFoundProps = {
  /** Background variant. Change to "wave" for dark wave styling. */
  variant?: LandingNotFoundVariant;
};

const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
const hidden = { opacity: 0, filter: "blur(10px)", y: 10 };
const visible = { opacity: 1, filter: "blur(0px)", y: 0 };
const fadeIn = (delay: number) => ({
  initial: hidden,
  animate: visible,
  transition: { delay, ...transition },
});

export function LandingNotFound({ variant = "orange" }: LandingNotFoundProps) {
  const pageVariantClass =
    variant === "wave" ? styles.pageWave : styles.pageOrange;

  return (
    <main className={`${styles.page} ${pageVariantClass}`}>
      <div className={styles.backgroundOverlay} />
      <div className={styles.container}>
        <motion.div
          className={styles.logoWrapper}
          {...fadeIn(0)}
        >
          <Link href="/" className={styles.logoLink}>
            <KlabLogo
              fullLogoTheme="dark"
              color="orange"
              format="full"
              height={96}
              className={styles.brandLogo}
            />
          </Link>
        </motion.div>

        <motion.div
          className={styles.errorCode}
          {...fadeIn(0.1)}
        >
          404
        </motion.div>

        <motion.p
          className={styles.description}
          {...fadeIn(0.2)}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          className={styles.buttonContainer}
          {...fadeIn(0.3)}
        >
          <Button asChild variant="accent-brand" size="lg">
            <Link href="/">
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
              >
                <path
                  d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
