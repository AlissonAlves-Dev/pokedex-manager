import type { HTMLAttributes } from "react";

import "./Spinner.css";

type SpinnerSize = "small" | "medium" | "large";

type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: SpinnerSize;
  label?: string;
};

export function Spinner({
  size = "medium",
  label = "Carregando...",
  className = "",
  ...props
}: SpinnerProps) {
  const spinnerClassName = `spinner spinner--${size} ${className}`.trim();

  return (
    <div
      className={spinnerClassName}
      role="status"
      aria-label={label}
      {...props}
    >
      <span className="spinner__circle" aria-hidden="true" />
      <span className="spinner__label">{label}</span>
    </div>
  );
}
