import { PageContainer } from "../../shared/components/ui/PageContainer/PageContainer";
import { PageHeader } from "../../shared/components/ui/PageHeader/PageHeader";
import { BackButton } from "../../shared/components/BackButton/BackButton";

export function NotFound() {
  return (
    <PageContainer>
      <PageHeader
        title="Página não encontrada"
        description="A página que você tentou acessar não existe."
      />

      <BackButton label="Voltar para o início" to="/" />
    </PageContainer>
  );
}
