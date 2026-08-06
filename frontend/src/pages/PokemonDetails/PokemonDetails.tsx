import { useLocation, useParams } from "react-router";
import { useEffect, useMemo } from "react";

import { PokemonDetailsHeader } from "../../features/pokedex/components/PokemonDetailsHeader/PokemonDetailsHeader";
import { PokemonPhysicalInfo } from "../../features/pokedex/components/PokemonPhysicalInfo/PokemonPhysicalInfo";
import { usePokemonDetails } from "../../features/pokedex/hooks/usePokemonDetails";
import { ErrorState } from "../../shared/components/feedback/ErrorState/ErrorState";
import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";
import { Spinner } from "../../shared/components/ui/Spinner/Spinner";
import { PokemonAbilities } from "../../features/pokedex/components/PokemonAbilities/PokemonAbilities";
import { PokemonStats } from "../../features/pokedex/components/PokemonStats/PokemonStats";
import { BackButton } from "../../shared/components/BackButton/BackButton";
import { PokemonDescription } from "../../features/pokedex/components/PokemonDescription/PokemonDescription";
import { PokemonSprites } from "../../features/pokedex/components/PokemonSprites/PokemonSprites";
import { PokemonEvolutionChain } from "../../features/pokedex/components/PokemonEvolutionChain/PokemonEvolutionChain";
import { usePokemonForm } from "../../features/pokedex/hooks/usePokemonForm";
import { parsePokemonFormSearchParam } from "../../features/pokedex/utils/pokemonFormSearchParam";
import { resolvePokemonFormSelection } from "../../features/pokedex/utils/pokemonFormSelection";
import { PokemonFormDetailsPanel } from "../../features/pokedex/components/PokemonFormDetailsPanel/PokemonFormDetailsPanel";
import { PokemonVariationsAndForms } from "../../features/pokedex/components/PokemonVariationsAndForms/PokemonVariationsAndForms";

import "./PokemonDetails.css";

type PokemonDetailsLocationState = {
  fromPokemonList: true;
};

function isPokemonDetailsLocationState(
  value: unknown,
): value is PokemonDetailsLocationState {
  return (
    typeof value === "object" &&
    value !== null &&
    "fromPokemonList" in value &&
    value.fromPokemonList === true
  );
}

export function PokemonDetails() {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const location = useLocation();

  const formSearchParam = useMemo(
    () => parsePokemonFormSearchParam(new URLSearchParams(location.search)),
    [location.search],
  );

  const cameFromPokemonList = isPokemonDetailsLocationState(location.state);

  const parsedPokemonId = pokemonId ? Number(pokemonId) : null;

  const validPokemonId =
    parsedPokemonId !== null &&
    Number.isInteger(parsedPokemonId) &&
    parsedPokemonId > 0
      ? parsedPokemonId
      : null;

  useEffect(() => {
    if (validPokemonId === null) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [validPokemonId]);

  const { pokemon, isLoading, error, retry } =
    usePokemonDetails(validPokemonId);

  const formSelection = useMemo(() => {
    if (!pokemon) {
      return null;
    }

    return resolvePokemonFormSelection(formSearchParam, pokemon.forms);
  }, [formSearchParam, pokemon]);

  const selectedFormId =
    formSelection?.status === "selected" ? formSelection.formId : null;

  const {
    pokemonForm,
    isLoading: isFormLoading,
    error: formError,
    retry: retryForm,
  } = usePokemonForm(pokemon?.id ?? null, selectedFormId);

  return (
    <PageContainer>
      <BackButton
        label="Voltar para Pokédex"
        to={cameFromPokemonList ? undefined : "/pokemon"}
      />

      <PageHeader
        title="Detalhes do Pokémon"
        description="Informações gerais, habilidades e estatísticas base."
      />

      {isLoading && (
        <Spinner size="large" label="Carregando detalhes do Pokémon..." />
      )}

      {!isLoading && error && (
        <ErrorState
          title="Não foi possível carregar o Pokémon"
          message={error}
          onRetry={validPokemonId === null ? undefined : retry}
        />
      )}

      {!isLoading && !error && pokemon && (
        <div className="pokemon-details">
          <PokemonDetailsHeader pokemon={pokemon} />

          <PokemonVariationsAndForms
            pokemonId={pokemon.id}
            variations={pokemon.variations}
            forms={pokemon.forms}
            selectedFormId={selectedFormId}
            isBaseSelected={formSelection?.status === "base"}
          />

          {formSelection && formSelection.status !== "base" && (
            <section
              className="pokemon-details__form-state"
              aria-label="Estado da forma selecionada"
              aria-live="polite"
              aria-busy={isFormLoading}
            >
              {formSelection.status === "invalid-query" && (
                <p className="pokemon-details__form-message">
                  O parâmetro de forma informado na URL é inválido.
                </p>
              )}

              {formSelection.status === "unavailable" && (
                <p className="pokemon-details__form-message">
                  A forma solicitada não está disponível para este Pokémon.
                </p>
              )}

              {formSelection.status === "selected" && isFormLoading && (
                <Spinner size="small" label="Carregando forma do Pokémon..." />
              )}

              {formSelection.status === "selected" &&
                !isFormLoading &&
                formError && (
                  <ErrorState
                    title="Não foi possível carregar a forma"
                    message={formError}
                    onRetry={retryForm}
                  />
                )}

              {formSelection.status === "selected" &&
                !isFormLoading &&
                !formError &&
                pokemonForm && (
                  <PokemonFormDetailsPanel pokemonForm={pokemonForm} />
                )}
            </section>
          )}

          <PokemonDescription description={pokemon.description} />

          <PokemonEvolutionChain
            evolutionChain={pokemon.evolutionChain}
            currentPokemonId={pokemon.id}
          />

          <PokemonSprites
            pokemonName={pokemon.name}
            sprites={pokemon.sprites}
          />

          <div className="pokemon-details__overview">
            <PokemonPhysicalInfo
              height={pokemon.height}
              weight={pokemon.weight}
            />

            <PokemonAbilities abilities={pokemon.abilities} />
          </div>

          <PokemonStats stats={pokemon.stats} />
        </div>
      )}
    </PageContainer>
  );
}
