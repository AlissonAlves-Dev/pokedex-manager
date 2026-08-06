import { describe, expect, it } from "vitest";

import type { PokemonFormReference } from "../types/pokemon";
import { resolvePokemonFormSelection } from "./pokemonFormSelection";

function createAvailableForms(): PokemonFormReference[] {
  return [
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
}

describe("resolvePokemonFormSelection", () => {
  it("retorna o estado base quando o parâmetro está ausente", () => {
    expect(
      resolvePokemonFormSelection(
        {
          status: "absent",
          formId: null,
        },
        createAvailableForms(),
      ),
    ).toEqual({
      status: "base",
      formId: null,
      form: null,
    });
  });

  it("retorna query inválida sem consultar as formas disponíveis", () => {
    expect(
      resolvePokemonFormSelection(
        {
          status: "invalid",
          formId: null,
        },
        createAvailableForms(),
      ),
    ).toEqual({
      status: "invalid-query",
      formId: null,
      form: null,
    });
  });

  it("seleciona uma forma disponível pelo ID", () => {
    expect(
      resolvePokemonFormSelection(
        {
          status: "valid",
          formId: 10080,
        },
        createAvailableForms(),
      ),
    ).toEqual({
      status: "selected",
      formId: 10080,
      form: {
        id: 10080,
        name: "pikachu-cosplay",
        displayName: "Pikachu Cosplay",
      },
    });
  });

  it("retorna indisponível quando o ID não pertence ao Pokémon", () => {
    expect(
      resolvePokemonFormSelection(
        {
          status: "valid",
          formId: 99999,
        },
        createAvailableForms(),
      ),
    ).toEqual({
      status: "unavailable",
      formId: 99999,
      form: null,
    });
  });

  it("retorna indisponível quando a lista de formas está vazia", () => {
    expect(
      resolvePokemonFormSelection(
        {
          status: "valid",
          formId: 25,
        },
        [],
      ),
    ).toEqual({
      status: "unavailable",
      formId: 25,
      form: null,
    });
  });

  it("não altera a ordem nem o conteúdo das formas recebidas", () => {
    const availableForms = createAvailableForms();
    const originalForms = structuredClone(availableForms);

    resolvePokemonFormSelection(
      {
        status: "valid",
        formId: 10080,
      },
      availableForms,
    );

    expect(availableForms).toEqual(originalForms);
  });
});
