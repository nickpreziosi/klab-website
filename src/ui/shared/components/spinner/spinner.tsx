import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./spinner.module.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return <Loader2 className={cn(styles.spinner, sizeMap[size], className)} />;
}
