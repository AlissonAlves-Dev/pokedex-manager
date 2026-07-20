import type { Pokemon, PokemonType } from "../types/pokemon";
import type {
  PokemonApiDetailResponse,
  PokemonApiListResponse,
} from "../types/pokemonApi";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

function mapPokemonDetailToPokemon(pokemon: PokemonApiDetailResponse): Pokemon {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.other["official-artwork"].front_default ?? "",
    types: pokemon.types
      .sort((firstType, secondType) => firstType.slot - secondType.slot)
      .map(({ type }) => type.name as PokemonType),
  };
}

async function getPokemonDetails(url: string): Promise<Pokemon> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os dados do Pokémon.");
  }

  const data: PokemonApiDetailResponse = await response.json();

  return mapPokemonDetailToPokemon(data);
}

export async function getPokemonList(
  limit = 20,
  offset = 0,
): Promise<Pokemon[]> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar a lista de Pokémon.");
  }

  const data: PokemonApiListResponse = await response.json();

  return Promise.all(
    data.results.map((pokemon) => getPokemonDetails(pokemon.url)),
  );
}
