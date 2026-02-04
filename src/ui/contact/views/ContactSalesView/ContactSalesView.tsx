import { SalesContactForm } from "@/ui/contact/components/sales/sales-contact-form/sales-contact-form";
import styles from "./ContactSalesView.module.css";

export function ContactSalesView() {
  return (
    <main className={styles.main}>
      <SalesContactForm />
    </main>
  );
}
