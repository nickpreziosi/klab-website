"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import styles from "./kena-password.module.css";
import Button from "@/app/components/ui/button/button";

type Props = PropsWithChildren<{
  /** localStorage key used to remember an unlocked session */
  storageKey?: string;
}>;

const DEFAULT_KEY = "kena:unlocked";

export default function KenaPassword({
  children,
  storageKey = DEFAULT_KEY,
}: Props) {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500); // Adjust breakpoint as needed
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v === "true") setUnlocked(true);
    } catch {
      // ignore
    }
  }, [storageKey]);

  const unlock = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/kena-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });

      if (res.ok) {
        try {
          localStorage.setItem(storageKey, "true");
        } catch {
          // ignore
        }
        setUnlocked(true);
        setError(null);
      } else {
        const body = await res.json().catch(() => null);
        setError((body && body.message) || "Incorrect password");
        setTimeout(() => setError(null), 3000);
      }
    } catch {
      setError("Network error");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (unlocked) return <>{children}</>;

  // Inline, non-modal gate styled like other sections
  return (
    <section
      className={styles.wrapper}
      aria-hidden={unlocked ? "false" : "true"}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.title}>Kena AI — Access</h3>
          <p className={styles.description}>
            Enter the access password to reveal the rest of this page.
          </p>
        </div>

        <form className={styles.form} onSubmit={unlock}>
          <label className={styles.label} htmlFor="kena-password-input">
            Password
          </label>
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <input
                id="kena-password-input"
                className={styles.input}
                type={show ? "text" : "password"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-invalid={error ? "true" : "false"}
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setShow((s) => !s)}
                aria-pressed={show}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {!show ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            <Button
              width={isMobile ? "full" : "fit"}
              variant="outline"
              icon={
                !loading ? (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )
              }
              type="submit"
              disabled={loading}
            >
              {loading ? "Unlocking…" : "Unlock"}
            </Button>
          </div>

          <div className={styles.row}>
            <div className={styles.meta} aria-live="polite">
              {error ? (
                <span className={styles.error}>{error}</span>
              ) : (
                <small className={styles.hint}>This content is gated.</small>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
