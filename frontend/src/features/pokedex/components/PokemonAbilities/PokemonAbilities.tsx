import type { PokemonAbility } from "../../types/pokemon";

import "./PokemonAbilities.css";

type PokemonAbilitiesProps = {
  abilities: PokemonAbility[];
};

function formatAbilityName(name: string) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <section className="pokemon-abilities">
      <h3 className="pokemon-abilities__title">Habilidades</h3>

      <ul className="pokemon-abilities__list">
        {abilities.map((ability) => (
          <li className="pokemon-abilities__item" key={ability.name}>
            <span className="pokemon-abilities__name">
              {formatAbilityName(ability.name)}
            </span>

            {ability.isHidden && (
              <span className="pokemon-abilities__hidden">
                Habilidade oculta
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
