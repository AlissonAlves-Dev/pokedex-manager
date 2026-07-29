import { useLayoutEffect } from "react";
import { SearchBar } from "../../shared/components/ui/SearchBar/SearchBar";
import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";
import { Spinner } from "../../shared/components/ui/Spinner/Spinner";
import { PokemonGrid } from "../../features/pokedex/components/PokemonGrid/PokemonGrid";
import { ErrorState } from "../../shared/components/feedback/ErrorState/ErrorState";
import { EmptyState } from "../../shared/components/feedback/EmptyState/EmptyState";
import { Button } from "../../shared/components/ui/Button/Button";
import { usePokemonListRouteContext } from "../../features/pokedex/contexts/PokemonListRouterContext";
import "./PokemonList.css";

export function PokemonList() {
  const {
    pokemonList,
    totalCount,
    isLoading,
    isLoadingMore,
    error,
    loadMoreError,
    hasMore,
    loadMore,
    retry,
    searchInput,
    searchQuery,
    setSearchInput,
    setSearchQuery,
    selectedPokemonId,
    setSelectedPokemonId,
  } = usePokemonListRouteContext();

  function handleSearch() {
    const query = searchInput.trim();

    setSearchQuery(query);
  }

  function handleClearSearch() {
    setSearchInput("");
    setSearchQuery("");
  }

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const normalizedNumberQuery = normalizedSearchQuery.replace(/^#/, "");
  const isNumberSearch = /^\d+$/.test(normalizedNumberQuery);

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(normalizedSearchQuery);

    const matchesId =
      isNumberSearch && pokemon.id === Number(normalizedNumberQuery);

    return matchesName || matchesId;
  });

  useLayoutEffect(() => {
    if (isLoading || selectedPokemonId === null) {
      return;
    }

    let secondAnimationFrame = 0;

    const firstAnimationFrame = window.requestAnimationFrame(() => {
      secondAnimationFrame = window.requestAnimationFrame(() => {
        const selectedPokemonCard = document.querySelector<HTMLElement>(
          `[data-pokemon-id="${selectedPokemonId}"]`,
        );

        if (!selectedPokemonCard) {
          return;
        }

        selectedPokemonCard.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "nearest",
        });

        setSelectedPokemonId(null);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstAnimationFrame);
      window.cancelAnimationFrame(secondAnimationFrame);
    };
  }, [
    filteredPokemonList.length,
    isLoading,
    selectedPokemonId,
    setSelectedPokemonId,
  ]);

  const resultCount = filteredPokemonList.length;

  const resultMessage = searchQuery
    ? `${resultCount} ${
        resultCount === 1 ? "Pokémon encontrado" : "Pokémon encontrados"
      } entre ${pokemonList.length} carregados para "${searchQuery}"`
    : `${pokemonList.length} de ${totalCount} Pokémon carregados`;

  return (
    <PageContainer>
      <PageHeader
        title="Pokémon"
        description="Consulte os Pokémon disponíveis na Pokédex."
      />

      <SearchBar
        value={searchInput}
        placeholder="Pesquise pelo nome ou número"
        buttonLabel="Pesquisar"
        onChange={setSearchInput}
        onSubmit={handleSearch}
      />

      {searchQuery && (
        <Button
          className="pokemon-list__clear-search"
          variant="secondary"
          onClick={handleClearSearch}
        >
          Limpar pesquisa
        </Button>
      )}

      {!isLoading && !error && filteredPokemonList.length > 0 && (
        <p className="pokemon-list__result-count">{resultMessage}</p>
      )}

      {isLoading && <Spinner size="large" label="Carregando Pokémon..." />}

      {error && (
        <ErrorState
          title="Erro ao carregar Pokémon"
          message={error}
          onRetry={retry}
        />
      )}

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

      {!isLoading && !error && filteredPokemonList.length > 0 && (
        <PokemonGrid
          pokemonList={filteredPokemonList}
          onPokemonSelect={setSelectedPokemonId}
        />
      )}

      {!isLoading && !error && pokemonList.length > 0 && (
        <div className="pokemon-list__pagination">
          {loadMoreError && (
            <p className="pokemon-list__load-more-error" role="alert">
              {loadMoreError}
            </p>
          )}

          {hasMore && !isLoadingMore && (
            <Button onClick={loadMore}>
              {loadMoreError ? "Tentar novamente" : "Carregar mais"}
            </Button>
          )}

          {isLoadingMore && (
            <Spinner size="small" label="Carregando mais Pokémon..." />
          )}

          {!hasMore && (
            <p className="pokemon-list__end-message" role="status">
              Todos os Pokémon foram carregados.
            </p>
          )}
        </div>
      )}
    </PageContainer>
  );
}
