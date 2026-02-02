import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/app/lib/utils"
import styles from "./spinner.module.css"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <Loader2
      className={cn(styles.spinner, sizeMap[size], className)}
      {...props}
    />
  )
}
