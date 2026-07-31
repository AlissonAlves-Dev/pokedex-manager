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

## 2026/07/22

### Objetivo

Realizar o **Code Review da Sprint 1**, revisando tecnicamente a implementação, corrigindo problemas funcionais, estruturais, visuais, de responsividade, tipagem e acessibilidade antes da preparação do merge.

### Atividades realizadas

- Revisão das rotas e do `MainLayout`.
- Validação da separação de responsabilidades entre páginas, componentes, hooks, serviços, mappers e modelos.
- Redução de duplicação entre os modelos `PokemonSummary` e `PokemonDetails`.
- Criação de uma fonte única para os tipos de Pokémon.
- Implementação da validação segura dos tipos recebidos pela PokéAPI.
- Remoção de casts inseguros na camada de mapeamento.
- Transformação da marca do `Header` em link para a página inicial.
- Definição de destinos explícitos para o componente `BackButton`.
- Correção da navegação da página de detalhes para `/pokemon`.
- Correção da navegação da página `NotFound` para `/`.
- Implementação de um link de acessibilidade para permitir o salto direto ao conteúdo principal.
- Remoção dos componentes demonstrativos do Design System da página inicial.
- Criação de uma apresentação funcional do PokéDex Manager na página `Home`.
- Inclusão de um CTA para acesso à Pokédex.
- Correção do alinhamento entre o `PageHeader` e o card principal da página inicial.
- Ampliação da pesquisa para aceitar nome e número do Pokémon.
- Implementação de suporte aos formatos `1`, `001` e `#001`.
- Correção da exibição do estado vazio da pesquisa.
- Inclusão do botão para limpar a pesquisa.
- Ajustes de espaçamento entre a busca, o contador de resultados e a listagem.
- Implementação do cancelamento de requisições utilizando `AbortController`.
- Prevenção de atualizações tardias de estado após o encerramento das requisições.
- Inclusão de uma função de repetição nos hooks de carregamento de dados.
- Ativação do botão **“Tentar novamente”** nas páginas.
- Implementação de tratamento diferenciado para identificadores inválidos e falhas de rede.
- Remoção do padding duplicado entre `MainLayout` e `PageContainer`.
- Correção de overflow horizontal em resoluções reduzidas.
- Ocultação da `Sidebar` em dispositivos móveis.
- Ajuste da barra de pesquisa para empilhamento em telas estreitas.
- Centralização do conteúdo principal do cabeçalho da página de detalhes.
- Validação e correção do layout nas resoluções de `320px`, `375px`, `480px`, `768px`, `1024px` e superiores.
- Correção da regra global que fazia todos os botões apresentarem aparência de desabilitados.
- Remoção do efeito de hover em botões desabilitados.
- Definição de `type="button"` como padrão no componente `Button`.
- Correção de um token inválido no estado de foco do `PokemonCard`.
- Criação do token `--color-surface-secondary`.
- Remoção de declaração CSS duplicada.
- Ampliação dos estilos de foco visível para navegação por teclado.
- Alteração do idioma do documento para `pt-BR`.
- Atualização do título da aplicação.
- Inclusão da meta description.
- Manutenção temporária do favicon padrão.
- Centralização das regras de arquivos ignorados na raiz do monorepositório.
- Remoção do `.gitignore` redundante do frontend.
- Inclusão do arquivo `.gitattributes`.
- Correção da configuração de finais de linha.
- Padronização das configurações compartilhadas do VS Code.
- Correção do script do Prettier para ignorar a pasta `dist`.
- Validação do projeto por meio dos comandos `npm run format`, `npm run lint`, `npm run build` e `git diff --check`.
- Realização de testes manuais de navegação, pesquisa, tratamento de erros, repetição de requisições, acessibilidade por teclado e responsividade.
- Confirmação da ausência de rolagem horizontal nas resoluções testadas.

### Observações

A sessão foi dedicada à revisão completa da implementação desenvolvida durante a Sprint 1. Foram corrigidos problemas de arquitetura, navegação, tipagem, responsividade, acessibilidade, configuração e consistência visual. Ao final do Code Review, todas as validações automatizadas e os testes manuais foram concluídos com sucesso, deixando a Sprint 1 tecnicamente estável e aprovada para a preparação do merge.

---

## 2026/07/23

### Objetivo

Iniciar a **Sprint 2** do PokéDex Manager, substituindo a `Sidebar` por uma navegação responsiva integrada ao `Header`, com foco em acessibilidade, responsividade e simplificação estrutural do layout.

### Atividades realizadas

- Revisão dos arquivos responsáveis pela estrutura atual de navegação e layout:

  - `MainLayout.tsx`;
  - `MainLayout.css`;
  - `Header.tsx`;
  - `Header.css`;
  - `Sidebar.tsx`;
  - `Sidebar.css`;
  - `AppRouter.tsx`;
  - `index.css`.

- Confirmação das rotas existentes na aplicação:

  - `/`;
  - `/pokemon`;
  - `/pokemon/:pokemonId`.

- Análise das responsabilidades do `MainLayout`, `Header` e `Sidebar` antes da refatoração.
- Migração dos links **Home** e **Pokémon** da `Sidebar` para o `Header`.
- Manutenção do uso de `NavLink` e da indicação visual da rota ativa.
- Utilização da propriedade `end` no link da Home para impedir sua ativação incorreta em outras rotas.
- Manutenção do link de Pokémon ativo também durante a navegação pelas páginas de detalhes.
- Implementação de uma navegação horizontal no `Header` para resoluções desktop.
- Organização do `Header` com a marca posicionada à esquerda e a navegação à direita, utilizando **CSS Grid**.
- Reaproveitamento da linguagem visual utilizada anteriormente na `Sidebar`.
- Criação de um botão de menu exibido em telas com largura de até `48rem`.
- Implementação de um menu mobile expansível abaixo da linha principal do `Header`.
- Implementação da transformação visual do ícone de três linhas em um `X` enquanto o menu está aberto.
- Utilização de uma única estrutura de navegação para desktop e mobile, evitando duplicação de links.
- Implementação dos atributos de acessibilidade `aria-expanded`, `aria-controls` e `aria-label`.
- Associação do botão ao elemento principal de navegação.
- Marcação do ícone do menu como decorativo utilizando `aria-hidden`.
- Implementação do fechamento automático do menu ao:

  - selecionar a Home;
  - selecionar a página de Pokémon;
  - clicar na marca do projeto;
  - pressionar a tecla `Escape`.

