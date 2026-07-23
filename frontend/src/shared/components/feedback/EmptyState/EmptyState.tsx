import type { ReactNode } from "react";

import { Button } from "../../ui/Button/Button";

import "./EmptyState.css";

type EmptyStateProps = {
  title?: string;
  message: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title = "Nenhum item encontrado",
  message,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const shouldShowAction = actionLabel && onAction;

  return (
    <section className="empty-state" aria-live="polite">
      {icon && (
        <div className="empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}

      <div className="empty-state__content">
        <h2 className="empty-state__title">{title}</h2>

        <p className="empty-state__message">{message}</p>
      </div>

      {shouldShowAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </section>
  );
}
