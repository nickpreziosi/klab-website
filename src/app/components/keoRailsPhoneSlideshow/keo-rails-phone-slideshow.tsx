"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./keo-rails-phone-slideshow.module.css";

const Grid3x3 = () => {
  return (
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
    </svg>
  );
};
const ArrowLeft = () => {
  return (
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
    </svg>
  );
};

const CheckCircled = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const Receipt = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
const Wallet = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 3.5C2 3.22386 2.22386 3 2.5 3H12.5C12.7761 3 13 3.22386 13 3.5V9.5C13 9.77614 12.7761 10 12.5 10H2.5C2.22386 10 2 9.77614 2 9.5V3.5ZM2 10.9146C1.4174 10.7087 1 10.1531 1 9.5V3.5C1 2.67157 1.67157 2 2.5 2H12.5C13.3284 2 14 2.67157 14 3.5V9.5C14 10.1531 13.5826 10.7087 13 10.9146V11.5C13 12.3284 12.3284 13 11.5 13H3.5C2.67157 13 2 12.3284 2 11.5V10.9146ZM12 11V11.5C12 11.7761 11.7761 12 11.5 12H3.5C3.22386 12 3 11.7761 3 11.5V11H12Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
const User = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const screens = [
  {
    id: "wallet",
    component: <WalletScreen />,
    icon: <Wallet></Wallet>,
    label: "Wallet",
  },
  {
    id: "invoices",
    component: <InvoicesScreen />,
    icon: <Receipt></Receipt>,
    label: "Invoices",
  },
  {
    id: "details",
    component: <DetailsScreen />,
    icon: <CheckCircled></CheckCircled>,
    label: "Approved",
  },
];

function WalletScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <ArrowLeft />
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
          <ArrowLeft />
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
          <ArrowLeft />
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
        <Grid3x3 />
        <span>Dashboard</span>
      </div>
      <div
        className={`${styles.navItem} ${
          active === "invoices" ? styles.navItemActive : ""
        }`}
      >
        <Receipt />
        <span>Invoices</span>
      </div>
      <div
        className={`${styles.navItem} ${
          active === "account" ? styles.navItemActive : ""
        }`}
      >
        <User />
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
    <motion.div
      inert
      tabIndex={-1}
      aria-hidden="true"
      className={styles.container}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
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
            <div className={styles.iconCircle}>{screen.icon}</div>
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
    </motion.div>
  );
}
