import { useCallback, useEffect, useState } from "react";

import { getPokemonList } from "../services/pokemonService";
import type { PokemonSummary } from "../types/pokemon";

type UsePokemonListResult = {
  pokemonList: PokemonSummary[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
};

export function usePokemonList(limit = 20, offset = 0): UsePokemonListResult {
  const [pokemonList, setPokemonList] = useState<PokemonSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestKey, setRequestKey] = useState(0);

  const retry = useCallback(() => {
    setRequestKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemonList() {
      try {
        setIsLoading(true);
        setError(null);

        const pokemon = await getPokemonList(limit, offset, controller.signal);

        setPokemonList(pokemon);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Ocorreu um erro inesperado.";

        setError(message);
        setPokemonList([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPokemonList();

    return () => {
      controller.abort();
    };
  }, [limit, offset, requestKey]);

  return {
    pokemonList,
    isLoading,
    error,
    retry,
  };
}
