import { describe, expect, it } from "vitest";

import type { PokemonApiFormResponse } from "../types/pokemonApi";
import { mapPokemonApiToFormDetails } from "./pokemonFormMapper";

function createPokemonFormApiResponse(): PokemonApiFormResponse {
  return {
    id: 10034,
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
      front_default: " https://example.com/charizard-mega-x.png ",
      front_shiny: " https://example.com/charizard-mega-x-shiny.png ",
    },

    types: [
      {
        slot: 2,
        type: {
          name: "dragon",
        },
      },
      {
        slot: 1,
        type: {
          name: "fire",
        },
      },
    ],

    version_group: {
      name: "x-y",
      url: "https://pokeapi.co/api/v2/version-group/15/",
    },
  };
}

describe("mapPokemonApiToFormDetails", () => {
  it("mapeia os dados principais da forma", () => {
    const pokemonFormApi = createPokemonFormApiResponse();

    const pokemonForm = mapPokemonApiToFormDetails(pokemonFormApi);

    expect(pokemonForm).toEqual({
      id: 10034,
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
  });

  it("converte form_name vazio em null", () => {
    const pokemonFormApi = createPokemonFormApiResponse();

    pokemonFormApi.form_name = "   ";

    const pokemonForm = mapPokemonApiToFormDetails(pokemonFormApi);

    expect(pokemonForm.formName).toBeNull();
  });

  it("normaliza sprites vazios como indisponíveis", () => {
    const pokemonFormApi = createPokemonFormApiResponse();

    pokemonFormApi.sprites.front_default = "   ";
    pokemonFormApi.sprites.front_shiny = null;

    const pokemonForm = mapPokemonApiToFormDetails(pokemonFormApi);

    expect(pokemonForm.sprites).toEqual({
      frontDefaultUrl: null,
      frontShinyUrl: null,
    });
  });

  it("converte o grupo de versão vazio em null", () => {
    const pokemonFormApi = createPokemonFormApiResponse();

    pokemonFormApi.version_group.name = "   ";

    const pokemonForm = mapPokemonApiToFormDetails(pokemonFormApi);

    expect(pokemonForm.versionGroupName).toBeNull();
  });

  it("rejeita um tipo de Pokémon desconhecido", () => {
    const pokemonFormApi = createPokemonFormApiResponse();

    pokemonFormApi.types = [
      {
        slot: 1,
        type: {
          name: "unknown-type",
        },
      },
    ];

    expect(() => mapPokemonApiToFormDetails(pokemonFormApi)).toThrow(
      "Tipo de Pokémon desconhecido: unknown-type",
    );
  });

  it("rejeita uma URL inválida do Pokémon associado", () => {
    const pokemonFormApi = createPokemonFormApiResponse();

    pokemonFormApi.pokemon.url = "https://pokeapi.co/api/v2/pokemon/invalid/";

    expect(() => mapPokemonApiToFormDetails(pokemonFormApi)).toThrow(
      "Não foi possível identificar o Pokémon associado à forma",
    );
  });

  it("rejeita uma forma sem nome válido", () => {
    const pokemonFormApi = createPokemonFormApiResponse();

    pokemonFormApi.name = "   ";

    expect(() => mapPokemonApiToFormDetails(pokemonFormApi)).toThrow(
      "A forma do Pokémon não possui um nome válido.",
    );
  });
});
