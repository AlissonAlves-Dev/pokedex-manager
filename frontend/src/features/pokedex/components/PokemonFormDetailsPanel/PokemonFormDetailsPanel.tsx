import { useId } from "react";

import { Badge } from "../../../../shared/components/ui/Badge/Badge";
import { TypeBadge } from "../../../../shared/components/ui/TypeBadge/TypeBadge";

import type { PokemonFormDetails } from "../../types/pokemon";
import { formatPokemonResourceName } from "../../utils/pokemonResourceName";

import { PokemonSprites } from "../PokemonSprites/PokemonSprites";

import "./PokemonFormDetailsPanel.css";

type PokemonFormDetailsPanelProps = {
  pokemonForm: PokemonFormDetails;
};

function formatOptionalResourceName(value: string | null): string {
  return value ? formatPokemonResourceName(value) : "Não informado";
}

export function PokemonFormDetailsPanel({
  pokemonForm,
}: PokemonFormDetailsPanelProps) {
  const titleId = useId();

  const hasCharacteristics =
    pokemonForm.isDefault || pokemonForm.isMega || pokemonForm.isBattleOnly;

  return (
    <section className="pokemon-form-details-panel" aria-labelledby={titleId}>
      <header className="pokemon-form-details-panel__header">
        <div className="pokemon-form-details-panel__heading">
          <span className="pokemon-form-details-panel__eyebrow">
            Forma selecionada
          </span>

          <h2 id={titleId} className="pokemon-form-details-panel__title">
            {pokemonForm.displayName}
          </h2>

          <span className="pokemon-form-details-panel__number">
            ID da forma #{pokemonForm.id}
          </span>
        </div>

        {hasCharacteristics && (
          <div
            className="pokemon-form-details-panel__badges"
            role="group"
            aria-label="Características da forma"
          >
            {pokemonForm.isDefault && <Badge variant="primary">Padrão</Badge>}

            {pokemonForm.isMega && <Badge variant="warning">Mega</Badge>}

            {pokemonForm.isBattleOnly && (
              <Badge variant="danger">Somente em batalha</Badge>
            )}
          </div>
        )}
      </header>

      <div
        className="pokemon-form-details-panel__types"
        role="group"
        aria-label="Tipos da forma"
      >
        {pokemonForm.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>

      <dl className="pokemon-form-details-panel__metadata">
        <div className="pokemon-form-details-panel__metadata-item">
          <dt>Nome da forma</dt>

          <dd>{formatOptionalResourceName(pokemonForm.formName)}</dd>
        </div>

        <div className="pokemon-form-details-panel__metadata-item">
          <dt>Grupo de versões</dt>

          <dd>{formatOptionalResourceName(pokemonForm.versionGroupName)}</dd>
        </div>
      </dl>

      <PokemonSprites
        pokemonName={pokemonForm.displayName}
        sprites={pokemonForm.sprites}
        headingLevel={3}
      />
    </section>
  );
}
