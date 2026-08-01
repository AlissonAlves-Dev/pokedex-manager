import { useLocation, useParams } from "react-router";

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

  const cameFromPokemonList = isPokemonDetailsLocationState(location.state);

  const parsedPokemonId = pokemonId ? Number(pokemonId) : null;

  const validPokemonId =
    parsedPokemonId !== null &&
    Number.isInteger(parsedPokemonId) &&
    parsedPokemonId > 0
      ? parsedPokemonId
      : null;

  const { pokemon, isLoading, error, retry } =
    usePokemonDetails(validPokemonId);

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

          <PokemonDescription description={pokemon.description} />

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
