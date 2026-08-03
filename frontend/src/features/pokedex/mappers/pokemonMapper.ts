import { isPokemonType } from "../types/pokemon";

import type {
  PokemonDetails,
  PokemonEvolutionChain,
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

function normalizeImageUrl(url: string | null): string | null {
  const normalizedUrl = url?.trim() ?? "";

  return normalizedUrl || null;
}

function mapPokemonSprites(pokemon: PokemonApiDetailResponse): PokemonSprites {
  return {
    frontDefaultUrl: normalizeImageUrl(pokemon.sprites.front_default),
    frontShinyUrl: normalizeImageUrl(pokemon.sprites.front_shiny),
  };
}

function mapOfficialArtworkUrl(pokemon: PokemonApiDetailResponse): string {
  return (
    normalizeImageUrl(
      pokemon.sprites.other["official-artwork"].front_default,
    ) ?? ""
  );
}

export function mapPokemonApiToSummary(
  pokemon: PokemonApiDetailResponse,
): PokemonSummary {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: mapOfficialArtworkUrl(pokemon),
    types: mapPokemonTypes(pokemon),
  };
}

type PokemonDetailsAdditionalData = {
  description?: string | null;
  evolutionChain?: PokemonEvolutionChain | null;
};

export function mapPokemonApiToDetails(
  pokemon: PokemonApiDetailResponse,
  {
    description = null,
    evolutionChain = null,
  }: PokemonDetailsAdditionalData = {},
): PokemonDetails {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: mapOfficialArtworkUrl(pokemon),
    types: mapPokemonTypes(pokemon),

    description,
    evolutionChain,
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
