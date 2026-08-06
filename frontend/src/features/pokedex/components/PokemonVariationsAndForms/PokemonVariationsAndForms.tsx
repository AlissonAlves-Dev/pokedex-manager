import { Link, useLocation } from "react-router";

import { Badge } from "../../../../shared/components/ui/Badge/Badge";

import type {
  PokemonFormReference,
  PokemonVariationReference,
} from "../../types/pokemon";

import "./PokemonVariationsAndForms.css";

type PokemonVariationsAndFormsProps = {
  pokemonId: number;
  variations: PokemonVariationReference[] | null;
  forms: PokemonFormReference[];

  selectedFormId: number | null;
  isBaseSelected: boolean;
};

function getOptionClassName(isCurrent: boolean): string {
  return [
    "pokemon-variations-and-forms__link",
    isCurrent ? "pokemon-variations-and-forms__link--current" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function PokemonVariationsAndForms({
  pokemonId,
  variations,
  forms,
  selectedFormId,
  isBaseSelected,
}: PokemonVariationsAndFormsProps) {
  const location = useLocation();
  const shouldShowVariations = variations !== null && variations.length > 1;

  const shouldShowForms =
    forms.length > 1 || selectedFormId !== null || !isBaseSelected;

  if (!shouldShowVariations && !shouldShowForms) {
    return null;
  }

  return (
    <section
      className="pokemon-variations-and-forms"
      aria-labelledby="pokemon-variations-and-forms-title"
    >
      <h2
        id="pokemon-variations-and-forms-title"
        className="pokemon-variations-and-forms__title"
      >
        Variações e formas
      </h2>

      {shouldShowVariations && variations && (
        <nav
          className="pokemon-variations-and-forms__group"
          aria-labelledby="pokemon-variations-title"
        >
          <h3
            id="pokemon-variations-title"
            className="pokemon-variations-and-forms__subtitle"
          >
            Variações
          </h3>

          <ul className="pokemon-variations-and-forms__list">
            {variations.map((variation) => {
              const isCurrent = variation.id === pokemonId;

              return (
                <li key={variation.id}>
                  <Link
                    className={getOptionClassName(isCurrent)}
                    to={`/pokemon/${variation.id}`}
                    state={location.state}
                    aria-label={[
                      `Ver variação ${variation.displayName}`,
                      variation.isDefault ? "padrão" : "",
                    ]
                      .filter(Boolean)
                      .join(", ")}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    <span className="pokemon-variations-and-forms__name">
                      {variation.displayName}
                    </span>

                    {variation.isDefault && (
                      <Badge variant="primary">Padrão</Badge>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {shouldShowForms && (
        <nav
          className="pokemon-variations-and-forms__group"
          aria-labelledby="pokemon-forms-title"
        >
          <h3
            id="pokemon-forms-title"
            className="pokemon-variations-and-forms__subtitle"
          >
            Formas
          </h3>

          <ul className="pokemon-variations-and-forms__list">
            <li>
              <Link
                className={getOptionClassName(isBaseSelected)}
                to={`/pokemon/${pokemonId}`}
                state={location.state}
                aria-label="Ver dados principais do Pokémon"
                aria-current={isBaseSelected ? "true" : undefined}
              >
                <span className="pokemon-variations-and-forms__name">
                  Dados principais
                </span>
              </Link>
            </li>

            {forms.map((form) => {
              const isCurrent = form.id === selectedFormId;

              return (
                <li key={form.id}>
                  <Link
                    className={getOptionClassName(isCurrent)}
                    to={`/pokemon/${pokemonId}?form=${form.id}`}
                    state={location.state}
                    aria-label={`Ver forma ${form.displayName}`}
                    aria-current={isCurrent ? "true" : undefined}
                  >
                    <span className="pokemon-variations-and-forms__name">
                      {form.displayName}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </section>
  );
}
