import styles from "./button.module.css";
import Link from "next/link";

interface ButtonProps {
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  href?: string;
  text: string;
  onClick?: () => void;
  variant?: "full" | "outline";
}

export default function ButtonPlayer({
  icon,
  iconPosition = "start",
  href,
  text,
  onClick,
  variant = "full",
}: ButtonProps) {
  return (
    <>
      {href && (
        <Link
          href={href}
          className={`${styles.button} ${
            styles[
              `button${variant.charAt(0).toUpperCase() + variant.slice(1)}`
            ]
          } ${iconPosition === "start" ? styles.iconStart : styles.iconEnd}`}
        >
          {icon && iconPosition === "start" && icon}
          {text}
          {icon && iconPosition === "end" && icon}
        </Link>
      )}
      {!href && (
        <button
          onClick={onClick}
          className={`${styles.button} ${
            styles[
              `button${variant.charAt(0).toUpperCase() + variant.slice(1)}`
            ]
          } ${iconPosition === "start" ? styles.iconStart : styles.iconEnd}`}
        >
          {icon && iconPosition === "start" && icon}
          {text}
          {icon && iconPosition === "end" && icon}
        </button>
      )}
    </>
  );
}
