import { describe, expect, it } from "vitest";

import { parsePokemonFormSearchParam } from "./pokemonFormSearchParam";

function createSearchParams(search: string): URLSearchParams {
  return new URLSearchParams(search);
}

describe("parsePokemonFormSearchParam", () => {
  it("identifica a ausência do parâmetro form", () => {
    expect(parsePokemonFormSearchParam(createSearchParams(""))).toEqual({
      status: "absent",
      formId: null,
    });
  });

  it("ignora outros parâmetros quando form está ausente", () => {
    expect(
      parsePokemonFormSearchParam(createSearchParams("source=pokedex")),
    ).toEqual({
      status: "absent",
      formId: null,
    });
  });

  it.each([
    ["form=1", 1],
    ["form=25", 25],
    ["form=10041", 10041],
  ])("aceita o parâmetro válido %s", (search, expectedFormId) => {
    expect(parsePokemonFormSearchParam(createSearchParams(search))).toEqual({
      status: "valid",
      formId: expectedFormId,
    });
  });

  it.each([
    "form=",
    "form=0",
    "form=-1",
    "form=1.5",
    "form=abc",
    "form=10abc",
    "form=0010041",
    "form=%20",
    "form=%2010041",
    "form=10041%20",
    "form=%2B10041",
  ])("rejeita o parâmetro inválido %s", (search) => {
    expect(parsePokemonFormSearchParam(createSearchParams(search))).toEqual({
      status: "invalid",
      formId: null,
    });
  });

  it("rejeita parâmetros form repetidos", () => {
    expect(
      parsePokemonFormSearchParam(createSearchParams("form=10041&form=10042")),
    ).toEqual({
      status: "invalid",
      formId: null,
    });
  });

  it("rejeita valores acima do limite seguro", () => {
    const unsafeFormId = Number.MAX_SAFE_INTEGER + 1;

    expect(
      parsePokemonFormSearchParam(createSearchParams(`form=${unsafeFormId}`)),
    ).toEqual({
      status: "invalid",
      formId: null,
    });
  });

  it("preserva parâmetros não relacionados quando form é válido", () => {
    expect(
      parsePokemonFormSearchParam(
        createSearchParams("source=pokedex&form=10041"),
      ),
    ).toEqual({
      status: "valid",
      formId: 10041,
    });
  });
});