- Implementação do retorno do foco ao botão do menu após o fechamento com `Escape`.
- Registro e remoção segura do evento de teclado utilizando `useEffect`.
- Preservação e aprimoramento do link **“Pular para o conteúdo principal”**.
- Inclusão de `tabIndex={-1}` no elemento `main`, permitindo o direcionamento correto do foco pelo skip link.
- Remoção da renderização da `Sidebar`.
- Remoção do contêiner `app-layout__body`, que deixou de ser necessário após a alteração da navegação.
- Transferência da responsabilidade de crescimento do layout diretamente para o elemento `main`.
- Manutenção do `Footer` no final da tela por meio da estrutura flexível do layout.
- Remoção dos arquivos:

  - `frontend/src/shared/components/layout/Sidebar.tsx`;
  - `frontend/src/shared/components/layout/Sidebar.css`.

- Verificação e remoção das referências restantes a `Sidebar`, `app-sidebar` e `app-layout__body`.
- Correção do alinhamento do card principal da Home, que ficou deslocado após a remoção da `Sidebar`.
- Centralização horizontal do card por meio de ajustes no arquivo `Home.css`.
- Validação da navegação desktop.
- Validação do menu mobile nas resoluções de `768px`, `375px` e `320px`.
- Validação da abertura e do fechamento do menu pelo botão.
- Validação do fechamento do menu após a seleção de uma rota.
- Validação do fechamento pela tecla `Escape` e do retorno do foco ao botão.
- Validação do estado ativo das rotas na Home, listagem e página de detalhes.
- Validação do skip link por meio da navegação por teclado.
- Confirmação da ausência de rolagem horizontal.
- Validação do `Footer` e da estrutura geral das páginas.
- Execução bem-sucedida dos comandos:

  - `npm run lint`;
  - `npm run build`;
  - `git diff --check`.

### Observações

A primeira tarefa da Sprint 2 foi concluída com sucesso. A `Sidebar` foi substituída por uma navegação responsiva integrada ao `Header`, com funcionamento adequado em desktop e dispositivos móveis. A alteração também simplificou o `MainLayout`, removeu estruturas e arquivos que deixaram de ser necessários e aprimorou a acessibilidade da navegação por teclado. Todas as validações técnicas foram aprovadas, e as alterações permaneceram apenas no ambiente local ao final da sessão, ainda sem commit e push.

---

## 2026/07/24

### Objetivo

Concluir a revisão e a integração da navegação responsiva desenvolvida na Sprint 2 e realizar a primeira etapa do rebranding do projeto, adotando oficialmente o nome **Minha Pokédex** na interface, na documentação e nos metadados técnicos.

### Atividades realizadas

- Realização do code review final da branch `feature/responsive-navigation`.
- Validação da estrutura e das responsabilidades dos componentes envolvidos na navegação.
- Validação da navegação desktop e do menu mobile.
- Verificação da indicação visual da rota ativa.
- Revisão da semântica HTML e dos atributos ARIA.
- Validação do fechamento do menu após a seleção de uma rota.
- Validação do fechamento do menu pela tecla `Escape`.
- Confirmação do retorno do foco ao botão do menu após o fechamento por teclado.
- Validação do funcionamento do skip link.
- Revisão da responsividade e confirmação da ausência de regressões.
- Verificação da integridade do diff.
- Execução bem-sucedida dos comandos:

  - `npm run lint`;
  - `npm run build`;
  - `git diff --check`.

- Confirmação de que a branch `feature/responsive-navigation` estava um commit à frente e nenhum commit atrás da `main`.
- Integração da navegação responsiva à `main`.
- Envio da `main` atualizada ao repositório remoto.
- Encerramento da branch de desenvolvimento da navegação responsiva.
- Aprovação da alteração do nome público do projeto de **PokéDex Manager** para **Minha Pokédex**.
- Definição das convenções do rebranding:

  - nome público: **Minha Pokédex**;
  - nome técnico do pacote: `minha-pokedex`;
  - idioma principal da interface: português brasileiro;
  - idioma técnico do código e da arquitetura: inglês.

- Definição de que a renomeação do repositório remoto seria mantida fora desta etapa.
- Criação da branch `chore/project-rebrand`.
- Levantamento completo das referências a:

  - `PokéDex Manager`;
  - `Pokedex Manager`;
  - `pokedex-manager`.

- Classificação das ocorrências entre identidade pública, documentação viva, metadados técnicos, referências temporárias ao repositório, registros históricos e estruturas técnicas.
- Definição da preservação das entradas antigas do Development Journal.
- Preservação das URLs atuais do GitHub e das árvores de diretórios que ainda utilizam `pokedex-manager`.
- Preservação das rotas, dos nomes de componentes, dos serviços e da estrutura da feature `pokedex`.
- Atualização da identidade textual nos arquivos:

  - `frontend/index.html`;
  - `frontend/src/pages/Home/Home.tsx`;
  - `frontend/src/shared/components/layout/Footer.tsx`;
  - `frontend/src/shared/components/layout/Header.tsx`.

- Atualização do nome exibido no `Header`.
- Atualização dos textos da página inicial.
- Atualização do nome exibido no `Footer`.
- Alteração do título da página e da meta description.
- Confirmação de que nenhuma rota, lógica ou estrutura funcional foi modificada durante o rebranding.
- Atualização da documentação nos arquivos:

  - `README.md`;
  - `docs/architecture.md`;
  - `docs/contributing.md`;
  - `docs/database.md`;
  - `docs/requirements.md`;
  - `docs/roadmap.md`;
  - `docs/standards/documentation-standards.md`;
  - `docs/vision.md`.

- Substituição das referências ao nome antigo por **Minha Pokédex** na documentação viva.
- Remoção das indicações de que o nome do projeto ainda era provisório, incluindo referências a _Working Title_.
- Manutenção das URLs e árvores de diretórios relacionadas ao repositório atual como `pokedex-manager`.
- Atualização do pacote raiz para:

  - `name`: `minha-pokedex`;
  - `description`: `Minha Pokédex - Pokémon GO collection and management platform.`

