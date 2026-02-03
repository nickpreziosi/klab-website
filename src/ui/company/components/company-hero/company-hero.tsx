"use client";

import { useEffect, useState } from "react";
import styles from "./company-hero.module.css";
import Image from "next/image";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import { motion } from "motion/react";
import { useTranslations } from "@/ui/shared/hooks/use-translations";

const fadeUp = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = 0.15;
const duration = 0.6;
const ease = [0.22, 1, 0.36, 1] as const;

/** Logo height by viewport: desktop 120, tablet 96, mobile 72, small 56 */
function useHeroLogoHeight(): number {
  const [height, setHeight] = useState(120);

  useEffect(() => {
    const mq1024 = window.matchMedia("(max-width: 1024px)");
    const mq768 = window.matchMedia("(max-width: 768px)");
    const mq480 = window.matchMedia("(max-width: 480px)");

    const update = () => {
      if (mq480.matches) setHeight(56);
      else if (mq768.matches) setHeight(72);
      else if (mq1024.matches) setHeight(96);
      else setHeight(120);
    };

    update();
    mq480.addEventListener("change", update);
    mq768.addEventListener("change", update);
    mq1024.addEventListener("change", update);
    return () => {
      mq480.removeEventListener("change", update);
      mq768.removeEventListener("change", update);
      mq1024.removeEventListener("change", update);
    };
  }, []);

  return height;
}

export const CompanyHero = () => {
  const logoHeight = useHeroLogoHeight();
  const { t } = useTranslations();

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
        />
        <div className={styles.heroText}>
          <div className={styles.heroHeaderContainer}>
            <motion.h1
              className={styles.heroHeader}
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ duration, ease }}
            >
              {t("companyHero.headlineLine1")}
              <br />
              {t("companyHero.headlineLine2")}
            </motion.h1>
            <div className={styles.heroLogo}>
              <motion.div
                className={styles.heroLogoInner}
                initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration, delay: stagger, ease }}
              >
                <KlabLogo color="light" format="default" height={logoHeight} />
              </motion.div>
            </div>
          </div>

          <div className={styles.heroTaglinesContainer}>
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ duration, delay: stagger * 2, ease }}
            >
              {t("companyHero.tagline1")}
            </motion.p>
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ duration, delay: stagger * 3, ease }}
            >
              {t("companyHero.tagline2")}
            </motion.p>
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ duration, delay: stagger * 4, ease }}
            >
              {t("companyHero.tagline3")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
