import { describe, expect, it } from "vitest";

import type {
  PokemonApiFlavorTextEntry,
  PokemonApiSpeciesResponse,
} from "../types/pokemonApi";
import {
  mapPokemonSpeciesToDescription,
  mapPokemonSpeciesToMetadata,
  mapPokemonSpeciesToVariations,
} from "./pokemonSpeciesMapper";

function createFlavorTextEntry(
  flavorText: string,
  language: string,
): PokemonApiFlavorTextEntry {
  return {
    flavor_text: flavorText,
    language: {
      name: language,
      url: `https://pokeapi.co/api/v2/language/${language}`,
    },
    version: {
      name: "test-version",
      url: "https://pokeapi.co/api/v2/version/test-version",
    },
  };
}

function createSpeciesResponse(
  entries: PokemonApiFlavorTextEntry[],
): PokemonApiSpeciesResponse {
  return {
    id: 25,
    evolution_chain: {
      url: "https://pokeapi.co/api/v2/evolution-chain/10/",
    },
    flavor_text_entries: entries,

    varieties: [],
    forms_switchable: false,
    has_gender_differences: false,
  };
}

describe("mapPokemonSpeciesToDescription", () => {
  it("prioriza pt-br sobre inglês", () => {
    const species = createSpeciesResponse([
      createFlavorTextEntry("English description.", "en"),
      createFlavorTextEntry("Descrição em português.", "pt-br"),
    ]);

    expect(mapPokemonSpeciesToDescription(species)).toBe(
      "Descrição em português.",
    );
  });

  it("utiliza português genérico antes do inglês", () => {
    const species = createSpeciesResponse([
      createFlavorTextEntry("English description.", "en"),
      createFlavorTextEntry("Descrição genérica.", "pt"),
    ]);

    expect(mapPokemonSpeciesToDescription(species)).toBe("Descrição genérica.");
  });

  it("utiliza inglês como fallback", () => {
    const species = createSpeciesResponse([
      createFlavorTextEntry("English description.", "en"),
    ]);

    expect(mapPokemonSpeciesToDescription(species)).toBe(
      "English description.",
    );
  });

  it("normaliza espaços, quebras e a grafia de Pokémon", () => {
    const species = createSpeciesResponse([
      createFlavorTextEntry(
        "Um\u00a0POKéMON\nelétrico.\f Vive\u200b perto de cidades.",
        "pt-br",
      ),
    ]);

    expect(mapPokemonSpeciesToDescription(species)).toBe(
      "Um Pokémon elétrico. Vive perto de cidades.",
    );
  });

  it("ignora uma entrada vazia e utiliza a próxima válida", () => {
    const species = createSpeciesResponse([
      createFlavorTextEntry("\n \u200b \t", "pt-br"),
      createFlavorTextEntry("Valid description.", "en"),
    ]);

    expect(mapPokemonSpeciesToDescription(species)).toBe("Valid description.");
  });

  it("retorna null quando não existe idioma compatível", () => {
    const species = createSpeciesResponse([
      createFlavorTextEntry("Beschreibung.", "de"),
    ]);

    expect(mapPokemonSpeciesToDescription(species)).toBeNull();
  });
});

describe("mapPokemonSpeciesToVariations", () => {
  it("mapeia a variação padrão e as alternativas preservando a ordem", () => {
    const species = createSpeciesResponse([]);

    species.varieties = [
      {
        is_default: true,
        pokemon: {
          name: "charizard",
          url: "https://pokeapi.co/api/v2/pokemon/6/",
        },
      },
      {
        is_default: false,
        pokemon: {
          name: "charizard-mega-x",
          url: "https://pokeapi.co/api/v2/pokemon/10034/",
        },
      },
      {
        is_default: false,
        pokemon: {
          name: "charizard-mega-y",
          url: "https://pokeapi.co/api/v2/pokemon/10035/",
        },
      },
    ];

    expect(mapPokemonSpeciesToVariations(species)).toEqual([
      {
        id: 6,
        name: "charizard",
        displayName: "Charizard",
        isDefault: true,
      },
      {
        id: 10034,
        name: "charizard-mega-x",
        displayName: "Charizard Mega X",
        isDefault: false,
      },
      {
        id: 10035,
        name: "charizard-mega-y",
        displayName: "Charizard Mega Y",
        isDefault: false,
      },
    ]);
  });

  it("descarta referências inválidas sem perder as variações válidas", () => {
    const species = createSpeciesResponse([]);

    species.varieties = [
      {
        is_default: true,
        pokemon: {
          name: "rattata",
          url: "https://pokeapi.co/api/v2/pokemon/19/",
        },
      },
      {
        is_default: false,
        pokemon: {
          name: "invalid-variation",
          url: "https://pokeapi.co/api/v2/pokemon/invalid/",
        },
      },
      {
        is_default: false,
        pokemon: {
          name: "   ",
          url: "https://pokeapi.co/api/v2/pokemon/10091/",
        },
      },
      {
        is_default: false,
        pokemon: {
          name: "rattata-alola",
          url: "https://pokeapi.co/api/v2/pokemon/10091/",
        },
      },
    ];

    expect(mapPokemonSpeciesToVariations(species)).toEqual([
      {
        id: 19,
        name: "rattata",
        displayName: "Rattata",
        isDefault: true,
      },
      {
        id: 10091,
        name: "rattata-alola",
        displayName: "Rattata Alola",
        isDefault: false,
      },
    ]);
  });

  it("retorna uma lista vazia quando não existem variações válidas", () => {
    const species = createSpeciesResponse([]);

    species.varieties = [];

    expect(mapPokemonSpeciesToVariations(species)).toEqual([]);
  });
});

describe("mapPokemonSpeciesToMetadata", () => {
  it("mapeia as informações relacionadas às formas e ao gênero", () => {
    const species = createSpeciesResponse([]);

    species.forms_switchable = true;
    species.has_gender_differences = true;

    expect(mapPokemonSpeciesToMetadata(species)).toEqual({
      formsSwitchable: true,
      hasGenderDifferences: true,
    });
  });

  it("preserva valores false informados pela API", () => {
    const species = createSpeciesResponse([]);

    species.forms_switchable = false;
    species.has_gender_differences = false;

    expect(mapPokemonSpeciesToMetadata(species)).toEqual({
      formsSwitchable: false,
      hasGenderDifferences: false,
    });
  });
});
