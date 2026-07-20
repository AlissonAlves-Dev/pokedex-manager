import { useEffect, useState } from "react";

import { getPokemonList } from "../services/pokemonService";
import type { Pokemon } from "../types/pokemon";

type UsePokemonListResult = {
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: string | null;
};

export function usePokemonList(limit = 20, offset = 0): UsePokemonListResult {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPokemonList() {
      try {
        setIsLoading(true);
        setError(null);

        const pokemon = await getPokemonList(limit, offset);

        setPokemonList(pokemon);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Ocorreu um erro inesperado.";

        setError(message);
        setPokemonList([]);
      } finally {
        setIsLoading(false);
      }
    }

    void loadPokemonList();
  }, [limit, offset]);

  return {
    pokemonList,
    isLoading,
    error,
  };
}
