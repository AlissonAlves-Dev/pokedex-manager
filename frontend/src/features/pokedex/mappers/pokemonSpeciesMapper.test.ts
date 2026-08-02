import { describe, expect, it } from "vitest";

import type {
  PokemonApiFlavorTextEntry,
  PokemonApiSpeciesResponse,
} from "../types/pokemonApi";
import { mapPokemonSpeciesToDescription } from "./pokemonSpeciesMapper";

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
    flavor_text_entries: entries,
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
