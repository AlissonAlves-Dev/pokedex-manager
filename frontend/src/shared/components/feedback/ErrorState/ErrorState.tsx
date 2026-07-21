import { Button } from "../../ui/Button/Button";

import "./ErrorState.css";

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Não foi possível carregar os dados",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <section className="error-state" role="alert" aria-live="assertive">
      <div className="error-state__icon" aria-hidden="true">
        !
      </div>

      <div className="error-state__content">
        <h2 className="error-state__title">{title}</h2>

        <p className="error-state__message">{message}</p>
      </div>

      {onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
    </section>
  );
}
