"use client";

import { SupportContactForm } from "@/ui/contact/components/support/support-contact-form/support-contact-form";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./ContactSupportView.module.css";

export function ContactSupportView() {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  return (
    <main className={styles.main}>
      <SupportContactForm skipAnimation={skipAnimation} />
    </main>
  );
}
