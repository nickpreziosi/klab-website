"use client";

import React, { useRef } from "react";
import {
  motion,
  type MotionProps,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/ui/shared/utils/utils";
import styles from "./dock.module.css";

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export type DockDirection = "start" | "center" | "end";
export type DockOrientation = "horizontal" | "vertical";

export interface DockProps {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  disableMagnification?: boolean;
  iconDistance?: number;
  /** Extra inset around each icon; omit for Magic UI default, use 0 for flush buttons */
  iconPadding?: number;
  /** Cross-axis alignment of icons within the dock */
  direction?: DockDirection;
  /** Layout axis; vertical suits sidebars */
  orientation?: DockOrientation;
  children: React.ReactNode;
}

export interface DockIconProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  size?: number;
  magnification?: number;
  disableMagnification?: boolean;
  distance?: number;
  iconPadding?: number;
  mousePosition?: MotionValue<number>;
  orientation?: DockOrientation;
  className?: string;
  children?: React.ReactNode;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = false,
      iconDistance = DEFAULT_DISTANCE,
      iconPadding,
      direction = "center",
      orientation = "horizontal",
    },
    ref
  ) => {
    const mousePosition = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement<DockIconProps>(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mousePosition,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification,
            distance: iconDistance,
            iconPadding,
            orientation,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          mousePosition.set(orientation === "vertical" ? e.pageY : e.pageX);
        }}
        onMouseLeave={() => mousePosition.set(Infinity)}
        className={cn(
          styles.dock,
          orientation === "vertical" ? styles.dockVertical : styles.dockHorizontal,
          direction === "start" && styles.dockAlignStart,
          direction === "center" && styles.dockAlignCenter,
          direction === "end" && styles.dockAlignEnd,
          className
        )}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  iconPadding,
  mousePosition,
  orientation = "horizontal",
  className,
  children,
  ...props
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const padding = iconPadding ?? Math.max(6, size * 0.2);
  const defaultMousePosition = useMotionValue(Infinity);

  const distanceCalc = useTransform(mousePosition ?? defaultMousePosition, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };

    if (orientation === "vertical") {
      return val - bounds.y - bounds.height / 2;
    }

    return val - bounds.x - bounds.width / 2;
  });

  const targetSize = disableMagnification ? size : magnification;

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(styles.dockIcon, className)}
      {...props}
    >
      <div className={styles.dockIconInner}>{children}</div>
    </motion.div>
  );
}

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };
