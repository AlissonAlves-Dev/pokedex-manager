import type { PokemonEvolutionRequirements } from "../types/pokemon";

const EVOLUTION_TRIGGER_LABELS: Record<string, string> = {
  "level-up": "Subir de nível",
  trade: "Realizar uma troca",
  "use-item": "Usar item",
  shed: "Condição especial",
  spin: "Girar",
  "tower-of-darkness": "Concluir a Torre das Trevas",
  "tower-of-waters": "Concluir a Torre das Águas",
  "three-critical-hits": "Acertar três golpes críticos",
  "take-damage": "Receber dano em batalha",
  other: "Condição especial",
};

function capitalizeWord(word: string): string {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

export function formatPokemonResourceName(value: string): string {
  return value
    .trim()
    .replace(/[_\s]+/g, "-")
    .split("-")
    .filter(Boolean)
    .map(capitalizeWord)
    .join(" ");
}

function formatTimeOfDay(timeOfDay: string): string {
  if (timeOfDay === "day") {
    return "Durante o dia";
  }

  if (timeOfDay === "night") {
    return "Durante a noite";
  }

  return `Período: ${formatPokemonResourceName(timeOfDay)}`;
}

function formatGender(gender: number): string {
  if (gender === 1) {
    return "Gênero feminino";
  }

  if (gender === 2) {
    return "Gênero masculino";
  }

  return `Gênero exigido: ${gender}`;
}

function formatRelativePhysicalStats(value: number): string {
  if (value < 0) {
    return "Ataque menor que Defesa";
  }

  if (value > 0) {
    return "Ataque maior que Defesa";
  }

  return "Ataque igual à Defesa";
}

export function getPokemonEvolutionConditionLabels(
  requirements: PokemonEvolutionRequirements,
): string[] {
  const labels: string[] = [];

  const triggerName = requirements.triggerName.trim().toLowerCase();
  const itemName = requirements.itemName
    ? formatPokemonResourceName(requirements.itemName)
    : null;

  if (triggerName === "level-up") {
    labels.push(
      requirements.minLevel === null
        ? "Subir de nível"
        : `Atingir o nível ${requirements.minLevel}`,
    );
  } else if (triggerName === "use-item") {
    labels.push(itemName ? `Usar ${itemName}` : "Usar item");
  } else {
    labels.push(
      EVOLUTION_TRIGGER_LABELS[triggerName] ??
        formatPokemonResourceName(triggerName),
    );
  }

  if (itemName && triggerName !== "use-item") {
    labels.push(`Usar ${itemName}`);
  }

  if (requirements.heldItemName) {
    labels.push(
      `Segurando ${formatPokemonResourceName(requirements.heldItemName)}`,
    );
  }

  if (requirements.knownMoveName) {
    labels.push(
      `Conhecer ${formatPokemonResourceName(requirements.knownMoveName)}`,
    );
  }

  if (requirements.knownMoveTypeName) {
    labels.push(
      `Conhecer um golpe do tipo ${formatPokemonResourceName(
        requirements.knownMoveTypeName,
      )}`,
    );
  }

  if (requirements.locationName) {
    labels.push(`Em ${formatPokemonResourceName(requirements.locationName)}`);
  }

  if (requirements.partySpeciesName) {
    labels.push(
      `Com ${formatPokemonResourceName(
        requirements.partySpeciesName,
      )} na equipe`,
    );
  }

  if (requirements.partyTypeName) {
    labels.push(
      `Com um Pokémon do tipo ${formatPokemonResourceName(
        requirements.partyTypeName,
      )} na equipe`,
    );
  }

  if (requirements.tradeSpeciesName) {
    labels.push(
      `Trocar por ${formatPokemonResourceName(requirements.tradeSpeciesName)}`,
    );
  }

  if (requirements.gender !== null) {
    labels.push(formatGender(requirements.gender));
  }

  if (requirements.minLevel !== null && triggerName !== "level-up") {
    labels.push(`Nível mínimo ${requirements.minLevel}`);
  }

  if (requirements.minHappiness !== null) {
    labels.push(`Felicidade mínima ${requirements.minHappiness}`);
  }

  if (requirements.minBeauty !== null) {
    labels.push(`Beleza mínima ${requirements.minBeauty}`);
  }

  if (requirements.minAffection !== null) {
    labels.push(`Afeição mínima ${requirements.minAffection}`);
  }

  if (requirements.relativePhysicalStats !== null) {
    labels.push(
      formatRelativePhysicalStats(requirements.relativePhysicalStats),
    );
  }

  if (requirements.timeOfDay) {
    labels.push(formatTimeOfDay(requirements.timeOfDay));
  }

  if (requirements.nearSpecialRock) {
    labels.push("Próximo a uma rocha especial");
  }

  if (requirements.needsOverworldRain) {
    labels.push("Durante chuva no mundo");
  }

  if (requirements.turnUpsideDown) {
    labels.push("Com o dispositivo de cabeça para baixo");
  }

  return [...new Set(labels)];
}
