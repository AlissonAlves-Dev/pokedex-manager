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
): Promise<PokemonApiDetailResponse> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os dados do Pokémon.");
  }

  const data: PokemonApiDetailResponse = await response.json();

  return data;
}

async function getPokemonSummary(url: string): Promise<PokemonSummary> {
  const pokemonApi = await fetchPokemonDetails(url);

  return mapPokemonApiToSummary(pokemonApi);
}

export async function getPokemonList(
  limit = 20,
  offset = 0,
): Promise<PokemonSummary[]> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar a lista de Pokémon.");
  }

  const data: PokemonApiListResponse = await response.json();

  return Promise.all(
    data.results.map((pokemon) => getPokemonSummary(pokemon.url)),
  );
}

export async function getPokemonById(
  pokemonId: number,
): Promise<PokemonDetails> {
  const pokemonApi = await fetchPokemonDetails(
    `${POKE_API_BASE_URL}/pokemon/${pokemonId}`,
  );

  return mapPokemonApiToDetails(pokemonApi);
}
