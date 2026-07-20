import { usePokemonList } from "../../features/pokedex/hooks/usePokemonList";
import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";
import { Spinner } from "../../shared/components/ui/Spinner/Spinner";
import { PokemonGrid } from "../../features/pokedex/components/PokemonGrid/PokemonGrid";

export function PokemonList() {
  const { pokemonList, isLoading, error } = usePokemonList();

  return (
    <PageContainer>
      <PageHeader
        title="Pokémon"
        description="Consulte os Pokémon disponíveis na Pokédex."
      />

      {isLoading && <Spinner size="large" label="Carregando Pokémon..." />}

      {error && <p>{error}</p>}

      {!isLoading && !error && pokemonList.length > 0 && (
        <PokemonGrid pokemonList={pokemonList} />
      )}
    </PageContainer>
  );
}
