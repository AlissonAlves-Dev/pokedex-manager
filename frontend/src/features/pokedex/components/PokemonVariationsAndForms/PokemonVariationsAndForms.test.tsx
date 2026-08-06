import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import type {
  PokemonFormReference,
  PokemonVariationReference,
} from "../../types/pokemon";

import { PokemonVariationsAndForms } from "./PokemonVariationsAndForms";

const variations: PokemonVariationReference[] = [
  {
    id: 25,
    name: "pikachu",
    displayName: "Pikachu",
    isDefault: true,
  },
  {
    id: 10080,
    name: "pikachu-cosplay",
    displayName: "Pikachu Cosplay",
    isDefault: false,
  },
];

const forms: PokemonFormReference[] = [
  {
    id: 25,
    name: "pikachu",
    displayName: "Pikachu",
  },
  {
    id: 10080,
    name: "pikachu-cosplay",
    displayName: "Pikachu Cosplay",
  },
];

function renderComponent({
  pokemonId = 25,
  availableVariations = variations,
  availableForms = forms,
  selectedFormId = null,
  isBaseSelected = true,
}: {
  pokemonId?: number;
  availableVariations?: PokemonVariationReference[] | null;
  availableForms?: PokemonFormReference[];
  selectedFormId?: number | null;
  isBaseSelected?: boolean;
} = {}) {
  return render(
    <MemoryRouter>
      <PokemonVariationsAndForms
        pokemonId={pokemonId}
        variations={availableVariations}
        forms={availableForms}
        selectedFormId={selectedFormId}
        isBaseSelected={isBaseSelected}
      />
    </MemoryRouter>,
  );
}

describe("PokemonVariationsAndForms", () => {
  it("não renderiza navegação quando não existem alternativas", () => {
    renderComponent({
      availableVariations: [variations[0]],
      availableForms: [forms[0]],
    });

    expect(
      screen.queryByRole("heading", {
        name: "Variações e formas",
      }),
    ).not.toBeInTheDocument();
  });

  it("renderiza as variações como links de rota", () => {
    renderComponent();

    const currentVariation = screen.getByRole("link", {
      name: "Ver variação Pikachu, padrão",
    });

    const alternativeVariation = screen.getByRole("link", {
      name: "Ver variação Pikachu Cosplay",
    });

    expect(currentVariation).toHaveAttribute("href", "/pokemon/25");

    expect(currentVariation).toHaveAttribute("aria-current", "page");

    expect(alternativeVariation).toHaveAttribute("href", "/pokemon/10080");

    expect(screen.getByText("Padrão")).toBeInTheDocument();
  });

  it("renderiza os dados principais e as formas como links", () => {
    renderComponent({
      selectedFormId: 10080,
      isBaseSelected: false,
    });

    const baseLink = screen.getByRole("link", {
      name: "Ver dados principais do Pokémon",
    });

    const selectedForm = screen.getByRole("link", {
      name: "Ver forma Pikachu Cosplay",
    });

    expect(baseLink).toHaveAttribute("href", "/pokemon/25");

    expect(baseLink).not.toHaveAttribute("aria-current");

    expect(selectedForm).toHaveAttribute("href", "/pokemon/25?form=10080");

    expect(selectedForm).toHaveAttribute("aria-current", "true");
  });

  it("marca os dados principais quando nenhuma forma está selecionada", () => {
    renderComponent();

    expect(
      screen.getByRole("link", {
        name: "Ver dados principais do Pokémon",
      }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("permite alcançar as opções pelo teclado", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.tab();

    expect(
      screen.getByRole("link", {
        name: "Ver variação Pikachu, padrão",
      }),
    ).toHaveFocus();
  });

  it("oferece retorno aos dados principais em um estado de query inválida", () => {
    renderComponent({
      availableVariations: [variations[0]],
      availableForms: [forms[0]],
      selectedFormId: null,
      isBaseSelected: false,
    });

    const baseLink = screen.getByRole("link", {
      name: "Ver dados principais do Pokémon",
    });

    expect(baseLink).toHaveAttribute("href", "/pokemon/25");

    expect(baseLink).not.toHaveAttribute("aria-current");
  });
});
