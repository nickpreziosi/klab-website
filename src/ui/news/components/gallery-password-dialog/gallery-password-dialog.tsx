"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Button from "@/ui/shared/components/button/button";
import { FloatingLabelInput } from "@/ui/shared/components/floating-label-input/floating-label-input";
import styles from "./gallery-password-dialog.module.css";

export type GalleryUnlockResult = { ok: true } | { ok: false; message?: string };

export interface GalleryPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onUnlock: (password: string) => Promise<GalleryUnlockResult>;
}

export function GalleryPasswordDialog({ open, onClose, onUnlock }: GalleryPasswordDialogProps) {
  const t = useTranslations("newsPage");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
    if (!open && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [open]);

  const handleSubmit = useCallback(
    async (ev?: FormEvent) => {
      ev?.preventDefault();
      setLoading(true);
      setError(null);
      try {
        const result = await onUnlock(password);
        if (result.ok) {
          setPassword("");
          setError(null);
          onClose();
        } else {
          setError(result.message ?? t("galleryPasswordHint"));
          setTimeout(() => setError(null), 3000);
        }
      } catch {
        setError(t("galleryPasswordErrorNetwork"));
        setTimeout(() => setError(null), 3000);
      } finally {
        setLoading(false);
      }
    },
    [password, onUnlock, onClose, t]
  );

  const handleClose = useCallback(() => {
    setError(null);
    onClose();
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      onClick={(e) => e.target === dialogRef.current && handleClose()}
      className={styles.dialogOverlay}
      aria-labelledby="gallery-dialog-title"
      aria-describedby="gallery-dialog-description"
    >
      <div className={styles.dialogPanel} onClick={(e) => e.stopPropagation()} role="document">
        <div className={styles.dialogCard}>
          <button
            type="button"
            className={styles.dialogClose}
            onClick={handleClose}
            aria-label={t("galleryCloseDialog")}
          >
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className={styles.dialogIconWrap} aria-hidden>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <div className={styles.dialogCardHeader}>
            <h2 id="gallery-dialog-title" className={styles.dialogTitle}>
              {t("galleryPasswordTitle")}
            </h2>
            <p id="gallery-dialog-description" className={styles.dialogDescription}>
              {t("galleryPasswordDescription")}
            </p>
          </div>

          <form className={styles.dialogForm} onSubmit={handleSubmit}>
            <div className={styles.dialogPasswordWrap}>
              <FloatingLabelInput
                id="gallery-password-input"
                type={showPassword ? "text" : "password"}
                label={t("galleryPasswordLabel")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                aria-invalid={error ? "true" : "false"}
                autoComplete="current-password"
                className={styles.dialogFloatingInput}
              />
              <button
                type="button"
                className={styles.dialogToggle}
                onClick={() => setShowPassword((s) => !s)}
                aria-pressed={showPassword}
                aria-label={showPassword ? t("galleryHidePassword") : t("galleryShowPassword")}
              >
                {!showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path
                      d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path
                      d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className={styles.dialogSubmitWrap}>
              <Button
                type="submit"
                variant="accent-brand"
                size="lg"
                className={styles.dialogSubmitButton}
                disabled={loading}
                loading={loading}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M8 11V7a4 4 0 1 1 8 0" />
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  </svg>
                }
                iconPosition="left"
              >
                {loading ? t("galleryUnlockingButton") : t("galleryUnlockButton")}
              </Button>
            </div>

            <div className={styles.dialogMeta} aria-live="polite">
              {error ? (
                <span className={styles.dialogError}>{error}</span>
              ) : (
                <span>{t("galleryPasswordHint")}</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
