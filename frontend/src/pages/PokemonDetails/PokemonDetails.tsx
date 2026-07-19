import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";

export function PokemonDetails() {
  return (
    <PageContainer>
      <PageHeader
        title="Detalhes do Pokémon"
        description="Veja as informações do Pokémon selecionado."
      />
    </PageContainer>
  );
}
