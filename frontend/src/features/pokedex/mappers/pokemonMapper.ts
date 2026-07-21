import type {
  PokemonDetails,
  PokemonSummary,
  PokemonType,
} from "../types/pokemon";

import type { PokemonApiDetailResponse } from "../types/pokemonApi";

export function mapPokemonApiToSummary(
  pokemon: PokemonApiDetailResponse,
): PokemonSummary {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.other["official-artwork"].front_default ?? "",
    types: [...pokemon.types]
      .sort((firstType, secondType) => firstType.slot - secondType.slot)
      .map(({ type }) => type.name as PokemonType),
  };
}

export function mapPokemonApiToDetails(
  pokemon: PokemonApiDetailResponse,
): PokemonDetails {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.other["official-artwork"].front_default ?? "",

    types: [...pokemon.types]
      .sort((firstType, secondType) => firstType.slot - secondType.slot)
      .map(({ type }) => type.name as PokemonType),

    height: pokemon.height,
    weight: pokemon.weight,

    abilities: pokemon.abilities.map(({ ability, is_hidden }) => ({
      name: ability.name,
      isHidden: is_hidden,
    })),

    stats: pokemon.stats.map(({ stat, base_stat }) => ({
      name: stat.name,
      baseValue: base_stat,
    })),
  };
}