- Atualização automática do `package-lock.json` por meio do comando `npm install --package-lock-only`.
- Confirmação de que nenhuma dependência ou versão foi alterada.
- Execução bem-sucedida de `npm run lint`, `npm run build` e `git diff --check` após o rebranding.
- Validação do build com Vite 8.1.5, totalizando 128 módulos transformados e conclusão sem erros.
- Revisão das ocorrências restantes do nome antigo.
- Revisão do diff completo e dos arquivos com alterações maiores provocadas pela formatação.
- Validação da consistência entre `package.json` e `package-lock.json`.
- Confirmação da preservação das URLs atuais do repositório.
- Confirmação da ausência de alterações funcionais e de mudanças nas dependências.
- Publicação, revisão e aprovação da branch `chore/project-rebrand`.

### Observações

A sessão marcou duas mudanças importantes no projeto. A navegação responsiva foi revisada, aprovada e integrada à `main`, concluindo a primeira tarefa da Sprint 2. Além disso, o projeto passou a adotar oficialmente o nome **Minha Pokédex**, com a identidade textual atualizada no frontend, na documentação e nos metadados técnicos.

As referências históricas, as URLs atuais do GitHub e as estruturas técnicas que utilizam o termo `pokedex` foram preservadas de forma intencional. A branch `chore/project-rebrand` foi publicada e aprovada ao final da sessão, ficando tecnicamente validada para integração à `main`.

---

## 2026/07/25

### Objetivo

Melhorar a apresentação visual das informações físicas e das habilidades na página de detalhes dos Pokémon, concluindo a segunda tarefa da Sprint 2 da **Minha Pokédex**.

### Atividades realizadas

- Revisão e atualização dos componentes:

  - `PokemonPhysicalInfo.tsx`;
  - `PokemonPhysicalInfo.css`;
  - `PokemonAbilities.tsx`;
  - `PokemonAbilities.css`.

- Melhoria da hierarquia visual das informações de altura e peso.
- Substituição da estrutura genérica das informações físicas pelos elementos semânticos `dl`, `dt` e `dd`.
- Formatação dos valores de altura e peso no padrão `pt-BR`.
- Separação visual entre os valores numéricos e suas respectivas unidades.
- Centralização do conteúdo interno da seção de informações físicas.
- Reutilização dos design tokens existentes.
- Manutenção do card de informações físicas ocupando toda a largura disponível, com o conteúdo centralizado internamente.
- Melhoria da hierarquia visual da seção de habilidades.
- Inclusão da ordem de exibição das habilidades.
- Reutilização do componente `Badge` para identificar habilidades ocultas.
- Inclusão de textos explicativos para diferenciar habilidades comuns e ocultas.
- Preservação da estrutura semântica com `ul` e `li`.
- Implementação do tratamento visual de nomes compostos e prevenção de overflow.
- Limitação e centralização do conteúdo interno da seção de habilidades.
- Manutenção dos modelos de domínio, do `PokemonService`, dos hooks, dos mappers e da integração com a PokéAPI sem alterações.
- Manutenção dos nomes das habilidades no idioma original, aplicando apenas formatação visual, como em `solar-power` para `Solar Power`.
- Validação da interface nas resoluções de `320px`, `375px`, tablet e desktop.
- Preservação da semântica HTML e da navegação por teclado.
- Validação da acessibilidade das seções.
- Confirmação da ausência de rolagem horizontal.
- Validação da consistência visual com as seções de tipos, estatísticas e cabeçalho da página.
- Confirmação de que não foram necessárias alterações em `PokemonDetails.tsx` ou `PokemonDetails.css`.
- Execução bem-sucedida dos comandos:

  - `npm run format`;
  - `npm run lint`;
  - `npm run build`;
  - `git diff --check`.

- Desenvolvimento realizado na branch `feature/pokemon-details-ui-polish`.
- Realização do code review da branch.
- Publicação e integração das alterações à `main`.
- Remoção da branch de desenvolvimento local e remota.
- Confirmação de que a `main` permaneceu limpa e sincronizada com `origin/main`.

### Observações

A segunda tarefa da Sprint 2 foi concluída com sucesso. As informações físicas e as habilidades passaram a apresentar uma hierarquia visual mais clara, melhor semântica HTML e comportamento responsivo consistente, sem alterar a arquitetura de dados ou a integração com a PokéAPI.

A tradução das habilidades para português brasileiro não fez parte do escopo desta tarefa. Os nomes permaneceram no idioma original, recebendo apenas formatação visual para melhorar sua legibilidade. Ao final da sessão, a implementação estava integrada à `main`, sem branches pendentes relacionadas à tarefa.

---

## 2026/07/26

### Objetivo

Implementar suporte aos temas claro e escuro na **Minha Pokédex**, respeitando a preferência do sistema operacional, permitindo a alteração manual pelo usuário e persistindo a escolha no navegador.

### Atividades realizadas

- Revisão dos tokens globais definidos em `index.css`.
- Levantamento das cores fixas utilizadas nos componentes da aplicação.
- Classificação das cores entre:

  - cores estruturais da interface;
  - cores semânticas de estados;
  - cores representativas dos tipos de Pokémon;
  - cores representativas das estatísticas.

- Definição da estratégia de aplicação do tema por meio do atributo `data-theme` no elemento `<html>`.
- Manutenção do tema claro como padrão dos tokens globais.
- Criação dos tokens específicos para o tema escuro.
- Inclusão de tokens para:

  - texto sobre a cor primária;
  - fundos suaves;
  - estados de sucesso, aviso e erro;
  - anéis de foco;
  - trilhas das barras de estatísticas;
  - sombras adaptadas ao tema.

- Inclusão da propriedade `color-scheme` para integrar os controles nativos do navegador ao tema ativo.
- Criação do token global `--color-danger`, que já era utilizado pelo componente `ErrorState`.
- Substituição de cores fixas por tokens nos componentes:

  - `Header`;
  - `Badge`;
  - `Button`;
  - `Input`;
  - `PokemonStats`.

- Preservação das cores fixas dos tipos de Pokémon e das barras de estatísticas, por representarem dados e categorias específicas da aplicação.
- Criação da estrutura global de gerenciamento de tema:

  - `ThemeContext`;
  - `ThemeProvider`;
  - `useTheme`.

