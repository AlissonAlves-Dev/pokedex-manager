import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import type {
  PokemonEvolutionChain as PokemonEvolutionChainData,
  PokemonEvolutionNode,
  PokemonEvolutionRequirements,
} from "../../types/pokemon";
import { PokemonEvolutionChain } from "./PokemonEvolutionChain";

type CreateEvolutionNodeOptions = {
  speciesId: number;
  name: string;
  imageUrl?: string;
  isBaby?: boolean;
  evolutionOptions?: PokemonEvolutionRequirements[];
  evolvesTo?: PokemonEvolutionNode[];
};

function createEvolutionRequirements(
  overrides: Partial<PokemonEvolutionRequirements> = {},
): PokemonEvolutionRequirements {
  return {
    triggerName: "level-up",
    versionGroupName: null,

    itemName: null,
    heldItemName: null,
    knownMoveName: null,
    knownMoveTypeName: null,
    locationName: null,
    partySpeciesName: null,
    partyTypeName: null,
    tradeSpeciesName: null,

    gender: null,
    minLevel: null,
    minHappiness: null,
    minBeauty: null,
    minAffection: null,
    relativePhysicalStats: null,

    timeOfDay: null,

    nearSpecialRock: false,
    needsOverworldRain: false,
    turnUpsideDown: false,

    ...overrides,
  };
}

function createEvolutionNode({
  speciesId,
  name,
  imageUrl = `https://example.com/pokemon/${speciesId}.png`,
  isBaby = false,
  evolutionOptions = [],
  evolvesTo = [],
}: CreateEvolutionNodeOptions): PokemonEvolutionNode {
  return {
    speciesId,
    name,
    imageUrl,
    isBaby,
    evolutionOptions,
    evolvesTo,
  };
}

function createEvolutionChain(
  root: PokemonEvolutionNode,
  id = 1,
): PokemonEvolutionChainData {
  return {
    id,
    root,
  };
}

function createBulbasaurChain(): PokemonEvolutionChainData {
  const venusaur = createEvolutionNode({
    speciesId: 3,
    name: "venusaur",
    evolutionOptions: [
      createEvolutionRequirements({
        minLevel: 32,
      }),
    ],
  });

  const ivysaur = createEvolutionNode({
    speciesId: 2,
    name: "ivysaur",
    evolutionOptions: [
      createEvolutionRequirements({
        minLevel: 16,
      }),
    ],
    evolvesTo: [venusaur],
  });

  const bulbasaur = createEvolutionNode({
    speciesId: 1,
    name: "bulbasaur",
    isBaby: true,
    evolvesTo: [ivysaur],
  });

  return createEvolutionChain(bulbasaur);
}

function createEeveeChain(): PokemonEvolutionChainData {
  const vaporeon = createEvolutionNode({
    speciesId: 134,
    name: "vaporeon",
    evolutionOptions: [
      createEvolutionRequirements({
        triggerName: "use-item",
        itemName: "water-stone",
      }),
    ],
  });

  const jolteon = createEvolutionNode({
    speciesId: 135,
    name: "jolteon",
    evolutionOptions: [
      createEvolutionRequirements({
        triggerName: "use-item",
        itemName: "thunder-stone",
      }),
    ],
  });

  const sylveon = createEvolutionNode({
    speciesId: 700,
    name: "sylveon",
    evolutionOptions: [
      createEvolutionRequirements({
        minHappiness: 160,
        knownMoveTypeName: "fairy",
      }),
    ],
  });

  const eevee = createEvolutionNode({
    speciesId: 133,
    name: "eevee",
    evolvesTo: [vaporeon, jolteon, sylveon],
  });

  return createEvolutionChain(eevee, 67);
}

