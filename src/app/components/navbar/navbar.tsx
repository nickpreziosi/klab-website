"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { Drawer } from "../drawer/drawer";
import * as React from "react";
import { DesktopDropdown } from "../dropdownMenu/dropdownMenu";
import { Logo } from "../logo/logo";
import { Separator } from "radix-ui";
import { ThemeToggle } from "../themeToggle/theme-toggle";

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
    window.addEventListener("load", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("load", handleScroll);
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
      <div ref={spacerRef} className={styles.spacer}>
        <nav
          style={{
            height: "auto",
            borderBottom:
              dropdownOpen || !isAtTop
                ? "solid 1px rgba(255, 255, 255, 0.2)"
                : "solid 1px transparent",
          }}
          id="navbarContainer"
          aria-label="Main navigation"
          className={`${styles.container} ${
            !isAtTop && styles.containerScrolled
          } ${dropdownOpen && styles.containerDropdownOpen}`}
        >
          <div className={styles.navbar}>
            <div className={styles.logoContainer}>
              <Link href="/">
                <Logo size="sm" animated></Logo>
              </Link>
            </div>

            <ul className={styles.navList}>
              <li className={styles.navListItem}>
                <Link className={styles.navLink} href="/">
                  <svg
                    className={styles.icon}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  About
                </Link>
              </li>
              <li className={styles.separatorRootListItem}>
                <Separator.Root
                  className={styles.separatorRoot}
                  decorative
                  orientation="vertical"
                />
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
                  <svg
                    className={styles.icon}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.85357 3.85355L7.65355 3.05353C8.2981 2.40901 9.42858 1.96172 10.552 1.80125C11.1056 1.72217 11.6291 1.71725 12.0564 1.78124C12.4987 1.84748 12.7698 1.97696 12.8965 2.10357C13.0231 2.23018 13.1526 2.50125 13.2188 2.94357C13.2828 3.37086 13.2779 3.89439 13.1988 4.44801C13.0383 5.57139 12.591 6.70188 11.9464 7.34645L7.49999 11.7929L6.35354 10.6465C6.15827 10.4512 5.84169 10.4512 5.64643 10.6465C5.45117 10.8417 5.45117 11.1583 5.64643 11.3536L7.14644 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L8.40073 12.3064L9.57124 14.2572C9.65046 14.3893 9.78608 14.4774 9.9389 14.4963C10.0917 14.5151 10.2447 14.4624 10.3535 14.3536L12.3535 12.3536C12.4648 12.2423 12.5172 12.0851 12.495 11.9293L12.0303 8.67679L12.6536 8.05355C13.509 7.19808 14.0117 5.82855 14.1887 4.58943C14.2784 3.9618 14.2891 3.33847 14.2078 2.79546C14.1287 2.26748 13.9519 1.74482 13.6035 1.39645C13.2552 1.04809 12.7325 0.871332 12.2045 0.792264C11.6615 0.710945 11.0382 0.721644 10.4105 0.8113C9.17143 0.988306 7.80189 1.491 6.94644 2.34642L6.32322 2.96968L3.07071 2.50504C2.91492 2.48278 2.75773 2.53517 2.64645 2.64646L0.646451 4.64645C0.537579 4.75533 0.484938 4.90829 0.50375 5.0611C0.522563 5.21391 0.61073 5.34954 0.742757 5.42876L2.69364 6.59928L2.14646 7.14645C2.0527 7.24022 2.00002 7.3674 2.00002 7.50001C2.00002 7.63261 2.0527 7.75979 2.14646 7.85356L3.64647 9.35356C3.84173 9.54883 4.15831 9.54883 4.35357 9.35356C4.54884 9.1583 4.54884 8.84172 4.35357 8.64646L3.20712 7.50001L3.85357 6.85356L6.85357 3.85355ZM10.0993 13.1936L9.12959 11.5775L11.1464 9.56067L11.4697 11.8232L10.0993 13.1936ZM3.42251 5.87041L5.43935 3.85356L3.17678 3.53034L1.80638 4.90074L3.42251 5.87041ZM2.35356 10.3535C2.54882 10.1583 2.54882 9.8417 2.35356 9.64644C2.1583 9.45118 1.84171 9.45118 1.64645 9.64644L0.646451 10.6464C0.451188 10.8417 0.451188 11.1583 0.646451 11.3535C0.841713 11.5488 1.1583 11.5488 1.35356 11.3535L2.35356 10.3535ZM3.85358 11.8536C4.04884 11.6583 4.04885 11.3417 3.85359 11.1465C3.65833 10.9512 3.34175 10.9512 3.14648 11.1465L1.14645 13.1464C0.95119 13.3417 0.951187 13.6583 1.14645 13.8535C1.34171 14.0488 1.65829 14.0488 1.85355 13.8536L3.85358 11.8536ZM5.35356 13.3535C5.54882 13.1583 5.54882 12.8417 5.35356 12.6464C5.1583 12.4512 4.84171 12.4512 4.64645 12.6464L3.64645 13.6464C3.45119 13.8417 3.45119 14.1583 3.64645 14.3535C3.84171 14.5488 4.1583 14.5488 4.35356 14.3535L5.35356 13.3535ZM9.49997 6.74881C10.1897 6.74881 10.7488 6.1897 10.7488 5.5C10.7488 4.8103 10.1897 4.25118 9.49997 4.25118C8.81026 4.25118 8.25115 4.8103 8.25115 5.5C8.25115 6.1897 8.81026 6.74881 9.49997 6.74881Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Technologies{" "}
                  <svg
                    className={`${!dropdownOpen && styles.caretIconOpen} ${
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
              <li className={styles.separatorRootListItem}>
                <Separator.Root
                  className={styles.separatorRoot}
                  decorative
                  orientation="vertical"
                />
              </li>
              <li className={styles.navListItem}>
                <Link className={styles.navLink} href="/company">
                  <svg
                    className={styles.icon}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 1C5 0.447715 5.44772 0 6 0H9C9.55228 0 10 0.447715 10 1V2H14C14.5523 2 15 2.44772 15 3V6C15 6.8888 14.6131 7.68734 14 8.23608V11.5C14 12.3284 13.3284 13 12.5 13H2.5C1.67157 13 1 12.3284 1 11.5V8.2359C0.38697 7.68721 0 6.88883 0 6V3C0 2.44772 0.447716 2 1 2H5V1ZM9 1V2H6V1H9ZM1 3H5H5.5H9.5H10H14V6C14 6.654 13.6866 7.23467 13.1997 7.6004C12.8655 7.85144 12.4508 8 12 8H8V7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5V8H3C2.5493 8 2.1346 7.85133 1.80029 7.60022C1.31335 7.23446 1 6.65396 1 6V3ZM7 9H3C2.64961 9 2.31292 8.93972 2 8.82905V11.5C2 11.7761 2.22386 12 2.5 12H12.5C12.7761 12 13 11.7761 13 11.5V8.82915C12.6871 8.93978 12.3504 9 12 9H8V9.5C8 9.77614 7.77614 10 7.5 10C7.22386 10 7 9.77614 7 9.5V9Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Company
                </Link>
              </li>
              <li className={styles.separatorRootListItem}>
                <Separator.Root
                  className={styles.separatorRoot}
                  decorative
                  orientation="vertical"
                />
              </li>

              <li className={styles.navListItem}>
                <Link className={styles.navLink} href="/contact">
                  <svg
                    className={styles.icon}
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Contact
                </Link>
              </li>
              <li className={styles.separatorRootListItem}>
                <Separator.Root
                  className={styles.separatorRoot}
                  decorative
                  orientation="vertical"
                />
              </li>

              <li
                className={`${styles.navListItem} ${styles.themeToggleContainer}`}
              >
                <ThemeToggle></ThemeToggle>
              </li>
            </ul>

            <div className={styles.drawerContainer}>
              <Drawer></Drawer>
            </div>
          </div>

          <div className={styles.dropdownContainer} ref={dropdownContainerRef}>
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
