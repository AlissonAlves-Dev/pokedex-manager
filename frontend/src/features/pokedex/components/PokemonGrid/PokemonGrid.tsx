import type { Pokemon } from "../../types/pokemon";

import { PokemonCard } from "../PokemonCard/PokemonCard";

import "./PokemonGrid.css";

type PokemonGridProps = {
  pokemonList: Pokemon[];
};

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  return (
    <div className="pokemon-grid">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
