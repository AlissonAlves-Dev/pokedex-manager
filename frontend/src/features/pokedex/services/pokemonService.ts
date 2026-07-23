import {
  mapPokemonApiToDetails,
  mapPokemonApiToSummary,
} from "../mappers/pokemonMapper";

import type { PokemonDetails, PokemonSummary } from "../types/pokemon";

import type {
  PokemonApiDetailResponse,
  PokemonApiListResponse,
} from "../types/pokemonApi";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

async function fetchPokemonDetails(
  url: string,
  signal?: AbortSignal,
): Promise<PokemonApiDetailResponse> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Não foi possível carregar os dados do Pokémon.");
  }

  const data: PokemonApiDetailResponse = await response.json();

  return data;
}

async function getPokemonSummary(
  url: string,
  signal?: AbortSignal,
): Promise<PokemonSummary> {
  const pokemonApi = await fetchPokemonDetails(url, signal);

  return mapPokemonApiToSummary(pokemonApi);
}

export async function getPokemonList(
  limit = 20,
  offset = 0,
  signal?: AbortSignal,
): Promise<PokemonSummary[]> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar a lista de Pokémon.");
  }

  const data: PokemonApiListResponse = await response.json();

  return Promise.all(
    data.results.map((pokemon) => getPokemonSummary(pokemon.url, signal)),
  );
}

export async function getPokemonById(
  pokemonId: number,
  signal?: AbortSignal,
): Promise<PokemonDetails> {
  const pokemonApi = await fetchPokemonDetails(
    `${POKE_API_BASE_URL}/pokemon/${pokemonId}`,
    signal,
  );

  return mapPokemonApiToDetails(pokemonApi);
}
