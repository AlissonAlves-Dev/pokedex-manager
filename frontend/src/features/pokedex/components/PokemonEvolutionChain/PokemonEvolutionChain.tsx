import { useId, useState } from "react";
import { Link } from "react-router";

import { Badge } from "../../../../shared/components/ui/Badge/Badge";
import { Card } from "../../../../shared/components/ui/Card/Card";
import type {
  PokemonEvolutionChain as PokemonEvolutionChainData,
  PokemonEvolutionNode,
  PokemonEvolutionRequirements,
} from "../../types/pokemon";
import {
  formatPokemonResourceName,
  getPokemonEvolutionConditionLabels,
} from "../../utils/pokemonEvolutionFormatter";
import { createPokemonEvolutionStages } from "../../utils/pokemonEvolutionStages";

import "./PokemonEvolutionChain.css";

type PokemonEvolutionChainProps = {
  evolutionChain: PokemonEvolutionChainData | null;
  currentPokemonId: number;
};

type PokemonEvolutionNodeCardProps = {
  node: PokemonEvolutionNode;
  currentPokemonId: number;
};

type PokemonEvolutionConditionsProps = {
  pokemonName: string;
  options: PokemonEvolutionRequirements[];
  isRoot: boolean;
};

function PokemonEvolutionNodeCard({
  node,
  currentPokemonId,
}: PokemonEvolutionNodeCardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  const pokemonName = formatPokemonResourceName(node.name);
  const isCurrentPokemon = node.speciesId === currentPokemonId;

  const shouldShowImage = node.imageUrl.length > 0 && !hasImageError;

  const cardContent = (
    <Card
      className={`pokemon-evolution-chain__node ${
        isCurrentPokemon ? "pokemon-evolution-chain__node--current" : ""
      }`}
      role={isCurrentPokemon ? "group" : undefined}
      aria-label={
        isCurrentPokemon
          ? `${pokemonName}, número ${node.speciesId}, Pokémon atual`
          : undefined
      }
      aria-current={isCurrentPokemon ? "true" : undefined}
    >
      <div className="pokemon-evolution-chain__image-container">
        {shouldShowImage ? (
          <img
            className="pokemon-evolution-chain__image"
            src={node.imageUrl}
            alt={`Sprite de ${pokemonName}`}
            loading="lazy"
            decoding="async"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <span className="pokemon-evolution-chain__image-placeholder">
            Imagem indisponível
          </span>
        )}
      </div>

      <div className="pokemon-evolution-chain__node-content">
        <span className="pokemon-evolution-chain__number">
          #{String(node.speciesId).padStart(4, "0")}
        </span>

        <h3 className="pokemon-evolution-chain__name">{pokemonName}</h3>

        {(isCurrentPokemon || node.isBaby) && (
          <div className="pokemon-evolution-chain__badges">
            {isCurrentPokemon && <Badge variant="primary">Atual</Badge>}

            {node.isBaby && <Badge variant="neutral">Bebê</Badge>}
          </div>
        )}
      </div>
    </Card>
  );

  if (isCurrentPokemon) {
    return cardContent;
  }

  return (
    <Link
      className="pokemon-evolution-chain__node-link"
      to={`/pokemon/${node.speciesId}`}
      aria-label={`Ver detalhes de ${pokemonName}`}
    >
      {cardContent}
    </Link>
  );
}

function PokemonEvolutionConditions({
  pokemonName,
  options,
  isRoot,
}: PokemonEvolutionConditionsProps) {
  if (isRoot) {
    return (
      <div
        className="pokemon-evolution-chain__condition-slot pokemon-evolution-chain__condition-slot--empty"
        aria-hidden="true"
      />
    );
  }

  if (options.length === 0) {
    return (
      <div className="pokemon-evolution-chain__condition-slot">
        <div className="pokemon-evolution-chain__option">
          <span className="pokemon-evolution-chain__condition-unavailable">
            Condição não informada
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pokemon-evolution-chain__condition-slot"
      role="group"
      aria-label={`Condições para evoluir para ${pokemonName}`}
    >
      <div className="pokemon-evolution-chain__options">
        {options.map((option, optionIndex) => {
          const labels = getPokemonEvolutionConditionLabels(option);

          return (
            <div
              className="pokemon-evolution-chain__option"
              key={`${option.triggerName}-${optionIndex}`}
            >
              {options.length > 1 && (
                <strong className="pokemon-evolution-chain__option-title">
                  Opção {optionIndex + 1}
                </strong>
              )}

              <ul className="pokemon-evolution-chain__condition-list">
                {labels.map((label) => (
                  <li
                    className="pokemon-evolution-chain__condition"
                    key={label}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PokemonEvolutionChain({
  evolutionChain,
  currentPokemonId,
}: PokemonEvolutionChainProps) {
  const titleId = useId();

  if (!evolutionChain) {
    return (
      <section className="pokemon-evolution-chain" aria-labelledby={titleId}>
        <h2 className="pokemon-evolution-chain__title" id={titleId}>
          Cadeia de evolução
        </h2>

        <Card className="pokemon-evolution-chain__unavailable">
          <p>Não foi possível carregar a cadeia de evolução deste Pokémon.</p>
        </Card>
      </section>
    );
  }

  const stages = createPokemonEvolutionStages(evolutionChain.root);

  const hasEvolutions = stages.length > 1;

  const hasBranchedStage = stages.some((stage) => stage.items.length > 1);

  const flowClassName = [
    "pokemon-evolution-chain__flow",
    hasBranchedStage
      ? "pokemon-evolution-chain__flow--branched"
      : "pokemon-evolution-chain__flow--linear",
  ].join(" ");

  return (
    <section className="pokemon-evolution-chain" aria-labelledby={titleId}>
      <h2 className="pokemon-evolution-chain__title" id={titleId}>
        Cadeia de evolução
      </h2>

      <div className={flowClassName}>
        {stages.map((stage, stageIndex) => {
          const hasMultiplePokemon = stage.items.length > 1;

          const stageClassName = [
            "pokemon-evolution-chain__stage",
            hasMultiplePokemon
              ? "pokemon-evolution-chain__stage--multiple"
              : "pokemon-evolution-chain__stage--single",
          ].join(" ");

          return (
            <div
              className="pokemon-evolution-chain__stage-group"
              key={`stage-${stage.depth}`}
            >
              {stageIndex > 0 && (
                <div
                  className="pokemon-evolution-chain__stage-connector"
                  aria-hidden="true"
                >
                  →
                </div>
              )}

              <div className={stageClassName}>
                {hasMultiplePokemon && (
                  <p className="pokemon-evolution-chain__stage-title">
                    Possíveis evoluções
                  </p>
                )}

                <ul className="pokemon-evolution-chain__stage-grid">
                  {stage.items.map(({ node, parentSpeciesId }) => {
                    const pokemonName = formatPokemonResourceName(node.name);

                    return (
                      <li
                        className="pokemon-evolution-chain__stage-item"
                        key={`${parentSpeciesId ?? "root"}-${node.speciesId}`}
                      >
                        <PokemonEvolutionConditions
                          pokemonName={pokemonName}
                          options={node.evolutionOptions}
                          isRoot={stageIndex === 0}
                        />

                        <PokemonEvolutionNodeCard
                          node={node}
                          currentPokemonId={currentPokemonId}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {!hasEvolutions && (
        <p className="pokemon-evolution-chain__empty-message">
          Este Pokémon não possui evoluções conhecidas.
        </p>
      )}
    </section>
  );
}
