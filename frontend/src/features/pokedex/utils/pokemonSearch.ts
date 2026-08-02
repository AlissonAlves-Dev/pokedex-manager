import type { PokemonSummary } from "../types/pokemon";

export function normalizePokemonSearchQuery(query: string): string {
  const normalizedQuery = query
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const queryWithoutNumberPrefix = normalizedQuery.replace(/^#\s*/, "");

  if (/^\d+$/.test(queryWithoutNumberPrefix)) {
    return queryWithoutNumberPrefix.replace(/^0+(?=\d)/, "");
  }

  return queryWithoutNumberPrefix
    .replace(/♀/g, "-f")
    .replace(/♂/g, "-m")
    .replace(/[.'’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findExactPokemonMatch(
  pokemonList: PokemonSummary[],
  query: string,
): PokemonSummary | null {
  const normalizedQuery = normalizePokemonSearchQuery(query);

  if (!normalizedQuery) {
    return null;
  }

  const isNumberSearch = /^\d+$/.test(normalizedQuery);

  const pokemon = pokemonList.find((pokemon) => {
    if (isNumberSearch) {
      return pokemon.id === Number(normalizedQuery);
    }

    return pokemon.name.toLowerCase() === normalizedQuery;
  });

  return pokemon ?? null;
}
