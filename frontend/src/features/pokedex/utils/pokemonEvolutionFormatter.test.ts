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

  it("formata condições relacionadas a movimento, local e equipe", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        knownMoveName: "ancient-power",
        locationName: "mount-lanakila",
        partySpeciesName: "remoraid",
        partyTypeName: "dark",
        tradeSpeciesName: "karrablast",
      }),
    );

    expect(labels).toEqual([
      "Subir de nível",
      "Conhecer Ancient Power",
      "Em Mount Lanakila",
      "Com Remoraid na equipe",
      "Com um Pokémon do tipo Dark na equipe",
      "Trocar por Karrablast",
    ]);
  });

  it("formata valores mínimos e condições especiais", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        minBeauty: 170,
        minAffection: 2,
        nearSpecialRock: true,
        needsOverworldRain: true,
        turnUpsideDown: true,
      }),
    );

    expect(labels).toEqual([
      "Subir de nível",
      "Beleza mínima 170",
      "Afeição mínima 2",
      "Próximo a uma rocha especial",
      "Durante chuva no mundo",
      "Com o dispositivo de cabeça para baixo",
    ]);
  });

  it("preserva item e nível quando o gatilho é diferente", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        triggerName: "trade",
        itemName: "linking-cord",
        minLevel: 25,
      }),
    );

    expect(labels).toEqual([
      "Realizar uma troca",
      "Usar Linking Cord",
      "Nível mínimo 25",
    ]);
  });

  it.each([
    [1, "Gênero feminino"],
    [2, "Gênero masculino"],
    [99, "Gênero exigido: 99"],
  ])("formata o gênero %i", (gender, expectedLabel) => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        gender,
      }),
    );

    expect(labels).toEqual(["Subir de nível", expectedLabel]);
  });

  it.each([
    [-1, "Ataque menor que Defesa"],
    [0, "Ataque igual à Defesa"],
    [1, "Ataque maior que Defesa"],
  ])(
    "formata a relação entre os atributos para o valor %i",
    (relativePhysicalStats, expectedLabel) => {
      const labels = getPokemonEvolutionConditionLabels(
        createRequirements({
          relativePhysicalStats,
        }),
      );

      expect(labels).toEqual(["Subir de nível", expectedLabel]);
    },
  );

  it("formata uma evolução durante o dia", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        timeOfDay: "day",
      }),
    );

    expect(labels).toEqual(["Subir de nível", "Durante o dia"]);
  });

  it("utiliza um período formatado quando o horário não é conhecido", () => {
    const labels = getPokemonEvolutionConditionLabels(
      createRequirements({
        timeOfDay: "late-evening",
      }),
    );

    expect(labels).toEqual(["Subir de nível", "Período: Late Evening"]);
  });
});
