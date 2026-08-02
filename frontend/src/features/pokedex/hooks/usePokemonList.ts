import { useCallback, useEffect, useRef, useState } from "react";

import { getPokemonList } from "../services/pokemonService";
import type { PokemonSummary } from "../types/pokemon";

export type UsePokemonListResult = {
  pokemonList: PokemonSummary[];
  totalCount: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  loadMoreError: string | null;
  hasMore: boolean;
  loadMore: () => void;
  retry: () => void;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
}

export function usePokemonList(
  limit = 20,
  offset = 0,
  enabled = true,
): UsePokemonListResult {
  const [pokemonList, setPokemonList] = useState<PokemonSummary[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextOffset, setNextOffset] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);

  const [requestKey, setRequestKey] = useState(0);

  const hasLoadedInitialPageRef = useRef(false);
  const isLoadingMoreRef = useRef(false);
  const loadMoreControllerRef = useRef<AbortController | null>(null);

  const retry = useCallback(() => {
    setRequestKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    if (!enabled || hasLoadedInitialPageRef.current) {
      return;
    }
    const controller = new AbortController();

    async function loadInitialPokemonList() {
      try {
        setIsLoading(true);
        setError(null);
        setLoadMoreError(null);

        const page = await getPokemonList(limit, offset, controller.signal);

        setPokemonList(page.pokemonList);
        setTotalCount(page.totalCount);
        setNextOffset(page.nextOffset);

        hasLoadedInitialPageRef.current = true;
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setError(getErrorMessage(error));
        setPokemonList([]);
        setTotalCount(0);
        setNextOffset(null);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialPokemonList();

    return () => {
      controller.abort();
    };
  }, [enabled, limit, offset, requestKey]);

  const loadMore = useCallback(async () => {
    if (isLoading || isLoadingMoreRef.current || nextOffset === null) {
      return;
    }

    const controller = new AbortController();

    loadMoreControllerRef.current = controller;
    isLoadingMoreRef.current = true;

    try {
      setIsLoadingMore(true);
      setLoadMoreError(null);

      const page = await getPokemonList(limit, nextOffset, controller.signal);

      setPokemonList((currentPokemonList) => {
        const currentPokemonIds = new Set(
          currentPokemonList.map((pokemon) => pokemon.id),
        );

        const newPokemon = page.pokemonList.filter(
          (pokemon) => !currentPokemonIds.has(pokemon.id),
        );

        return [...currentPokemonList, ...newPokemon];
      });

      setTotalCount(page.totalCount);
      setNextOffset(page.nextOffset);
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      setLoadMoreError(getErrorMessage(error));
    } finally {
      if (!controller.signal.aborted) {
        setIsLoadingMore(false);
      }

      if (loadMoreControllerRef.current === controller) {
        loadMoreControllerRef.current = null;
      }

      isLoadingMoreRef.current = false;
    }
  }, [isLoading, limit, nextOffset]);

  useEffect(() => {
    return () => {
      loadMoreControllerRef.current?.abort();
    };
  }, []);

  return {
    pokemonList,
    totalCount,
    isLoading,
    isLoadingMore,
    error,
    loadMoreError,
    hasMore: nextOffset !== null,
    loadMore,
    retry,
  };
}
