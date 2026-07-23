import type { PokemonStat } from "../../types/pokemon";

type PokemonStatItemProps = {
  stat: PokemonStat;
};

const STAT_METADATA: Record<
  string,
  {
    label: string;
    description: string;
    modifier: string;
  }
> = {
  hp: {
    label: "HP",
    description: "Pontos de Vida",
    modifier: "hp",
  },
  attack: {
    label: "Ataque",
    description: "Ataque Físico",
    modifier: "attack",
  },
  defense: {
    label: "Defesa",
    description: "Defesa Física",
    modifier: "defense",
  },
  "special-attack": {
    label: "Ataque Especial",
    description: "Poder de ataques especiais",
    modifier: "special-attack",
  },
  "special-defense": {
    label: "Defesa Especial",
    description: "Resistência a ataques especiais",
    modifier: "special-defense",
  },
  speed: {
    label: "Velocidade",
    description: "Velocidade de Ação",
    modifier: "speed",
  },
};

function getStatPercentage(baseValue: number) {
  const maxStatValue = 255;

  return Math.min((baseValue / maxStatValue) * 100, 100);
}

export function PokemonStatItem({ stat }: PokemonStatItemProps) {
  const metadata = STAT_METADATA[stat.name] ?? {
    label: stat.name,
    description: "Estatística base",
    modifier: "default",
  };

  return (
    <li className="pokemon-stat-item">
      <div className="pokemon-stat-item__header">
        <div className="pokemon-stat-item__content">
          <span className="pokemon-stat-item__label">{metadata.label}</span>

          <span className="pokemon-stat-item__description">
            {metadata.description}
          </span>
        </div>

        <strong className="pokemon-stat-item__value">{stat.baseValue}</strong>
      </div>

      <div
        className="pokemon-stat-item__track"
        role="progressbar"
        aria-label={metadata.label}
        aria-valuemin={0}
        aria-valuemax={255}
        aria-valuenow={stat.baseValue}
      >
        <div
          className={`pokemon-stat-item__bar pokemon-stat-item__bar--${metadata.modifier}`}
          style={{
            width: `${getStatPercentage(stat.baseValue)}%`,
          }}
        />
      </div>
    </li>
  );
}
