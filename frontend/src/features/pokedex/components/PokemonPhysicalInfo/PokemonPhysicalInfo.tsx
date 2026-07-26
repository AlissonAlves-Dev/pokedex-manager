import "./PokemonPhysicalInfo.css";

type PokemonPhysicalInfoProps = {
  height: number;
  weight: number;
};

const measurementFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
});

export function PokemonPhysicalInfo({
  height,
  weight,
}: PokemonPhysicalInfoProps) {
  const heightInMeters = measurementFormatter.format(height / 10);
  const weightInKilograms = measurementFormatter.format(weight / 10);

  return (
    <section
      className="pokemon-physical-info"
      aria-labelledby="pokemon-physical-info-title"
    >
      <h3
        id="pokemon-physical-info-title"
        className="pokemon-physical-info__title"
      >
        Informações físicas
      </h3>

      <dl className="pokemon-physical-info__list">
        <div className="pokemon-physical-info__item">
          <dt className="pokemon-physical-info__label">Altura</dt>

          <dd className="pokemon-physical-info__value">
            <span className="pokemon-physical-info__number">
              {heightInMeters}
            </span>

            <span className="pokemon-physical-info__unit">m</span>
          </dd>
        </div>

        <div className="pokemon-physical-info__item">
          <dt className="pokemon-physical-info__label">Peso</dt>

          <dd className="pokemon-physical-info__value">
            <span className="pokemon-physical-info__number">
              {weightInKilograms}
            </span>

            <span className="pokemon-physical-info__unit">kg</span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
