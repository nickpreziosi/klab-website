"use client";
import { useRef, useState } from "react";
import styles from "./staff-card.module.css";
import Image from "next/image";
import { Accordion } from "radix-ui";
import Link from "next/link";
import { useTheme } from "@/ui/shared/hooks/use-theme";

interface StaffCardProps {
  name: string;
  position: string;
  bio: string;
  image: string;
  /** Optional: use when both light and dark assets exist; otherwise `image` is used for both. */
  imageLight?: string;
  /** Optional: use when both light and dark assets exist; otherwise `image` is used for both. */
  imageDark?: string;
  linkedin: string;
  x: string;
  email: string;
}

export const StaffCard = ({
  name,
  position,
  bio,
  image,
  imageLight,
  imageDark,
  linkedin,
  x,
  email,
}: StaffCardProps) => {
  const accordionContentRef = useRef<HTMLDivElement | null>(null);
  const [accordionIsOpen, setAccordionIsOpen] = useState(false);
  const { effectiveTheme } = useTheme();

  const displayImage =
    imageLight != null && imageDark != null
      ? effectiveTheme === "light"
        ? imageLight
        : imageDark
      : image;

  const handleAccordionTriggerClick = () => {
    setAccordionIsOpen(!accordionIsOpen);
  };

  return (
    <>
      <div className={styles.card}>
        <Image
          priority
          src={displayImage}
          alt="Winner Bold Award"
          width={500}
          height={500}
          className={styles.cardImage}
        />

        <Accordion.Root className={styles.accordionRoot} type="single" collapsible>
          <Accordion.Item className={styles.accordionItem} value="item-1">
            <div className={styles.overlay}></div>
            <Accordion.Trigger
              onClick={handleAccordionTriggerClick}
              className={styles.accordionTrigger}
            >
              <div className={styles.cardText}>
                <h2 className={styles.cardTitle}>{name}</h2>
                <p className={styles.cardPosition}>{position}</p>
              </div>
              <div className={styles.accordionTriggerBio}>
                {!accordionIsOpen ? "Read Bio" : "Close Bio"}
                <svg
                  className={styles.caretIcon}
                  width="30"
                  height="30"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
                </svg>
              </div>
            </Accordion.Trigger>
            <Accordion.Content ref={accordionContentRef} className={styles.accordionContent}>
              <p className={styles.accordionContentBio}>{bio}</p>

              {/* Social Links */}
              <div className={styles.socialLinks}>
                <Link
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
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
                </Link>
                <Link
                  href={x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
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
                </Link>
                <Link
                  href={email}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
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
                </Link>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </>
  );
};
