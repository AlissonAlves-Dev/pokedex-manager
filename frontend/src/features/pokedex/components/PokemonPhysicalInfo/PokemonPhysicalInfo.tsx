import "./PokemonPhysicalInfo.css";

type PokemonPhysicalInfoProps = {
  height: number;
  weight: number;
};

export function PokemonPhysicalInfo({
  height,
  weight,
}: PokemonPhysicalInfoProps) {
  return (
    <section className="pokemon-physical-info">
      <h3 className="pokemon-physical-info__title">Informações físicas</h3>

      <div className="pokemon-physical-info__grid">
        <div className="pokemon-physical-info__item">
          <span className="pokemon-physical-info__label">Altura</span>

          <strong className="pokemon-physical-info__value">
            {height / 10} m
          </strong>
        </div>

        <div className="pokemon-physical-info__item">
          <span className="pokemon-physical-info__label">Peso</span>

          <strong className="pokemon-physical-info__value">
            {weight / 10} kg
          </strong>
        </div>
      </div>
    </section>
  );
}
