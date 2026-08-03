import { describe, expect, it } from "vitest";

import type {
  PokemonApiEvolutionChainLink,
  PokemonApiEvolutionChainResponse,
  PokemonApiEvolutionDetail,
  PokemonApiNamedResource,
} from "../types/pokemonApi";
import { mapPokemonEvolutionChain } from "./pokemonEvolutionMapper";
function createNamedResource(
  name: string,
  url: string,
): PokemonApiNamedResource {
  return {
    name,
    url,
  };
}

function createEvolutionDetail(
  overrides: Partial<PokemonApiEvolutionDetail> = {},
): PokemonApiEvolutionDetail {
  return {
    is_default: true,

    base_form: null,
    evolved_form: null,
    region: null,

    trigger: createNamedResource(
      "level-up",
      "https://pokeapi.co/api/v2/evolution-trigger/1/",
    ),
    version_group: createNamedResource(
      "red-blue",
      "https://pokeapi.co/api/v2/version-group/1/",
    ),

    item: null,
    held_item: null,
    known_move: null,
    known_move_type: null,
    location: null,
    party_species: null,
    party_type: null,
    trade_species: null,

    gender: null,
    min_level: null,
    min_happiness: null,
    min_beauty: null,
    min_affection: null,
    relative_physical_stats: null,

    time_of_day: "",

    near_special_rock: false,
    needs_overworld_rain: false,
    turn_upside_down: false,

    ...overrides,
  };
}

function createChainLink(
  name: string,
  speciesId: number,
  overrides: Partial<PokemonApiEvolutionChainLink> = {},
): PokemonApiEvolutionChainLink {
  return {
    is_baby: false,
    species: createNamedResource(
      name,
      `https://pokeapi.co/api/v2/pokemon-species/${speciesId}/`,
    ),
    evolution_details: [],
    evolves_to: [],
    ...overrides,
  };
}

function createEvolutionChain(
  chain: PokemonApiEvolutionChainLink,
): PokemonApiEvolutionChainResponse {
  return {
    id: 1,
    baby_trigger_item: null,
    chain,
  };
}

describe("mapPokemonEvolutionChain", () => {
  it("mapeia uma espécie sem evolução", () => {
    const evolutionChain = createEvolutionChain(createChainLink("ditto", 132));

    const result = mapPokemonEvolutionChain(evolutionChain);

    expect(result).toEqual({
      id: 1,
      root: {
        speciesId: 132,
        name: "ditto",
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
        isBaby: false,
        evolutionOptions: [],
        evolvesTo: [],
      },
    });
  });

  it("mapeia uma cadeia linear recursivamente", () => {
    const venusaur = createChainLink("venusaur", 3, {
      evolution_details: [
        createEvolutionDetail({
          min_level: 32,
        }),
      ],
    });

    const ivysaur = createChainLink("ivysaur", 2, {
      evolution_details: [
        createEvolutionDetail({
          min_level: 16,
        }),
      ],
      evolves_to: [venusaur],
    });

    const bulbasaur = createChainLink("bulbasaur", 1, {
      evolves_to: [ivysaur],
    });

    const result = mapPokemonEvolutionChain(createEvolutionChain(bulbasaur));

    expect(result.root.name).toBe("bulbasaur");
    expect(result.root.evolvesTo[0].name).toBe("ivysaur");
    expect(result.root.evolvesTo[0].evolutionOptions[0].minLevel).toBe(16);
    expect(
      result.root.evolvesTo[0].evolvesTo[0].evolutionOptions[0].minLevel,
    ).toBe(32);
  });

  it("preserva evoluções ramificadas", () => {
    const eevee = createChainLink("eevee", 133, {
      evolves_to: [
        createChainLink("vaporeon", 134, {
          evolution_details: [
            createEvolutionDetail({
              trigger: createNamedResource(
                "use-item",
                "https://pokeapi.co/api/v2/evolution-trigger/3/",
              ),
              item: createNamedResource(
                "water-stone",
                "https://pokeapi.co/api/v2/item/84/",
              ),
            }),
          ],
        }),
        createChainLink("jolteon", 135, {
          evolution_details: [
            createEvolutionDetail({
              trigger: createNamedResource(
                "use-item",
                "https://pokeapi.co/api/v2/evolution-trigger/3/",
              ),
              item: createNamedResource(
                "thunder-stone",
                "https://pokeapi.co/api/v2/item/83/",
              ),
            }),
          ],
        }),
      ],
    });

    const result = mapPokemonEvolutionChain(createEvolutionChain(eevee));

    expect(result.root.evolvesTo).toHaveLength(2);
    expect(result.root.evolvesTo.map((node) => node.name)).toEqual([
      "vaporeon",
      "jolteon",
    ]);

    expect(result.root.evolvesTo[0].evolutionOptions[0].itemName).toBe(
      "water-stone",
    );
  });

  it("aceita evolution_details como null", () => {
    const evolutionChain = createEvolutionChain(
      createChainLink("mew", 151, {
        evolution_details: null,
      }),
    );

    const result = mapPokemonEvolutionChain(evolutionChain);

    expect(result.root.evolutionOptions).toEqual([]);
  });

  it("prioriza condições marcadas como padrão", () => {
    const leafeon = createChainLink("leafeon", 470, {
      evolution_details: [
        createEvolutionDetail({
          is_default: false,
          location: createNamedResource(
            "eterna-forest",
            "https://pokeapi.co/api/v2/location/8/",
          ),
          near_special_rock: true,
        }),
        createEvolutionDetail({
          is_default: true,
          trigger: createNamedResource(
            "use-item",
            "https://pokeapi.co/api/v2/evolution-trigger/3/",
          ),
          item: createNamedResource(
            "leaf-stone",
            "https://pokeapi.co/api/v2/item/85/",
          ),
        }),
      ],
    });

    const result = mapPokemonEvolutionChain(createEvolutionChain(leafeon));

    expect(result.root.evolutionOptions).toHaveLength(1);
    expect(result.root.evolutionOptions[0].itemName).toBe("leaf-stone");
    expect(result.root.evolutionOptions[0].locationName).toBeNull();
  });

  it("utiliza o primeiro detalhe quando nenhum é padrão", () => {
    const evolutionChain = createEvolutionChain(
      createChainLink("test-pokemon", 999, {
        evolution_details: [
          createEvolutionDetail({
            is_default: false,
            min_level: 20,
          }),
          createEvolutionDetail({
            is_default: false,
            min_level: 30,
          }),
        ],
      }),
    );

    const result = mapPokemonEvolutionChain(evolutionChain);

    expect(result.root.evolutionOptions).toHaveLength(1);
    expect(result.root.evolutionOptions[0].minLevel).toBe(20);
  });

  it("preserva mais de uma condição padrão", () => {
    const evolutionChain = createEvolutionChain(
      createChainLink("test-pokemon", 999, {
        evolution_details: [
          createEvolutionDetail({
            is_default: true,
            min_level: 20,
          }),
          createEvolutionDetail({
            is_default: true,
            min_happiness: 160,
          }),
        ],
      }),
    );

    const result = mapPokemonEvolutionChain(evolutionChain);

    expect(result.root.evolutionOptions).toHaveLength(2);
  });

  it("interrompe o mapeamento quando a URL da espécie é inválida", () => {
    const invalidChainLink = createChainLink("invalid-pokemon", 999, {
      species: createNamedResource(
        "invalid-pokemon",
        "https://pokeapi.co/api/v2/pokemon-species/invalid/",
      ),
    });

    expect(() =>
      mapPokemonEvolutionChain(createEvolutionChain(invalidChainLink)),
    ).toThrow("Não foi possível identificar a espécie pela URL");
  });
});

