import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type {
  PokemonApiDetailResponse,
  PokemonApiEvolutionChainLink,
  PokemonApiEvolutionChainResponse,
  PokemonApiSpeciesResponse,
} from "../types/pokemonApi";
import { getPokemonById } from "./pokemonService";

const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/1";
const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/1/";
const EVOLUTION_CHAIN_URL = "https://pokeapi.co/api/v2/evolution-chain/1/";

const fetchMock = vi.fn<typeof fetch>();

function createJsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function createPokemonApiResponse(): PokemonApiDetailResponse {
  return {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,

    species: {
      name: "bulbasaur",
      url: SPECIES_URL,
    },

    sprites: {
      front_default: "https://example.com/bulbasaur-default.png",
      front_shiny: "https://example.com/bulbasaur-shiny.png",

      other: {
        "official-artwork": {
          front_default: "https://example.com/bulbasaur-artwork.png",
        },
      },
    },

    types: [
      {
        slot: 1,
        type: {
          name: "grass",
        },
      },
      {
        slot: 2,
        type: {
          name: "poison",
        },
      },
    ],

    abilities: [
      {
        ability: {
          name: "overgrow",
        },
        is_hidden: false,
        slot: 1,
      },
    ],

    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: "hp",
        },
      },
    ],
  };
}

function createSpeciesApiResponse(): PokemonApiSpeciesResponse {
  return {
    id: 1,

    evolution_chain: {
      url: EVOLUTION_CHAIN_URL,
    },

    flavor_text_entries: [
      {
        flavor_text: "A strange seed was planted on its back at birth.",
        language: {
          name: "en",
          url: "https://pokeapi.co/api/v2/language/9/",
        },
        version: {
          name: "red",
          url: "https://pokeapi.co/api/v2/version/1/",
        },
      },
    ],
  };
}

function createEvolutionChainLink(
  name: string,
  speciesId: number,
  evolvesTo: PokemonApiEvolutionChainLink[] = [],
): PokemonApiEvolutionChainLink {
  return {
    is_baby: false,

    species: {
      name,
      url: `https://pokeapi.co/api/v2/pokemon-species/${speciesId}/`,
    },

    evolution_details: [],
    evolves_to: evolvesTo,
  };
}

function createEvolutionChainApiResponse(): PokemonApiEvolutionChainResponse {
  const venusaur = createEvolutionChainLink("venusaur", 3);

  const ivysaur = createEvolutionChainLink("ivysaur", 2, [venusaur]);

  return {
    id: 1,
    baby_trigger_item: null,
    chain: createEvolutionChainLink("bulbasaur", 1, [ivysaur]),
  };
}

function getRequestedUrls(): string[] {
  return fetchMock.mock.calls.map(([input]) => String(input));
}

