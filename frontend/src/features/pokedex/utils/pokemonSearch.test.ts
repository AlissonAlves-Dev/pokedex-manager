import { describe, expect, it } from "vitest";

import type { PokemonSummary } from "../types/pokemon";
import {
  findExactPokemonMatch,
  normalizePokemonSearchQuery,
} from "./pokemonSearch";

const pokemonList: PokemonSummary[] = [
  {
    id: 25,
    name: "pikachu",
    imageUrl: "",
    types: ["electric"],
  },
  {
    id: 122,
    name: "mr-mime",
    imageUrl: "",
    types: ["psychic", "fairy"],
  },
  {
    id: 250,
    name: "ho-oh",
    imageUrl: "",
    types: ["fire", "flying"],
  },
];

describe("normalizePokemonSearchQuery", () => {
  it.each([
    [" Pikachu ", "pikachu"],
    ["#025", "25"],
    ["000", "0"],
    ["Mr. Mime", "mr-mime"],
    ["Ho Oh", "ho-oh"],
    ["Nidoran♀", "nidoran-f"],
    ["Nidoran♂", "nidoran-m"],
    ["Farfetch'd", "farfetchd"],
    ["...", ""],
  ])('normaliza "%s" para "%s"', (query, expectedResult) => {
    expect(normalizePokemonSearchQuery(query)).toBe(expectedResult);
  });
});

describe("findExactPokemonMatch", () => {
  it("encontra um Pokémon por nome normalizado", () => {
    expect(findExactPokemonMatch(pokemonList, "Mr. Mime")).toEqual(
      pokemonList[1],
    );
  });

  it("encontra um Pokémon pelo número com prefixo e zeros", () => {
    expect(findExactPokemonMatch(pokemonList, "#025")).toEqual(pokemonList[0]);
  });

  it("não considera uma correspondência parcial como exata", () => {
    expect(findExactPokemonMatch(pokemonList, "pika")).toBeNull();
  });

  it("retorna null quando a pesquisa normalizada fica vazia", () => {
    expect(findExactPokemonMatch(pokemonList, "...")).toBeNull();
  });
});
