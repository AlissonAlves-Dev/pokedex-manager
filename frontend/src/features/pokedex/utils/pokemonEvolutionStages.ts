import type { PokemonEvolutionNode } from "../types/pokemon";

export type PokemonEvolutionStageItem = {
  node: PokemonEvolutionNode;
  parentSpeciesId: number | null;
};

export type PokemonEvolutionStage = {
  depth: number;
  items: PokemonEvolutionStageItem[];
};

export function createPokemonEvolutionStages(
  root: PokemonEvolutionNode,
): PokemonEvolutionStage[] {
  const stages: PokemonEvolutionStage[] = [];

  function visitNode(
    node: PokemonEvolutionNode,
    depth: number,
    parentSpeciesId: number | null,
  ) {
    const existingStage = stages[depth];

    const stageItem: PokemonEvolutionStageItem = {
      node,
      parentSpeciesId,
    };

    if (existingStage) {
      existingStage.items.push(stageItem);
    } else {
      stages.push({
        depth,
        items: [stageItem],
      });
    }

    node.evolvesTo.forEach((nextNode) => {
      visitNode(nextNode, depth + 1, node.speciesId);
    });
  }

  visitNode(root, 0, null);

  return stages;
}
