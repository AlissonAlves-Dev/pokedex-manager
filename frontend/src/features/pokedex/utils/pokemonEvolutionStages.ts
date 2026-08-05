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

type PokemonEvolutionStageParent = {
  node: PokemonEvolutionNode | null;
  emptyGroupParentSpeciesId: number;
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

  let previousStageParents: PokemonEvolutionStageParent[] = [
    {
      node: root,
      emptyGroupParentSpeciesId: root.speciesId,
    },
  ];

  let depth = 1;

  while (
    previousStageParents.some(
      ({ node }) => node !== null && node.evolvesTo.length > 0,
    )
  ) {
    const groups: PokemonEvolutionStageGroup[] = previousStageParents.map(
      ({ node, emptyGroupParentSpeciesId }) => {
        if (node === null) {
          return {
            parentSpeciesId: emptyGroupParentSpeciesId,
            items: [],
          };
        }

        return {
          parentSpeciesId: node.speciesId,
          items: node.evolvesTo.map((evolutionNode) => ({
            node: evolutionNode,
            parentSpeciesId: node.speciesId,
          })),
        };
      },
    );

    stages.push({
      depth,
      groups,
    });

    previousStageParents = groups.flatMap(
      (group): PokemonEvolutionStageParent[] => {
        if (group.items.length === 0) {
          return [
            {
              node: null,
              emptyGroupParentSpeciesId:
                group.parentSpeciesId ?? root.speciesId,
            },
          ];
        }

        return group.items.map(({ node }) => ({
          node,
          emptyGroupParentSpeciesId: node.speciesId,
        }));
      },
    );

    depth += 1;
  }

  return stages;
}
