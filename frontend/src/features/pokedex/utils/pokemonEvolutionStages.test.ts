import { describe, expect, it } from "vitest";

import type { PokemonEvolutionNode } from "../types/pokemon";
import { createPokemonEvolutionStages } from "./pokemonEvolutionStages";

function createEvolutionNode(
  speciesId: number,
  name: string,
  evolvesTo: PokemonEvolutionNode[] = [],
): PokemonEvolutionNode {
  return {
    speciesId,
    name,
    imageUrl: `https://example.com/${speciesId}.png`,
    isBaby: false,
    evolutionOptions: [],
    evolvesTo,
  };
}

describe("createPokemonEvolutionStages", () => {
  it("cria um único estágio para Pokémon sem evolução", () => {
    const ditto = createEvolutionNode(132, "ditto");

    const stages = createPokemonEvolutionStages(ditto);

    expect(stages).toHaveLength(1);

    expect(stages[0]).toEqual({
      depth: 0,
      items: [
        {
          node: ditto,
          parentSpeciesId: null,
        },
      ],
    });
  });

  it("organiza uma cadeia linear por profundidade", () => {
    const venusaur = createEvolutionNode(3, "venusaur");
    const ivysaur = createEvolutionNode(2, "ivysaur", [venusaur]);
    const bulbasaur = createEvolutionNode(1, "bulbasaur", [ivysaur]);

    const stages = createPokemonEvolutionStages(bulbasaur);

    expect(stages).toHaveLength(3);

    expect(
      stages.map((stage) => stage.items.map(({ node }) => node.name)),
    ).toEqual([["bulbasaur"], ["ivysaur"], ["venusaur"]]);

    expect(stages[1].items[0].parentSpeciesId).toBe(1);
    expect(stages[2].items[0].parentSpeciesId).toBe(2);
  });

  it("mantém evoluções ramificadas no mesmo estágio", () => {
    const eevee = createEvolutionNode(133, "eevee", [
      createEvolutionNode(134, "vaporeon"),
      createEvolutionNode(135, "jolteon"),
      createEvolutionNode(136, "flareon"),
    ]);

    const stages = createPokemonEvolutionStages(eevee);

    expect(stages).toHaveLength(2);

    expect(stages[1].items.map(({ node }) => node.name)).toEqual([
      "vaporeon",
      "jolteon",
      "flareon",
    ]);

    expect(
      stages[1].items.map(({ parentSpeciesId }) => parentSpeciesId),
    ).toEqual([133, 133, 133]);
  });

  it("preserva os pais em ramificações que continuam evoluindo", () => {
    const beautifly = createEvolutionNode(267, "beautifly");

    const dustox = createEvolutionNode(269, "dustox");

    const silcoon = createEvolutionNode(266, "silcoon", [beautifly]);

    const cascoon = createEvolutionNode(268, "cascoon", [dustox]);

    const wurmple = createEvolutionNode(265, "wurmple", [silcoon, cascoon]);

    const stages = createPokemonEvolutionStages(wurmple);

    expect(stages).toHaveLength(3);

    expect(stages[1].items.map(({ node }) => node.name)).toEqual([
      "silcoon",
      "cascoon",
    ]);

    expect(stages[2].items.map(({ node }) => node.name)).toEqual([
      "beautifly",
      "dustox",
    ]);

    expect(
      stages[2].items.map((item) => ({
        name: item.node.name,
        parentSpeciesId: item.parentSpeciesId,
      })),
    ).toEqual([
      {
        name: "beautifly",
        parentSpeciesId: 266,
      },
      {
        name: "dustox",
        parentSpeciesId: 268,
      },
    ]);
  });
});
