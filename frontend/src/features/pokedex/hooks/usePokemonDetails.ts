import { useEffect, useState } from "react";

import { getPokemonById } from "../services/pokemonService";
import type { PokemonDetails } from "../types/pokemon";

type UsePokemonDetailsReturn = {
  pokemon: PokemonDetails | null;
  isLoading: boolean;
  error: string | null;
};

type PokemonDetailsState = {
  pokemonId: number;
  pokemon: PokemonDetails | null;
  error: string | null;
};

export function usePokemonDetails(
  pokemonId: number | null,
): UsePokemonDetailsReturn {
  const [state, setState] = useState<PokemonDetailsState | null>(null);

  useEffect(() => {
    if (pokemonId === null) {
      return;
    }

    const currentPokemonId = pokemonId;
    let isCancelled = false;

    async function loadPokemonDetails() {
      try {
        const pokemonDetails = await getPokemonById(currentPokemonId);

        if (!isCancelled) {
          setState({
            pokemonId: currentPokemonId,
            pokemon: pokemonDetails,
            error: null,
          });
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setState({
          pokemonId: currentPokemonId,
          pokemon: null,
          error:
            error instanceof Error
              ? error.message
              : "Ocorreu um erro inesperado.",
        });
      }
    }

    void loadPokemonDetails();

    return () => {
      isCancelled = true;
    };
  }, [pokemonId]);

  if (pokemonId === null) {
    return {
      pokemon: null,
      isLoading: false,
      error: "O identificador do Pokémon é inválido.",
    };
  }

  const hasCurrentPokemon = state?.pokemonId === pokemonId;

  return {
    pokemon: hasCurrentPokemon ? state.pokemon : null,
    isLoading: !hasCurrentPokemon,
    error: hasCurrentPokemon ? state.error : null,
  };
}
