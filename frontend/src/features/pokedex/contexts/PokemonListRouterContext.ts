import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { UsePokemonExactSearchResult } from "../hooks/usePokemonExactSearch";
import type { UsePokemonListResult } from "../hooks/usePokemonList";

export type PokemonListRouteContextValue = UsePokemonListResult &
  UsePokemonExactSearchResult & {
    searchInput: string;
    searchQuery: string;
    selectedPokemonId: number | null;
    setSearchInput: Dispatch<SetStateAction<string>>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    setSelectedPokemonId: Dispatch<SetStateAction<number | null>>;
  };

export const PokemonListRouteContext = createContext<
  PokemonListRouteContextValue | undefined
>(undefined);

export function usePokemonListRouteContext() {
  const context = useContext(PokemonListRouteContext);

  if (!context) {
    throw new Error(
      "usePokemonListRouteContext deve ser utilizado dentro de PokemonRoutesLayout.",
    );
  }

  return context;
}
