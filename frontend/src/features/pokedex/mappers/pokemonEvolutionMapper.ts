import type {
  PokemonEvolutionChain,
  PokemonEvolutionNode,
  PokemonEvolutionRequirements,
} from "../types/pokemon";
import type {
  PokemonApiEvolutionChainLink,
  PokemonApiEvolutionChainResponse,
  PokemonApiEvolutionDetail,
  PokemonApiNamedResource,
} from "../types/pokemonApi";

const POKEMON_SPRITE_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

function normalizeResourceName(
  resource: PokemonApiNamedResource | null,
): string | null {
  const normalizedName = resource?.name.trim() ?? "";

  return normalizedName || null;
}

function normalizeOptionalText(value: string): string | null {
  const normalizedValue = value.trim();

  return normalizedValue || null;
}

function extractSpeciesId(speciesUrl: string): number {
  const normalizedUrl = speciesUrl.trim().replace(/\/+$/, "");
  const lastPathSegment = normalizedUrl.split("/").pop();
  const speciesId = Number(lastPathSegment);

  if (!Number.isInteger(speciesId) || speciesId <= 0) {
    throw new Error(
      `Não foi possível identificar a espécie pela URL: ${speciesUrl}`,
    );
  }

  return speciesId;
}

function createPokemonSpriteUrl(speciesId: number): string {
  return `${POKEMON_SPRITE_BASE_URL}/${speciesId}.png`;
}

function selectEvolutionDetails(
  evolutionDetails: PokemonApiEvolutionDetail[] | null,
): PokemonApiEvolutionDetail[] {
  const availableDetails = evolutionDetails ?? [];

  if (availableDetails.length === 0) {
    return [];
  }

  const baseSpeciesDetails = availableDetails.filter(
    (detail) => detail.base_form === null && detail.evolved_form === null,
  );

  const relevantDetails =
    baseSpeciesDetails.length > 0 ? baseSpeciesDetails : availableDetails;

  const defaultDetails = relevantDetails.filter((detail) => detail.is_default);

  if (defaultDetails.length > 0) {
    return defaultDetails;
  }

  return [relevantDetails[0]];
}

function mapEvolutionRequirements(
  detail: PokemonApiEvolutionDetail,
): PokemonEvolutionRequirements {
  return {
    triggerName: detail.trigger.name,
    versionGroupName: normalizeResourceName(detail.version_group),

    itemName: normalizeResourceName(detail.item),
    heldItemName: normalizeResourceName(detail.held_item),
    knownMoveName: normalizeResourceName(detail.known_move),
    knownMoveTypeName: normalizeResourceName(detail.known_move_type),
    locationName: normalizeResourceName(detail.location),
    partySpeciesName: normalizeResourceName(detail.party_species),
    partyTypeName: normalizeResourceName(detail.party_type),
    tradeSpeciesName: normalizeResourceName(detail.trade_species),

    gender: detail.gender,
    minLevel: detail.min_level,
    minHappiness: detail.min_happiness,
    minBeauty: detail.min_beauty,
    minAffection: detail.min_affection,
    relativePhysicalStats: detail.relative_physical_stats,

    timeOfDay: normalizeOptionalText(detail.time_of_day),

    nearSpecialRock: detail.near_special_rock,
    needsOverworldRain: detail.needs_overworld_rain,
    turnUpsideDown: detail.turn_upside_down,
  };
}

function createEvolutionRequirementsKey(
  requirements: PokemonEvolutionRequirements,
): string {
  return JSON.stringify(
    Object.entries(requirements).filter(
      ([propertyName]) => propertyName !== "versionGroupName",
    ),
  );
}

function mapEvolutionOptions(
  evolutionDetails: PokemonApiEvolutionDetail[] | null,
): PokemonEvolutionRequirements[] {
  const uniqueOptions = new Map<string, PokemonEvolutionRequirements>();

  for (const detail of selectEvolutionDetails(evolutionDetails)) {
    const requirements = mapEvolutionRequirements(detail);
    const requirementsKey = createEvolutionRequirementsKey(requirements);

    if (!uniqueOptions.has(requirementsKey)) {
      uniqueOptions.set(requirementsKey, requirements);
    }
  }

  return [...uniqueOptions.values()];
}

function mapEvolutionNode(
  chainLink: PokemonApiEvolutionChainLink,
): PokemonEvolutionNode {
  const speciesId = extractSpeciesId(chainLink.species.url);

  const evolutionOptions = mapEvolutionOptions(chainLink.evolution_details);

  return {
    speciesId,
    name: chainLink.species.name,
    imageUrl: createPokemonSpriteUrl(speciesId),
    isBaby: chainLink.is_baby,
    evolutionOptions,
    evolvesTo: chainLink.evolves_to.map(mapEvolutionNode),
  };
}

export function mapPokemonEvolutionChain(
  evolutionChain: PokemonApiEvolutionChainResponse,
): PokemonEvolutionChain {
  return {
    id: evolutionChain.id,
    root: mapEvolutionNode(evolutionChain.chain),
  };
}
