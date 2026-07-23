import type { ButtonHTMLAttributes, ReactNode } from "react";

import "./Button.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const buttonClassName = `button button--${variant} ${className}`.trim();

  return (
    <button type={type} className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
