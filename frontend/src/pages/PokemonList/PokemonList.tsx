import { useLayoutEffect } from "react";

import { PokemonGrid } from "../../features/pokedex/components/PokemonGrid/PokemonGrid";
import { usePokemonListRouteContext } from "../../features/pokedex/contexts/PokemonListRouterContext";
import {
  findExactPokemonMatch,
  normalizePokemonSearchQuery,
} from "../../features/pokedex/utils/pokemonSearch";
import { EmptyState } from "../../shared/components/feedback/EmptyState/EmptyState";
import { ErrorState } from "../../shared/components/feedback/ErrorState/ErrorState";
import { Button } from "../../shared/components/ui/Button/Button";
import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";
import { SearchBar } from "../../shared/components/ui/SearchBar/SearchBar";
import { Spinner } from "../../shared/components/ui/Spinner/Spinner";

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

    remotePokemon,
    isSearchingPokemon,
    exactSearchError,
    hasSearchedRemotely,
    searchExactPokemon,
    clearExactSearch,

    searchInput,
    searchQuery,
    setSearchInput,
    setSearchQuery,

    selectedPokemonId,
    setSelectedPokemonId,
  } = usePokemonListRouteContext();

  function handleSearchInputChange(value: string) {
    setSearchInput(value);

    if (value !== searchQuery) {
      setSearchQuery("");
      clearExactSearch();
    }
  }

  function handleSearch() {
    const query = searchInput.trim();
    const normalizedQuery = normalizePokemonSearchQuery(query);

    clearExactSearch();

    if (!query) {
      setSearchInput("");
      setSearchQuery("");
      return;
    }

    if (!normalizedQuery) {
      setSearchQuery("");
      return;
    }

    setSearchQuery(query);

    const exactLocalPokemon = findExactPokemonMatch(pokemonList, query);

    if (exactLocalPokemon) {
      return;
    }

    void searchExactPokemon(query);
  }

  function handleRetryExactSearch() {
    if (!searchQuery) {
      return;
    }

    void searchExactPokemon(searchQuery);
  }

  function handleClearSearch() {
    clearExactSearch();
    setSearchInput("");
    setSearchQuery("");
  }

  const activeSearch = searchInput.trim();
  const normalizedSearchInput = normalizePokemonSearchQuery(searchInput);

  const hasSearchInput = activeSearch.length > 0;
  const hasActiveSearch = normalizedSearchInput.length > 0;
  const isNumberSearch = /^\d+$/.test(normalizedSearchInput);

  const filteredPokemonList = hasActiveSearch
    ? pokemonList.filter((pokemon) => {
        const matchesName = pokemon.name
          .toLowerCase()
          .includes(normalizedSearchInput);

        const matchesId =
          isNumberSearch && pokemon.id === Number(normalizedSearchInput);

        return matchesName || matchesId;
      })
    : pokemonList;

  const isRemotePokemonAlreadyLoaded =
    remotePokemon !== null &&
    pokemonList.some((pokemon) => pokemon.id === remotePokemon.id);

  const shouldShowRemotePokemon =
    remotePokemon !== null && !isRemotePokemonAlreadyLoaded;

  const shouldShowExactSearchSection =
    isSearchingPokemon ||
    exactSearchError !== null ||
    shouldShowRemotePokemon ||
    (hasSearchedRemotely && remotePokemon === null);

  const exactSearchStatusMessage =
    !isSearchingPokemon && !exactSearchError && shouldShowRemotePokemon
      ? `Resultado exato encontrado para "${searchQuery}".`
      : !isSearchingPokemon &&
          !exactSearchError &&
          hasSearchedRemotely &&
          remotePokemon === null
        ? `Nenhum Pokémon exato encontrado para "${searchQuery}".`
        : "";

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

  const resultMessage = hasActiveSearch
    ? `${resultCount} ${
        resultCount === 1 ? "Pokémon encontrado" : "Pokémon encontrados"
      } entre ${pokemonList.length} carregados para "${activeSearch}"`
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
        buttonLabel={isSearchingPokemon ? "Pesquisando..." : "Pesquisar"}
        isSubmitting={isSearchingPokemon}
        onChange={handleSearchInputChange}
        onSubmit={handleSearch}
      />

      <p
        className="pokemon-list__search-status"
        role="status"
        aria-atomic="true"
      >
        {exactSearchStatusMessage}
      </p>

      {hasSearchInput && (
        <Button
          className="pokemon-list__clear-search"
          variant="secondary"
          onClick={handleClearSearch}
        >
          Limpar pesquisa
        </Button>
      )}

      {!isLoading && !error && pokemonList.length > 0 && (
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

      {shouldShowExactSearchSection && (
        <section
          className="pokemon-list__exact-search"
          aria-label="Resultado da pesquisa exata"
          aria-busy={isSearchingPokemon}
        >
          {isSearchingPokemon && (
            <div className="pokemon-list__exact-search-loading">
              <Spinner
                size="small"
                label={`Pesquisando "${searchQuery}" na Pokédex...`}
              />
            </div>
          )}

          {!isSearchingPokemon && exactSearchError && (
            <ErrorState
              title="Erro ao pesquisar Pokémon"
              message={exactSearchError}
              onRetry={handleRetryExactSearch}
            />
          )}

          {!isSearchingPokemon &&
            !exactSearchError &&
            shouldShowRemotePokemon && (
              <>
                <h2 className="pokemon-list__exact-search-title">
                  Resultado exato
                </h2>

                <div className="pokemon-list__exact-result">
                  <PokemonGrid
                    pokemonList={remotePokemon ? [remotePokemon] : []}
                    onPokemonSelect={setSelectedPokemonId}
                  />
                </div>
              </>
            )}

          {!isSearchingPokemon &&
            !exactSearchError &&
            hasSearchedRemotely &&
            remotePokemon === null && (
              <EmptyState
                title="Pokémon exato não encontrado"
                message={`Não encontramos um Pokémon com nome ou número exato para "${searchQuery}".`}
                icon="?"
              />
            )}
        </section>
      )}

      {!isLoading &&
        !error &&
        filteredPokemonList.length === 0 &&
        !shouldShowExactSearchSection && (
          <EmptyState
            title="Nenhum Pokémon encontrado"
            message={
              hasActiveSearch
                ? `Não encontramos resultados entre os Pokémon carregados para "${activeSearch}".`
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
