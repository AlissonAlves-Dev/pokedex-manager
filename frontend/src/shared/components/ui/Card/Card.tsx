import type { HTMLAttributes, ReactNode } from "react";

import "./Card.css";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  const cardClassName = `card ${className}`.trim();

  return (
    <div className={cardClassName} {...props}>
      {children}
    </div>
  );
}
