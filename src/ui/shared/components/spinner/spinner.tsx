import * as React from "react";
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
    return (
      <div
        ref={ref}
        className={cn(styles.spinner, sizeMap[size], brand && styles.brand, className)}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <VisuallyHidden>Loading...</VisuallyHidden>
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner };
