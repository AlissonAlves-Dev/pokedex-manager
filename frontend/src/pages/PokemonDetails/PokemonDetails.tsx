import { useParams } from "react-router";

import { PokemonDetailsHeader } from "../../features/pokedex/components/PokemonDetailsHeader/PokemonDetailsHeader";
import { PokemonPhysicalInfo } from "../../features/pokedex/components/PokemonPhysicalInfo/PokemonPhysicalInfo";
import { usePokemonDetails } from "../../features/pokedex/hooks/usePokemonDetails";
import { ErrorState } from "../../shared/components/feedback/ErrorState/ErrorState";
import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";
import { Spinner } from "../../shared/components/ui/Spinner/Spinner";

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
      <PageHeader
        title="Detalhes do Pokémon"
        description="Consulte as principais informações do Pokémon selecionado."
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

          <PokemonPhysicalInfo
            height={pokemon.height}
            weight={pokemon.weight}
          />
        </div>
      )}
    </PageContainer>
  );
}
