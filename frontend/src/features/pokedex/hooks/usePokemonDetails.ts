import { useCallback, useEffect, useState } from "react";

import { getPokemonById } from "../services/pokemonService";
import type { PokemonDetails } from "../types/pokemon";

type UsePokemonDetailsReturn = {
  pokemon: PokemonDetails | null;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
};

type PokemonDetailsState = {
  pokemonId: number;
  requestKey: number;
  pokemon: PokemonDetails | null;
  error: string | null;
};

export function usePokemonDetails(
  pokemonId: number | null,
): UsePokemonDetailsReturn {
  const [state, setState] = useState<PokemonDetailsState | null>(null);
  const [requestKey, setRequestKey] = useState(0);

  const retry = useCallback(() => {
    setRequestKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    if (pokemonId === null) {
      return;
    }

    const controller = new AbortController();
    const currentPokemonId = pokemonId;
    const currentRequestKey = requestKey;

    async function loadPokemonDetails() {
      try {
        const pokemonDetails = await getPokemonById(
          currentPokemonId,
          controller.signal,
        );

        setState({
          pokemonId: currentPokemonId,
          requestKey: currentRequestKey,
          pokemon: pokemonDetails,
          error: null,
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          pokemonId: currentPokemonId,
          requestKey: currentRequestKey,
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
      controller.abort();
    };
  }, [pokemonId, requestKey]);

  if (pokemonId === null) {
    return {
      pokemon: null,
      isLoading: false,
      error: "O identificador do Pokémon é inválido.",
      retry,
    };
  }

  const hasCurrentRequest =
    state?.pokemonId === pokemonId && state.requestKey === requestKey;

  return {
    pokemon: hasCurrentRequest ? state.pokemon : null,
    isLoading: !hasCurrentRequest,
    error: hasCurrentRequest ? state.error : null,
    retry,
  };
}
