import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";

export function Home() {
  return (
    <PageContainer>
      <PageHeader
        title="Bem-vindo ao PokéDex Manager"
        description="Consulte informações sobre Pokémon e organize sua experiência em um único lugar."
      />
    </PageContainer>
  );
}
