import type {
  PokemonApiFlavorTextEntry,
  PokemonApiSpeciesResponse,
  PokemonApiSpeciesVariety,
} from "../types/pokemonApi";
import type { PokemonVariationReference } from "../types/pokemon";

import { parsePokemonApiResourceId } from "../utils/pokemonApiResource";
import { formatPokemonResourceName } from "../utils/pokemonResourceName";

const PREFERRED_DESCRIPTION_LANGUAGES = ["pt-br", "pt", "en"] as const;

function normalizeLanguageName(languageName: string): string {
  return languageName.trim().toLowerCase().replace(/_/g, "-");
}

function normalizePokemonDescription(description: string): string {
  return description
    .replace(/[\u00ad\u200b-\u200d\uFEFF]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[\n\r\f\t]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\bpok[eé]mon\b/giu, "Pokémon")
    .trim();
}

function findDescriptionByLanguage(
  flavorTextEntries: PokemonApiFlavorTextEntry[],
  language: string,
): string | null {
  for (const entry of flavorTextEntries) {
    const normalizedLanguageName = normalizeLanguageName(entry.language.name);

    if (normalizedLanguageName !== language) {
      continue;
    }

    const normalizedDescription = normalizePokemonDescription(
      entry.flavor_text,
    );

    if (normalizedDescription) {
      return normalizedDescription;
    }
  }

  return null;
}

function mapPokemonVariationReference(
  variety: PokemonApiSpeciesVariety,
): PokemonVariationReference | null {
  const variationId = parsePokemonApiResourceId(variety.pokemon.url);
  const variationName = variety.pokemon.name.trim();

  if (variationId === null || !variationName) {
    return null;
  }

  return {
    id: variationId,
    name: variationName,
    displayName: formatPokemonResourceName(variationName),
    isDefault: variety.is_default,
  };
}

export function mapPokemonSpeciesToVariations(
  pokemonSpecies: PokemonApiSpeciesResponse,
): PokemonVariationReference[] {
  return pokemonSpecies.varieties
    .map(mapPokemonVariationReference)
    .filter(
      (variation): variation is PokemonVariationReference => variation !== null,
    );
}

export type PokemonSpeciesMetadata = {
  formsSwitchable: boolean;
  hasGenderDifferences: boolean;
};

export function mapPokemonSpeciesToMetadata(
  pokemonSpecies: PokemonApiSpeciesResponse,
): PokemonSpeciesMetadata {
  return {
    formsSwitchable: pokemonSpecies.forms_switchable,
    hasGenderDifferences: pokemonSpecies.has_gender_differences,
  };
}

export function mapPokemonSpeciesToDescription(
  pokemonSpecies: PokemonApiSpeciesResponse,
): string | null {
  for (const language of PREFERRED_DESCRIPTION_LANGUAGES) {
    const description = findDescriptionByLanguage(
      pokemonSpecies.flavor_text_entries,
      language,
    );

    if (description) {
      return description;
    }
  }

  return null;
}
