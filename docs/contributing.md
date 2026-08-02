# Guia de contribuição

Este documento define o fluxo de desenvolvimento e versionamento da Minha Pokédex.

## Princípios

- Desenvolver de forma incremental.
- Manter responsabilidades bem separadas.
- Priorizar código legível e soluções simples.
- Atualizar a documentação quando o comportamento do projeto mudar.
- Validar cada entrega antes do commit.
- Manter a `main` estável.

## Estratégia de branches

O projeto utiliza uma branch principal e uma branch por Sprint.

```text
main
└── sprint/sprint-N
```

### `main`

A branch `main` representa a versão estável do projeto.

Somente Sprints concluídas, revisadas e validadas devem ser integradas nela.

### Branch da Sprint

Cada Sprint possui uma única branch:

```text
sprint/sprint-1
sprint/sprint-2
sprint/sprint-3
```

Todas as funcionalidades, correções e atualizações documentais da Sprint são desenvolvidas nessa branch.

Não é necessário criar uma branch para cada pequena tarefa.

Branches específicas podem ser usadas excepcionalmente para:

- correções urgentes na `main`;
- alterações independentes fora de uma Sprint;
- manutenção técnica isolada.

Exemplos:

```text
fix/critical-loading-error
chore/update-dependencies
docs/reorganize-documentation
```

## Início de uma Sprint

Antes de iniciar:

```bash
git switch main
git pull --ff-only origin main
git status
git switch -c sprint/sprint-N
git push -u origin sprint/sprint-N
```

O working tree deve estar limpo antes da criação da branch.

## Fluxo diário

Durante uma sessão:

1. revisar o estado atual;
2. definir o objetivo do dia;
3. implementar em pequenas etapas;
4. realizar testes manuais;
5. executar as validações técnicas;
6. atualizar o Development Journal;
7. revisar o diff;
8. criar o commit;
9. fazer push na branch da Sprint.

## Validações obrigatórias

Antes de cada commit relevante:

```bash
npm run format
npm run lint
npm run build
npm test
git diff --check
```

Também devem ser conferidos:

```bash
git status --short
git diff
```

A implementação não deve ser commitada enquanto houver erros de lint, build, testes automatizados ou integridade do diff.

## Commits

O projeto utiliza mensagens inspiradas em Conventional Commits.

Formato:

```text
<type>: <description>
```

Tipos principais:

| Tipo       | Uso                                              |
| ---------- | ------------------------------------------------ |
| `feat`     | Nova funcionalidade                              |
| `fix`      | Correção de comportamento                        |
| `docs`     | Alteração documental                             |
| `refactor` | Melhoria estrutural sem mudança funcional        |
| `style`    | Alteração exclusivamente visual ou de formatação |
| `test`     | Testes                                           |
| `chore`    | Configuração, dependências ou manutenção         |
| `merge`    | Integração de uma Sprint ou branch               |

Exemplos:

```text
feat: add progressive pokemon loading
fix: preserve pokemon list state
docs: update sprint 3 progress
refactor: extract pokemon ability mapper
chore: configure prettier
```

As mensagens devem:

- ser escritas em inglês;
- usar verbo no imperativo;
- descrever uma alteração lógica;
- evitar termos genéricos como `update`, `changes` ou `fix stuff`.

## Development Journal

O Development Journal é atualizado ao final de cada sessão.

A entrada deve registrar:

- objetivo;
- revisões realizadas;
- decisões;
- implementações;
- arquivos afetados;
- validações;
- impedimentos ou limitações;
- resultado da sessão.

O Journal deve descrever somente o que realmente aconteceu.

Planos futuros pertencem ao Roadmap ou ao Planejamento.

Quando uma sessão continua após a meia-noite, mas faz parte do mesmo período de trabalho, ela pode permanecer registrada na data em que foi iniciada.

## Code review

O code review completo ocorre no encerramento da Sprint.

Durante as tarefas diárias são realizadas verificações menores de:

- comportamento;
- responsabilidades;
- acessibilidade;
- responsividade;
- temas;
- erros visíveis;
- lint;
- build;
- integridade do diff.

No final da Sprint, o review consolidado deve avaliar:

- arquitetura;
- separação de responsabilidades;
- regressões;
- tratamento de erros;
- acessibilidade;
- responsividade;
- consistência visual;
- documentação;
- qualidade geral do código;
- diferença completa em relação à `main`.

## Encerramento de uma Sprint

Antes do merge:

```bash
npm run format
npm run lint
npm run build
npm test
git diff --check
git status
```

Também revisar:

```bash
git diff --stat main...sprint/sprint-N
git log --oneline main..sprint/sprint-N
```

Depois da aprovação:

```bash
git switch main
git pull --ff-only origin main
git merge --no-ff sprint/sprint-N
npm run lint
npm run build
npm test
git diff --check
git push origin main
```

Após confirmar a integração:

```bash
git branch -d sprint/sprint-N
git push origin --delete sprint/sprint-N
```

A `main` deve terminar limpa e sincronizada com `origin/main`.

## Organização do código

### Frontend

O frontend utiliza organização baseada em features:

```text
src/
├── app/
├── features/
├── pages/
├── shared/
├── assets/
└── styles/
```

Responsabilidades principais:

| Área       | Responsabilidade                     |
| ---------- | ------------------------------------ |
| `app`      | Providers, layouts e rotas           |
| `features` | Funcionalidades de domínio           |
| `pages`    | Composição das páginas               |
| `shared`   | Componentes e recursos reutilizáveis |
| `services` | Comunicação com fontes externas      |
| `mappers`  | Transformação entre API e domínio    |
| `hooks`    | Estado e comportamento reutilizável  |
| `types`    | Modelos da API e do domínio          |

Regras gerais:

- componentes visuais não devem conhecer estruturas brutas da API;
- transformações devem ocorrer nos mappers;
- serviços devem concentrar requisições;
- hooks devem controlar estado e ciclo de vida;
- lógica reutilizável não deve ficar duplicada;
- `any` deve ser evitado;
- nomes técnicos devem permanecer em inglês.

## Documentação

A documentação deve:

- ser escrita em português brasileiro;
- ser objetiva;
- representar o estado real do projeto;
- separar claramente implementação atual e planejamento futuro;
- evitar repetir informações já explicadas em outro arquivo;
- usar tabelas e diagramas somente quando facilitarem a compreensão.

Código, nomes de arquivos, branches, comandos e identificadores técnicos permanecem em inglês.

O Git registra o histórico das alterações. Por isso, documentos vivos não precisam manter tabelas extensas de versão e revisão.

## Pull requests

O projeto pode utilizar Pull Requests para registrar e revisar a integração das Sprints.

Uma PR deve conter:

- objetivo;
- principais alterações;
- arquivos ou módulos afetados;
- validações executadas;
- limitações conhecidas;
- checklist de conclusão.

A ausência de uma PR não elimina a necessidade do code review consolidado antes do merge.

## Checklist da Sprint

```text
[ ] Escopo concluído
[ ] Journal atualizado
[ ] Roadmap atualizado
[ ] Format aprovado
[ ] Lint aprovado
[ ] Build aprovado
[ ] Testes automatizados aprovados
[ ] git diff --check aprovado
[ ] Testes manuais concluídos
[ ] Code review consolidado concluído
[ ] Merge realizado
[ ] Main sincronizada
[ ] Branch removida
```
