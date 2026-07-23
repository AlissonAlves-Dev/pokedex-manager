import type { InputHTMLAttributes } from "react";

import "./Input.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  const inputClassName = `input ${className}`.trim();

  return <input className={inputClassName} {...props} />;
}