- Definição de `light` e `dark` como temas aceitos pela aplicação.
- Implementação da detecção da preferência do sistema por meio de `prefers-color-scheme`.
- Implementação do acompanhamento das alterações no tema do sistema enquanto não existir uma escolha manual.
- Definição da preferência manual do usuário como prioridade sobre a configuração do sistema operacional.
- Implementação da persistência do tema no `localStorage` utilizando a chave `minha-pokedex-theme`.
- Validação dos valores recuperados do armazenamento antes de sua aplicação.
- Implementação de tratamento seguro para falhas de acesso ao `localStorage`.
- Integração do `ThemeProvider` à árvore principal da aplicação.
- Criação do componente reutilizável `ThemeToggle`.
- Implementação dos ícones de lua e sol sem utilização de bibliotecas externas.
- Inclusão dos atributos de acessibilidade no controle de tema:

  - `aria-label`;
  - `aria-pressed`;
  - `title`;
  - `aria-hidden` no ícone decorativo.

- Integração do `ThemeToggle` ao `Header`.
- Criação de um agrupamento de ações no cabeçalho para acomodar:

  - botão de alternância de tema;
  - botão do menu mobile.

- Preservação do comportamento existente da navegação responsiva.
- Preservação do fechamento do menu pela tecla `Escape`.
- Preservação do retorno do foco ao botão do menu após o fechamento por teclado.
- Validação da alternância do tema utilizando mouse, tecla `Enter` e barra de espaço.
- Validação da persistência da escolha após o recarregamento da página.
- Validação do retorno à preferência automática do sistema após a remoção do valor armazenado.
- Validação do tratamento de valores inválidos presentes no armazenamento.
- Validação dos temas nas páginas e estados:

  - Home;
  - listagem da Pokédex;
  - detalhes do Pokémon;
  - carregamento;
  - estado vazio;
  - erro.

- Validação da responsividade nas resoluções de `320px`, `375px`, tablet e desktop.
- Confirmação da ausência de rolagem horizontal.
- Confirmação do alinhamento correto entre o botão de tema e o menu mobile em telas reduzidas.
- Confirmação da ausência de erros relacionados ao contexto, ao armazenamento, à preferência do sistema e aos atributos de acessibilidade.
- Execução bem-sucedida dos comandos:

  - `npm run format`;
  - `npm run lint`;
  - `npm run build`;
  - `git diff --check`.

### Observações

A **Minha Pokédex** passou a oferecer suporte completo aos temas claro e escuro sem dependências externas. A implementação utiliza tokens globais, respeita inicialmente a preferência do sistema operacional e permite que o usuário altere manualmente o tema ativo.

A escolha manual é armazenada no navegador e restaurada nos acessos seguintes. Quando não existe uma preferência salva, a aplicação acompanha automaticamente as alterações realizadas no tema do sistema.

O desenvolvimento foi realizado na branch `sprint/sprint-2`, preservando a responsividade, a navegação por teclado e os comportamentos de acessibilidade existentes. Ao final da sessão, as alterações ainda não haviam passado pelo code review completo nem sido integradas à `main`.

---

## 2026/07/27

### Objetivo

Implementar a tradução dos nomes das habilidades dos Pokémon para português brasileiro e realizar o code review completo e final da Sprint 2 da **Minha Pokédex**.

### Atividades realizadas

- Revisão do fluxo das habilidades desde a resposta da PokéAPI até sua exibição no componente `PokemonAbilities`.
- Identificação de que a formatação dos nomes das habilidades estava sendo realizada diretamente no componente visual.
- Avaliação das alternativas para obtenção e armazenamento das traduções.
- Definição da utilização de um dicionário local, evitando novas requisições, dependências externas e aumento de latência.
- Criação do arquivo `frontend/src/features/pokedex/data/abilityTranslations.ts`.
- Inclusão de um conjunto inicial de traduções de habilidades para português brasileiro.
- Criação do mapper `frontend/src/features/pokedex/mappers/pokemonAbilityMapper.ts`.
- Implementação da normalização dos identificadores das habilidades.
- Implementação da consulta ao dicionário local de traduções.
- Implementação de fallback formatado em inglês para habilidades ainda não traduzidas.
- Atualização do modelo de domínio `PokemonAbility` com a propriedade `displayName`.
- Preservação da propriedade `name` como identificador original fornecido pela PokéAPI.
- Integração da resolução dos nomes das habilidades ao mapper `mapPokemonApiToDetails`.
- Remoção da lógica de formatação dos nomes do componente `PokemonAbilities`.
- Atualização do componente para exibir diretamente `ability.displayName`.
- Preservação de `ability.name` como chave estável dos elementos renderizados.
- Confirmação de que o serviço e o hook permaneceram sem responsabilidades relacionadas à tradução.
- Confirmação de que não foram adicionadas requisições ao endpoint de habilidades da PokéAPI.
- Realização de testes com habilidades traduzidas.
- Realização de testes com habilidades que utilizam o fallback em inglês.
- Validação da apresentação de habilidades comuns e ocultas.
- Identificação de um desalinhamento vertical entre os cards quando somente uma habilidade apresentava o badge **“Oculta”**.
- Correção do alinhamento por meio da definição de uma altura mínima para o cabeçalho dos cards.
- Envio das alterações para a branch `sprint/sprint-2`.
- Início do code review completo e final da Sprint 2.
- Comparação da branch de desenvolvimento com a `main`.
- Confirmação de que a branch estava atualizada em relação à `main`.
- Revisão da arquitetura de gerenciamento de temas.
- Revisão do `ThemeContext`, `ThemeProvider` e `useTheme`.
- Revisão da aplicação do atributo `data-theme` no elemento `<html>`.
- Revisão da definição inicial do tema com base na preferência do sistema operacional.
- Revisão da prioridade da preferência manual do usuário.
- Revisão da persistência da escolha no `localStorage`.
- Revisão da acessibilidade do componente `ThemeToggle`.
- Revisão da navegação desktop e mobile.
- Revisão dos tokens utilizados nos temas claro e escuro.
- Revisão dos estados de foco e interação.
- Revisão da organização do dicionário e dos mappers das habilidades.
- Confirmação da separação entre as propriedades `name` e `displayName`.
- Confirmação do funcionamento do fallback em inglês.
- Confirmação da ausência de novas requisições para tradução das habilidades.
- Identificação de pontos de contraste que necessitavam de melhorias.
- Atualização da cor do texto secundário no tema claro.
- Criação do token `--color-primary-text` para os temas claro e escuro.
- Aplicação do novo token nos links ativos do `Header`.
- Aplicação do novo token no `Badge` primário.
- Alteração do indicador global de foco para utilizar a cor primária sólida.
- Remoção da sobrescrita translúcida do indicador de foco no tema escuro.
- Renomeação do arquivo `UseTheme.ts` para `useTheme.ts`.
- Atualização do import utilizado pelo componente `ThemeToggle`.
- Criação e envio do commit `fix: improve theme contrast and focus visibility`.
- Repetição do code review após a aplicação das correções.
- Confirmação de que os problemas de contraste e visibilidade do foco foram resolvidos.
- Confirmação de que a branch ficou quatro commits à frente e nenhum commit atrás da `main`.
- Conclusão do code review sem novos bloqueadores.

### Observações

A arquitetura de gerenciamento dos temas foi aprovada, mantendo responsabilidades bem separadas entre contexto, provider, hook e componente visual.

A tradução das habilidades foi implementada localmente, sem aumentar a quantidade de requisições realizadas pela aplicação. O componente visual passou a receber o nome já preparado para apresentação, enquanto o identificador original da PokéAPI foi preservado no modelo de domínio.

As correções identificadas durante o code review melhoraram o contraste dos textos e dos elementos primários, além de tornar os indicadores de foco mais visíveis e consistentes nos dois temas. Também foi corrigida a nomenclatura do arquivo `useTheme`, mantendo o padrão adotado para hooks.

Ao final da sessão, a branch `sprint/sprint-2` estava tecnicamente aprovada para o encerramento da Sprint 2. A integração das alterações à `main` ainda não havia sido realizada.

---

## 2026/07/28

### Objetivo

Revisar o funcionamento atual da listagem de Pokémon e implementar o carregamento progressivo, preservando os resultados anteriores, tratando o carregamento adicional separadamente e mantendo o estado da Pokédex durante a navegação para a página de detalhes.

### Atividades realizadas

- Revisão do hook `usePokemonList`.
- Revisão do `PokemonService`.
- Revisão do modelo `PokemonApiListResponse`.
- Revisão da página `PokemonList`.
- Revisão dos comportamentos relacionados ao contador, pesquisa, carregamento, erro e estado vazio.
- Identificação de que a resposta da PokéAPI já disponibilizava os metadados:

  - `count`;
  - `next`;
  - `previous`;
  - `results`.

- Identificação de que o serviço retornava apenas o array de Pokémon e descartava os metadados necessários para a paginação.
- Criação do modelo de domínio `PokemonListPage`.
- Atualização do método `getPokemonList` para retornar:

  - `pokemonList`;
  - `totalCount`;
  - `nextOffset`.

- Preservação dos parâmetros `limit`, `offset` e `AbortSignal`.
- Reformulação do hook `usePokemonList`.
- Inclusão do estado responsável por armazenar todos os Pokémon carregados.
- Inclusão do total de Pokémon informado pela PokéAPI.
- Inclusão do próximo offset disponível para carregamento.
- Separação entre o carregamento inicial e o carregamento adicional.
- Separação entre o erro inicial e o erro ocorrido durante o carregamento adicional.
- Criação da função `loadMore`.
- Implementação da acumulação das novas páginas na listagem existente.
- Preservação dos resultados anteriores durante o carregamento adicional.
- Preservação da listagem quando uma página adicional falha.
- Manutenção do mesmo offset após uma falha de carregamento.
- Implementação da repetição da requisição para a página que apresentou erro.
- Implementação de proteção lógica contra requisições simultâneas.
- Utilização de `useRef` para bloquear cliques repetidos antes da atualização visual do estado.
- Implementação de filtragem por ID para impedir a inserção de cards duplicados.
- Implementação do cancelamento das requisições adicionais durante a desmontagem do hook.
- Atualização do retorno de `usePokemonList` com:

  - `pokemonList`;
  - `totalCount`;
  - `isLoading`;
  - `isLoadingMore`;
  - `error`;
  - `loadMoreError`;
  - `hasMore`;
  - `loadMore`;
  - `retry`.

- Atualização da página `PokemonList`.
- Alteração do contador para informar quantos Pokémon foram carregados em relação ao total disponível.
- Manutenção da pesquisa local entre os Pokémon já carregados.
- Inclusão do botão **“Carregar mais”**.
- Inclusão de um spinner específico para o carregamento adicional.
- Inclusão de uma mensagem específica para erros no carregamento adicional.
- Alteração do botão para **“Tentar novamente”** após uma falha.
- Inclusão da mensagem **“Todos os Pokémon foram carregados.”** ao final da paginação.
- Manutenção dos controles de paginação mesmo quando a pesquisa local não encontra resultados.
- Identificação de que o estado da listagem era perdido ao acessar a página de detalhes.
- Avaliação das alternativas para preservar a listagem e a posição do usuário durante a navegação.
- Definição da utilização de um layout persistente para as rotas da Pokédex.
- Criação do contexto `frontend/src/features/pokedex/contexts/PokemonListRouteContext.ts`.
- Criação do layout `frontend/src/features/pokedex/layouts/PokemonRoutesLayout.tsx`.
- Integração do novo layout ao `AppRouter`.
- Manutenção do provider durante a navegação entre as páginas de listagem e detalhes.
- Preservação dos Pokémon carregados, total, offset, pesquisa e estados de paginação.
- Alteração do componente `PokemonCard` para informar qual Pokémon foi selecionado.
- Alteração do componente `PokemonGrid` para propagar a seleção realizada.
- Inclusão de `state` na navegação para indicar que a página de detalhes foi acessada a partir da listagem.
- Ajuste da página `PokemonDetails` para:

  - retornar pelo histórico quando o usuário tiver vindo da listagem;
  - utilizar `/pokemon` como destino alternativo em acessos diretos.

