export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];

export function isPokemonType(value: string): value is PokemonType {
  return POKEMON_TYPES.some((type) => type === value);
}

export type PokemonSummary = {
  id: number;
  name: string;
  imageUrl: string;
  types: PokemonType[];
};

export type PokemonListPage = {
  pokemonList: PokemonSummary[];
  totalCount: number;
  nextOffset: number | null;
};

export type PokemonAbility = {
  name: string;
  displayName: string;
  isHidden: boolean;
};

export type PokemonStat = {
  name: string;
  baseValue: number;
};

export type PokemonSprites = {
  frontDefaultUrl: string | null;
  frontShinyUrl: string | null;
};

export type PokemonEvolutionRequirements = {
  triggerName: string;
  versionGroupName: string | null;

  itemName: string | null;
  heldItemName: string | null;
  knownMoveName: string | null;
  knownMoveTypeName: string | null;
  locationName: string | null;
  partySpeciesName: string | null;
  partyTypeName: string | null;
  tradeSpeciesName: string | null;

  gender: number | null;
  minLevel: number | null;
  minHappiness: number | null;
  minBeauty: number | null;
  minAffection: number | null;
  relativePhysicalStats: number | null;

  timeOfDay: string | null;

  nearSpecialRock: boolean;
  needsOverworldRain: boolean;
  turnUpsideDown: boolean;
};

export type PokemonEvolutionNode = {
  speciesId: number;
  name: string;
  imageUrl: string;
  isBaby: boolean;
  evolutionOptions: PokemonEvolutionRequirements[];
  evolvesTo: PokemonEvolutionNode[];
};

export type PokemonEvolutionChain = {
  id: number;
  root: PokemonEvolutionNode;
};

export type PokemonDetails = PokemonSummary & {
  description: string | null;
  evolutionChain: PokemonEvolutionChain | null;
  sprites: PokemonSprites;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
};
