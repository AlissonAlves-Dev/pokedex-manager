import { describe, expect, it } from "vitest";

import type { PokemonEvolutionNode } from "../types/pokemon";
import {
  createPokemonEvolutionStages,
  getPokemonEvolutionStageItems,
} from "./pokemonEvolutionStages";

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

    expect(stages).toEqual([
      {
        depth: 0,
        groups: [
          {
            parentSpeciesId: null,
            items: [
              {
                node: ditto,
                parentSpeciesId: null,
              },
            ],
          },
        ],
      },
    ]);
  });

  it("organiza uma cadeia linear por profundidade", () => {
    const venusaur = createEvolutionNode(3, "venusaur");

    const ivysaur = createEvolutionNode(2, "ivysaur", [venusaur]);

    const bulbasaur = createEvolutionNode(1, "bulbasaur", [ivysaur]);

    const stages = createPokemonEvolutionStages(bulbasaur);

    expect(stages).toHaveLength(3);

    expect(
      stages.map((stage) =>
        getPokemonEvolutionStageItems(stage).map(({ node }) => node.name),
      ),
    ).toEqual([["bulbasaur"], ["ivysaur"], ["venusaur"]]);

    expect(stages[1].groups).toHaveLength(1);
    expect(stages[1].groups[0].parentSpeciesId).toBe(1);

    expect(stages[2].groups).toHaveLength(1);
    expect(stages[2].groups[0].parentSpeciesId).toBe(2);
  });

  it("mantém evoluções do mesmo pai no mesmo grupo", () => {
    const eevee = createEvolutionNode(133, "eevee", [
      createEvolutionNode(134, "vaporeon"),
      createEvolutionNode(135, "jolteon"),
      createEvolutionNode(136, "flareon"),
    ]);

    const stages = createPokemonEvolutionStages(eevee);

    expect(stages).toHaveLength(2);
    expect(stages[1].groups).toHaveLength(1);

    expect(stages[1].groups[0].parentSpeciesId).toBe(133);

    expect(stages[1].groups[0].items.map(({ node }) => node.name)).toEqual([
      "vaporeon",
      "jolteon",
      "flareon",
    ]);
  });

  it("preserva grupos distintos em ramificações que continuam evoluindo", () => {
    const beautifly = createEvolutionNode(267, "beautifly");

    const dustox = createEvolutionNode(269, "dustox");

    const silcoon = createEvolutionNode(266, "silcoon", [beautifly]);

    const cascoon = createEvolutionNode(268, "cascoon", [dustox]);

    const wurmple = createEvolutionNode(265, "wurmple", [silcoon, cascoon]);

    const stages = createPokemonEvolutionStages(wurmple);

    expect(stages).toHaveLength(3);
    expect(stages[2].groups).toHaveLength(2);

    expect(stages[2].groups[0]).toEqual({
      parentSpeciesId: 266,
      items: [
        {
          node: beautifly,
          parentSpeciesId: 266,
        },
      ],
    });

    expect(stages[2].groups[1]).toEqual({
      parentSpeciesId: 268,
      items: [
        {
          node: dustox,
          parentSpeciesId: 268,
        },
      ],
    });
  });

  it("preserva um grupo vazio quando uma ramificação termina antes das demais", () => {
    const finalEvolution = createEvolutionNode(302, "final-evolution");

    const continuingBranch = createEvolutionNode(301, "continuing-branch", [
      finalEvolution,
    ]);

    const finishedBranch = createEvolutionNode(401, "finished-branch");

    const root = createEvolutionNode(300, "root", [
      continuingBranch,
      finishedBranch,
    ]);

    const stages = createPokemonEvolutionStages(root);

    expect(stages).toHaveLength(3);
    expect(stages[2].groups).toHaveLength(2);

    expect(stages[2].groups[0]).toEqual({
      parentSpeciesId: 301,
      items: [
        {
          node: finalEvolution,
          parentSpeciesId: 301,
        },
      ],
    });

    expect(stages[2].groups[1]).toEqual({
      parentSpeciesId: 401,
      items: [],
    });
  });

  it("preserva múltiplas evoluções posteriores do mesmo pai", () => {
    const firstEvolution = createEvolutionNode(502, "first-evolution");

    const secondEvolution = createEvolutionNode(503, "second-evolution");

    const firstBranch = createEvolutionNode(501, "first-branch", [
      firstEvolution,
      secondEvolution,
    ]);

    const secondBranchEvolution = createEvolutionNode(
      602,
      "second-branch-evolution",
    );

    const secondBranch = createEvolutionNode(601, "second-branch", [
      secondBranchEvolution,
    ]);

    const root = createEvolutionNode(500, "root", [firstBranch, secondBranch]);

    const stages = createPokemonEvolutionStages(root);

    expect(stages[2].groups).toHaveLength(2);

    expect(stages[2].groups[0].items.map(({ node }) => node.name)).toEqual([
      "first-evolution",
      "second-evolution",
    ]);

    expect(stages[2].groups[1].items.map(({ node }) => node.name)).toEqual([
      "second-branch-evolution",
    ]);
  });

  it("preserva a ordem dos pais e das evoluções", () => {
    const firstParent = createEvolutionNode(701, "first-parent", [
      createEvolutionNode(703, "first-child"),
      createEvolutionNode(704, "second-child"),
    ]);

    const secondParent = createEvolutionNode(702, "second-parent", [
      createEvolutionNode(705, "third-child"),
    ]);

    const root = createEvolutionNode(700, "root", [firstParent, secondParent]);

    const stages = createPokemonEvolutionStages(root);

    expect(
      stages[2].groups.map((group) => ({
        parentSpeciesId: group.parentSpeciesId,
        children: group.items.map(({ node }) => node.speciesId),
      })),
    ).toEqual([
      {
        parentSpeciesId: 701,
        children: [703, 704],
      },
      {
        parentSpeciesId: 702,
        children: [705],
      },
    ]);
  });
});

describe("getPokemonEvolutionStageItems", () => {
  it("retorna os itens de todos os grupos na ordem visual", () => {
    const root = createEvolutionNode(800, "root", [
      createEvolutionNode(801, "first"),
      createEvolutionNode(802, "second"),
    ]);

    const stages = createPokemonEvolutionStages(root);

    expect(
      getPokemonEvolutionStageItems(stages[1]).map(({ node }) => node.name),
    ).toEqual(["first", "second"]);
  });
});
