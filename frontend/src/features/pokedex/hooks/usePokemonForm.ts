import { useCallback, useEffect, useState } from "react";

import { getPokemonFormById } from "../services/pokemonService";
import type { PokemonFormDetails } from "../types/pokemon";

type UsePokemonFormReturn = {
  pokemonForm: PokemonFormDetails | null;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
};

type PokemonFormState = {
  pokemonId: number;
  formId: number;
  requestKey: number;
  pokemonForm: PokemonFormDetails | null;
  error: string | null;
};

const POKEMON_FORM_OWNER_MISMATCH_ERROR =
  "A forma selecionada não pertence ao Pokémon atual.";

export function usePokemonForm(
  pokemonId: number | null,
  formId: number | null,
): UsePokemonFormReturn {
  const [state, setState] = useState<PokemonFormState | null>(null);
  const [requestKey, setRequestKey] = useState(0);

  const retry = useCallback(() => {
    setRequestKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    if (pokemonId === null || formId === null) {
      return;
    }

    const controller = new AbortController();

    const currentPokemonId = pokemonId;
    const currentFormId = formId;
    const currentRequestKey = requestKey;

    async function loadPokemonForm() {
      try {
        const pokemonForm = await getPokemonFormById(
          currentFormId,
          controller.signal,
        );

        if (controller.signal.aborted) {
          return;
        }

        if (pokemonForm.pokemonId !== currentPokemonId) {
          setState({
            pokemonId: currentPokemonId,
            formId: currentFormId,
            requestKey: currentRequestKey,
            pokemonForm: null,
            error: POKEMON_FORM_OWNER_MISMATCH_ERROR,
          });

          return;
        }

        setState({
          pokemonId: currentPokemonId,
          formId: currentFormId,
          requestKey: currentRequestKey,
          pokemonForm,
          error: null,
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          pokemonId: currentPokemonId,
          formId: currentFormId,
          requestKey: currentRequestKey,
          pokemonForm: null,
          error:
            error instanceof Error
              ? error.message
              : "Ocorreu um erro inesperado ao carregar a forma do Pokémon.",
        });
      }
    }

    void loadPokemonForm();

    return () => {
      controller.abort();
    };
  }, [pokemonId, formId, requestKey]);

  if (pokemonId === null || formId === null) {
    return {
      pokemonForm: null,
      isLoading: false,
      error: null,
      retry,
    };
  }

  const hasCurrentRequest =
    state?.pokemonId === pokemonId &&
    state.formId === formId &&
    state.requestKey === requestKey;

  return {
    pokemonForm: hasCurrentRequest ? state.pokemonForm : null,
    isLoading: !hasCurrentRequest,
    error: hasCurrentRequest ? state.error : null,
    retry,
  };
}
