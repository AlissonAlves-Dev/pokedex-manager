import type {
  PokemonApiFlavorTextEntry,
  PokemonApiSpeciesResponse,
} from "../types/pokemonApi";

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
