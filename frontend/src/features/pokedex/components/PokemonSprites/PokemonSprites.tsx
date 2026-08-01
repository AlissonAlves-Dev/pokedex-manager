import { Card } from "../../../../shared/components/ui/Card/Card";
import type { PokemonSprites as PokemonSpritesData } from "../../types/pokemon";

import "./PokemonSprites.css";

type PokemonSpritesProps = {
  pokemonName: string;
  sprites: PokemonSpritesData;
};

type PokemonSpriteCardProps = {
  titleId: string;
  title: string;
  imageUrl: string | null;
  altText: string;
  unavailableMessage: string;
};

function PokemonSpriteCard({
  titleId,
  title,
  imageUrl,
  altText,
  unavailableMessage,
}: PokemonSpriteCardProps) {
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

export function PokemonSprites({ pokemonName, sprites }: PokemonSpritesProps) {
  return (
    <section
      className="pokemon-sprites"
      aria-labelledby="pokemon-sprites-title"
    >
      <h2 className="pokemon-sprites__title" id="pokemon-sprites-title">
        Sprites
      </h2>

      <div className="pokemon-sprites__grid">
        <PokemonSpriteCard
          titleId="pokemon-sprite-default-title"
          title="Padrão"
          imageUrl={sprites.frontDefaultUrl}
          altText={`Sprite frontal padrão de ${pokemonName}`}
          unavailableMessage="Sprite padrão indisponível."
        />

        <PokemonSpriteCard
          titleId="pokemon-sprite-shiny-title"
          title="Shiny"
          imageUrl={sprites.frontShinyUrl}
          altText={`Sprite frontal shiny de ${pokemonName}`}
          unavailableMessage="Sprite shiny indisponível."
        />
      </div>
    </section>
  );
}
