import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { PokemonFormDetails } from "../../types/pokemon";

import { PokemonFormDetailsPanel } from "./PokemonFormDetailsPanel";

function createPokemonFormDetails(
  overrides: Partial<PokemonFormDetails> = {},
): PokemonFormDetails {
  return {
    id: 10034,
    pokemonId: 10034,

    name: "charizard-mega-x",
    displayName: "Charizard Mega X",
    formName: "mega-x",

    isDefault: false,
    isBattleOnly: true,
    isMega: true,

    formOrder: 2,

    types: ["fire", "dragon"],

    sprites: {
      frontDefaultUrl: "https://example.com/charizard-mega-x.png",
      frontShinyUrl: "https://example.com/charizard-mega-x-shiny.png",
    },

    versionGroupName: "x-y",

    ...overrides,
  };
}

describe("PokemonFormDetailsPanel", () => {
  it("exibe as informações principais da forma", () => {
    render(
      <PokemonFormDetailsPanel pokemonForm={createPokemonFormDetails()} />,
    );

    expect(
      screen.getByRole("region", {
        name: "Charizard Mega X",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Charizard Mega X",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("ID da forma #10034")).toBeInTheDocument();

    expect(screen.getByText("Mega X")).toBeInTheDocument();
    expect(screen.getByText("X Y")).toBeInTheDocument();
  });

  it("exibe os tipos traduzidos da forma", () => {
    render(
      <PokemonFormDetailsPanel pokemonForm={createPokemonFormDetails()} />,
    );

    const types = screen.getByRole("group", {
      name: "Tipos da forma",
    });

    expect(within(types).getByText("Fogo")).toBeInTheDocument();

    expect(within(types).getByText("Dragão")).toBeInTheDocument();
  });

  it("exibe as características oficiais da forma", () => {
    render(
      <PokemonFormDetailsPanel pokemonForm={createPokemonFormDetails()} />,
    );

    const characteristics = screen.getByRole("group", {
      name: "Características da forma",
    });

    expect(within(characteristics).getByText("Mega")).toBeInTheDocument();

    expect(
      within(characteristics).getByText("Somente em batalha"),
    ).toBeInTheDocument();

    expect(
      within(characteristics).queryByText("Padrão"),
    ).not.toBeInTheDocument();
  });

  it("identifica uma forma padrão", () => {
    render(
      <PokemonFormDetailsPanel
        pokemonForm={createPokemonFormDetails({
          isDefault: true,
          isMega: false,
          isBattleOnly: false,
        })}
      />,
    );

    const characteristics = screen.getByRole("group", {
      name: "Características da forma",
    });

    expect(within(characteristics).getByText("Padrão")).toBeInTheDocument();

    expect(within(characteristics).queryByText("Mega")).not.toBeInTheDocument();

    expect(
      within(characteristics).queryByText("Somente em batalha"),
    ).not.toBeInTheDocument();
  });

  it("exibe os sprites padrão e shiny", () => {
    render(
      <PokemonFormDetailsPanel pokemonForm={createPokemonFormDetails()} />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Sprites",
        level: 3,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Sprite frontal padrão de Charizard Mega X",
      }),
    ).toHaveAttribute("src", "https://example.com/charizard-mega-x.png");

    expect(
      screen.getByRole("img", {
        name: "Sprite frontal shiny de Charizard Mega X",
      }),
    ).toHaveAttribute("src", "https://example.com/charizard-mega-x-shiny.png");
  });

  it("exibe indisponibilidade quando os sprites estão ausentes", () => {
    render(
      <PokemonFormDetailsPanel
        pokemonForm={createPokemonFormDetails({
          sprites: {
            frontDefaultUrl: null,
            frontShinyUrl: null,
          },
        })}
      />,
    );

    expect(screen.getByText("Sprite padrão indisponível.")).toBeInTheDocument();

    expect(screen.getByText("Sprite shiny indisponível.")).toBeInTheDocument();
  });

  it("exibe valores não informados para metadados ausentes", () => {
    render(
      <PokemonFormDetailsPanel
        pokemonForm={createPokemonFormDetails({
          formName: null,
          versionGroupName: null,
        })}
      />,
    );

    expect(screen.getAllByText("Não informado")).toHaveLength(2);
  });

  it("não cria uma região de características vazia", () => {
    render(
      <PokemonFormDetailsPanel
        pokemonForm={createPokemonFormDetails({
          isDefault: false,
          isMega: false,
          isBattleOnly: false,
        })}
      />,
    );

    expect(
      screen.queryByRole("group", {
        name: "Características da forma",
      }),
    ).not.toBeInTheDocument();
  });
});
