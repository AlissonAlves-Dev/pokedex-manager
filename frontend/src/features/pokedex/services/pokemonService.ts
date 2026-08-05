import {
  mapPokemonApiToDetails,
  mapPokemonApiToSummary,
} from "../mappers/pokemonMapper";
import { mapPokemonSpeciesToDescription } from "../mappers/pokemonSpeciesMapper";

import type {
  PokemonDetails,
  PokemonEvolutionChain,
  PokemonListPage,
  PokemonSummary,
} from "../types/pokemon";

import type {
  PokemonApiDetailResponse,
  PokemonApiEvolutionChainResponse,
  PokemonApiListResponse,
  PokemonApiSpeciesResponse,
} from "../types/pokemonApi";

import { mapPokemonEvolutionChain } from "../mappers/pokemonEvolutionMapper";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

function normalizeResourceUrl(url: string): string | null {
  const normalizedUrl = url.trim();

  return normalizedUrl || null;
}

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

async function fetchPokemonSpecies(
  url: string,
  signal?: AbortSignal,
): Promise<PokemonApiSpeciesResponse> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Não foi possível carregar a descrição do Pokémon.");
  }

  const data: PokemonApiSpeciesResponse = await response.json();

  return data;
}

async function fetchPokemonEvolutionChain(
  url: string,
  signal?: AbortSignal,
): Promise<PokemonApiEvolutionChainResponse> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar a cadeia de evolução do Pokémon.",
    );
  }

  const data: PokemonApiEvolutionChainResponse = await response.json();

  return data;
}

async function loadPokemonEvolutionChain(
  evolutionChainUrl: string,
  signal?: AbortSignal,
): Promise<PokemonEvolutionChain | null> {
  const normalizedEvolutionChainUrl = normalizeResourceUrl(evolutionChainUrl);

  if (!normalizedEvolutionChainUrl) {
    return null;
  }

  try {
    const evolutionChainApi = await fetchPokemonEvolutionChain(
      normalizedEvolutionChainUrl,
      signal,
    );

    return mapPokemonEvolutionChain(evolutionChainApi);
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    return null;
  }
}

type PokemonSpeciesData = {
  description: string | null;
  evolutionChain: PokemonEvolutionChain | null;
};

async function loadPokemonSpeciesData(
  speciesUrl: string,
  signal?: AbortSignal,
): Promise<PokemonSpeciesData> {
  const normalizedSpeciesUrl = normalizeResourceUrl(speciesUrl);

  if (!normalizedSpeciesUrl) {
    return {
      description: null,
      evolutionChain: null,
    };
  }

  try {
    const pokemonSpeciesApi = await fetchPokemonSpecies(
      normalizedSpeciesUrl,
      signal,
    );

    const description = mapPokemonSpeciesToDescription(pokemonSpeciesApi);

    const evolutionChain = await loadPokemonEvolutionChain(
      pokemonSpeciesApi.evolution_chain.url,
      signal,
    );

    return {
      description,
      evolutionChain,
    };
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    return {
      description: null,
      evolutionChain: null,
    };
  }
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
): Promise<PokemonListPage> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar a lista de Pokémon.");
  }

  const data: PokemonApiListResponse = await response.json();

  const pokemonList = await Promise.all(
    data.results.map((pokemon) => getPokemonSummary(pokemon.url, signal)),
  );

  return {
    pokemonList,
    totalCount: data.count,
    nextOffset: data.next === null ? null : offset + data.results.length,
  };
}

export async function getPokemonSummaryByIdentifier(
  identifier: string,
  signal?: AbortSignal,
): Promise<PokemonSummary | null> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon/${encodeURIComponent(identifier)}`,
    { signal },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Não foi possível pesquisar o Pokémon.");
  }

  const pokemonApi: PokemonApiDetailResponse = await response.json();

  return mapPokemonApiToSummary(pokemonApi);
}

export async function getPokemonById(
  pokemonId: number,
  signal?: AbortSignal,
): Promise<PokemonDetails> {
  const pokemonApi = await fetchPokemonDetails(
    `${POKE_API_BASE_URL}/pokemon/${pokemonId}`,
    signal,
  );

  const { description, evolutionChain } = await loadPokemonSpeciesData(
    pokemonApi.species.url,
    signal,
  );

  return mapPokemonApiToDetails(pokemonApi, {
    description,
    evolutionChain,
  });
}
