import { TypeBadge } from "../../../../shared/components/ui/TypeBadge/TypeBadge";
import type { PokemonDetails } from "../../types/pokemon";

import "./PokemonDetailsHeader.css";

type PokemonDetailsHeaderProps = {
  pokemon: PokemonDetails;
};

export function PokemonDetailsHeader({ pokemon }: PokemonDetailsHeaderProps) {
  const formattedId = String(pokemon.id).padStart(3, "0");

  return (
    <section className="pokemon-details-header">
      <div className="pokemon-details-header__image-container">
        {pokemon.imageUrl ? (
          <img
            className="pokemon-details-header__image"
            src={pokemon.imageUrl}
            alt={`Imagem de ${pokemon.name}`}
          />
        ) : (
          <span className="pokemon-details-header__image-placeholder">
            Imagem indisponível
          </span>
        )}
      </div>

      <div className="pokemon-details-header__content">
        <span className="pokemon-details-header__number">#{formattedId}</span>

        <h2 className="pokemon-details-header__name">{pokemon.name}</h2>

        <div className="pokemon-details-header__types">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
}
