import { isPokemonType } from "../types/pokemon";

import type {
  PokemonFormDetails,
  PokemonSprites,
  PokemonType,
} from "../types/pokemon";

import type {
  PokemonApiFormResponse,
  PokemonApiTypeSlot,
} from "../types/pokemonApi";

import { parsePokemonApiResourceId } from "../utils/pokemonApiResource";
import { formatPokemonResourceName } from "../utils/pokemonResourceName";

function normalizeOptionalText(value: string): string | null {
  const normalizedValue = value.trim();

  return normalizedValue || null;
}

function normalizeImageUrl(url: string | null): string | null {
  const normalizedUrl = url?.trim() ?? "";

  return normalizedUrl || null;
}

function mapPokemonFormSprites(
  pokemonForm: PokemonApiFormResponse,
): PokemonSprites {
  return {
    frontDefaultUrl: normalizeImageUrl(pokemonForm.sprites.front_default),
    frontShinyUrl: normalizeImageUrl(pokemonForm.sprites.front_shiny),
  };
}

function mapPokemonFormTypes(types: PokemonApiTypeSlot[]): PokemonType[] {
  return [...types]
    .sort((firstType, secondType) => firstType.slot - secondType.slot)
    .map(({ type }) => {
      if (!isPokemonType(type.name)) {
        throw new Error(`Tipo de Pokémon desconhecido: ${type.name}`);
      }

      return type.name;
    });
}

export function mapPokemonApiToFormDetails(
  pokemonForm: PokemonApiFormResponse,
): PokemonFormDetails {
  const pokemonId = parsePokemonApiResourceId(pokemonForm.pokemon.url);

  const formName = pokemonForm.name.trim();

  if (pokemonId === null) {
    throw new Error(
      `Não foi possível identificar o Pokémon associado à forma: ${pokemonForm.pokemon.url}`,
    );
  }

  if (!formName) {
    throw new Error("A forma do Pokémon não possui um nome válido.");
  }

  return {
    id: pokemonForm.id,
    pokemonId,

    name: formName,
    displayName: formatPokemonResourceName(formName),
    formName: normalizeOptionalText(pokemonForm.form_name),

    isDefault: pokemonForm.is_default,
    isBattleOnly: pokemonForm.is_battle_only,
    isMega: pokemonForm.is_mega,

    formOrder: pokemonForm.form_order,

    types: mapPokemonFormTypes(pokemonForm.types),
    sprites: mapPokemonFormSprites(pokemonForm),

    versionGroupName: normalizeOptionalText(pokemonForm.version_group.name),
  };
}
