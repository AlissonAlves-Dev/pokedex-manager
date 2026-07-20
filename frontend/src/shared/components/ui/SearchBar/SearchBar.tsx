import type { ChangeEvent, FormEvent } from "react";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import "./SearchBar.css";

type SearchBarProps = {
  value: string;
  placeholder?: string;
  buttonLabel?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function SearchBar({
  value,
  placeholder = "Pesquisar...",
  buttonLabel = "Pesquisar",
  onChange,
  onSubmit,
}: SearchBarProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <Input
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={handleChange}
      />

      <Button type="submit">{buttonLabel}</Button>
    </form>
  );
}
