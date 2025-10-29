"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./keo-rails-phone-slideshow.module.css";

const Grid3x3 = () => {
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 7V2H2.5C2.22386 2 2 2.22386 2 2.5V7H7ZM2 8V12.5C2 12.7761 2.22386 13 2.5 13H7V8H2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>;
};
const ArrowLeft = () => {
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>;
};

const screens = [
  {
    id: "wallet",
    component: <WalletScreen />,
    label: "Wallet",
  },
  {
    id: "invoices",
    component: <InvoicesScreen />,

    label: "Invoices",
  },
  {
    id: "details",
    component: <DetailsScreen />,

    label: "Approved",
  },
];

function WalletScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {/* <ArrowLeft size={24} color="white" /> */}
          <div>
            <h2 className={styles.headerTitle}>My KEO Buyer Wallet</h2>
            <p className={styles.headerSubtitle}>x0f638eab8cb765d56f880...</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.creditCard}>
          <p className={styles.creditLabel}>Available credit</p>
          <h1 className={styles.creditAmount}>
            $100,000<span>.00</span>
          </h1>
          <div className={styles.creditDetails}>
            <div className={styles.creditRow}>
              <span>Total Credit Line</span>
              <span className={styles.creditValue}>$100,000.00</span>
            </div>
            <div className={styles.creditRow}>
              <span>Outstanding Balance</span>
              <span className={styles.creditValue}>$100,000.00</span>
            </div>
          </div>
        </div>

        <div className={styles.balanceCard}>
          <p className={styles.balanceLabel}>Wallet balance</p>
          <h2 className={styles.balanceAmount}>0.00 CAD</h2>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.actionButton}>
            <span>↓</span> Deposit
          </button>
          <button className={styles.actionButton}>
            <span>↑</span> Withdraw
          </button>
        </div>

        <div className={styles.invoiceList}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.invoiceItem}>
              <div>
                <p className={styles.invoiceNumber}>445211568-INV2007</p>
                <p className={styles.invoiceSupplier}>Supplier Test</p>
              </div>
              <div className={styles.invoiceRight}>
                <p className={styles.invoiceAmount}>$82,000.00</p>
                <p className={styles.invoiceDate}>01/20/2023</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="invoices" />
    </div>
  );
}

function InvoicesScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {/* <ArrowLeft size={24} color="white" /> */}
          <div>
            <h2 className={styles.headerTitle}>My KEO Buyer Wallet</h2>
            <p className={styles.headerSubtitle}>x0f638eab8cb765d56f880...</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.invoiceHeader}>
          <h2 className={styles.sectionTitle}>My invoices</h2>
          <div className={styles.toggle}>
            <span>Pending only</span>
            <div className={styles.toggleSwitch}>
              <div className={styles.toggleThumb} />
            </div>
          </div>
        </div>

        <div className={styles.largeInvoiceCard}>
          <h1 className={styles.largeInvoiceNumber}>44521456-INV1200</h1>
          <div className={styles.invoiceInfo}>
            <span className={styles.invoiceSupplier}>Supplier Test</span>
            <span className={styles.invoiceDate}>11/20/2023</span>
          </div>
        </div>

        <button className={styles.sendPaymentButton}>Send payment</button>
      </div>

      <BottomNav active="invoices" />
    </div>
  );
}

function DetailsScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {/* <ArrowLeft size={24} color="white" /> */}
          <div>
            <h2 className={styles.headerTitle}>My KEO Buyer Wallet</h2>
            <p className={styles.headerSubtitle}>x0f638eab8cb765d56f880...</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Invoice Details</h2>

        <div className={styles.approvedBadge}>
          <div className={styles.checkIcon}>✓</div>
          <span>Approved</span>
        </div>

        <div className={styles.detailsCard}>
          <h1 className={styles.detailsInvoiceNumber}>INV1200</h1>

          <div className={styles.detailsList}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ID</span>
              <span className={styles.detailValue}>INV1200</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Created date</span>
              <span className={styles.detailValue}>11/20/2023</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Amount</span>
              <span className={styles.detailValue}>$82,000.00</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Supplier</span>
              <span className={styles.detailValue}>Supplier Test</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Loan</span>
              <span className={styles.detailValue}>59</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="invoices" />
    </div>
  );
}

function BottomNav({ active }: { active: string }) {
  return (
    <div className={styles.bottomNav}>
      <div
        className={`${styles.navItem} ${
          active === "dashboard" ? styles.navItemActive : ""
        }`}
      >
        {/* <Grid3x3 size={24} /> */}
        <span>Dashboard</span>
      </div>
      <div
        className={`${styles.navItem} ${
          active === "invoices" ? styles.navItemActive : ""
        }`}
      >
        {/* <Receipt size={24} /> */}
        <span>Invoices</span>
      </div>
      <div
        className={`${styles.navItem} ${
          active === "account" ? styles.navItemActive : ""
        }`}
      >
        {/* <User size={24} /> */}
        <span>Account</span>
      </div>
    </div>
  );
}

export default function KeoRailsPhoneSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div aria-hidden="true" className={styles.container}>
      {screens.map((screen, index) => {
        const isActive = currentIndex === index;
        const position =
          index === 0 ? "left" : index === 1 ? "bottom" : "right";

        return (
          <div
            key={screen.id}
            className={`${styles.floatingIcon} ${
              styles[
                `icon${position.charAt(0).toUpperCase() + position.slice(1)}`
              ]
            } ${isActive ? styles.iconActive : ""}`}
          >
            <div className={styles.iconCircle}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 7V2H2.5C2.22386 2 2 2.22386 2 2.5V7H7ZM2 8V12.5C2 12.7761 2.22386 13 2.5 13H7V8H2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className={styles.iconLabel}>{screen.label}</span>

            {isActive && (
              <svg
                className={styles.curvedPath}
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d={
                    position === "left"
                      ? "M 50 200 Q 150 200, 250 200"
                      : position === "bottom"
                      ? "M 200 350 Q 200 275, 200 200"
                      : "M 350 200 Q 250 200, 150 200"
                  }
                  stroke="#FF0055"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <motion.circle
                  cx={
                    position === "left" ? 50 : position === "bottom" ? 200 : 350
                  }
                  cy={
                    position === "left"
                      ? 200
                      : position === "bottom"
                      ? 350
                      : 200
                  }
                  r="6"
                  fill="#FF0055"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </svg>
            )}
          </div>
        );
      })}

      <div className={styles.phoneFrame}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneScreen}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.screenWrapper}
            >
              {screens[currentIndex].component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
