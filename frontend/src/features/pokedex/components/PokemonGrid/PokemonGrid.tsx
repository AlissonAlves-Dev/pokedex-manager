import type { PokemonSummary } from "../../types/pokemon";
import { PokemonCard } from "../PokemonCard/PokemonCard";

import "./PokemonGrid.css";

type PokemonGridProps = {
  pokemonList: PokemonSummary[];
  onPokemonSelect?: (pokemonId: number) => void;
};

export function PokemonGrid({
  pokemonList,
  onPokemonSelect,
}: PokemonGridProps) {
  return (
    <div className="pokemon-grid">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onSelect={onPokemonSelect}
        />
      ))}
    </div>
  );
}
