import { useCallback, useEffect, useRef, useState } from "react";

import { getPokemonSummaryByIdentifier } from "../services/pokemonService";
import type { PokemonSummary } from "../types/pokemon";
import { normalizePokemonSearchQuery } from "../utils/pokemonSearch";

export type UsePokemonExactSearchResult = {
  remotePokemon: PokemonSummary | null;
  isSearchingPokemon: boolean;
  exactSearchError: string | null;
  hasSearchedRemotely: boolean;
  searchExactPokemon: (query: string) => Promise<void>;
  clearExactSearch: () => void;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Ocorreu um erro inesperado durante a pesquisa.";
}

export function usePokemonExactSearch(): UsePokemonExactSearchResult {
  const [remotePokemon, setRemotePokemon] = useState<PokemonSummary | null>(
    null,
  );

  const [isSearchingPokemon, setIsSearchingPokemon] = useState(false);

  const [exactSearchError, setExactSearchError] = useState<string | null>(null);

  const [hasSearchedRemotely, setHasSearchedRemotely] = useState(false);

  const searchControllerRef = useRef<AbortController | null>(null);

  const clearExactSearch = useCallback(() => {
    searchControllerRef.current?.abort();
    searchControllerRef.current = null;

    setRemotePokemon(null);
    setIsSearchingPokemon(false);
    setExactSearchError(null);
    setHasSearchedRemotely(false);
  }, []);

  const searchExactPokemon = useCallback(async (query: string) => {
    const identifier = normalizePokemonSearchQuery(query);

    if (!identifier) {
      return;
    }

    searchControllerRef.current?.abort();

    const controller = new AbortController();

    searchControllerRef.current = controller;

    try {
      setIsSearchingPokemon(true);
      setRemotePokemon(null);
      setExactSearchError(null);
      setHasSearchedRemotely(false);

      const pokemon = await getPokemonSummaryByIdentifier(
        identifier,
        controller.signal,
      );

      if (controller.signal.aborted) {
        return;
      }

      setRemotePokemon(pokemon);
      setHasSearchedRemotely(true);
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      setExactSearchError(getErrorMessage(error));
    } finally {
      if (searchControllerRef.current === controller) {
        searchControllerRef.current = null;
        setIsSearchingPokemon(false);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      searchControllerRef.current?.abort();
    };
  }, []);

  return {
    remotePokemon,
    isSearchingPokemon,
    exactSearchError,
    hasSearchedRemotely,
    searchExactPokemon,
    clearExactSearch,
  };
}
