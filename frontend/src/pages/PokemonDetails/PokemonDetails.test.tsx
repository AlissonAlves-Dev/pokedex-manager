import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { usePokemonDetails } from "../../features/pokedex/hooks/usePokemonDetails";
import { usePokemonForm } from "../../features/pokedex/hooks/usePokemonForm";

import type {
  PokemonDetails as PokemonDetailsData,
  PokemonFormDetails,
} from "../../features/pokedex/types/pokemon";

import { PokemonDetails } from "./PokemonDetails";

vi.mock("../../features/pokedex/hooks/usePokemonDetails", () => ({
  usePokemonDetails: vi.fn(),
}));

vi.mock("../../features/pokedex/hooks/usePokemonForm", () => ({
  usePokemonForm: vi.fn(),
}));

const usePokemonDetailsMock = vi.mocked(usePokemonDetails);
const usePokemonFormMock = vi.mocked(usePokemonForm);

const retryPokemonDetailsMock = vi.fn();
const retryPokemonFormMock = vi.fn();

function createPokemonDetails(
  overrides: Partial<PokemonDetailsData> = {},
): PokemonDetailsData {
  return {
    id: 25,
    name: "pikachu",
    imageUrl: "https://example.com/pikachu.png",
    types: ["electric"],

    description: "Um Pokémon elétrico.",
    evolutionChain: null,

    isDefaultVariation: true,

    variations: [
      {
        id: 25,
        name: "pikachu",
        displayName: "Pikachu",
        isDefault: true,
      },
    ],

    forms: [
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
    ],

    formsSwitchable: true,
    hasGenderDifferences: false,

    sprites: {
      frontDefaultUrl: null,
      frontShinyUrl: null,
    },

    height: 4,
    weight: 60,

    abilities: [],
    stats: [],

    ...overrides,
  };
}

function createPokemonFormDetails(
  overrides: Partial<PokemonFormDetails> = {},
): PokemonFormDetails {
  return {
    id: 10080,
    pokemonId: 25,

    name: "pikachu-cosplay",
    displayName: "Pikachu Cosplay",
    formName: "cosplay",

    isDefault: false,
    isBattleOnly: false,
    isMega: false,

    formOrder: 2,

    types: ["electric"],

    sprites: {
      frontDefaultUrl: "https://example.com/pikachu-cosplay.png",
      frontShinyUrl: "https://example.com/pikachu-cosplay-shiny.png",
    },

    versionGroupName: "omega-ruby-alpha-sapphire",

    ...overrides,
  };
}