function createWurmpleChain(): PokemonEvolutionChainData {
  const beautifly = createEvolutionNode({
    speciesId: 267,
    name: "beautifly",
    evolutionOptions: [
      createEvolutionRequirements({
        minLevel: 10,
      }),
    ],
  });

  const dustox = createEvolutionNode({
    speciesId: 269,
    name: "dustox",
    evolutionOptions: [
      createEvolutionRequirements({
        minLevel: 10,
      }),
    ],
  });

  const silcoon = createEvolutionNode({
    speciesId: 266,
    name: "silcoon",
    evolutionOptions: [
      createEvolutionRequirements({
        minLevel: 7,
      }),
    ],
    evolvesTo: [beautifly],
  });

  const cascoon = createEvolutionNode({
    speciesId: 268,
    name: "cascoon",
    evolutionOptions: [
      createEvolutionRequirements({
        minLevel: 7,
      }),
    ],
    evolvesTo: [dustox],
  });

  const wurmple = createEvolutionNode({
    speciesId: 265,
    name: "wurmple",
    evolvesTo: [silcoon, cascoon],
  });

  return createEvolutionChain(wurmple, 135);
}

function renderEvolutionChain(
  evolutionChain: PokemonEvolutionChainData | null,
  currentPokemonId: number,
) {
  return render(
    <MemoryRouter initialEntries={[`/pokemon/${currentPokemonId}`]}>
      <PokemonEvolutionChain
        evolutionChain={evolutionChain}
        currentPokemonId={currentPokemonId}
      />
    </MemoryRouter>,
  );
}

