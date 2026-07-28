import { Badge } from "../../../../shared/components/ui/Badge/Badge";
import type { PokemonAbility } from "../../types/pokemon";

import "./PokemonAbilities.css";

type PokemonAbilitiesProps = {
  abilities: PokemonAbility[];
};

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <section
      className="pokemon-abilities"
      aria-labelledby="pokemon-abilities-title"
    >
      <h3 id="pokemon-abilities-title" className="pokemon-abilities__title">
        Habilidades
      </h3>

      <ul className="pokemon-abilities__list">
        {abilities.map((ability, index) => (
          <li className="pokemon-abilities__item" key={ability.name}>
            <div className="pokemon-abilities__item-header">
              <span className="pokemon-abilities__position">
                Habilidade {index + 1}
              </span>

              {ability.isHidden && <Badge variant="warning">Oculta</Badge>}
            </div>

            <strong className="pokemon-abilities__name">
              {ability.displayName}
            </strong>

            <span className="pokemon-abilities__description">
              {ability.isHidden
                ? "Habilidade especial que normalmente não é encontrada."
                : "Habilidade padrão deste Pokémon."}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
