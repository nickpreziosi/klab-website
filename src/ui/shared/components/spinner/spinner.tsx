"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/ui/shared/utils/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import styles from "./spinner.module.css";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  brand?: boolean;
}

const sizeMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", brand = false, ...props }, ref) => {
    const t = useTranslations("common");
    return (
      <div
        ref={ref}
        className={cn(styles.spinner, sizeMap[size], brand && styles.brand, className)}
        role="status"
        aria-label={t("loading")}
        {...props}
      >
        <VisuallyHidden>{t("loading")}</VisuallyHidden>
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner };
