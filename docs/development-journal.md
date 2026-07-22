# Development Journal

## 2026/07/11

### Objetivo

Dar início ao projeto PokéDex Manager.

### Atividades realizadas

- Criação do repositório público no GitHub.
- Organização da estrutura inicial de diretórios.
- Primeiro commit (`chore: initialize repository`).
- Publicação da estrutura inicial no GitHub.

### Observações

Hoje foi dedicado apenas ao início da organização do projeto. Nenhuma implementação foi realizada, pois o foco foi preparar a base para o desenvolvimento futuro.

---

### 2026/07/12

### Objetivo

Estruturar a documentação do projeto e definir sua organização para dar suporte ao desenvolvimento.

### Atividades realizadas

- Definição da arquitetura inicial do PokéDex Manager.
- Elaboração da documentação de planejamento do projeto.
- Organização da documentação por responsabilidade.
- Revisão e padronização da estrutura dos documentos Markdown.
- Definição do fluxo de trabalho para manter o **Development Journal** atualizado ao final de cada sessão de desenvolvimento.
- Padronização das datas do diário no formato **YYYY/MM/DD**.

### Observações

O foco do dia foi consolidar a base documental e a organização do projeto. A estrutura definida facilitará o desenvolvimento, a manutenção da documentação e o acompanhamento da evolução do PokéDex Manager ao longo do tempo.

---

## 2026/07/13

### Objetivo

Definir a estrutura técnica do PokéDex Manager e estabelecer a base de documentação para o desenvolvimento do projeto.

### Atividades realizadas

- Elaboração da arquitetura inicial do PokéDex Manager.
- Definição da estrutura e responsabilidades dos módulos do sistema.
- Criação do Roadmap do projeto, estabelecendo as versões, funcionalidades e evolução planejada.
- Definição do modelo de banco de dados da versão **0.1**.
- Planejamento do modelo de banco de dados para versões futuras, visando escalabilidade e novas funcionalidades.
- Definição das convenções de nomenclatura (Naming Conventions).
- Definição da estratégia de migração (Migration Strategy).
- Revisão e aprovação da documentação de planejamento.

### Observações

O foco do dia foi estabelecer uma base sólida para o desenvolvimento do PokéDex Manager. Com a arquitetura, o roadmap e a modelagem inicial do banco de dados definidos, o projeto passa a contar com uma documentação consistente que servirá como referência para as próximas etapas de implementação.

---

## 2026/07/16

### Objetivo

Iniciar oficialmente a **Fase 2 – Desenvolvimento**, configurando o ambiente de desenvolvimento e estabelecendo a arquitetura inicial do monorepositório.

### Atividades realizadas

- Início da **Sprint 0 – Configuração do Projeto**.
- Inicialização do arquivo `package.json` na raiz do monorepositório.
- Configuração do projeto utilizando **npm Workspaces**.
- Definição das informações principais do projeto (`name`, `version`, `description`, `author` e `engines`).
- Criação e configuração da licença **MIT**.
- Atualização do `README.md` para incluir as informações da licença.
- Configuração do projeto como pacote privado do npm (`private: true`).
- Definição da estrutura inicial do monorepositório, contendo os diretórios `frontend` e `backend`.
- Documentação da finalidade do `package.json` da raiz dentro da arquitetura de monorepositório.
- Definição do **React** como framework oficial do frontend.
- Definição do **TypeScript** como linguagem oficial do frontend.
- Definição do **ESLint** como linter oficial do projeto.
- Inicialização do frontend utilizando **Vite 8.1.5** com o template **React + TypeScript**.
- Análise da estrutura inicial gerada pelo Vite e documentação da finalidade de seus principais arquivos e diretórios.
- Confirmação da utilização da **Feature-Based Architecture**, conforme definido na documentação de arquitetura.
- Definição da metodologia de adoção de novas tecnologias durante o desenvolvimento:

  - Compreender a tecnologia.
  - Justificar sua adoção.
  - Explicar como ela se integra à arquitetura do projeto.
  - Implementar.
  - Validar o resultado.

- Decisão de remover o diretório temporário `database` do repositório, concentrando futuramente todos os recursos relacionados ao banco de dados dentro do `backend`.

### Observações

