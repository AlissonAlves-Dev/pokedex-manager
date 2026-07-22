import { useParams } from "react-router";

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
import "./PokemonDetails.css";

export function PokemonDetails() {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const parsedPokemonId = pokemonId ? Number(pokemonId) : null;

  const validPokemonId =
    parsedPokemonId !== null &&
    Number.isInteger(parsedPokemonId) &&
    parsedPokemonId > 0
      ? parsedPokemonId
      : null;

  const { pokemon, isLoading, error } = usePokemonDetails(validPokemonId);

  return (
    <PageContainer>
      <BackButton label="Voltar para Pokédex" />

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
        />
      )}

      {!isLoading && !error && pokemon && (
        <div className="pokemon-details">
          <PokemonDetailsHeader pokemon={pokemon} />

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
