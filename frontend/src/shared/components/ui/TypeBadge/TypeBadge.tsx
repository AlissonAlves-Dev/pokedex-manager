import type { HTMLAttributes } from "react";
import type { PokemonType } from "../../../../features/pokedex/types/pokemon";

import "./TypeBadge.css";

type TypeBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  type: PokemonType;
};

const pokemonTypeLabels: Record<PokemonType, string> = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Planta",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terrestre",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
};

export function TypeBadge({ type, className = "", ...props }: TypeBadgeProps) {
  const typeBadgeClassName =
    `type-badge type-badge--${type} ${className}`.trim();

  return (
    <span className={typeBadgeClassName} {...props}>
      {pokemonTypeLabels[type]}
    </span>
  );
}
