import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getPokemonById, getPokemonFormById } from "./pokemonService";

import type {
  PokemonApiDetailResponse,
  PokemonApiEvolutionChainLink,
  PokemonApiEvolutionChainResponse,
  PokemonApiFormResponse,
  PokemonApiSpeciesResponse,
} from "../types/pokemonApi";

const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/1";
const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/1/";
const EVOLUTION_CHAIN_URL = "https://pokeapi.co/api/v2/evolution-chain/1/";
const FORM_ID = 10034;

const FORM_URL = `https://pokeapi.co/api/v2/pokemon-form/${FORM_ID}`;

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

    is_default: true,
    forms: [],

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
    varieties: [
      {
        is_default: true,
        pokemon: {
          name: "bulbasaur",
          url: POKEMON_URL,
        },
      },
      {
        is_default: false,
        pokemon: {
          name: "bulbasaur-special",
          url: "https://pokeapi.co/api/v2/pokemon/10001/",
        },
      },
    ],

    forms_switchable: true,
    has_gender_differences: false,
  };
}

function createPokemonFormApiResponse(): PokemonApiFormResponse {
  return {
    id: FORM_ID,
    name: "charizard-mega-x",
    form_name: "mega-x",
    form_order: 2,

    is_default: false,
    is_battle_only: true,
    is_mega: true,

    pokemon: {
      name: "charizard-mega-x",
      url: "https://pokeapi.co/api/v2/pokemon/10034/",
    },

    sprites: {
      front_default: "https://example.com/charizard-mega-x.png",
      front_shiny: "https://example.com/charizard-mega-x-shiny.png",
    },

    types: [
      {
        slot: 1,
        type: {
          name: "fire",
        },
      },
      {
        slot: 2,
        type: {
          name: "dragon",
        },
      },
    ],

    version_group: {
      name: "x-y",
      url: "https://pokeapi.co/api/v2/version-group/15/",
    },
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

    expect(pokemon.variations).toEqual([
      {
        id: 1,
        name: "bulbasaur",
        displayName: "Bulbasaur",
        isDefault: true,
      },
      {
        id: 10001,
        name: "bulbasaur-special",
        displayName: "Bulbasaur Special",
        isDefault: false,
      },
    ]);

    expect(pokemon.formsSwitchable).toBe(true);
    expect(pokemon.hasGenderDifferences).toBe(false);
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
    expect(pokemon.variations).toBeNull();
    expect(pokemon.formsSwitchable).toBeNull();
    expect(pokemon.hasGenderDifferences).toBeNull();

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

    expect(pokemon.variations).toEqual([
      {
        id: 1,
        name: "bulbasaur",
        displayName: "Bulbasaur",
        isDefault: true,
      },
      {
        id: 10001,
        name: "bulbasaur-special",
        displayName: "Bulbasaur Special",
        isDefault: false,
      },
    ]);

    expect(pokemon.formsSwitchable).toBe(true);
    expect(pokemon.hasGenderDifferences).toBe(false);
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

describe("getPokemonFormById", () => {
  it("carrega e mapeia uma forma com uma única requisição", async () => {
    fetchMock.mockResolvedValueOnce(
      createJsonResponse(createPokemonFormApiResponse()),
    );

    const controller = new AbortController();

    const pokemonForm = await getPokemonFormById(FORM_ID, controller.signal);

    expect(pokemonForm).toEqual({
      id: FORM_ID,
      pokemonId: 10034,

      name: "charizard-mega-x",
      displayName: "Charizard Mega X",
      formName: "mega-x",

      isDefault: false,
      isBattleOnly: true,
      isMega: true,

      formOrder: 2,

      types: ["fire", "dragon"],

      sprites: {
        frontDefaultUrl: "https://example.com/charizard-mega-x.png",
        frontShinyUrl: "https://example.com/charizard-mega-x-shiny.png",
      },

      versionGroupName: "x-y",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(getRequestedUrls()).toEqual([FORM_URL]);

    expect(fetchMock.mock.calls[0][1]?.signal).toBe(controller.signal);
  });

  it("propaga a falha da requisição da forma", async () => {
    fetchMock.mockResolvedValueOnce(createJsonResponse({}, 500));

    await expect(getPokemonFormById(FORM_ID)).rejects.toThrow(
      "Não foi possível carregar os dados da forma do Pokémon.",
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("propaga falhas de validação do mapper", async () => {
    const pokemonFormApi = createPokemonFormApiResponse();

    pokemonFormApi.pokemon.url = "https://pokeapi.co/api/v2/pokemon/invalid/";

    fetchMock.mockResolvedValueOnce(createJsonResponse(pokemonFormApi));

    await expect(getPokemonFormById(FORM_ID)).rejects.toThrow(
      "Não foi possível identificar o Pokémon associado à forma",
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("propaga o cancelamento da requisição", async () => {
    const controller = new AbortController();

    fetchMock.mockImplementationOnce(async () => {
      controller.abort();

      throw new DOMException("The operation was aborted.", "AbortError");
    });

    await expect(
      getPokemonFormById(FORM_ID, controller.signal),
    ).rejects.toMatchObject({
      name: "AbortError",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejeita o identificador inválido %s sem realizar requisição",
    async (formId) => {
      await expect(getPokemonFormById(formId)).rejects.toThrow(
        "Identificador da forma do Pokémon inválido.",
      );

      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it("rejeita identificadores acima do limite seguro", async () => {
    await expect(
      getPokemonFormById(Number.MAX_SAFE_INTEGER + 1),
    ).rejects.toThrow("Identificador da forma do Pokémon inválido.");

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