- Identificação de que a restauração baseada apenas em coordenadas de rolagem não posicionava corretamente o Pokémon selecionado.
- Substituição da restauração por coordenada pela identificação do card selecionado.
- Inclusão do atributo `data-pokemon-id` nos links dos cards.
- Armazenamento do ID do último Pokémon selecionado no contexto persistente.
- Utilização de `scrollIntoView` ao retornar para a listagem.
- Posicionamento aproximado do Pokémon selecionado no centro da tela.
- Limpeza do ID selecionado após a restauração da posição.
- Validação do retorno por meio do botão **“Voltar para Pokédex”**.
- Validação do retorno utilizando o botão do navegador.
- Validação do acesso direto a uma página de detalhes.
- Validação da preservação da pesquisa.
- Validação da preservação dos Pokémon carregados.
- Validação da preservação do estado de paginação.
- Confirmação da ausência de novas requisições iniciais ao retornar para a listagem.
- Validação dos fluxos nos temas claro e escuro.
- Validação da responsividade nas resoluções de `320px`, `375px`, `768px` e desktop.
- Confirmação da ausência de rolagem horizontal.
- Execução bem-sucedida dos comandos:

  - `npm run format`;
  - `npm run lint`;
  - `npm run build`;
  - `git diff --check`.

### Observações

A paginação progressiva e a preservação do estado durante a navegação foram concluídas e validadas. A listagem agora mantém os resultados anteriores durante novos carregamentos, diferencia os estados de carregamento e erro iniciais dos adicionais, evita requisições simultâneas e cards duplicados, permite repetir somente a página que falhou e informa quando todos os Pokémon disponíveis foram carregados.

O novo layout persistente mantém os Pokémon carregados, a pesquisa, os metadados de paginação e a referência do último card selecionado durante a navegação entre a listagem e os detalhes. Ao retornar, o usuário é reposicionado próximo ao Pokémon anteriormente acessado, sem reiniciar a listagem ou repetir a requisição inicial.

Durante os testes, foi confirmado que a pesquisa atual considera apenas os Pokémon já presentes em `pokemonList`. A necessidade de uma pesquisa remota por nome ou número exato foi identificada e registrada para continuidade da Sprint 3. O code review completo e a integração das alterações à `main` ainda não haviam sido realizados ao final da sessão.

---

## 2026/07/29

### Objetivo

Dar continuidade à Sprint 3 da **Minha Pokédex**, implementando uma pesquisa global exata por nome ou número, sem misturar o resultado remoto com a listagem paginada e preservando todos os estados durante a navegação para a página de detalhes.

### Atividades realizadas

- Revisão do estado atual da pesquisa na página `PokemonList`.
- Revisão das responsabilidades do hook `usePokemonList`.
- Revisão do contexto persistente das rotas da Pokédex.
- Revisão dos métodos disponíveis no `PokemonService`.
- Revisão das regras existentes para normalização de nomes e números.
- Revisão dos estados de carregamento, erro e resultado vazio.
- Confirmação da existência da branch remota `sprint/sprint-3`.
- Manutenção do `usePokemonList` como responsável exclusivamente por:

  - listagem inicial;
  - paginação;
  - total de Pokémon;
  - próximo offset;
  - carregamento adicional;
  - erros da listagem;
  - prevenção de páginas duplicadas.

- Definição de um fluxo independente para a pesquisa global, com estados e responsabilidades próprios.
- Manutenção da filtragem local durante a digitação.
- Definição de que a consulta remota seria executada apenas após a confirmação da pesquisa.
- Definição de que a PokéAPI somente seria consultada quando não existisse uma correspondência exata entre os Pokémon já carregados.
- Criação do método `getPokemonSummaryByIdentifier`.
- Implementação da consulta direta à PokéAPI por nome ou número.
- Definição do retorno do serviço como `PokemonSummary | null`.
- Tratamento de respostas `404` como Pokémon inexistente.
- Manutenção de erros de rede ou servidor como exceções técnicas independentes.
- Garantia de que a pesquisa remota não alterasse:

  - `pokemonList`;
  - `totalCount`;
  - `nextOffset`;
  - `hasMore`;
  - estado de finalização da listagem.

- Criação do utilitário `frontend/src/features/pokedex/utils/pokemonSearch.ts`.
- Implementação da função `normalizePokemonSearchQuery`.
- Implementação da normalização de:

  - espaços no início e no final;
  - letras maiúsculas e minúsculas;
  - acentuação;
  - prefixo `#`;
  - zeros à esquerda;
  - espaços em nomes compostos;
  - pontuação;
  - símbolos de gênero.

- Validação das seguintes normalizações:

  - `"  Pikachu  "` para `"pikachu"`;
  - `"#025"` para `"25"`;
  - `"Mr. Mime"` para `"mr-mime"`;
  - `"Ho Oh"` para `"ho-oh"`;
  - `"Nidoran♀"` para `"nidoran-f"`;
  - `"Nidoran♂"` para `"nidoran-m"`.

- Criação da função `findExactPokemonMatch`.
- Implementação da verificação exata por nome normalizado e número do Pokémon.
- Criação do hook `usePokemonExactSearch`.
- Inclusão dos estados:

  - `remotePokemon`;
  - `isSearchingPokemon`;
  - `exactSearchError`;
  - `hasSearchedRemotely`.

- Inclusão das funções:

  - `searchExactPokemon`;
  - `clearExactSearch`.

- Implementação do cancelamento da pesquisa anterior utilizando `AbortController`.
- Implementação de proteção contra respostas antigas sobrescreverem uma pesquisa mais recente.
- Separação dos estados de:

  - Pokémon encontrado;
  - Pokémon inexistente;
  - erro técnico;
  - pesquisa em andamento.

- Integração do `usePokemonExactSearch` ao `PokemonRoutesLayout`.
- Inclusão do estado da pesquisa global no `PokemonListRouteContext`.
- Preservação da pesquisa global durante a navegação entre:

  - `/pokemon`;
  - `/pokemon/:pokemonId`.

- Alteração da pesquisa local para acompanhar o texto durante a digitação.
- Manutenção de `searchQuery` como a última pesquisa confirmada.
- Limpeza do resultado remoto quando o usuário altera o texto da pesquisa.
- Cancelamento da requisição remota ao limpar ou modificar a consulta.
- Implementação do fluxo de confirmação da pesquisa:

  - normalização da consulta;
  - busca por correspondência exata em `pokemonList`;
  - utilização do resultado local quando encontrado;
  - consulta à PokéAPI quando não existisse uma correspondência exata local.