beforeEach(() => {
  fetchMock.mockReset();

  fetchMock.mockImplementation(async () => {
    throw new Error("Fetch não configurado para esta chamada.");
  });

  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getPokemonById", () => {
  it("carrega Pokémon, espécie e cadeia com três requisições", async () => {
    fetchMock
      .mockResolvedValueOnce(createJsonResponse(createPokemonApiResponse()))
      .mockResolvedValueOnce(createJsonResponse(createSpeciesApiResponse()))
      .mockResolvedValueOnce(
        createJsonResponse(createEvolutionChainApiResponse()),
      );

    const controller = new AbortController();

    const pokemon = await getPokemonById(1, controller.signal);

    expect(pokemon.id).toBe(1);
    expect(pokemon.name).toBe("bulbasaur");

    expect(pokemon.description).toBe(
      "A strange seed was planted on its back at birth.",
    );

    expect(pokemon.evolutionChain?.root.name).toBe("bulbasaur");

    expect(pokemon.evolutionChain?.root.evolvesTo[0].name).toBe("ivysaur");

    expect(pokemon.evolutionChain?.root.evolvesTo[0].evolvesTo[0].name).toBe(
      "venusaur",
    );

    expect(fetchMock).toHaveBeenCalledTimes(3);

    expect(getRequestedUrls()).toEqual([
      POKEMON_URL,
      SPECIES_URL,
      EVOLUTION_CHAIN_URL,
    ]);

    expect(
      fetchMock.mock.calls.every(
        ([, options]) => options?.signal === controller.signal,
      ),
    ).toBe(true);
  });

  it("não consulta individualmente os integrantes da cadeia", async () => {
    fetchMock
      .mockResolvedValueOnce(createJsonResponse(createPokemonApiResponse()))
      .mockResolvedValueOnce(createJsonResponse(createSpeciesApiResponse()))
      .mockResolvedValueOnce(
        createJsonResponse(createEvolutionChainApiResponse()),
      );

    await getPokemonById(1);

    expect(fetchMock).toHaveBeenCalledTimes(3);

    expect(getRequestedUrls()).not.toContain(
      "https://pokeapi.co/api/v2/pokemon/2",
    );

    expect(getRequestedUrls()).not.toContain(
      "https://pokeapi.co/api/v2/pokemon/3",
    );
  });

  it("propaga a falha dos dados principais", async () => {
    fetchMock.mockResolvedValueOnce(createJsonResponse({}, 500));

    await expect(getPokemonById(1)).rejects.toThrow(
      "Não foi possível carregar os dados do Pokémon.",
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("mantém os detalhes quando a espécie falha", async () => {
    fetchMock
      .mockResolvedValueOnce(createJsonResponse(createPokemonApiResponse()))
      .mockResolvedValueOnce(createJsonResponse({}, 500));

    const pokemon = await getPokemonById(1);

    expect(pokemon.id).toBe(1);
    expect(pokemon.description).toBeNull();
    expect(pokemon.evolutionChain).toBeNull();

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("preserva a descrição quando somente a cadeia falha", async () => {
    fetchMock
      .mockResolvedValueOnce(createJsonResponse(createPokemonApiResponse()))
      .mockResolvedValueOnce(createJsonResponse(createSpeciesApiResponse()))
      .mockResolvedValueOnce(createJsonResponse({}, 500));

    const pokemon = await getPokemonById(1);

    expect(pokemon.description).toBe(
      "A strange seed was planted on its back at birth.",
    );

    expect(pokemon.evolutionChain).toBeNull();

    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("propaga o cancelamento ocorrido durante a espécie", async () => {
    const controller = new AbortController();

    fetchMock
      .mockResolvedValueOnce(createJsonResponse(createPokemonApiResponse()))
      .mockImplementationOnce(async () => {
        controller.abort();

        throw new DOMException("The operation was aborted.", "AbortError");
      });

    await expect(getPokemonById(1, controller.signal)).rejects.toMatchObject({
      name: "AbortError",
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("propaga o cancelamento ocorrido durante a cadeia", async () => {
    const controller = new AbortController();

    fetchMock
      .mockResolvedValueOnce(createJsonResponse(createPokemonApiResponse()))
      .mockResolvedValueOnce(createJsonResponse(createSpeciesApiResponse()))
      .mockImplementationOnce(async () => {
        controller.abort();

        throw new DOMException("The operation was aborted.", "AbortError");
      });

    await expect(getPokemonById(1, controller.signal)).rejects.toMatchObject({
      name: "AbortError",
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("não consulta a espécie quando species.url está vazia", async () => {
    const pokemonApi = createPokemonApiResponse();

    pokemonApi.species.url = "   ";

    fetchMock.mockResolvedValueOnce(createJsonResponse(pokemonApi));

    const pokemon = await getPokemonById(1);

    expect(pokemon.id).toBe(1);
    expect(pokemon.description).toBeNull();
    expect(pokemon.evolutionChain).toBeNull();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(getRequestedUrls()).toEqual([POKEMON_URL]);
  });

  it("preserva a descrição quando evolution_chain.url está vazia", async () => {
    const speciesApi = createSpeciesApiResponse();

    speciesApi.evolution_chain.url = "   ";

    fetchMock
      .mockResolvedValueOnce(createJsonResponse(createPokemonApiResponse()))
      .mockResolvedValueOnce(createJsonResponse(speciesApi));

    const pokemon = await getPokemonById(1);

    expect(pokemon.description).toBe(
      "A strange seed was planted on its back at birth.",
    );

    expect(pokemon.evolutionChain).toBeNull();

    expect(fetchMock).toHaveBeenCalledTimes(2);

    expect(getRequestedUrls()).toEqual([POKEMON_URL, SPECIES_URL]);
  });
});
