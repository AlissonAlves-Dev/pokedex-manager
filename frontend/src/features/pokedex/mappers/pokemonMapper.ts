import { isPokemonType } from "../types/pokemon";

import type {
  PokemonDetails,
  PokemonSprites,
  PokemonSummary,
} from "../types/pokemon";
import type { PokemonApiDetailResponse } from "../types/pokemonApi";
import { getAbilityDisplayName } from "./pokemonAbilityMapper";

function mapPokemonTypes(
  pokemon: PokemonApiDetailResponse,
): PokemonSummary["types"] {
  return [...pokemon.types]
    .sort((firstType, secondType) => firstType.slot - secondType.slot)
    .map(({ type }) => {
      if (!isPokemonType(type.name)) {
        throw new Error(`Tipo de Pokémon desconhecido: ${type.name}`);
      }

      return type.name;
    });
}

function normalizeSpriteUrl(url: string | null): string | null {
  const normalizedUrl = url?.trim() ?? "";

  return normalizedUrl || null;
}

function mapPokemonSprites(pokemon: PokemonApiDetailResponse): PokemonSprites {
  return {
    frontDefaultUrl: normalizeSpriteUrl(pokemon.sprites.front_default),
    frontShinyUrl: normalizeSpriteUrl(pokemon.sprites.front_shiny),
  };
}

export function mapPokemonApiToSummary(
  pokemon: PokemonApiDetailResponse,
): PokemonSummary {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.other["official-artwork"].front_default ?? "",
    types: mapPokemonTypes(pokemon),
  };
}

export function mapPokemonApiToDetails(
  pokemon: PokemonApiDetailResponse,
  description: string | null = null,
): PokemonDetails {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.other["official-artwork"].front_default ?? "",
    types: mapPokemonTypes(pokemon),

    description,
    sprites: mapPokemonSprites(pokemon),

    height: pokemon.height,
    weight: pokemon.weight,

    abilities: pokemon.abilities.map(({ ability, is_hidden }) => ({
      name: ability.name,
      displayName: getAbilityDisplayName(ability.name),
      isHidden: is_hidden,
    })),

    stats: pokemon.stats.map(({ stat, base_stat }) => ({
      name: stat.name,
      baseValue: base_stat,
    })),
  };
}