- Manutenção das correspondências parciais exclusivamente no filtro local.
- Implementação da pesquisa global exata para consultas como:

  - `pikachu`;
  - `25`;
  - `#25`;
  - `025`;
  - `mewtwo`;
  - `150`;
  - `#150`;
  - `0150`.

- Implementação de uma seção visual dedicada ao resultado exato.
- Inclusão de um estado de carregamento específico para a pesquisa remota.
- Inclusão de um estado de erro específico para a pesquisa remota.
- Implementação da tentativa novamente sem interferir na listagem paginada.
- Inclusão de um estado vazio para pesquisas exatas sem resultado.
- Exibição do Pokémon remoto utilizando o componente `PokemonGrid`.
- Limitação da largura do único card exibido na seção de resultado remoto.
- Manutenção do resultado remoto separado de `pokemonList`.
- Preservação do contador referente apenas aos Pokémon carregados pela paginação.
- Implementação de uma verificação para impedir a exibição duplicada do resultado remoto caso o Pokémon fosse posteriormente alcançado pela paginação.
- Manutenção do botão **“Carregar mais”** durante a pesquisa global.
- Preservação de `totalCount`, `nextOffset` e `hasMore`.
- Manutenção dos resultados locais parciais mesmo quando a pesquisa global exata retornasse `404`.
- Ajuste para impedir a exibição simultânea de dois estados vazios.
- Preservação do resultado remoto ao acessar os detalhes e retornar para a Pokédex.
- Preservação do card pesquisado e restauração de sua posição na tela.
- Atualização do componente `SearchBar` com a propriedade `isSubmitting`.
- Alteração temporária do texto do botão para **“Pesquisando...”** durante a consulta.
- Desabilitação temporária do botão de envio durante a pesquisa remota.
- Manutenção do campo de pesquisa editável durante o carregamento.
- Prevenção de múltiplas confirmações consecutivas por clique ou pela tecla `Enter`.
- Inclusão de `aria-busy` no formulário de pesquisa.
- Inclusão de `aria-live="polite"` na seção de resultado exato.
- Inclusão de `aria-busy` na seção durante o carregamento.
- Ajuste para impedir que pesquisas compostas apenas por espaços gerassem requisições.
- Identificação e remoção do texto indevido `tSelectedPokemonId,`, que estava sendo renderizado acima do conteúdo da página.
- Identificação do aviso de depreciação de `FormEvent` nas tipagens utilizadas pelo React.
- Substituição de `FormEvent<HTMLFormElement>` por `SubmitEvent<HTMLFormElement>`.
- Preservação do comportamento de `preventDefault` e do envio do formulário.
- Validação dos seguintes comportamentos:

  - filtragem local durante a digitação;
  - pesquisa local parcial;
  - pesquisa exata por nome;
  - pesquisa exata por número;
  - pesquisa utilizando `#`;
  - pesquisa utilizando zeros à esquerda;
  - pesquisa de nomes compostos;
  - ausência de requisição remota quando o Pokémon exato já estava carregado;
  - consulta remota quando o Pokémon ainda não estava carregado;
  - exibição separada do resultado global;
  - preservação da lista paginada;
  - preservação do contador;
  - preservação de `nextOffset`;
  - preservação do botão **“Carregar mais”**;
  - tratamento de Pokémon inexistente;
  - tratamento de erro de rede;
  - tentativa novamente da pesquisa;
  - cancelamento da pesquisa anterior;
  - prevenção de consultas duplicadas;
  - limpeza da pesquisa;
  - pesquisa contendo somente espaços;
  - persistência ao navegar para os detalhes;
  - retorno correto ao card pesquisado;
  - funcionamento nos temas claro e escuro;
  - funcionamento responsivo.

- Confirmação da remoção do texto indevido no layout.
- Confirmação da ausência do aviso de depreciação de `FormEvent`.
- Execução bem-sucedida dos comandos:

  - `npm run format`;
  - `npm run lint`;
  - `npm run build`;
  - `git diff --check`.

### Observações

A **Minha Pokédex** passou a permitir a pesquisa global exata de Pokémon por nome ou número, mesmo quando o resultado ainda não está presente entre os itens carregados pela paginação.

O resultado obtido remotamente permanece isolado da listagem principal, preservando o total de Pokémon, o próximo offset, o estado de paginação e o indicador de finalização da lista. A filtragem parcial continua funcionando localmente durante a digitação, enquanto a consulta à PokéAPI é realizada somente após a confirmação da pesquisa e quando não existe uma correspondência exata entre os Pokémon já carregados.

A pesquisa global também passou a ser preservada durante a navegação para os detalhes, mantendo o resultado encontrado e restaurando a posição do card ao retornar para a listagem.

Ao final da sessão, a implementação funcional estava concluída e validada na branch `sprint/sprint-3`. O code review completo e a integração das alterações à `main` ainda não haviam sido realizados.

---

## 2026/07/30

### Objetivo

Dar continuidade à Sprint 3 da **Minha Pokédex**, implementando a descrição da Pokédex na página de detalhes, com prioridade para textos em português brasileiro, fallback em inglês, normalização do conteúdo recebido da PokéAPI e preservação do fluxo existente de carregamento, erro, repetição e cancelamento.

### Atividades realizadas

- Revisão do fluxo atual da página de detalhes.
- Revisão das responsabilidades da página `PokemonDetails`.
- Revisão do hook `usePokemonDetails`.
- Revisão dos métodos disponíveis no `PokemonService`.
- Revisão do mapper responsável pela conversão dos dados da API para o domínio.
- Revisão dos modelos `PokemonDetails` e `PokemonApiDetailResponse`.
- Estudo da resposta do endpoint de espécie da PokéAPI:

  - `/pokemon-species/{id-ou-nome}`.

- Identificação de que as descrições da Pokédex estão disponíveis em `flavor_text_entries`.
- Identificação de que cada descrição possui referências para:

  - idioma;
  - versão do jogo.

