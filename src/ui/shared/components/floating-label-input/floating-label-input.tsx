"use client";

import * as React from "react";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./floating-label-input.module.css";

export interface FloatingLabelInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  labelClassName?: string;
  /** "text" | "email" | "number" | "password" | "tel" | "url" | "textarea" | "native-select" */
  type?: "text" | "email" | "number" | "password" | "tel" | "url" | "textarea" | "native-select";
  /** Options for native-select */
  selectOptions?: Array<{ value: string; label: string }>;
  /** Error state – applies border and label error styling */
  error?: boolean;
  /** Optional wrapper className */
  className?: string;
}

/**
 * Floating label input – CSS-only float using :placeholder-shown and :focus.
 * Uses K Lab website CSS vars. Renders native input, textarea, or select.
 */
const FloatingLabelInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FloatingLabelInputProps
>(
  (
    {
      label,
      labelClassName,
      id: providedId,
      type = "text",
      selectOptions,
      error,
      className,
      placeholder,
      disabled,
      required,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const finalId = providedId ?? (props.name ? `field-${props.name}` : generatedId);
    const isTextarea = type === "textarea";
    const isSelect = type === "native-select";

    /* Use a single space so :placeholder-shown works; placeholder text is not shown visually */
    const effectivePlaceholder = placeholder ?? " ";
    /* Ensure value is always a string so the input stays controlled (avoids undefined -> string warning) */
    const safeValue = value ?? "";

    return (
      <div className={cn(styles.wrapper, className)}>
        <div className={styles.inner}>
          {isTextarea ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={finalId}
              className={cn(styles.textarea, styles.peer, error && styles.error)}
              placeholder={effectivePlaceholder}
              disabled={disabled}
              required={required}
              value={safeValue}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : isSelect ? (
            <select
              ref={ref as React.Ref<HTMLSelectElement>}
              id={finalId}
              className={cn(styles.select, styles.peer, error && styles.error)}
              disabled={disabled}
              required={required}
              value={safeValue}
              {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
            >
              <option value="">{effectivePlaceholder}</option>
              {selectOptions?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={finalId}
              type={type}
              className={cn(styles.input, styles.peer, error && styles.error)}
              placeholder={effectivePlaceholder}
              disabled={disabled}
              required={required}
              value={safeValue}
              {...props}
            />
          )}
          <label htmlFor={finalId} className={cn(styles.label, labelClassName)}>
            {label}
          </label>
        </div>
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
