import styles from "./rebate-step-icons.module.css";

export function RebatePackageIcon() {
  return (
    <span className={styles.package}>
      <img
        src="/images/krails-rebate-icons/package.svg"
        alt=""
        width={50}
        height={55}
      />
    </span>
  );
}

export function RebateInvoiceIcon() {
  return (
    <span className={styles.invoice}>
      <img
        src="/images/krails-rebate-icons/invoice.svg"
        alt=""
        width={45}
        height={61}
      />
    </span>
  );
}

export function RebateBankIcon() {
  return (
    <span className={styles.bank}>
      <img
        src="/images/krails-rebate-icons/bank.svg"
        alt=""
        width={61}
        height={60}
      />
    </span>
  );
}

export function RebateKrailsIcon() {
  return (
    <span className={styles.krails}>
      <img
        src="/images/krails-rebate-icons/krails-mark.png"
        alt=""
        width={65}
        height={42}
      />
    </span>
  );
}
