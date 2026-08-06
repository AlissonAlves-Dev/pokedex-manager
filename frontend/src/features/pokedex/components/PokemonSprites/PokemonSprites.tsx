import { Card } from "../../../../shared/components/ui/Card/Card";
import type { PokemonSprites as PokemonSpritesData } from "../../types/pokemon";
import { useId } from "react";

import "./PokemonSprites.css";

type PokemonSpritesProps = {
  pokemonName: string;
  sprites: PokemonSpritesData;
  headingLevel?: 2 | 3;
};

type PokemonSpriteCardProps = {
  title: string;
  imageUrl: string | null;
  altText: string;
  unavailableMessage: string;
};

function PokemonSpriteCard({
  title,
  imageUrl,
  altText,
  unavailableMessage,
}: PokemonSpriteCardProps) {
  const titleId = useId();

  return (
    <Card
      className="pokemon-sprites__card"
      role="group"
      aria-labelledby={titleId}
    >
      <h3 className="pokemon-sprites__card-title" id={titleId}>
        {title}
      </h3>

      <div className="pokemon-sprites__image-container">
        {imageUrl ? (
          <img
            className="pokemon-sprites__image"
            src={imageUrl}
            alt={altText}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <p className="pokemon-sprites__unavailable">{unavailableMessage}</p>
        )}
      </div>
    </Card>
  );
}

export function PokemonSprites({
  pokemonName,
  sprites,
  headingLevel = 2,
}: PokemonSpritesProps) {
  const titleId = useId();

  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <section className="pokemon-sprites" aria-labelledby={titleId}>
      <Heading className="pokemon-sprites__title" id={titleId}>
        Sprites
      </Heading>
      <h2 className="pokemon-sprites__title" id={titleId}>
        Sprites
      </h2>

      <div className="pokemon-sprites__grid">
        <PokemonSpriteCard
          title="Padrão"
          imageUrl={sprites.frontDefaultUrl}
          altText={`Sprite frontal padrão de ${pokemonName}`}
          unavailableMessage="Sprite padrão indisponível."
        />

        <PokemonSpriteCard
          title="Shiny"
          imageUrl={sprites.frontShinyUrl}
          altText={`Sprite frontal shiny de ${pokemonName}`}
          unavailableMessage="Sprite shiny indisponível."
        />
      </div>
    </section>
  );
}
