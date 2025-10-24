"use client";

import { SalesContactForm } from "../../components/salesContactForm/sales-contact-form";
import styles from "./page.module.css";

export default function SalesContactPage() {
  return (
    <main className={styles.main}>
      <SalesContactForm />
    </main>
  );
}