O foco do dia foi preparar o ambiente de desenvolvimento e estabelecer os padrões técnicos que servirão de base para as próximas etapas do projeto. Com a configuração inicial do monorepositório concluída e o frontend criado, o PokéDex Manager está pronto para iniciar a implementação de funcionalidades.

---

## 2026/07/17

### Objetivo

Concluir a configuração das ferramentas de qualidade de código do projeto, validar seu funcionamento na prática e finalizar a preparação do ambiente de desenvolvimento da **Sprint 0 – Configuração do Projeto**.

### Atividades realizadas

- Instalação e configuração do **Prettier** como ferramenta oficial de formatação de código do projeto.
- Definição da estratégia de utilizar as configurações padrão do Prettier, evitando customizações desnecessárias.
- Criação do arquivo `.prettierignore` para ignorar diretórios gerados automaticamente (`node_modules`, `dist`, `build` e `coverage`).
- Criação da pasta `.vscode` na raiz do projeto para compartilhar configurações do ambiente de desenvolvimento.
- Configuração do arquivo `settings.json`, habilitando a formatação automática ao salvar arquivos e definindo o Prettier como formatador padrão.
- Criação do arquivo `extensions.json`, recomendando as extensões oficiais do Prettier e do ESLint para os desenvolvedores do projeto.
- Validação da integração entre o VS Code e o Prettier, confirmando a formatação automática do código ao salvar arquivos.
- Estudo detalhado da configuração gerada automaticamente pelo ESLint, compreendendo a função de cada dependência e das regras padrão fornecidas pelo Vite.
- Realização de testes práticos para validar a integração entre Prettier, ESLint e o plugin React Hooks, verificando:

  - formatação automática do código;
  - detecção de variáveis não utilizadas;
  - validação das regras de utilização dos Hooks do React.

- Confirmação de que a configuração atual do projeto não apresenta conflitos entre Prettier e ESLint, optando por não instalar `eslint-config-prettier` e `eslint-plugin-prettier` neste momento.
- Definição da estratégia de versionamento utilizando um **Git Flow simplificado**, estabelecendo o desenvolvimento em branches `feature/*` e mantendo a `main` sempre estável e revisada.

### Observações

O foco do dia foi concluir a configuração do ambiente de desenvolvimento e validar, na prática, o funcionamento das ferramentas de qualidade de código. Ao final da sessão, o projeto passou a contar com um ambiente padronizado para formatação, análise estática e versionamento, encerrando a preparação técnica da Sprint 0 e deixando o PokéDex Manager pronto para iniciar o desenvolvimento das primeiras funcionalidades.

---

## 2026/07/18

### Objetivo

Dar início à implementação da **Sprint 1 – Frontend Foundation**, estruturando o sistema de navegação da aplicação com React Router.

### Atividades realizadas

- Implementação do `AppRouter`, centralizando toda a configuração de rotas da aplicação.
- Definição da hierarquia de rotas utilizando `Routes` e `Route`, com organização baseada em rotas aninhadas.
- Configuração da rota de layout utilizando o `MainLayout` como estrutura compartilhada entre as páginas.
- Implementação da rota `index` para a página inicial (`Home`).
- Configuração da rota de listagem de Pokémon (`/pokemon`).
- Implementação da rota dinâmica de detalhes (`/pokemon/:pokemonId`) utilizando _Route Params_.
- Configuração da rota curinga (`*`) para tratamento de páginas não encontradas (`NotFound`).
- Integração do `BrowserRouter` ao `main.tsx`, estabelecendo o contexto global de navegação da aplicação.
- Simplificação do `App.tsx`, delegando a responsabilidade de roteamento ao `AppRouter`.
- Correção da importação do arquivo global de estilos (`index.css`) durante a configuração inicial da aplicação.
- Criação dos componentes estruturais compartilhados `Header`, `Sidebar` e `Footer`.
- Integração desses componentes ao `MainLayout`, utilizando o `Outlet` como área de renderização das páginas.
- Implementação da navegação principal utilizando `NavLink`, permitindo a navegação entre as páginas sem recarregamento da aplicação.
- Configuração do estado visual da rota ativa utilizando a propriedade `className` do `NavLink` com o parâmetro `isActive`.
- Validação do funcionamento do sistema de navegação, incluindo rotas aninhadas, navegação SPA, renderização dinâmica pelo `Outlet`, rotas dinâmicas e tratamento de páginas inexistentes.

### Observações

Esta sessão marcou o início efetivo da implementação do frontend do PokéDex Manager. Além da implementação do sistema de roteamento, foi realizado um estudo aprofundado sobre o funcionamento interno do React Router, consolidando conceitos como SPA, rotas aninhadas, `BrowserRouter`, `Routes`, `Route`, `Outlet`, `Link`, `NavLink` e _Route Params_. Todo o desenvolvimento foi realizado priorizando a compreensão dos conceitos antes da implementação prática.

---

## 2026/07/19

### Objetivo

Dar início à primeira funcionalidade da aplicação, integrando o frontend com a PokéAPI e estruturando a arquitetura de acesso a dados utilizando uma camada de serviços, modelos de domínio e hooks personalizados.

### Atividades realizadas

- Definição da estratégia de desacoplamento entre a PokéAPI e a aplicação, optando pela utilização de modelos próprios de domínio em vez de depender diretamente da estrutura da API.
- Criação dos modelos de domínio `Pokemon` e `PokemonType`, representando apenas os dados relevantes para a aplicação.
- Criação dos modelos de resposta da PokéAPI (`PokemonApiListResponse` e `PokemonApiDetailResponse`) para garantir tipagem segura na integração.
- Implementação do `PokemonService`, centralizando toda a comunicação com a PokéAPI.
- Implementação da camada de mapeamento (_Mapper_), convertendo a resposta da API para o modelo interno da aplicação.
- Organização da arquitetura da feature **Pokedex** em camadas (`types`, `services`, `hooks` e `components`).
- Refatoração do componente `TypeBadge` para reutilizar o tipo `PokemonType`, eliminando duplicação e adotando o princípio de **Single Source of Truth (SSOT)**.
- Implementação do hook `usePokemonList`, responsável pelo gerenciamento dos estados de carregamento, erro e dados.
- Estruturação do fluxo de carregamento utilizando `useEffect`, `async/await`, `try/catch/finally` e tratamento tipado de erros.
- Validação do comportamento do **React Strict Mode** durante o desenvolvimento, identificando a duplicação das requisições como comportamento esperado e registrando a implementação futura de `AbortController` como melhoria técnica.
- Criação do componente `PokemonCard`, responsável pela apresentação visual dos Pokémon utilizando os componentes reutilizáveis do Design System.
- Implementação da renderização dos tipos utilizando `TypeBadge`, exibição da artwork oficial da PokéAPI e tratamento para imagens indisponíveis.
- Criação do componente `PokemonGrid`, responsável pela organização dos cards utilizando um layout responsivo com **CSS Grid**.
- Implementação da primeira listagem funcional da aplicação, exibindo os 20 primeiros Pokémon obtidos diretamente da PokéAPI.
- Validação de todos os componentes e funcionalidades implementadas por meio de testes funcionais, `npm run lint` e `npm run build`.

### Observações

Esta sessão marcou a conclusão da primeira funcionalidade do PokéDex Manager com consumo de dados reais da PokéAPI. Além da implementação, foram consolidados conceitos importantes relacionados à separação entre modelos de domínio e integração, arquitetura em camadas, baixo acoplamento, **Single Source of Truth (SSOT)**, hooks personalizados e boas práticas de componentização em React. Ao final da sessão, a aplicação passou a exibir, de forma responsiva, os 20 primeiros Pokémon utilizando a arquitetura definida para o projeto.

---

## 2026/07/20

### Objetivo

Concluir a primeira funcionalidade da Pokédex, iniciando a implementação da página de detalhes dos Pokémon e evoluindo a arquitetura da aplicação para suportar modelos distintos de listagem e detalhes.

### Atividades realizadas

- Conclusão da funcionalidade de pesquisa por nome.
- Implementação do botão **"Limpar pesquisa"**.
- Exibição da quantidade de resultados encontrados.
- Implementação do estado vazio para pesquisas sem resultados.
- Refatoração do modelo de domínio da Pokédex, separando o antigo modelo `Pokemon` em `PokemonSummary` e `PokemonDetails`.
- Criação dos modelos auxiliares `PokemonAbility` e `PokemonStat`.
- Criação da pasta `mappers` na feature `pokedex`.
- Extração da lógica de transformação da PokéAPI do `PokemonService` para uma camada dedicada de mapeamento.
- Implementação dos mappers `mapPokemonApiToSummary` e `mapPokemonApiToDetails`.
- Refatoração do `PokemonService`, reutilizando a busca de dados da PokéAPI para gerar diferentes modelos de domínio.
- Implementação do método `getPokemonById()`.
- Criação do hook `usePokemonDetails`, responsável pela obtenção dos dados, gerenciamento dos estados de carregamento e erro, validação do parâmetro da rota e disponibilização dos dados para a interface.
- Refatoração do `usePokemonDetails` para eliminar atualizações síncronas de estado dentro do `useEffect`.
- Implementação da primeira versão funcional da página de detalhes dos Pokémon.
- Integração da página de detalhes com a rota dinâmica utilizando o parâmetro `pokemonId`.
- Implementação dos estados de carregamento, erro e sucesso na tela de detalhes.
- Exibição das informações reais obtidas da PokéAPI na página de detalhes.
- Início da componentização da tela de detalhes através dos componentes `PokemonDetailsHeader` e `PokemonPhysicalInfo`.
- Implementação da exibição de altura e peso, realizando a conversão das unidades da PokéAPI para metros e quilogramas.
- Consolidação da organização da feature `pokedex`, separando as responsabilidades entre `components`, `hooks`, `mappers`, `services` e `types`.

### Observações

Esta sessão marcou a conclusão da primeira funcionalidade da Pokédex e a evolução da arquitetura para suportar modelos específicos de listagem e detalhes. A separação entre as camadas de serviço, mapeamento, hooks e componentes tornou a aplicação mais organizada, escalável e preparada para a implementação das próximas funcionalidades, mantendo cada responsabilidade isolada e facilitando futuras manutenções.

---

## 2026/07/21

### Objetivo

Realizar o refinamento visual (**UI Polish**) da página de detalhes da Pokédex, melhorando a experiência do usuário, a organização dos componentes e preparando a Sprint 1 para o Code Review.

### Atividades realizadas

- Refatoração do componente `PokemonStats`.
- Extração da responsabilidade de renderização para o novo componente `PokemonStatItem`, aplicando o princípio da Responsabilidade Única (SRP).
- Criação da estrutura `STAT_METADATA`, centralizando rótulos, descrições e configurações das estatísticas.
- Reformulação completa da apresentação das estatísticas base.
- Criação de cards individuais para cada atributo.
- Inclusão de descrições explicativas para cada estatística.
- Destaque visual dos valores por meio de badges.
- Implementação de barras de progresso coloridas, exibindo tanto a parte preenchida quanto a parte restante de cada estatística.
- Ajustes de animações, espaçamentos e acabamento visual da seção de estatísticas.
- Revisão da responsividade da página de detalhes em diferentes resoluções.
- Identificação e correção de problemas de layout em dispositivos com larguras reduzidas.
- Refinamento do cabeçalho da página de detalhes.
- Definição do card principal ocupando toda a largura disponível, com o conteúdo centralizado internamente.
- Ajustes de alinhamento e espaçamento para melhorar a apresentação das informações principais do Pokémon.
- Revisão da consistência visual da página de detalhes, padronizando espaçamentos, hierarquia visual e organização dos componentes.
- Definição da estratégia para ocultar a `Sidebar` em dispositivos móveis, preparando a arquitetura para a futura implementação de um menu responsivo.
- Definição do refinamento visual dos componentes `PokemonPhysicalInfo` e `PokemonAbilities` para uma Sprint futura, mantendo o escopo da Sprint 1 sob controle.

### Observações

Esta sessão foi dedicada ao refinamento visual da página de detalhes da Pokédex, priorizando usabilidade, consistência visual e organização da interface. Além das melhorias na experiência do usuário, foram realizadas refatorações que reduziram o acoplamento entre componentes e centralizaram configurações compartilhadas, tornando a arquitetura mais organizada e preparada para futuras evoluções. Ao final da sessão, a Sprint 1 ficou praticamente concluída, restando apenas ajustes finais antes do Code Review e do encerramento oficial da sprint.

---
