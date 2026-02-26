"use client";

import { SalesContactForm } from "@/ui/contact/components/sales/sales-contact-form/sales-contact-form";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import styles from "./ContactSalesView.module.css";

export function ContactSalesView() {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  return (
    <main className={styles.main}>
      <SalesContactForm skipAnimation={skipAnimation} />
    </main>
  );
}
