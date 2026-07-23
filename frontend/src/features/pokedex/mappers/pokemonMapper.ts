import { isPokemonType } from "../types/pokemon";

import type { PokemonDetails, PokemonSummary } from "../types/pokemon";
import type { PokemonApiDetailResponse } from "../types/pokemonApi";

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
): PokemonDetails {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.other["official-artwork"].front_default ?? "",

    types: mapPokemonTypes(pokemon),

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
