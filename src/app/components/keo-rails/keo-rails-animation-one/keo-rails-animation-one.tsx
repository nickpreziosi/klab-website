"use client";

import {
  AnimatePresence,
  motion,
  useTransform,
  useMotionValue,
} from "framer-motion";
import styles from "./keo-rails-animation-one.module.css";
import { useState, useEffect, useRef, JSX } from "react";

interface DiamondCard {
  id: string;
  label: string;
  svg: JSX.Element;
  position: { top: string; left: string };
  delay: number;
}

const Payments = () => {
  return (
    <svg
      className={styles.cardIcon}
      width="66"
      height="48"
      viewBox="0 0 66 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.4167 47.3333C34.8097 47.3333 29.2135 45.0406 24.6281 40.4552C20.0427 35.8698 17.75 30.2736 17.75 23.6667C17.75 17.0597 20.0427 11.4635 24.6281 6.87812C29.2135 2.29271 34.8097 0 41.4167 0C48.0236 0 53.6198 2.29271 58.2052 6.87812C62.7906 11.4635 65.0833 17.0597 65.0833 23.6667C65.0833 30.2736 62.7906 35.8698 58.2052 40.4552C53.6198 45.0406 48.0236 47.3333 41.4167 47.3333ZM17.75 46.5937C12.5236 45.2132 8.25868 42.4028 4.95521 38.1625C1.65174 33.9222 0 29.0903 0 23.6667C0 18.2431 1.65174 13.4111 4.95521 9.17083C8.25868 4.93056 12.5236 2.12014 17.75 0.739583V6.95208C14.2 8.18472 11.3403 10.3295 9.17083 13.3865C7.00139 16.4434 5.91667 19.8701 5.91667 23.6667C5.91667 27.4632 7.00139 30.8899 9.17083 33.9469C11.3403 37.0038 14.2 39.1486 17.75 40.3812V46.5937Z"
        fill="currentColor"
      />
    </svg>
  );
};

const Portal = () => {
  return (
    <svg
      className={styles.cardIcon}
      width="52"
      height="41"
      viewBox="0 0 52 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8 28.1875V15.375H41.6V28.1875H20.8ZM5.2 41C3.77 41 2.54583 40.4982 1.5275 39.4945C0.509167 38.4909 0 37.2844 0 35.875V5.125C0 3.71562 0.509167 2.50911 1.5275 1.50547C2.54583 0.501823 3.77 0 5.2 0H46.8C48.23 0 49.4542 0.501823 50.4725 1.50547C51.4908 2.50911 52 3.71562 52 5.125V35.875C52 37.2844 51.4908 38.4909 50.4725 39.4945C49.4542 40.4982 48.23 41 46.8 41H5.2ZM5.2 35.875H46.8V10.25H5.2V35.875Z"
        fill="currentColor"
      />
    </svg>
  );
};

const Supplier = () => {
  return (
    <svg
      className={styles.cardIcon}
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.36842 37.5789V5.36842H0V0H10.7368V32.2105H51V37.5789H5.36842ZM10.7368 51C9.26053 51 7.99671 50.4743 6.94539 49.423C5.89408 48.3717 5.36842 47.1079 5.36842 45.6316C5.36842 44.1553 5.89408 42.8914 6.94539 41.8401C7.99671 40.7888 9.26053 40.2632 10.7368 40.2632C12.2132 40.2632 13.477 40.7888 14.5283 41.8401C15.5796 42.8914 16.1053 44.1553 16.1053 45.6316C16.1053 47.1079 15.5796 48.3717 14.5283 49.423C13.477 50.4743 12.2132 51 10.7368 51ZM13.4211 29.5263V13.4211H29.5263V29.5263H13.4211ZM32.2105 29.5263V13.4211H48.3158V29.5263H32.2105ZM45.6316 51C44.1553 51 42.8914 50.4743 41.8401 49.423C40.7888 48.3717 40.2632 47.1079 40.2632 45.6316C40.2632 44.1553 40.7888 42.8914 41.8401 41.8401C42.8914 40.7888 44.1553 40.2632 45.6316 40.2632C47.1079 40.2632 48.3717 40.7888 49.423 41.8401C50.4743 42.8914 51 44.1553 51 45.6316C51 47.1079 50.4743 48.3717 49.423 49.423C48.3717 50.4743 47.1079 51 45.6316 51Z"
        fill="currentColor"
      />
    </svg>
  );
};

