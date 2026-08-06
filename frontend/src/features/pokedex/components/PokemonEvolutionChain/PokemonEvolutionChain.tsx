import { useId, useState } from "react";
import { Link } from "react-router";

import { Badge } from "../../../../shared/components/ui/Badge/Badge";
import { Card } from "../../../../shared/components/ui/Card/Card";
import type {
  PokemonEvolutionChain as PokemonEvolutionChainData,
  PokemonEvolutionNode,
  PokemonEvolutionRequirements,
} from "../../types/pokemon";
import { getPokemonEvolutionConditionLabels } from "../../utils/pokemonEvolutionFormatter";
import { formatPokemonResourceName } from "../../utils/pokemonResourceName";
import {
  createPokemonEvolutionStages,
  getPokemonEvolutionStageItems,
} from "../../utils/pokemonEvolutionStages";

import "./PokemonEvolutionChain.css";

type PokemonEvolutionChainProps = {
  evolutionChain: PokemonEvolutionChainData | null;
  currentPokemonId: number;
};

type PokemonEvolutionNodeCardProps = {
  node: PokemonEvolutionNode;
  currentPokemonId: number;
  isRoot: boolean;
};

type PokemonEvolutionRequirementsContentProps = {
  id: string;
  pokemonName: string;
  options: PokemonEvolutionRequirements[];
};

function PokemonEvolutionRequirementsContent({
  id,
  pokemonName,
  options,
}: PokemonEvolutionRequirementsContentProps) {
  return (
    <div
      id={id}
      className="pokemon-evolution-chain__requirements"
      role="group"
      aria-label={`Condições para evoluir para ${pokemonName}`}
    >
      <strong className="pokemon-evolution-chain__requirements-title">
        Requisitos para evoluir
      </strong>

      {options.length === 0 ? (
        <p className="pokemon-evolution-chain__condition-unavailable">
          Condição não informada
        </p>
      ) : (
        <div className="pokemon-evolution-chain__options">
          {options.map((option, optionIndex) => {
            const labels = getPokemonEvolutionConditionLabels(option);

            return (
              <div
                className="pokemon-evolution-chain__option"
                key={`${option.triggerName}-${
                  option.versionGroupName ?? "default"
                }-${optionIndex}`}
              >
                {options.length > 1 && (
                  <strong className="pokemon-evolution-chain__option-title">
                    Opção {optionIndex + 1}
                  </strong>
                )}

                <ul className="pokemon-evolution-chain__condition-list">
                  {labels.map((label, labelIndex) => (
                    <li
                      className="pokemon-evolution-chain__condition"
                      key={`${label}-${labelIndex}`}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PokemonEvolutionNodeCard({
  node,
  currentPokemonId,
  isRoot,
}: PokemonEvolutionNodeCardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  const requirementsId = useId();
  const pokemonName = formatPokemonResourceName(node.name);
  const isCurrentPokemon = node.speciesId === currentPokemonId;
  const hasRequirements = !isRoot;
  const requirementsDescriptionId = hasRequirements
    ? requirementsId
    : undefined;

  const shouldShowImage = node.imageUrl.length > 0 && !hasImageError;

  const cardClassName = [
    "pokemon-evolution-chain__node",
    isCurrentPokemon ? "pokemon-evolution-chain__node--current" : "",
    hasRequirements ? "pokemon-evolution-chain__node--has-requirements" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const cardContent = (
    <Card
      className={cardClassName}
      role={isCurrentPokemon ? "group" : undefined}
      tabIndex={isCurrentPokemon && hasRequirements ? 0 : undefined}
      aria-label={
        isCurrentPokemon
          ? `${pokemonName}, número ${node.speciesId}, Pokémon atual`
          : undefined
      }
      aria-current={isCurrentPokemon ? "page" : undefined}
      aria-describedby={
        isCurrentPokemon ? requirementsDescriptionId : undefined
      }
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

      <div className="pokemon-evolution-chain__node-views">
        <div className="pokemon-evolution-chain__node-summary">
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

        {hasRequirements && (
          <PokemonEvolutionRequirementsContent
            id={requirementsId}
            pokemonName={pokemonName}
            options={node.evolutionOptions}
          />
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
      aria-describedby={requirementsDescriptionId}
    >
      {cardContent}
    </Link>
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

  if (stages.length === 1) {
    return (
      <section className="pokemon-evolution-chain" aria-labelledby={titleId}>
        <h2 className="pokemon-evolution-chain__title" id={titleId}>
          Cadeia de evolução
        </h2>

        <p className="pokemon-evolution-chain__empty-message">
          Este Pokémon não possui evoluções conhecidas.
        </p>
      </section>
    );
  }

  const hasBranchedStage = stages.some(
    (stage) => getPokemonEvolutionStageItems(stage).length > 1,
  );

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
          const stageItems = getPokemonEvolutionStageItems(stage);
          const hasMultiplePokemon = stageItems.length > 1;

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

                <ul className="pokemon-evolution-chain__stage-groups">
                  {stage.groups.map((group, groupIndex) => {
                    const isEmptyGroup = group.items.length === 0;

                    const groupClassName = [
                      "pokemon-evolution-chain__branch-group",
                      isEmptyGroup
                        ? "pokemon-evolution-chain__branch-group--empty"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <li
                        className={groupClassName}
                        key={`stage-${stage.depth}-parent-${
                          group.parentSpeciesId ?? "root"
                        }-${groupIndex}`}
                        data-parent-species-id={
                          group.parentSpeciesId ?? undefined
                        }
                      >
                        {isEmptyGroup ? (
                          <span
                            className="pokemon-evolution-chain__empty-branch-slot"
                            aria-hidden="true"
                          />
                        ) : (
                          <ul className="pokemon-evolution-chain__stage-grid">
                            {group.items.map(({ node, parentSpeciesId }) => (
                              <li
                                className="pokemon-evolution-chain__stage-item"
                                key={`${parentSpeciesId ?? "root"}-${node.speciesId}`}
                              >
                                <PokemonEvolutionNodeCard
                                  node={node}
                                  currentPokemonId={currentPokemonId}
                                  isRoot={stageIndex === 0}
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
