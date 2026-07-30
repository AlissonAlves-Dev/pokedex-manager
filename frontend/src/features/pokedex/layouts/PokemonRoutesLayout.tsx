import { useState } from "react";
import { Outlet, useMatch } from "react-router";

import { PokemonListRouteContext } from "../contexts/PokemonListRouterContext";
import { usePokemonExactSearch } from "../hooks/usePokemonExactSearch";
import { usePokemonList } from "../hooks/usePokemonList";

export function PokemonRoutesLayout() {
  const isPokemonListRoute =
    useMatch({
      path: "/pokemon",
      end: true,
    }) !== null;

  const pokemonListState = usePokemonList(20, 0, isPokemonListRoute);

  const pokemonExactSearchState = usePokemonExactSearch();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null,
  );

  return (
    <PokemonListRouteContext.Provider
      value={{
        ...pokemonListState,
        ...pokemonExactSearchState,
        searchInput,
        searchQuery,
        selectedPokemonId,
        setSearchInput,
        setSearchQuery,
        setSelectedPokemonId,
      }}
    >
      <Outlet />
    </PokemonListRouteContext.Provider>
  );
}
