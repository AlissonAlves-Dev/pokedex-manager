import type { Pokemon } from "../../types/pokemon";

import { Card } from "../../../../shared/components/ui/Card/Card";
import { TypeBadge } from "../../../../shared/components/ui/TypeBadge/TypeBadge";

import "./PokemonCard.css";

type PokemonCardProps = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const formattedId = String(pokemon.id).padStart(3, "0");

  return (
    <Card className="pokemon-card">
      <div className="pokemon-card__header">
        <span className="pokemon-card__number">#{formattedId}</span>

        <div className="pokemon-card__types">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>

      <div className="pokemon-card__image-container">
        {pokemon.imageUrl ? (
          <img
            className="pokemon-card__image"
            src={pokemon.imageUrl}
            alt={pokemon.name}
            loading="lazy"
          />
        ) : (
          <span className="pokemon-card__image-placeholder">
            Imagem indisponível
          </span>
        )}
      </div>

      <h2 className="pokemon-card__name">{pokemon.name}</h2>
    </Card>
  );
}
