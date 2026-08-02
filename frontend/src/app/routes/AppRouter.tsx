import { Route, Routes } from "react-router";

import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../../pages/Home/Home";
import { PokemonList } from "../../pages/PokemonList/PokemonList";
import { PokemonDetails } from "../../pages/PokemonDetails/PokemonDetails";
import { NotFound } from "../../pages/NotFound/NotFound";
import { PokemonRoutesLayout } from "../../features/pokedex/layouts/PokemonRoutesLayout";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="pokemon" element={<PokemonRoutesLayout />}>
          <Route index element={<PokemonList />} />
          <Route path=":pokemonId" element={<PokemonDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