- Identificação de que o conteúdo é fornecido sem tratamento e pode apresentar quebras de linha, tabulações, espaços especiais e caracteres utilizados nos textos dos jogos antigos.
- Definição de que a página e o componente visual não seriam responsáveis por selecionar o idioma ou normalizar o texto.
- Manutenção do `usePokemonDetails` como responsável somente por:

  - carregamento;
  - erro;
  - repetição da requisição;
  - cancelamento;
  - controle da requisição atual.

- Definição de que o `PokemonService` coordenaria as consultas dos dados principais e da espécie.
- Definição de que a URL da espécie seria obtida por meio de `pokemonApi.species.url`.
- Decisão de não montar diretamente a URL da espécie utilizando o ID da rota, preservando compatibilidade futura com formas e variações.
- Definição de que as duas consultas utilizariam o mesmo `AbortSignal`.
- Manutenção de um único ciclo de carregamento, erro e repetição para os detalhes completos.
- Definição de que uma falha técnica ao carregar a espécie seria tratada como erro no carregamento dos detalhes.
- Definição de que a ausência de uma descrição válida seria representada por `description: null`.
- Criação do tipo reutilizável `PokemonApiNamedResource`.
- Inclusão da referência de espécie no modelo `PokemonApiDetailResponse`.
- Criação dos modelos:

  - `PokemonApiFlavorTextEntry`;
  - `PokemonApiSpeciesResponse`.

- Criação do mapper `frontend/src/features/pokedex/mappers/pokemonSpeciesMapper.ts`.
- Implementação da seguinte prioridade de idiomas:

  - português brasileiro;
  - português genérico, quando disponível;
  - inglês;
  - ausência de descrição.

- Implementação da normalização do código de idioma.
- Implementação da seleção da primeira descrição válida de acordo com a prioridade definida.
- Implementação do descarte de entradas vazias ou compostas somente por espaços e caracteres invisíveis.
- Implementação da normalização das descrições recebidas.
- Tratamento de:

  - quebras de linha;
  - retorno de carro;
  - tabulações;
  - `form feed`;
  - espaços duplicados;
  - espaços não separáveis;
  - hífens condicionais;
  - caracteres de largura zero;
  - caracteres invisíveis.

- Preservação de acentos, pontuação, nomes próprios e caracteres legítimos do texto.
- Identificação da grafia antiga `POKéMON`.
- Implementação da normalização das variações de capitalização para `Pokémon`.
- Atualização do modelo `PokemonDetails` com a propriedade `description: string | null`.
- Atualização do `mapPokemonApiToDetails` para receber a descrição previamente processada.
- Manutenção das regras de idioma e normalização fora do mapper principal.
- Criação da função de serviço responsável pela consulta dos dados da espécie.
- Atualização do método `getPokemonById` para:

  - buscar os dados principais do Pokémon;
  - obter a URL da espécie;
  - buscar os dados da espécie;
  - selecionar e normalizar a descrição;
  - montar o objeto `PokemonDetails` completo.

- Validação das duas requisições na aba Network:

  - `/pokemon/{id}`;
  - `/pokemon-species/{id-ou-nome}`.

- Confirmação de respostas HTTP `200` para os dois endpoints.
- Criação do componente `PokemonDescription`.
- Criação do arquivo de estilos `PokemonDescription.css`.
- Utilização do componente compartilhado `Card` para manter a consistência visual com a aplicação.
- Inclusão do título **“Descrição da Pokédex”**.
- Implementação da mensagem de fallback visual **“Descrição indisponível para este Pokémon.”**
- Integração da descrição entre o cabeçalho do Pokémon e as informações físicas.
- Preservação da responsabilidade exclusivamente visual do componente, que recebe apenas `string | null`.
- Validação de que as espécies testadas não possuíam descrições em português brasileiro na resposta atual da PokéAPI.
- Confirmação do uso correto da descrição em inglês como fallback.
- Identificação de que a ausência de textos em português é uma limitação da fonte de dados, e não uma falha da implementação.
- Registro de que traduções completas em português brasileiro poderão exigir futuramente:

  - catálogo local;
  - outra fonte de dados;
  - backend próprio;
  - serviço de tradução.

- Validação da consulta dos dados principais do Pokémon.
- Validação da consulta dos dados da espécie.
- Validação da utilização da URL de espécie retornada pela API.
- Validação do compartilhamento do mesmo `AbortSignal`.
- Validação do cancelamento ao sair da página durante o carregamento.
- Confirmação de que o estado de carregamento aguarda a conclusão das duas consultas.
- Validação do tratamento de erro na consulta principal.
- Validação do tratamento de erro na consulta de espécie.
- Validação da repetição de todo o fluxo por meio da função de retry.
- Validação do uso da descrição em português brasileiro quando disponível.
- Validação do uso do inglês como fallback.
- Validação do tratamento da ausência de descrição.
- Validação da remoção de quebras e caracteres especiais indevidos.
- Validação da normalização da grafia `POKéMON` para `Pokémon`.
- Validação da preservação da listagem ao retornar da página de detalhes.
- Validação do funcionamento nos temas claro e escuro.
- Validação do funcionamento nas resoluções de:

  - `320px`;
  - `375px`;
  - `768px`;
  - desktop.

- Confirmação da ausência de transbordamento do texto.
- Confirmação da ausência de rolagem horizontal.
- Validação da legibilidade da descrição e da mensagem de indisponibilidade.
- Execução bem-sucedida dos comandos:

  - `npm run format`;
  - `npm run lint`;
  - `npm run build`;
  - `git diff --check`.

### Observações

A página de detalhes da **Minha Pokédex** passou a consultar o endpoint de espécie e exibir uma descrição da Pokédex previamente normalizada. A aplicação procura inicialmente uma descrição em português e utiliza o inglês como fallback quando a PokéAPI não fornece uma entrada compatível.

As regras de seleção de idioma, fallback e tratamento do texto permaneceram isoladas no mapper da espécie, enquanto o componente visual recebe somente a descrição pronta para apresentação. O fluxo existente de carregamento, erro, repetição, cancelamento, navegação, temas e responsividade foi preservado.

As espécies validadas não apresentaram descrições em português brasileiro na resposta atual da PokéAPI, fazendo com que o fallback em inglês fosse utilizado corretamente. Ao final da sessão, não havia sido realizado o code review completo nem a integração das alterações à `main`.

---
