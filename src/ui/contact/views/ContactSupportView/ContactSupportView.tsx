"use client";

import { SupportContactForm } from "@/ui/contact/components/support/support-contact-form/support-contact-form";
import styles from "./ContactSupportView.module.css";

export function ContactSupportView() {
  return (
    <main className={styles.main}>
      <SupportContactForm />
    </main>
  );
}
