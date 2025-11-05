import styles from "./button.module.css";
import Link from "next/link";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  href?: string;
  text: string;
  onClick?: () => void;
  variant?: "full" | "outline";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  width?: "fit" | "full";
}

export default function ButtonPlayer({
  size,
  fontWeight,
  icon,
  iconPosition = "start",
  href,
  text,
  onClick,
  variant = "full",
  disabled,
  type,
  width = "fit",
}: ButtonProps) {
  return (
    <>
      {href && (
        <Link
          style={{ fontWeight: fontWeight ? fontWeight : 400 }}
          href={href}
          className={`${styles.button} ${
            styles[
              `button${variant.charAt(0).toUpperCase() + variant.slice(1)}`
            ]
          } ${
            size &&
            styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`]
          } ${iconPosition === "start" ? styles.iconStart : styles.iconEnd} ${
            width === "fit" ? styles.buttonFit : styles.buttonFull
          }`}
        >
          {icon && iconPosition === "start" && icon}
          {text}
          {icon && iconPosition === "end" && icon}
        </Link>
      )}
      {!href && (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`${styles.button} ${
            styles[
              `button${variant.charAt(0).toUpperCase() + variant.slice(1)}`
            ]
          } ${
            size &&
            styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`]
          } ${iconPosition === "start" ? styles.iconStart : styles.iconEnd} ${
            width === "fit" ? styles.buttonFit : styles.buttonFull
          }`}
        >
          {icon && iconPosition === "start" && icon}
          {text}
          {icon && iconPosition === "end" && icon}
        </button>
      )}
    </>
  );
}
