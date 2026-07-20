import type { HTMLAttributes, ReactNode } from "react";

import "./Badge.css";

type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  const badgeClassName = `badge badge--${variant} ${className}`.trim();

  return (
    <span className={badgeClassName} {...props}>
      {children}
    </span>
  );
}
