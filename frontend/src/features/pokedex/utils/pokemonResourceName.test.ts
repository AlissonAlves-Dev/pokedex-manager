import { describe, expect, it } from "vitest";

import { formatPokemonResourceName } from "./pokemonResourceName";

describe("formatPokemonResourceName", () => {
  it("formata identificadores separados por hífen", () => {
    expect(formatPokemonResourceName("water-stone")).toBe("Water Stone");
  });

  it("remove espaços externos e normaliza separadores", () => {
    expect(formatPokemonResourceName("  mr_mime  ")).toBe("Mr Mime");
  });

  it("normaliza múltiplos separadores consecutivos", () => {
    expect(formatPokemonResourceName("charizard---mega__x")).toBe(
      "Charizard Mega X",
    );
  });

  it("retorna uma string vazia quando não existe conteúdo", () => {
    expect(formatPokemonResourceName("  ___---  ")).toBe("");
  });
});
