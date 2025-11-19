"use client";

import type React from "react";
import { useState, useRef, type DragEvent, type KeyboardEvent } from "react";
import { FieldError } from "react-aria-components";
import * as ToastPrimitive from "@radix-ui/react-toast";
import styles from "./file-upload.module.css";

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
  fileTypes?: string[];
  maxFiles?: number;
}

export function FileUpload({
  files,
  onChange,
  error,
  fileTypes,
  maxFiles = 3,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFileAccepted = (file: File) => {
    if (!fileTypes || fileTypes.length === 0) return true;
    const accepts = fileTypes.map((s) => s.trim()).filter(Boolean);
    if (accepts.includes("*") || accepts.includes("*.*")) return true;

    const name = file.name.toLowerCase();
    const type = (file.type || "").toLowerCase();

    for (const pattern of accepts) {
      const p = pattern.toLowerCase();
      if (p === "*" || p === "*.*") return true;

      if (p.startsWith(".")) {
        // extension like .pdf
        if (name.endsWith(p)) return true;
        continue;
      }

      if (p.includes("/")) {
        // mime type or wildcard like image/*
        if (p.endsWith("/*")) {
          const prefix = p.replace("/*", "");
          if (type.startsWith(prefix + "/")) return true;
        } else {
          if (type === p) return true;
        }
        continue;
      }

      // bare extension without dot (e.g., pdf)
      if (name.endsWith("." + p)) return true;
    }

    return false;
  };

  type Toast = { id: number; message: string; items?: string[]; open: boolean };
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(1);

  // Show a single toast summarizing errors. This replaces any existing toasts.
  const showErrorToast = (items: string[], ttl = 4000) => {
    const id = nextToastId.current++;
    setToasts([{ id, message: "Upload error", items, open: true }]);
    window.setTimeout(() => {
      setToasts((prev) =>
        prev.map((x) => (x.id === id ? { ...x, open: false } : x))
      );
    }, ttl);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files || []);
    // filter by accepted file types (if provided)
    const accepted = droppedFiles.filter((f) => isFileAccepted(f));
    const rejected = droppedFiles.filter((f) => !isFileAccepted(f));

    // Build a single errors array describing problems (max files and/or incorrect types)
    const errors: string[] = [];
    if (rejected.length > 0) {
      errors.push(`Incorrect file type`);
    }

    const remaining = Math.max(0, maxFiles - files.length);
    if (remaining === 0) {
      // no capacity
      errors.push(`Maximum of ${maxFiles} files`);
      showErrorToast(errors);
      return;
    }

    // If accepted items exceed remaining, we'll add only the allowed number and report the max error
    let toAdd = accepted;
    if (accepted.length > remaining) {
      toAdd = accepted.slice(0, remaining);
      errors.push(`Maximum of ${maxFiles} files`);
    }

    // If there are any errors, show a single toast summarizing them
    if (errors.length > 0) {
      showErrorToast(errors);
    }

    const newFiles = [...files, ...toAdd];
    onChange(newFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      // file input already respects `accept`, but be defensive and filter anyway
      const accepted = selectedFiles.filter((f) => isFileAccepted(f));
      const rejected = selectedFiles.filter((f) => !isFileAccepted(f));

      const errors: string[] = [];
      if (rejected.length > 0) {
        errors.push(`Incorrect file type`);
      }

      const remaining = Math.max(0, maxFiles - files.length);
      if (remaining === 0) {
        errors.push(`Maximum of ${maxFiles} files`);
        showErrorToast(errors);
        return;
      }

      let toAdd = accepted;
      if (accepted.length > remaining) {
        toAdd = accepted.slice(0, remaining);
        errors.push(`Maximum of ${maxFiles} files`);
      }

      if (errors.length > 0) showErrorToast(errors);

      const newFiles = [...files, ...toAdd];
      onChange(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""} ${
          error ? styles.error : ""
        } ${files.length > 0 ? styles.hasFiles : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={
          files.length > 0
            ? `Upload area with ${files.length} file${
                files.length > 1 ? "s" : ""
              } selected. Press Enter or Space to add more files.`
            : "Upload area. Press Enter or Space to select files."
        }
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={fileTypes ? fileTypes.join(",") : "*.*"}
          onChange={handleFileSelect}
          className={styles.hiddenInput}
          aria-hidden="true"
        />

        {files.length === 0 ? (
          <div className={styles.dropzoneContent}>
            <svg
              className={styles.uploadIcon}
              width="48"
              height="48"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className={styles.dropzoneText}>
              {isDragging
                ? "Drop files here"
                : "Drag and drop files here, or click to select"}
            </p>
            <p className={styles.dropzoneSubtext}>
              <span>
                {fileTypes ? fileTypes.join(", ").toUpperCase() : ""}{" "}
              </span>
              (max {maxFiles} files)
            </p>
          </div>
        ) : (
          <div className={styles.fileList}>
            {files.map((file, index) => (
              <div key={index} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <svg
                    className={styles.fileIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileSize}>
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  className={styles.removeButton}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
            {files.length < maxFiles && (
              <p className={styles.addMoreText}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                Click or drag to add more files ({maxFiles - files.length}{" "}
                remaining)
              </p>
            )}
          </div>
        )}
      </div>
      {error && <FieldError className={styles.errorText}>{error}</FieldError>}

      {/* Radix Toasts (per-component) */}
      <div className={styles.toastContainer}>
        <ToastPrimitive.Provider>
          {toasts.map((t) => (
            <ToastPrimitive.Root
              key={t.id}
              className={styles.toast}
              open={t.open}
              onOpenChange={(open) => {
                // when Radix requests close (swipe/timeout), remove the toast from state
                if (!open) setToasts((p) => p.filter((x) => x.id !== t.id));
              }}
            >
              <div className={styles.toastContent}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
                    fill="var(--accent-color)"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className={styles.toastMessage}>
                  <ToastPrimitive.Title className={styles.toastTitle}>
                    {t.message}
                  </ToastPrimitive.Title>
                  {t.items && t.items.length > 0 && (
                    <div className={styles.toastList}>
                      {t.items.map((it, i) => (
                        <div key={i} className={styles.toastItem}>
                          {it}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <ToastPrimitive.Close
                  className={styles.toastClose}
                  aria-label="Dismiss"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </ToastPrimitive.Close>
              </div>
            </ToastPrimitive.Root>
          ))}

          <ToastPrimitive.Viewport className={styles.toastViewport} />
        </ToastPrimitive.Provider>
      </div>
    </div>
  );
}
