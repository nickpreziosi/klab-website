"use client";

import Image from "next/image";
import styles from "./keo-dashboard.module.css";

export default function KeoDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Image
            src="/keo-logo.png"
            alt="KEO"
            width={60}
            height={24}
            className={styles.logoImage}
          />
        </div>
        <nav className={styles.nav}>
          <div className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.icon}>📊</span>
            <span>Invoice List</span>
          </div>
          <div className={styles.navItem}>
            <span className={styles.icon}>📥</span>
            <span>Inbox</span>
          </div>
          <div className={styles.navItem}>
            <span className={styles.icon}>📋</span>
            <span>My Issues</span>
          </div>
          <div className={styles.navItem}>
            <span className={styles.icon}>👁️</span>
            <span>Watchlist</span>
          </div>
          <div className={styles.navItem}>
            <span className={styles.icon}>📁</span>
            <span>Projects</span>
          </div>
          <div className={styles.navItem}>
            <span className={styles.icon}>👥</span>
            <span>Teams</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Invoice List</h1>
          <div className={styles.headerRight}>
            <div className={styles.actions}>
              <button className={styles.button}>+ Upload Invoices</button>
              <button className={styles.buttonSecondary}>+ Load File</button>
            </div>
            <div className={styles.userAvatar}>
              <span className={styles.avatarText}>JD</span>
            </div>
          </div>
        </header>

        <div className={styles.filters}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search invoice..."
              className={styles.searchInput}
            />
          </div>
          <select className={styles.filterSelect}>
            <option>Filter by status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
            <option>Paid</option>
          </select>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Number</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Supplier</th>
                <th>Buyer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INV001</td>
                <td>2023-01-05</td>
                <td>2023-01-20</td>
                <td>Tech Solutions Inc.</td>
                <td>Global Corp.</td>
                <td>$1500.75</td>
                <td>
                  <span className={`${styles.badge} ${styles.badgeApproved}`}>
                    Approved
                  </span>
                </td>
                <td>
                  <button className={styles.actionButton}>👁️</button>
                </td>
              </tr>
              <tr>
                <td>INV002</td>
                <td>2023-01-07</td>
                <td>2023-01-22</td>
                <td>Innovate LLC</td>
                <td>Startup Hub</td>
                <td>$320.00</td>
                <td>
                  <span className={`${styles.badge} ${styles.badgePending}`}>
                    Pending
                  </span>
                </td>
                <td>
                  <button className={styles.actionButton}>👁️</button>
                </td>
              </tr>
              <tr>
                <td>INV003</td>
                <td>2023-01-10</td>
                <td>2023-01-25</td>
                <td>Creative Designs</td>
                <td>Fashion Retailers</td>
                <td>$899.50</td>
                <td>
                  <span className={`${styles.badge} ${styles.badgeRejected}`}>
                    Rejected
                  </span>
                </td>
                <td>
                  <button className={styles.actionButton}>👁️</button>
                </td>
              </tr>
              <tr>
                <td>INV004</td>
                <td>2023-01-12</td>
                <td>2023-01-27</td>
                <td>Logistics Pro</td>
                <td>Distribution Co.</td>
                <td>$2100.00</td>
                <td>
                  <span className={`${styles.badge} ${styles.badgePaid}`}>
                    Paid
                  </span>
                </td>
                <td>
                  <button className={styles.actionButton}>👁️</button>
                </td>
              </tr>
              <tr>
                <td>INV005</td>
                <td>2023-01-15</td>
                <td>2023-01-30</td>
                <td>Marketing Agency</td>
                <td>Local Business</td>
                <td>$550.25</td>
                <td>
                  <span className={`${styles.badge} ${styles.badgePending}`}>
                    Pending
                  </span>
                </td>
                <td>
                  <button className={styles.actionButton}>👁️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
