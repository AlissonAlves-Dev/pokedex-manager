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

export type PokemonAbility = {
  name: string;
  isHidden: boolean;
};

export type PokemonStat = {
  name: string;
  baseValue: number;
};

export type PokemonDetails = PokemonSummary & {
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
};
