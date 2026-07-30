import type { ChangeEvent, SubmitEvent } from "react";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import "./SearchBar.css";

type SearchBarProps = {
  value: string;
  placeholder?: string;
  buttonLabel?: string;
  isSubmitting?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function SearchBar({
  value,
  placeholder = "Pesquisar...",
  buttonLabel = "Pesquisar",
  isSubmitting = false,
  onChange,
  onSubmit,
}: SearchBarProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      className="search-bar"
      role="search"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit}
    >
      <Input
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={handleChange}
      />

      <Button type="submit" disabled={isSubmitting}>
        {buttonLabel}
      </Button>
    </form>
  );
}
