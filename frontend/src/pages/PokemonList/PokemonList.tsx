import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";

export function PokemonList() {
  return (
    <PageContainer>
      <PageHeader
        title="Pokémon"
        description="Consulte e pesquise os Pokémon disponíveis na Pokédex."
      />
    </PageContainer>
  );
}
