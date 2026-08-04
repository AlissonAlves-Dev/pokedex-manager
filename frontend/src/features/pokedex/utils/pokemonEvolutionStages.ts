import type { PokemonEvolutionNode } from "../types/pokemon";

export type PokemonEvolutionStageItem = {
  node: PokemonEvolutionNode;
  parentSpeciesId: number | null;
};

export type PokemonEvolutionStageGroup = {
  parentSpeciesId: number | null;
  items: PokemonEvolutionStageItem[];
};

export type PokemonEvolutionStage = {
  depth: number;
  groups: PokemonEvolutionStageGroup[];
};

export function getPokemonEvolutionStageItems(
  stage: PokemonEvolutionStage,
): PokemonEvolutionStageItem[] {
  return stage.groups.flatMap((group) => group.items);
}

export function createPokemonEvolutionStages(
  root: PokemonEvolutionNode,
): PokemonEvolutionStage[] {
  const stages: PokemonEvolutionStage[] = [
    {
      depth: 0,
      groups: [
        {
          parentSpeciesId: null,
          items: [
            {
              node: root,
              parentSpeciesId: null,
            },
          ],
        },
      ],
    },
  ];

  let previousStageNodes: PokemonEvolutionNode[] = [root];
  let depth = 1;

  while (previousStageNodes.some((node) => node.evolvesTo.length > 0)) {
    const groups: PokemonEvolutionStageGroup[] = previousStageNodes.map(
      (parentNode) => ({
        parentSpeciesId: parentNode.speciesId,
        items: parentNode.evolvesTo.map((node) => ({
          node,
          parentSpeciesId: parentNode.speciesId,
        })),
      }),
    );

    stages.push({
      depth,
      groups,
    });

    previousStageNodes = groups.flatMap((group) =>
      group.items.map((item) => item.node),
    );

    depth += 1;
  }

  return stages;
}
