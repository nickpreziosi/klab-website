"use client";
import { useState } from "react";
import styles from "./flip-card.module.css";
import Image from "next/image";
import Link from "next/link";
import { Primitive } from "@radix-ui/react-primitive";
import { motion } from "motion/react";

interface FlipCardProps {
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin: string;
  x: string;
  email: string;
}

export const FlipCard = ({
  name,
  position,
  bio,
  image,
  linkedin,
  x,
  email,
}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <Primitive.div className={styles.card}>
        <motion.div
          className={styles.cardInner}
          initial={{ transform: "rotateY(0deg)" }}
          animate={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          transition={{ duration: 0.6, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          <div className={styles.cardFront}>
            <Image
              src={image}
              alt="Winner Bold Award"
              width={500}
              height={500}
              className={styles.cardImage}
            />
            <div className={styles.overlayGradient}></div>
            <button onClick={toggleFlip} className={styles.cardText}>
              <div>
                <h2 className={styles.cardTitle}>{name}</h2>
                <p className={styles.cardPosition}>{position}</p>
              </div>
              <div className={styles.bioFront}>
                Read Bio
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <div className={styles.cardBack}>
            <div className={styles.overlay}></div>

            <Image
              src={image}
              alt="Winner Bold Award"
              width={500}
              height={500}
              className={styles.cardImageBack}
            />
            <div className={styles.cardTextBack}>
              <h2 className={styles.cardTitle}>{name}</h2>
              <p className={styles.cardPosition}>{position}</p>
              <p className={styles.cardBackBio}>{bio}</p>
            </div>
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
            <button onClick={toggleFlip} className={styles.bioBackContainer}>
              <div className={styles.bioBack}>
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
                Flip Back
              </div>
            </button>
          </div>
        </motion.div>
      </Primitive.div>
    </>
  );
};