it("prioriza a espécie-base quando existe uma evolução de forma alternativa", () => {
  const raichu = createChainLink("raichu", 26, {
    evolution_details: [
      createEvolutionDetail({
        trigger: createNamedResource(
          "use-item",
          "https://pokeapi.co/api/v2/evolution-trigger/3/",
        ),
        item: createNamedResource(
          "thunder-stone",
          "https://pokeapi.co/api/v2/item/83/",
        ),
      }),
      createEvolutionDetail({
        trigger: createNamedResource(
          "use-item",
          "https://pokeapi.co/api/v2/evolution-trigger/3/",
        ),
        item: createNamedResource(
          "thunder-stone",
          "https://pokeapi.co/api/v2/item/83/",
        ),
        evolved_form: createNamedResource(
          "raichu-alola",
          "https://pokeapi.co/api/v2/pokemon/10100/",
        ),
        region: createNamedResource(
          "alola",
          "https://pokeapi.co/api/v2/region/7/",
        ),
      }),
    ],
  });

  const result = mapPokemonEvolutionChain(createEvolutionChain(raichu));

  expect(result.root.evolutionOptions).toHaveLength(1);
  expect(result.root.evolutionOptions[0].itemName).toBe("thunder-stone");
});

it("remove condições visualmente iguais de grupos de versões diferentes", () => {
  const raichu = createChainLink("raichu", 26, {
    evolution_details: [
      createEvolutionDetail({
        trigger: createNamedResource(
          "use-item",
          "https://pokeapi.co/api/v2/evolution-trigger/3/",
        ),
        item: createNamedResource(
          "thunder-stone",
          "https://pokeapi.co/api/v2/item/83/",
        ),
        version_group: createNamedResource(
          "red-blue",
          "https://pokeapi.co/api/v2/version-group/1/",
        ),
      }),
      createEvolutionDetail({
        trigger: createNamedResource(
          "use-item",
          "https://pokeapi.co/api/v2/evolution-trigger/3/",
        ),
        item: createNamedResource(
          "thunder-stone",
          "https://pokeapi.co/api/v2/item/83/",
        ),
        version_group: createNamedResource(
          "yellow",
          "https://pokeapi.co/api/v2/version-group/2/",
        ),
      }),
    ],
  });

  const result = mapPokemonEvolutionChain(createEvolutionChain(raichu));

  expect(result.root.evolutionOptions).toHaveLength(1);
});
