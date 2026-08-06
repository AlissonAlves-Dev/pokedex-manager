import { describe, expect, it } from "vitest";

import { parsePokemonApiResourceId } from "./pokemonApiResource";

describe("parsePokemonApiResourceId", () => {
  it("extrai o ID de uma URL com barra final", () => {
    expect(
      parsePokemonApiResourceId(
        "https://pokeapi.co/api/v2/pokemon-species/25/",
      ),
    ).toBe(25);
  });

  it("extrai o ID de uma URL sem barra final", () => {
    expect(
      parsePokemonApiResourceId("https://pokeapi.co/api/v2/pokemon-form/10041"),
    ).toBe(10041);
  });

  it("remove espaços externos antes de extrair o ID", () => {
    expect(
      parsePokemonApiResourceId("  https://pokeapi.co/api/v2/pokemon/6/  "),
    ).toBe(6);
  });

  it.each([
    "",
    "   ",
    "https://pokeapi.co/api/v2/pokemon/",
    "https://pokeapi.co/api/v2/pokemon/bulbasaur/",
    "https://pokeapi.co/api/v2/pokemon/1.5/",
    "https://pokeapi.co/api/v2/pokemon/-1/",
    "https://pokeapi.co/api/v2/pokemon/0/",
  ])("retorna null para a URL inválida %s", (url) => {
    expect(parsePokemonApiResourceId(url)).toBeNull();
  });

  it("retorna null quando o ID ultrapassa o limite seguro", () => {
    expect(
      parsePokemonApiResourceId(
        `https://pokeapi.co/api/v2/pokemon/${Number.MAX_SAFE_INTEGER + 1}/`,
      ),
    ).toBeNull();
  });
});
