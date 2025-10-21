"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { Drawer } from "../drawer/drawer";
import * as React from "react";
import { NavigationMenu } from "radix-ui";
import { DesktopDropdown } from "../dropdownMenu/dropdownMenu";
import { Logo } from "../logo/logo";

export const NavigationMenuDemo = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (spacerRef.current) {
        const elementTop = spacerRef.current.getBoundingClientRect().top;
        setIsAtTop(elementTop >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setDropdownOpen(true);
      // Focus first item in dropdown after it opens
      setTimeout(() => {
        const firstLink = dropdownContainerRef.current?.querySelector("a");
        firstLink?.focus();
      }, 0);
    }
    // Tab key will naturally move to next nav link (Contact)
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dropdownOpen) {
        setDropdownOpen(false);
        // Return focus to trigger button when closing with Escape
        dropdownTriggerRef.current?.focus();
      }
    };

    if (dropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node) &&
        !dropdownTriggerRef.current?.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
          @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          @import url('https://fonts.cdnfonts.com/css/neue-plak');
        `}
      </style>
      <style>
        {
          '@import "@radix-ui/colors/black-alpha.css"; @import "@radix-ui/colors/indigo.css"; @import "@radix-ui/colors/mauve.css"; @import "@radix-ui/colors/purple.css"; @import "@radix-ui/colors/violet.css";'
        }
      </style>

      <div ref={spacerRef} className={styles.spacer}>
        <nav
          style={{
            height: "auto",
            borderBottom: dropdownOpen
              ? "solid 1px rgba(255, 255, 255, 0.5)"
              : "solid 1px transparent",
          }}
          id="navbarContainer"
          aria-label="Main navigation"
          className={`${styles.container} ${
            !isAtTop && styles.containerScrolled
          }`}
        >
          <div className={styles.navbar}>
            <div className={styles.logoContainer}>
              <Link href="/">
                <Logo size="sm" animated="constant"></Logo>
              </Link>
            </div>

            <ul className={styles.navList}>
              <li className={styles.navListItem}>
                <Link className={styles.navLink} href="/">
                  Home
                </Link>
              </li>
              <li className={styles.navListItem}>
                <Link className={styles.navLink} href="/about">
                  About
                </Link>
              </li>
              <li className={styles.navListItem}>
                <button
                  ref={dropdownTriggerRef}
                  onClick={handleDropdownClick}
                  onKeyDown={handleTriggerKeyDown}
                  className={styles.navLink}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-controls="technologies-dropdown"
                  aria-label="Technologies menu, press enter or space to open"
                >
                  Technologies{" "}
                  <svg
                    className={`${dropdownOpen && styles.caretIconOpen} ${
                      styles.caretIcon
                    }`}
                    width="30"
                    height="30"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
                  </svg>
                </button>
              </li>
              <li className={styles.navListItem}>
                <Link className={styles.navLink} href="/company">
                  Company
                </Link>
              </li>

              <li className={styles.navListItem}>
                <Link className={styles.navLink} href="/">
                  Contact
                </Link>
              </li>
            </ul>

            <div className={styles.drawerContainer}>
              <Drawer></Drawer>
            </div>
          </div>

          <div ref={dropdownContainerRef}>
            <DesktopDropdown
              isOpen={dropdownOpen}
              onClose={() => setDropdownOpen(false)}
            />
          </div>
        </nav>
      </div>
    </>
  );
};

interface ListItemProps {
  link: string;
  title: string;
  description: string;
}

const ListItem: React.FC<ListItemProps> = ({ link, title, description }) => (
  <li
    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <NavigationMenu.Link asChild>
      <Link className={styles.ListItemLink} href={link}>
        <div
          style={{ fontWeight: "600", marginBottom: "6px" }}
          className={styles.ListItemHeading}
        >
          {title}
        </div>
        <p className={styles.ListItemText}>{description}</p>
      </Link>
    </NavigationMenu.Link>
  </li>
);

ListItem.displayName = "ListItem";
