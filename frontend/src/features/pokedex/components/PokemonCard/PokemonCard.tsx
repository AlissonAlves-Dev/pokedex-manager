import { Link } from "react-router";
import type { PokemonSummary } from "../../types/pokemon";
import { Card } from "../../../../shared/components/ui/Card/Card";
import { TypeBadge } from "../../../../shared/components/ui/TypeBadge/TypeBadge";

import "./PokemonCard.css";

type PokemonCardProps = {
  pokemon: PokemonSummary;
  onSelect?: (pokemonId: number) => void;
};

export function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  const formattedId = String(pokemon.id).padStart(3, "0");

  return (
    <Link
      className="pokemon-card__link"
      to={`/pokemon/${pokemon.id}`}
      state={{ fromPokemonList: true }}
      data-pokemon-id={pokemon.id}
      onClick={() => onSelect?.(pokemon.id)}
    >
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
    </Link>
  );
}