const Blockchain = () => {
  return (
    <svg
      className={styles.cardIcon}
      width="52"
      height="56"
      viewBox="0 0 52 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6222 20.874L3.03333 12.7404L26 0L48.9667 12.7404L34.3778 20.874C33.2704 19.7224 31.9944 18.8346 30.55 18.2108C29.1056 17.587 27.5889 17.2751 26 17.2751C24.4111 17.2751 22.8944 17.587 21.45 18.2108C20.0056 18.8346 18.7296 19.7224 17.6222 20.874ZM23.1111 56L0 43.1877V17.635L14.8056 25.9126C14.6611 26.3925 14.5648 26.8603 14.5167 27.3162C14.4685 27.7721 14.4444 28.2639 14.4444 28.7918C14.4444 31.431 15.2389 33.7823 16.8278 35.8458C18.4167 37.9092 20.5111 39.2768 23.1111 39.9486V56ZM26 34.5501C24.4111 34.5501 23.0509 33.9863 21.9194 32.8586C20.788 31.7309 20.2222 30.3753 20.2222 28.7918C20.2222 27.2082 20.788 25.8526 21.9194 24.7249C23.0509 23.5973 24.4111 23.0334 26 23.0334C27.5889 23.0334 28.9491 23.5973 30.0806 24.7249C31.212 25.8526 31.7778 27.2082 31.7778 28.7918C31.7778 30.3753 31.212 31.7309 30.0806 32.8586C28.9491 33.9863 27.5889 34.5501 26 34.5501ZM28.8889 56V39.9486C31.4889 39.2768 33.5833 37.9092 35.1722 35.8458C36.7611 33.7823 37.5556 31.431 37.5556 28.7918C37.5556 28.2639 37.5315 27.7721 37.4833 27.3162C37.4352 26.8603 37.3389 26.3925 37.1944 25.9126L52 17.635V43.1877L28.8889 56Z"
        fill="currentColor"
      />
    </svg>
  );
};

const Buyer = () => {
  return (
    <svg
      className={styles.cardIcon}
      width="57"
      height="57"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.5 28.5C24.5812 28.5 21.2266 27.1047 18.4359 24.3141C15.6453 21.5234 14.25 18.1687 14.25 14.25C14.25 10.3312 15.6453 6.97656 18.4359 4.18594C21.2266 1.39531 24.5812 0 28.5 0C32.4188 0 35.7734 1.39531 38.5641 4.18594C41.3547 6.97656 42.75 10.3312 42.75 14.25C42.75 18.1687 41.3547 21.5234 38.5641 24.3141C35.7734 27.1047 32.4188 28.5 28.5 28.5ZM42.75 57V34.2C44.2344 34.675 45.6891 35.1797 47.1141 35.7141C48.5391 36.2484 49.9344 36.8719 51.3 37.5844C53.0812 38.475 54.4766 39.7664 55.4859 41.4586C56.4953 43.1508 57 45.0062 57 47.025V57H42.75ZM21.375 44.5312V32.5969C22.5625 32.4188 23.75 32.2852 24.9375 32.1961C26.125 32.107 27.3125 32.0625 28.5 32.0625C29.6875 32.0625 30.875 32.107 32.0625 32.1961C33.25 32.2852 34.4375 32.4188 35.625 32.5969V44.5312H21.375ZM0 57V47.025C0 45.0062 0.504687 43.1508 1.51406 41.4586C2.52344 39.7664 3.91875 38.475 5.7 37.5844C7.06562 36.8719 8.46094 36.2484 9.88594 35.7141C11.3109 35.1797 12.7656 34.675 14.25 34.2V57H0Z"
        fill="currentColor"
      />
    </svg>
  );
};

const Invoices = () => {
  return (
    <svg
      className={styles.cardIcon}
      width="42"
      height="47"
      viewBox="0 0 42 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 47V0L3.5 3.525L7 0L10.5 3.525L14 0L17.5 3.525L21 0L24.5 3.525L28 0L31.5 3.525L35 0L38.5 3.525L42 0V47L38.5 43.475L35 47L31.5 43.475L28 47L24.5 43.475L21 47L17.5 43.475L14 47L10.5 43.475L7 47L3.5 43.475L0 47ZM7 35.25H35V30.55H7V35.25ZM7 25.85H35V21.15H7V25.85ZM7 16.45H35V11.75H7V16.45Z"
        fill="currentColor"
      />
    </svg>
  );
};

const Wallet = () => {
  return (
    <svg
      className={styles.cardIcon}
      width="51"
      height="41"
      viewBox="0 0 51 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2 41C7.395 41 4.99375 39.9964 2.99625 37.9891C0.99875 35.9818 0 33.5687 0 30.75V10.25C0 7.43125 0.99875 5.01823 2.99625 3.01094C4.99375 1.00365 7.395 0 10.2 0H40.8C43.605 0 46.0062 1.00365 48.0037 3.01094C50.0012 5.01823 51 7.43125 51 10.25V30.75C51 33.5687 50.0012 35.9818 48.0037 37.9891C46.0062 39.9964 43.605 41 40.8 41H10.2ZM10.2 10.25H40.8C41.735 10.25 42.6275 10.3568 43.4775 10.5703C44.3275 10.7839 45.135 11.1255 45.9 11.5953V10.25C45.9 8.84062 45.4006 7.63411 44.4019 6.63047C43.4031 5.62682 42.2025 5.125 40.8 5.125H10.2C8.7975 5.125 7.59687 5.62682 6.59812 6.63047C5.59937 7.63411 5.1 8.84062 5.1 10.25V11.5953C5.865 11.1255 6.6725 10.7839 7.5225 10.5703C8.3725 10.3568 9.265 10.25 10.2 10.25ZM5.4825 18.5781L33.8512 25.4969C34.2337 25.5823 34.6162 25.5823 34.9987 25.4969C35.3812 25.4115 35.7425 25.2406 36.0825 24.9844L44.9437 17.5531C44.4762 16.9125 43.8812 16.3893 43.1587 15.9836C42.4362 15.5779 41.65 15.375 40.8 15.375H10.2C9.095 15.375 8.12813 15.6633 7.29938 16.2398C6.47062 16.8164 5.865 17.5958 5.4825 18.5781Z"
        fill="currentColor"
      />
    </svg>
  );
};

