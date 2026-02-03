import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/ui/shared/utils/utils";
import { Spinner } from "@/ui/shared/components/spinner/spinner";
import styles from "./button.module.css";

// Conditionally import Next.js Link - falls back to null if Next.js is not available
// This allows the Button component to work in Next.js, Astro, and plain React projects
type NextLinkType = React.ForwardRefExoticComponent<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  } & React.RefAttributes<HTMLAnchorElement>
>;

let NextLink: NextLinkType | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const nextLinkModule = require("next/link");
  NextLink = nextLinkModule.default || nextLinkModule;
} catch {
  // Next.js is not available - this is fine, we'll use regular anchor tags
  // This allows the library to work in Astro, plain React, and other frameworks
  NextLink = null;
}

// Helper function to get button variant class names
const getButtonClasses = (
  variant: string | null | undefined,
  size: string | null | undefined,
  className?: string
): string => {
  const variantClass =
    variant === "default"
      ? styles.variantDefault
      : variant === "destructive"
        ? styles.variantDestructive
        : variant === "outline"
          ? styles.variantOutline
          : variant === "secondary"
            ? styles.variantSecondary
            : variant === "ghost"
              ? styles.variantGhost
              : variant === "link"
                ? styles.variantLink
                : variant === "accent-brand"
                  ? styles.variantAccentBrand
                  : variant === "accent-brand-outline"
                    ? styles.variantAccentBrandOutline
                    : styles.variantDefault;

  const sizeClass =
    size === "sm"
      ? styles.sizeSm
      : size === "md"
        ? styles.sizeMd
        : size === "lg"
          ? styles.sizeLg
          : size === "xl"
            ? styles.sizeXl
            : size === "icon"
              ? styles.sizeIcon
              : styles.sizeMd;

  return cn(styles.button, variantClass, sizeClass, className);
};

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  asChild?: boolean;
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Position of the icon relative to the text */
  iconPosition?: "left" | "right" | "start" | "end";
  /** If provided, renders as an anchor tag instead of button */
  href?: string;
  /** Button type (only applies when href is not provided) */
  type?: "button" | "submit" | "reset";
  /** Icon size - defaults to size-4 for md, size-3 for sm, size-5 for lg, size-5 for xl */
  iconSize?: string;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Anchor-specific attributes (used when href is provided) */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  /** Button variant */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent-brand"
    | "accent-brand-outline";
  /** Button size */
  size?: "sm" | "md" | "lg" | "xl" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      asChild = false,
      icon,
      iconPosition = "left",
      href,
      type = "button",
      iconSize,
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Map icon size to CSS class or inline style
    const getIconSizeStyle = (): React.CSSProperties | undefined => {
      if (!iconSize) return undefined;

      const sizeMap: Record<string, string> = {
        "size-2": "0.5rem",
        "size-3": "0.75rem",
        "size-4": "1rem",
        "size-5": "1.25rem",
        "size-6": "1.5rem",
        "size-7": "1.75rem",
        "size-8": "2rem",
      };

      const defaultSize =
        size === "sm"
          ? "0.75rem"
          : size === "lg" || size === "xl"
            ? "1.25rem"
            : size === "icon"
              ? "1rem"
              : "1rem";

      const iconSizeValue = sizeMap[iconSize] || defaultSize;

      return {
        width: iconSizeValue,
        height: iconSizeValue,
      };
    };

    // Helper function to process icon and apply size
    const processIcon = (iconNode: React.ReactNode): React.ReactNode => {
      if (React.isValidElement(iconNode)) {
        const iconProps = iconNode.props as Record<string, unknown> & {
          className?: string;
          width?: unknown;
          height?: unknown;
          style?: React.CSSProperties;
        };
        // Remove width and height by destructuring them out
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { width: _width, height: _height, ...restProps } = iconProps;
        const iconSizeStyle = getIconSizeStyle();
        const clonedProps = {
          ...restProps,
          style: { ...iconSizeStyle, ...iconProps.style },
          className: cn(iconProps.className),
        };
        return React.cloneElement(
          iconNode as React.ReactElement<Record<string, unknown>>,
          clonedProps
        );
      }
      return iconNode;
    };

    // Clone icon and remove width/height attributes, apply size style
    const iconElement = icon ? (
      <span className={styles.iconContainer}>{processIcon(icon)}</span>
    ) : null;

    // Normalize icon position: "start" -> "left", "end" -> "right"
    const resolvedIconPosition =
      iconPosition === "end" || iconPosition === "right"
        ? "right"
        : iconPosition === "start" || iconPosition === "left"
          ? "left"
          : "left";

    // Process children to find and size any SVG icons
    // When asChild is true, children is the child element itself, not content to process
    const processedChildren = asChild
      ? children
      : React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childProps = child.props as Record<string, unknown> & {
              children?: React.ReactNode;
            };
            // If the child itself is an SVG-like component (like lucide-react icons), process it
            if (child.type && typeof child.type !== "string") {
              // Check if it has SVG-like structure by looking for common icon library patterns
              // Most icon libraries render SVGs, so we'll process any React element that might be an icon
              return processIcon(child);
            }
            // If the child has children that are SVG elements, process those
            if (childProps?.children && React.isValidElement(childProps.children)) {
              return React.cloneElement(
                child as React.ReactElement<Record<string, unknown>>,
                {
                  ...childProps,
                  children: processIcon(childProps.children),
                } as Record<string, unknown>
              );
            }
          }
          return child;
        });

    const isDisabled = disabled || loading;

    const content = (
      <>
        {loading && <Spinner size="sm" className={styles.loadingSpinner} />}
        {resolvedIconPosition === "left" && iconElement}
        {processedChildren}
        {resolvedIconPosition === "right" && iconElement}
      </>
    );

    const buttonClassName = getButtonClasses(variant, size, className);

    if (href) {
      // Extract type from props since it's not valid for Link or anchor
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type: _type, ...linkProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

      // Use regular anchor tag for external links (target="_blank") or when asChild is true
      // Otherwise use Next.js Link for internal navigation
      const isExternalLink = linkProps.target === "_blank" || href.startsWith("http");

      if (asChild) {
        return (
          <Slot
            href={href}
            className={buttonClassName}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...linkProps}
          >
            {content}
          </Slot>
        );
      }

      if (isExternalLink) {
        return (
          <a
            href={href}
            className={buttonClassName}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...linkProps}
          >
            {content}
          </a>
        );
      }

      // Use Next.js Link if available, otherwise fall back to regular anchor tag
      if (NextLink) {
        return (
          <NextLink
            href={href}
            className={buttonClassName}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...linkProps}
          >
            {content}
          </NextLink>
        );
      }

      // Fallback to regular anchor tag when Next.js is not available (e.g., in Astro, plain React)
      return (
        <a
          href={href}
          className={buttonClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...linkProps}
        >
          {content}
        </a>
      );
    }

    const Comp = asChild ? Slot : "button";
    // Extract type from props when using asChild since Fragment doesn't accept type
    const { type: buttonType, ...buttonProps } =
      props as React.ButtonHTMLAttributes<HTMLButtonElement>;

    // When asChild is true, Slot merges props with its child
    // We need to clone the child and add className to it
    // We preserve the child's original children and just add icon/loading around them
    // This prevents Slot from trying to merge props with a Fragment
    if (asChild) {
      if (React.isValidElement(children) && React.Children.count(children) === 1) {
        const child = children as React.ReactElement<
          Record<string, unknown> & { className?: string; children?: React.ReactNode }
        >;
        // Get the child's original children
        const childChildren = child.props?.children;

        // Process the child's children for icons if needed
        const processedChildChildren = React.Children.map(childChildren, (childItem) => {
          if (React.isValidElement(childItem)) {
            return processIcon(childItem);
          }
          return childItem;
        });

        // Build the children content - preserve child's children, add icon/loading around them
        const finalChildren = (
          <>
            {loading && <Spinner size="sm" className={styles.loadingSpinner} />}
            {resolvedIconPosition === "left" && iconElement}
            {processedChildChildren || childChildren}
            {resolvedIconPosition === "right" && iconElement}
          </>
        );

        return (
          <Slot
            {...(buttonProps as Record<string, unknown>)}
            ref={ref as React.Ref<HTMLButtonElement>}
          >
            {React.cloneElement(child, {
              className: cn(buttonClassName, child.props?.className),
              children: finalChildren,
              disabled: isDisabled,
            } as Record<string, unknown>)}
          </Slot>
        );
      }
      // Fallback: if children is not a single valid element, render as normal button
      return (
        <button
          type={buttonType || type}
          className={buttonClassName}
          ref={ref as React.Ref<HTMLButtonElement>}
          disabled={isDisabled}
          {...buttonProps}
        >
          {content}
        </button>
      );
    }

    return (
      <Comp
        type={buttonType || type}
        className={buttonClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={isDisabled}
        {...buttonProps}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = "Button";

// Export a buttonVariants function for compatibility (returns empty string, variants handled via props)
export const buttonVariants = () => "";

// Default export for compatibility with existing imports
export default Button;
