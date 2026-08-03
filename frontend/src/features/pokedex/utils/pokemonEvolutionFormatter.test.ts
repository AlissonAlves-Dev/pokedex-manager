import { describe, expect, it } from "vitest";

import type { PokemonEvolutionRequirements } from "../types/pokemon";
import {
  formatPokemonResourceName,
  getPokemonEvolutionConditionLabels,
} from "./pokemonEvolutionFormatter";

function createRequirements(
  overrides: Partial<PokemonEvolutionRequirements> = {},
): PokemonEvolutionRequirements {
  return {
    triggerName: "level-up",
    versionGroupName: null,

    itemName: null,
    heldItemName: null,
    knownMoveName: null,
    knownMoveTypeName: null,
    locationName: null,
    partySpeciesName: null,
    partyTypeName: null,
    tradeSpeciesName: null,

    gender: null,
    minLevel: null,
    minHappiness: null,
    minBeauty: null,
    minAffection: null,
    relativePhysicalStats: null,

    timeOfDay: null,

    nearSpecialRock: false,
    needsOverworldRain: false,
    turnUpsideDown: false,

    ...overrides,
  };
}

describe("formatPokemonResourceName", () => {
  it("formata identificadores separados por hífen", () => {
    expect(formatPokemonResourceName("water-stone")).toBe("Water Stone");
  });

  it("remove espaços externos e normaliza separadores", () => {
    expect(formatPokemonResourceName("  mr_mime  ")).toBe("Mr Mime");
  });
});

describe("getPokemonEvolutionConditionLabels", () => {
  it("formata uma evolução por nível", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        minLevel: 16,
      }),
    );

    expect(labels).toEqual(["Atingir o nível 16"]);
  });

  it("formata uma evolução por item", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        triggerName: "use-item",
        itemName: "water-stone",
      }),
    );

    expect(labels).toEqual(["Usar Water Stone"]);
  });

  it("preserva condições opcionais", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        minHappiness: 160,
        timeOfDay: "night",
        knownMoveTypeName: "fairy",
      }),
    );

    expect(labels).toEqual([
      "Subir de nível",
      "Conhecer um golpe do tipo Fairy",
      "Felicidade mínima 160",
      "Durante a noite",
    ]);
  });

  it("formata uma evolução por troca com item segurado", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        triggerName: "trade",
        heldItemName: "metal-coat",
      }),
    );

    expect(labels).toEqual(["Realizar uma troca", "Segurando Metal Coat"]);
  });

  it("utiliza o nome formatado para gatilhos desconhecidos", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        triggerName: "custom-trigger",
      }),
    );

    expect(labels).toEqual(["Custom Trigger"]);
  });
});