const cards: DiamondCard[] = [
  {
    id: "payments",
    label: "Payments",
    svg: Payments(),
    position: { top: "15%", left: "20%" },
    delay: 0.1,
  },
  {
    id: "buyer",
    label: "Buyer",
    svg: Buyer(),
    position: { top: "8%", left: "45%" },
    delay: 0.2,
  },
  {
    id: "invoices",
    label: "Invoices",
    svg: Invoices(),
    position: { top: "20%", left: "70%" },
    delay: 0.6,
  },
  {
    id: "portal",
    label: "Portal",
    svg: Portal(),
    position: { top: "45%", left: "15%" },
    delay: 0.8,
  },
  {
    id: "blockchain",
    label: "Blockchain",
    svg: Blockchain(),
    position: { top: "50%", left: "50%" },
    delay: 0,
  },
  {
    id: "wallet",
    label: "Wallet",
    svg: Wallet(),
    position: { top: "55%", left: "75%" },
    delay: 0.4,
  },
  {
    id: "supplier",
    label: "Supplier",
    svg: Supplier(),
    position: { top: "80%", left: "65%" },
    delay: 1,
  },
];

export default function KeoRailsAnimationOne() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  // cycle through cards in a custom order every 2 seconds
  // Requested order (1-based): 1,4,7,5,2,3,6
  // Convert to zero-based indexes: [0, 3, 6, 4, 1, 2, 5]
  const sequenceRef = useRef<number[]>([0, 3, 6, 4, 1, 2, 5]);
  const seqPosRef = useRef<number>(0);

  useEffect(() => {
    // initialize selection to the first index in the sequence
    setSelectedCard(cards[sequenceRef.current[0]]?.id ?? null);

    const iv = setInterval(() => {
      seqPosRef.current = (seqPosRef.current + 1) % sequenceRef.current.length;
      const idx = sequenceRef.current[seqPosRef.current];
      setSelectedCard(cards[idx]?.id);
    }, 2000);

    return () => clearInterval(iv);
  }, []);

  const MyLine = ({ selected }: { selected: boolean }) => {
    const progress = useMotionValue(0);
    return (
      <svg className={styles.lineContainer}>
        <motion.line
          display={"none"}
          x1="5"
          y1="5"
          x2="15"
          y2="5"
          stroke="blue"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.line
          x1="0"
          y1="0"
          x2="0"
          y2="96"
          stroke="rgba(var(--secondary-color-rgb), 0.2)"
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            selected
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          exit={{
            pathLength: 0,
            opacity: 0,
            transition: { delay: 2.5, duration: 0.5 },
          }}
          transition={{ duration: 0.3 }}
          style={{
            // Animate the dash offset to move the segment along
            strokeDashoffset: useTransform(progress, [0, 1], [1, 0]),
            // Animate the dash array to control the segment length
            // This creates a fixed-length "comet" head and tail
            strokeDasharray: useTransform(progress, [0, 1], ["0 1", "1 0"]),
          }}
        />
      </svg>
    );
  };

  const CurvedLine = () => {
    // Compose one path with the three original segments as subpaths.
    // Order kept to match visual sequence: horizontal, left vertical, right vertical.
    const d = "M 0 96 L 216 96 M 0 0 L 0 96 M 216 96 L 216 -110";

    return (
      <svg className={styles.lineContainer}>
        <AnimatePresence>
          <motion.path
            key={0}
            d={d}
            fill="none"
            stroke="rgba(var(--secondary-color-rgb), 0.2)"
            strokeWidth={4}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              selectedCard === "supplier"
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            exit={{
              pathLength: 0,
              opacity: 0,
              transition: { delay: 2.5, duration: 0.5 },
            }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </svg>
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Right Side - Diamond Cards */}

        <div className={styles.rightContent}>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`${styles.diamondCard} ${
                card.id === selectedCard ? styles.centerCard : ""
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{
                duration: 1,
                delay: card.delay,
                ease: "easeOut",
              }}
            >
              <div className={styles.cardContainer}>
                <div className={styles.cardInner}>
                  <div className={styles.cardContent}>
                    {card.svg}
                    <p className={styles.cardLabel}>{card.label}</p>
                  </div>
                </div>
                {card.id === "supplier" && <CurvedLine />}
                {card.id !== "supplier" && card.id !== "blockchain" && (
                  <MyLine selected={card.id === selectedCard ? true : false} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
