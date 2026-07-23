import { useNavigate } from "react-router";

import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";
import { Card } from "../../shared/components/ui/Card/Card";
import { Button } from "../../shared/components/ui/Button/Button";

import "./Home.css";

export function Home() {
  const navigate = useNavigate();

  function handleOpenPokedex() {
    navigate("/pokemon");
  }

  return (
    <PageContainer>
      <PageHeader
        title="Bem-vindo ao PokéDex Manager"
        description="Consulte informações sobre Pokémon e organize sua experiência em um único lugar."
      />

      <Card className="home__card">
        <div className="home__content">
          <h2 className="home__title">Explore a Pokédex</h2>

          <p className="home__description">
            Pesquise Pokémon pelo nome ou número e consulte seus tipos,
            habilidades, características físicas e estatísticas base.
          </p>

          <Button type="button" onClick={handleOpenPokedex}>
            Abrir Pokédex
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
}
