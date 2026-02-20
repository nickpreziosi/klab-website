"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LandingTechnologiesShowcase } from "@/ui/landing-page/components/landing-technologies-showcase/landing-technologies-showcase";
import SectionHeader from "@/ui/shared/components/section-header/section-header";
import { TechnologiesShowcase } from "@/ui/shared/components/technologies-showcase/technologies-showcase";
import styles from "./home-technologies-showcase.module.css";

const BREAKPOINT_DESKTOP = 1024;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BREAKPOINT_DESKTOP}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function HomeTechnologiesShowcase({
  className,
}: {
  className?: string;
} = {}) {
  const t = useTranslations("common");
  const isDesktop = useIsDesktop();

  return (
    <div className={className}>
      <div className={styles.sectionHeaderWrap}>
        <SectionHeader heading={t("ourEcosystem")} align="left" skipAnimation />
      </div>
      {isDesktop ? (
        <TechnologiesShowcase className={styles.desktopShowcase} />
      ) : (
        <div className={styles.mobileShowcaseWrap}>
          <LandingTechnologiesShowcase variant="orange" useThemeForMobile className={styles.mobileShowcase} />
        </div>
      )}
    </div>
  );
}