function renderPokemonDetails(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("scrollTo", vi.fn());

  usePokemonDetailsMock.mockReturnValue({
    pokemon: createPokemonDetails(),
    isLoading: false,
    error: null,
    retry: retryPokemonDetailsMock,
  });

  usePokemonFormMock.mockReturnValue({
    pokemonForm: null,
    isLoading: false,
    error: null,
    retry: retryPokemonFormMock,
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("PokemonDetails", () => {
  it("mantém os dados principais sem selecionar uma forma", () => {
    renderPokemonDetails("/pokemon/25");

    const baseLink = screen.getByRole("link", {
      name: "Ver dados principais do Pokémon",
    });

    expect(baseLink).toHaveAttribute("href", "/pokemon/25");

    expect(baseLink).toHaveAttribute("aria-current", "true");

    expect(usePokemonDetailsMock).toHaveBeenLastCalledWith(25);

    expect(usePokemonFormMock).toHaveBeenLastCalledWith(25, null);

    expect(
      screen.queryByRole("region", {
        name: "Estado da forma selecionada",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Detalhes do Pokémon",
      }),
    ).toBeInTheDocument();
  });

  it("não seleciona uma forma quando a query é inválida", () => {
    renderPokemonDetails("/pokemon/25?form=abc");

    expect(usePokemonFormMock).toHaveBeenLastCalledWith(25, null);

    expect(
      screen.getByText("O parâmetro de forma informado na URL é inválido."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Detalhes do Pokémon",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Ver dados principais do Pokémon",
      }),
    ).not.toHaveAttribute("aria-current");
  });

  it("não carrega uma forma que não pertence à lista disponível", () => {
    renderPokemonDetails("/pokemon/25?form=99999");

    expect(usePokemonFormMock).toHaveBeenLastCalledWith(25, null);

    expect(
      screen.getByText(
        "A forma solicitada não está disponível para este Pokémon.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Detalhes do Pokémon",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Ver dados principais do Pokémon",
      }),
    ).not.toHaveAttribute("aria-current");
  });

  it("exibe loading local para uma forma disponível", () => {
    usePokemonFormMock.mockReturnValue({
      pokemonForm: null,
      isLoading: true,
      error: null,
      retry: retryPokemonFormMock,
    });

    renderPokemonDetails("/pokemon/25?form=10080");

    expect(usePokemonFormMock).toHaveBeenLastCalledWith(25, 10080);

    const formRegion = screen.getByRole("region", {
      name: "Estado da forma selecionada",
    });

    expect(formRegion).toHaveAttribute("aria-busy", "true");

    expect(
      screen.getByText("Carregando forma do Pokémon..."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Detalhes do Pokémon",
      }),
    ).toBeInTheDocument();
  });

  it("exibe a forma selecionada depois do carregamento", () => {
    const pokemonForm = createPokemonFormDetails();

    usePokemonFormMock.mockReturnValue({
      pokemonForm,
      isLoading: false,
      error: null,
      retry: retryPokemonFormMock,
    });

    renderPokemonDetails("/pokemon/25?form=10080");

    expect(usePokemonFormMock).toHaveBeenLastCalledWith(25, 10080);

    expect(screen.queryByText("Forma selecionada:")).not.toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "Pikachu Cosplay",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Pikachu Cosplay",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Detalhes do Pokémon",
      }),
    ).toBeInTheDocument();

    const selectedFormLink = screen.getByRole("link", {
      name: "Ver forma Pikachu Cosplay",
    });

    expect(selectedFormLink).toHaveAttribute("href", "/pokemon/25?form=10080");

    expect(selectedFormLink).toHaveAttribute("aria-current", "true");

    expect(
      screen.getByRole("link", {
        name: "Ver dados principais do Pokémon",
      }),
    ).not.toHaveAttribute("aria-current");
  });

  it("permite tentar novamente somente o carregamento da forma", async () => {
    const user = userEvent.setup();

    usePokemonFormMock.mockReturnValue({
      pokemonForm: null,
      isLoading: false,
      error: "Falha temporária ao carregar a forma.",
      retry: retryPokemonFormMock,
    });

    renderPokemonDetails("/pokemon/25?form=10080");

    expect(
      screen.getByRole("heading", {
        name: "Não foi possível carregar a forma",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Falha temporária ao carregar a forma."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Detalhes do Pokémon",
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Tentar novamente",
      }),
    );

    expect(retryPokemonFormMock).toHaveBeenCalledTimes(1);

    expect(retryPokemonDetailsMock).not.toHaveBeenCalled();
  });

  it("não seleciona a forma antes de carregar os detalhes principais", () => {
    usePokemonDetailsMock.mockReturnValue({
      pokemon: null,
      isLoading: true,
      error: null,
      retry: retryPokemonDetailsMock,
    });

    renderPokemonDetails("/pokemon/25?form=10080");

    expect(usePokemonDetailsMock).toHaveBeenLastCalledWith(25);

    expect(usePokemonFormMock).toHaveBeenLastCalledWith(null, null);

    expect(
      screen.getByText("Carregando detalhes do Pokémon..."),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("region", {
        name: "Estado da forma selecionada",
      }),
    ).not.toBeInTheDocument();
  });
});
