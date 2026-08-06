import { isPokemonType } from "../types/pokemon";

import type {
  PokemonDetails,
  PokemonDetailsSupplementaryData,
  PokemonFormReference,
  PokemonSprites,
  PokemonSummary,
} from "../types/pokemon";
import type {
  PokemonApiDetailResponse,
  PokemonApiNamedResource,
} from "../types/pokemonApi";
import { getAbilityDisplayName } from "./pokemonAbilityMapper";
import { parsePokemonApiResourceId } from "../utils/pokemonApiResource";
import { formatPokemonResourceName } from "../utils/pokemonResourceName";

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

function mapPokemonFormReference(
  form: PokemonApiNamedResource,
): PokemonFormReference | null {
  const formId = parsePokemonApiResourceId(form.url);
  const formName = form.name.trim();

  if (formId === null || !formName) {
    return null;
  }

  return {
    id: formId,
    name: formName,
    displayName: formatPokemonResourceName(formName),
  };
}

function mapPokemonFormReferences(
  forms: PokemonApiNamedResource[],
): PokemonFormReference[] {
  return forms.flatMap((form) => {
    const formReference = mapPokemonFormReference(form);

    return formReference ? [formReference] : [];
  });
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

const EMPTY_POKEMON_DETAILS_SUPPLEMENTARY_DATA: PokemonDetailsSupplementaryData =
  {
    description: null,
    evolutionChain: null,
    variations: null,
    formsSwitchable: null,
    hasGenderDifferences: null,
  };

export function mapPokemonApiToDetails(
  pokemon: PokemonApiDetailResponse,
  supplementaryData: PokemonDetailsSupplementaryData = EMPTY_POKEMON_DETAILS_SUPPLEMENTARY_DATA,
): PokemonDetails {
  const {
    description,
    evolutionChain,
    variations,
    formsSwitchable,
    hasGenderDifferences,
  } = supplementaryData;
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: mapOfficialArtworkUrl(pokemon),
    types: mapPokemonTypes(pokemon),

    description,
    evolutionChain,

    isDefaultVariation: pokemon.is_default,
    variations,
    forms: mapPokemonFormReferences(pokemon.forms),

    formsSwitchable,
    hasGenderDifferences,

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
