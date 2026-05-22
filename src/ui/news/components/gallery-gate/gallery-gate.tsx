"use client";

import Button from "@/ui/shared/components/button/button";
import styles from "./gallery-gate.module.css";

export interface GalleryGateProps {
  message: string;
  buttonLabel: string;
  onEnterPassword: () => void;
}

export function GalleryGate({ message, buttonLabel, onEnterPassword }: GalleryGateProps) {
  return (
    <div className={styles.gate}>
      <div className={styles.gateLockBack} aria-hidden>
        <div className={styles.gateLockWrap}>
          <div className={styles.gateLockGlow} />
          <svg
            className={styles.gateLockSvg}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1zm2-3a2 2 0 1 1 4 0v3h-4V7z"
            />
          </svg>
        </div>
      </div>
      <div className={styles.gateContent}>
        <p className={styles.gateMessage}>{message}</p>
        <Button variant="accent-brand" size="lg" onClick={onEnterPassword}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