describe("PokemonEvolutionChain", () => {
  it("exibe o estado de indisponibilidade quando a cadeia não foi carregada", () => {
    renderEvolutionChain(null, 25);

    expect(
      screen.getByRole("heading", {
        name: "Cadeia de evolução",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Não foi possível carregar a cadeia de evolução deste Pokémon.",
      ),
    ).toBeInTheDocument();

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("exibe somente uma mensagem para Pokémon sem evoluções conhecidas", () => {
    const ditto = createEvolutionNode({
      speciesId: 132,
      name: "ditto",
    });

    renderEvolutionChain(createEvolutionChain(ditto, 66), 132);

    expect(
      screen.getByText("Este Pokémon não possui evoluções conhecidas."),
    ).toBeInTheDocument();

    expect(screen.queryByText("Ditto")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renderiza uma cadeia linear com links e requisitos correspondentes", () => {
    renderEvolutionChain(createBulbasaurChain(), 1);

    const bulbasaurCard = screen.getByRole("group", {
      name: "Bulbasaur, número 1, Pokémon atual",
    });

    const ivysaurLink = screen.getByRole("link", {
      name: "Ver detalhes de Ivysaur",
    });

    const venusaurLink = screen.getByRole("link", {
      name: "Ver detalhes de Venusaur",
    });

    expect(bulbasaurCard).toHaveAttribute("aria-current", "page");

    expect(
      screen.queryByRole("link", {
        name: "Ver detalhes de Bulbasaur",
      }),
    ).not.toBeInTheDocument();

    expect(ivysaurLink).toHaveAttribute("href", "/pokemon/2");
    expect(venusaurLink).toHaveAttribute("href", "/pokemon/3");

    expect(
      within(bulbasaurCard).queryByText("Requisitos para evoluir"),
    ).not.toBeInTheDocument();

    expect(
      within(ivysaurLink).getByText("Requisitos para evoluir"),
    ).toBeInTheDocument();

    expect(
      within(ivysaurLink).getByText("Atingir o nível 16"),
    ).toBeInTheDocument();

    expect(
      within(venusaurLink).getByText("Atingir o nível 32"),
    ).toBeInTheDocument();
  });

  it("identifica corretamente um Pokémon intermediário como atual", () => {
    renderEvolutionChain(createBulbasaurChain(), 2);

    const ivysaurCard = screen.getByRole("group", {
      name: "Ivysaur, número 2, Pokémon atual",
    });

    expect(ivysaurCard).toHaveAttribute("aria-current", "page");
    expect(ivysaurCard).toHaveAttribute("tabindex", "0");

    expect(
      screen.queryByRole("link", {
        name: "Ver detalhes de Ivysaur",
      }),
    ).not.toBeInTheDocument();

    expect(
      within(ivysaurCard).getByText("Requisitos para evoluir"),
    ).toBeInTheDocument();

    expect(
      within(ivysaurCard).getByText("Atingir o nível 16"),
    ).toBeInTheDocument();

    expect(screen.getByText("Atual")).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Ver detalhes de Bulbasaur",
      }),
    ).toHaveAttribute("href", "/pokemon/1");
  });

  it("mantém os requisitos dentro do card correspondente em uma ramificação", () => {
    renderEvolutionChain(createEeveeChain(), 133);

    const vaporeonLink = screen.getByRole("link", {
      name: "Ver detalhes de Vaporeon",
    });

    const jolteonLink = screen.getByRole("link", {
      name: "Ver detalhes de Jolteon",
    });

    const sylveonLink = screen.getByRole("link", {
      name: "Ver detalhes de Sylveon",
    });

    expect(
      within(vaporeonLink).getByText("Usar Water Stone"),
    ).toBeInTheDocument();

    expect(
      within(jolteonLink).getByText("Usar Thunder Stone"),
    ).toBeInTheDocument();

    expect(within(sylveonLink).getByText("Subir de nível")).toBeInTheDocument();

    expect(
      within(sylveonLink).getByText("Conhecer um golpe do tipo Fairy"),
    ).toBeInTheDocument();

    expect(
      within(sylveonLink).getByText("Felicidade mínima 160"),
    ).toBeInTheDocument();

    expect(
      within(vaporeonLink).queryByText("Felicidade mínima 160"),
    ).not.toBeInTheDocument();

    expect(screen.getByText("Possíveis evoluções")).toBeInTheDocument();
  });

  it("exibe a condição não informada dentro do card de destino", () => {
    const evolvedPokemon = createEvolutionNode({
      speciesId: 901,
      name: "evolved-pokemon",
    });

    const root = createEvolutionNode({
      speciesId: 900,
      name: "root-pokemon",
      evolvesTo: [evolvedPokemon],
    });

    renderEvolutionChain(createEvolutionChain(root), 900);

    const evolvedPokemonLink = screen.getByRole("link", {
      name: "Ver detalhes de Evolved Pokemon",
    });

    expect(
      within(evolvedPokemonLink).getByText("Requisitos para evoluir"),
    ).toBeInTheDocument();

    expect(
      within(evolvedPokemonLink).getByText("Condição não informada"),
    ).toBeInTheDocument();
  });

  it("mantém o selo de Pokémon bebê no card correspondente", () => {
    renderEvolutionChain(createBulbasaurChain(), 1);

    const bulbasaurCard = screen.getByRole("group", {
      name: "Bulbasaur, número 1, Pokémon atual",
    });

    expect(within(bulbasaurCard).getByText("Bebê")).toBeInTheDocument();
  });

  it("substitui o sprite pelo fallback quando a imagem falha", () => {
    renderEvolutionChain(createBulbasaurChain(), 1);

    const ivysaurLink = screen.getByRole("link", {
      name: "Ver detalhes de Ivysaur",
    });

    const ivysaurImage = within(ivysaurLink).getByRole("img", {
      name: "Sprite de Ivysaur",
    });

    fireEvent.error(ivysaurImage);

    expect(
      within(ivysaurLink).getByText("Imagem indisponível"),
    ).toBeInTheDocument();

    expect(
      within(ivysaurLink).queryByRole("img", {
        name: "Sprite de Ivysaur",
      }),
    ).not.toBeInTheDocument();
  });

  it("permite alcançar os cards navegáveis pelo teclado", async () => {
    const user = userEvent.setup();

    renderEvolutionChain(createBulbasaurChain(), 1);

    const ivysaurLink = screen.getByRole("link", {
      name: "Ver detalhes de Ivysaur",
    });

    await user.tab();

    expect(ivysaurLink).toHaveFocus();
  });

  it("preserva a ordem das ramificações que continuam em outro estágio", () => {
    renderEvolutionChain(createWurmpleChain(), 265);

    const links = screen.getAllByRole("link");

    expect(links.map((link) => link.getAttribute("aria-label"))).toEqual([
      "Ver detalhes de Silcoon",
      "Ver detalhes de Cascoon",
      "Ver detalhes de Beautifly",
      "Ver detalhes de Dustox",
    ]);

    expect(screen.getAllByText("Possíveis evoluções")).toHaveLength(2);

    expect(
      screen.getByRole("link", {
        name: "Ver detalhes de Beautifly",
      }),
    ).toHaveAttribute("href", "/pokemon/267");

    expect(
      screen.getByRole("link", {
        name: "Ver detalhes de Dustox",
      }),
    ).toHaveAttribute("href", "/pokemon/269");
  });
});
