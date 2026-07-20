import { useState } from "react";

import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";
import { SearchBar } from "../../shared/components/ui/SearchBar/SearchBar";
import { Card } from "../../shared/components/ui/Card/Card";
import { Button } from "../../shared/components/ui/Button/Button";
import { Badge } from "../../shared/components/ui/Badge/Badge";
import { TypeBadge } from "../../shared/components/ui/TypeBadge/TypeBadge";
import { Spinner } from "../../shared/components/ui/Spinner/Spinner";

export function Home() {
  const [search, setSearch] = useState("");

  function handleSearch() {
    console.log("Pesquisa:", search);
  }

  return (
    <PageContainer>
      <PageHeader
        title="Bem-vindo ao PokéDex Manager"
        description="Consulte informações sobre Pokémon e organize sua experiência em um único lugar."
      />

      <SearchBar
        value={search}
        placeholder="Pesquisar Pokémon..."
        onChange={setSearch}
        onSubmit={handleSearch}
      />
      <Card>
        <h3>Pikachu</h3>

        <p>Pokémon Elétrico</p>

        <Button>Detalhes</Button>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <Badge>Neutral</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <TypeBadge type="normal" />
            <TypeBadge type="fire" />
            <TypeBadge type="water" />
            <TypeBadge type="electric" />
            <TypeBadge type="grass" />
            <TypeBadge type="ice" />
            <TypeBadge type="fighting" />
            <TypeBadge type="poison" />
            <TypeBadge type="ground" />
            <TypeBadge type="flying" />
            <TypeBadge type="psychic" />
            <TypeBadge type="bug" />
            <TypeBadge type="rock" />
            <TypeBadge type="ghost" />
            <TypeBadge type="dragon" />
            <TypeBadge type="dark" />
            <TypeBadge type="steel" />
            <TypeBadge type="fairy" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <Spinner size="small" label="Carregando..." />

          <Spinner size="medium" label="Buscando Pokémon..." />

          <Spinner size="large" label="Carregando Pokédex..." />
        </div>
      </Card>
    </PageContainer>
  );
}
