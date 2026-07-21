import { useState } from "react";
import { SearchBar } from "../../shared/components/ui/SearchBar/SearchBar";
import { usePokemonList } from "../../features/pokedex/hooks/usePokemonList";
import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";
import { Spinner } from "../../shared/components/ui/Spinner/Spinner";
import { PokemonGrid } from "../../features/pokedex/components/PokemonGrid/PokemonGrid";
import { ErrorState } from "../../shared/components/feedback/ErrorState/ErrorState";
import { EmptyState } from "../../shared/components/feedback/EmptyState/EmptyState";
import { Button } from "../../shared/components/ui/Button/Button";
import "./PokemonList.css";

export function PokemonList() {
  const { pokemonList, isLoading, error } = usePokemonList();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch() {
    const query = searchInput.trim();

    setSearchQuery(query);
  }

  function handleClearSearch() {
    setSearchInput("");
    setSearchQuery("");
  }

  const normalizedSearchQuery = searchQuery.toLowerCase();

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(normalizedSearchQuery),
  );

  const resultCount = filteredPokemonList.length;

  const resultMessage = searchQuery
    ? `${resultCount} ${
        resultCount === 1 ? "Pokémon encontrado" : "Pokémon encontrados"
      } para "${searchQuery}"`
    : `${resultCount} ${
        resultCount === 1 ? "Pokémon disponível" : "Pokémon disponíveis"
      }`;

  return (
    <PageContainer>
      <PageHeader
        title="Pokémon"
        description="Consulte os Pokémon disponíveis na Pokédex."
      />

      <SearchBar
        value={searchInput}
        placeholder="Pesquise pelo nome do Pokémon"
        buttonLabel="Pesquisar"
        onChange={setSearchInput}
        onSubmit={handleSearch}
      />

      {searchQuery && (
        <Button variant="secondary" onClick={handleClearSearch}>
          Limpar pesquisa
        </Button>
      )}

      {!isLoading && !error && filteredPokemonList.length > 0 && (
        <p className="pokemon-list__result-count">{resultMessage}</p>
      )}

      {isLoading && <Spinner size="large" label="Carregando Pokémon..." />}

      {error && <ErrorState title="Erro ao carregar Pokémon" message={error} />}

      {!isLoading && !error && filteredPokemonList.length === 0 && (
        <EmptyState
          title="Nenhum Pokémon encontrado"
          message={
            searchQuery
              ? `Não encontramos resultados para "${searchQuery}".`
              : "Não existem Pokémon disponíveis para exibição."
          }
          icon="?"
        />
      )}

      {!isLoading && !error && pokemonList.length > 0 && (
        <PokemonGrid pokemonList={filteredPokemonList} />
      )}
    </PageContainer>
  );
}
