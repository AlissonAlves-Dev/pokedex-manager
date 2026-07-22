import { useNavigate } from "react-router";

import { Button } from "../ui/Button/Button";

import "./BackButton.css";

type BackButtonProps = {
  label?: string;
  to?: string;
};

export function BackButton({ label = "Voltar", to }: BackButtonProps) {
  const navigate = useNavigate();

  function handleBack() {
    if (to) {
      navigate(to);
      return;
    }

    navigate(-1);
  }

  return (
    <div className="back-button">
      <Button type="button" variant="secondary" onClick={handleBack}>
        ← {label}
      </Button>
    </div>
  );
}
