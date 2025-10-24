"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";
import { Logo } from "../logo/logo";
import { Separator } from "radix-ui";

export const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/company", label: "Company" },
    { href: "/contact", label: "Contact" },
  ];

  const privacyLinks = [
    { href: "/privacy/usa", label: "USA" },
    { href: "/privacy/canada", label: "Canada" },
    { href: "/privacy/colombia", label: "Colombia" },
    { href: "/privacy/mexico", label: "Mexico" },
    { href: "/privacy/peru", label: "Peru" },
    { href: "/privacy/brazil", label: "Brazil" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/keoworld",
      label: "Connect on LinkedIn",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/KeoWorld",
      label: "Follow on X",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/keo.world/?hl=en",
      label: "Follow on Instagram",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@keoworldB2B",
      label: "Follow on YouTube",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:hello@keo.com",
      label: "Send us an email",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section: Logo, Nav Links, Awards */}
        <div className={styles.topSection}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <div className={styles.logoLarge}>
              <Logo size="lg" animated="constant"></Logo>
            </div>
            <div className={styles.logoMedium}>
              <Logo size="md" animated="constant"></Logo>
            </div>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className={styles.navSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Awards Section */}
          <div className={styles.awardsSection}>
            <h3 className={styles.sectionTitle}>Awards & Recognition</h3>
            <div className={styles.awardsGrid}>
              <Image
                src="/winner-bold-award.png"
                alt="Winner Bold Award"
                width={120}
                height={80}
                className={styles.awardImage}
              />

              <Image
                src="/global-finance-award.png"
                alt="Global Finance KEO Award"
                width={120}
                height={80}
                className={styles.awardImage}
              />
              <Image
                src="/best-tech-award.png"
                alt="Best Tech KEO Award"
                width={120}
                height={80}
                className={styles.awardImage}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Legal Section */}
        <div className={styles.legalSection}>
          <div className={styles.legalText}>
            <p className={styles.disclaimer}>
              *The entities belonging to KEO World that operated in Mexico
              called KEO WORLD MEXICO S. de R.L de C.V. y KEO WORLD S.A. de C.V.
              SOFOM E.N.R. are not entities authorized to operate as Financial
              Technology Institutions (Instituciones de Tecnología Financiera)
              under the terms of the Mexican Law that regulates Financial
              Technology Institutions (Ley para regular las Instituciones de
              Tecnología Financiera), nor do they carry out operations reserved
              for said Financial Technology Institutions under the terms of the
              aforementioned Law.
            </p>
            <p className={styles.disclaimer}>
              American Express® is a brand of American Express. The Workeo
              American Express® Card is issued by KEO under license from
              American Express.
            </p>
            <div className={styles.privacyPolicies}>
              <span className={styles.privacyLabel}>Privacy Policies:</span>
              {privacyLinks.map((link, index) => (
                <span key={link.href}>
                  <Link href={link.href} className={styles.privacyLink}>
                    {link.label}
                  </Link>
                  {index < privacyLinks.length - 1 && " • "}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.addresses}>
            <p className={styles.address}>
              <strong>KEO WORLD INC</strong> • 328 NW 29th St. Miami, Florida
              33127
            </p>
            <p className={styles.address}>
              <strong>KEO Mexico</strong> • Blvd. Miguel de Cervantes Saavedra
              193, Piso 6, Colonia Granada, Delegación Miguel Hidalgo, 11520
              Ciudad de México, CDMX
            </p>
            <p className={styles.address}>
              <strong>KEO Brazil Tecnologia LTDA</strong> • R. Elvira Ferraz,
              250 9o Andar Conj 911 e 912- Vila Olímpia São Paulo - SP,
              04552-040
            </p>
          </div>

          <div className={styles.copyright}>
            <p>
              © {new Date().getFullYear()} KEO World Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
