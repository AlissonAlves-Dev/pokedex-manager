import { useNavigate } from "react-router";

import { Button } from "../ui/Button/Button";

import "./BackButton.css";

type BackButtonProps = {
  label?: string;
};

export function BackButton({ label = "Voltar" }: BackButtonProps) {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="back-button">
      <Button variant="secondary" onClick={handleBack}>
        ← {label}
      </Button>
    </div>
  );
}
