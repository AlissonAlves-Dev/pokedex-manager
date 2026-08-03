import { describe, expect, it } from "vitest";

import type { PokemonApiDetailResponse } from "../types/pokemonApi";
import {
  mapPokemonApiToDetails,
  mapPokemonApiToSummary,
} from "./pokemonMapper";
import type { PokemonEvolutionChain } from "../types/pokemon";

function createPokemonApiResponse(): PokemonApiDetailResponse {
  return {
    id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,

    species: {
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/pokemon-species/25/",
    },

    sprites: {
      front_default: " https://example.com/pikachu-default.png ",
      front_shiny: " https://example.com/pikachu-shiny.png ",

      other: {
        "official-artwork": {
          front_default: " https://example.com/pikachu-artwork.png ",
        },
      },
    },

    types: [
      {
        slot: 1,
        type: {
          name: "electric",
        },
      },
    ],

    abilities: [
      {
        ability: {
          name: "static",
        },
        is_hidden: false,
        slot: 1,
      },
    ],

    stats: [
      {
        base_stat: 35,
        effort: 0,
        stat: {
          name: "hp",
        },
      },
    ],
  };
}

function createEvolutionChain(): PokemonEvolutionChain {
  return {
    id: 10,
    root: {
      speciesId: 25,
      name: "pikachu",
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      isBaby: false,
      evolutionOptions: [],
      evolvesTo: [],
    },
  };
}

describe("pokemonMapper", () => {
  it("normaliza a URL da arte oficial no resumo", () => {
    const pokemonApi = createPokemonApiResponse();

    const pokemon = mapPokemonApiToSummary(pokemonApi);

    expect(pokemon.imageUrl).toBe("https://example.com/pikachu-artwork.png");
  });

  it("normaliza as URLs dos sprites nos detalhes", () => {
    const pokemonApi = createPokemonApiResponse();

    const pokemon = mapPokemonApiToDetails(pokemonApi, {
      description: "Descrição de teste.",
    });

    expect(pokemon.sprites).toEqual({
      frontDefaultUrl: "https://example.com/pikachu-default.png",
      frontShinyUrl: "https://example.com/pikachu-shiny.png",
    });
  });

  it("transforma URLs ausentes ou vazias em dados indisponíveis", () => {
    const pokemonApi = createPokemonApiResponse();

    pokemonApi.sprites.front_default = "   ";
    pokemonApi.sprites.front_shiny = null;
    pokemonApi.sprites.other["official-artwork"].front_default = "   ";

    const summary = mapPokemonApiToSummary(pokemonApi);
    const details = mapPokemonApiToDetails(pokemonApi);

    expect(summary.imageUrl).toBe("");
    expect(details.imageUrl).toBe("");
    expect(details.sprites).toEqual({
      frontDefaultUrl: null,
      frontShinyUrl: null,
    });
  });

  it("mantém os dados complementares recebidos", () => {
    const pokemonApi = createPokemonApiResponse();
    const evolutionChain = createEvolutionChain();

    const pokemon = mapPokemonApiToDetails(pokemonApi, {
      description: "Descrição de teste.",
      evolutionChain,
    });

    expect(pokemon.description).toBe("Descrição de teste.");
    expect(pokemon.evolutionChain).toEqual(evolutionChain);
  });

  it("utiliza null quando os dados complementares não são fornecidos", () => {
    const pokemonApi = createPokemonApiResponse();

    const pokemon = mapPokemonApiToDetails(pokemonApi);

    expect(pokemon.description).toBeNull();
    expect(pokemon.evolutionChain).toBeNull();
  });
});
