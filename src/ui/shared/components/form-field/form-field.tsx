"use client";

import * as React from "react";
import { cn } from "@/ui/shared/utils/utils";
import {
  FloatingLabelInput,
  type FloatingLabelInputProps,
} from "@/ui/shared/components/floating-label-input/floating-label-input";
import styles from "./form-field.module.css";

const FormFieldContext = React.createContext<{
  error?: string;
  required?: boolean;
  label?: string;
  descriptionId?: string;
  errorId?: string;
  ariaDescribedBy?: string;
  setUseFloatingLabel?: (value: boolean) => void;
}>({});

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  /** When true, label is not rendered above the field (e.g. when using FormFieldInput with floating label). */
  hideLabel?: boolean;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      description,
      error,
      required,
      hideLabel: hideLabelProp,
      className,
      children,
      id: rootId,
      ...props
    },
    ref
  ) => {
    const [useFloatingLabel, setUseFloatingLabel] = React.useState(false);
    const descriptionId = React.useId();
    const errorId = React.useId();
    const ariaDescribedBy = [
      description && !error ? descriptionId : null,
      error ? errorId : null,
    ]
      .filter(Boolean)
      .join(" ");

    const contextValue = React.useMemo(
      () => ({
        error,
        required,
        label,
        descriptionId: description && !error ? descriptionId : undefined,
        errorId: error ? errorId : undefined,
        ariaDescribedBy: ariaDescribedBy || undefined,
        setUseFloatingLabel,
      }),
      [error, required, label, description, descriptionId, errorId, ariaDescribedBy]
    );

    const showLabel =
      label && (hideLabelProp === undefined ? !useFloatingLabel : !hideLabelProp);

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div ref={ref} className={cn(styles.root, className)} {...props}>
          {showLabel && (
            <span
              className={cn(styles.label, error && styles.error)}
            >
              {label}
              {required && <span className={styles.required}>*</span>}
            </span>
          )}
          {children}
          {description && !error && (
            <p id={descriptionId} className={styles.description}>
              {description}
            </p>
          )}
          {error && (
            <p
              id={errorId}
              className={styles.errorMessage}
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </FormFieldContext.Provider>
    );
  }
);
FormField.displayName = "FormField";

export interface FormFieldInputProps
  extends Omit<FloatingLabelInputProps, "label" | "error"> {
  /** When true (default), uses FloatingLabelInput. When false, renders a plain input/textarea. */
  useFloatingLabel?: boolean;
  label?: string;
  name?: string;
  type?: string;
}

const FormFieldInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldInputProps
>(
  (
    {
      useFloatingLabel = true,
      className,
      label: propLabel,
      type = "text",
      ...props
    },
    ref
  ) => {
    const {
      error,
      label: contextLabel,
      setUseFloatingLabel,
    } = React.useContext(FormFieldContext);
    const label = propLabel ?? contextLabel ?? "";

    React.useEffect(() => {
      setUseFloatingLabel?.(useFloatingLabel);
    }, [useFloatingLabel, setUseFloatingLabel]);

    if (useFloatingLabel) {
      return (
        <FloatingLabelInput
          ref={ref}
          label={label}
          type={type as FloatingLabelInputProps["type"]}
          error={!!error}
          className={className}
          {...(props as FloatingLabelInputProps)}
        />
      );
    }

    const isTextarea = type === "textarea";
    const inputClassName = cn(
      isTextarea ? styles.textareaStandalone : styles.inputStandalone,
      error && styles.error,
      className
    );

    if (isTextarea) {
      return (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={inputClassName}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      );
    }

    return (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        type={type}
        className={inputClassName}
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  }
);
FormFieldInput.displayName = "FormFieldInput";

export { FormField, FormFieldInput };
export type { FloatingLabelInputProps };
