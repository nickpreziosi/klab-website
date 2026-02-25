"use client";

import { CareersContactForm } from "@/ui/contact/components/careers/careers-contact-form/careers-contact-form";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./ContactCareersView.module.css";

export function ContactCareersView() {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  return (
    <main className={styles.main}>
      <CareersContactForm skipAnimation={skipAnimation} />
    </main>
  );
}
