import type { PokemonStat } from "../../types/pokemon";

import { PokemonStatItem } from "./PokemonStatItem";

import "./PokemonStats.css";

type PokemonStatsProps = {
  stats: PokemonStat[];
};

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <section className="pokemon-stats">
      <h3 className="pokemon-stats__title">Estatísticas base</h3>

      <ul className="pokemon-stats__list">
        {stats.map((stat) => (
          <PokemonStatItem key={stat.name} stat={stat} />
        ))}
      </ul>
    </section>
  );
}
