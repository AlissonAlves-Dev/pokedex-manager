import { useId } from "react";

import { Card } from "../../../../shared/components/ui/Card/Card";

import "./PokemonDescription.css";

type PokemonDescriptionProps = {
  description: string | null;
};

export function PokemonDescription({ description }: PokemonDescriptionProps) {
  const titleId = useId();

  const descriptionText =
    description ?? "Descrição indisponível para este Pokémon.";

  return (
    <section className="pokemon-description" aria-labelledby={titleId}>
      <h2 className="pokemon-description__title" id={titleId}>
        Descrição da Pokédex
      </h2>

      <Card className="pokemon-description__card">
        <p
          className={`pokemon-description__text ${
            description === null ? "pokemon-description__text--unavailable" : ""
          }`.trim()}
        >
          {descriptionText}
        </p>
      </Card>
    </section>
  );
}
