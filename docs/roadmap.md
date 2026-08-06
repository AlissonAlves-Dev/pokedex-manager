# Roadmap

Este documento acompanha a evolução da Minha Pokédex, registrando o que já foi entregue, o que está em desenvolvimento e quais são as próximas etapas do produto.

O Roadmap apresenta direções de desenvolvimento. O escopo pode ser ajustado conforme novas necessidades e decisões técnicas surgirem.

## Status

| Status          | Significado                                           |
| --------------- | ----------------------------------------------------- |
| Planejado       | Ainda não iniciado                                    |
| Em andamento    | Desenvolvimento ativo                                 |
| Em encerramento | Escopo implementado, aguardando revisão ou integração |
| Concluído       | Revisado, validado e integrado à `main`               |

## Progresso geral

| Milestone                | Objetivo                                           | Status       |
| ------------------------ | -------------------------------------------------- | ------------ |
| Milestone 1 — Pokédex    | Consulta e exploração de informações sobre Pokémon | Em andamento |
| Milestone 2 — Coleção    | Autenticação e gerenciamento da coleção pessoal    | Planejado    |
| Milestone 3 — Pokémon GO | Dados individuais e recursos específicos do jogo   | Planejado    |
| Milestone 4 — Análises   | PvP, PvE, raids e recomendações                    | Planejado    |
| Milestone 5 — Expansão   | Recursos comunitários e novas integrações          | Planejado    |

## Histórico de Sprints

| Sprint   | Escopo principal                                                            | Status          |
| -------- | --------------------------------------------------------------------------- | --------------- |
| Sprint 0 | Configuração inicial, monorepo e ferramentas de desenvolvimento             | Concluído       |
| Sprint 1 | Rotas, estrutura do frontend, integração com a PokéAPI, listagem e detalhes | Concluído       |
| Sprint 2 | Navegação responsiva, melhorias visuais, temas e traduções de habilidades   | Concluído       |
| Sprint 3 | Paginação, pesquisa global exata, descrição, sprites e testes iniciais      | Concluído       |
| Sprint 4 | Cadeias de evolução, formas, variações, acessibilidade e testes             | Em encerramento |

## Milestone 1 — Pokédex MVP

### Objetivo

Entregar uma Pokédex responsiva que permita:

- navegar por uma lista de Pokémon;
- pesquisar por nome ou número;
- acessar informações detalhadas;
- compreender os principais dados de cada Pokémon;
- utilizar a aplicação sem autenticação ou cadastro.

### Entregas concluídas

#### Estrutura da aplicação

- monorepo com npm Workspaces;
- frontend com React, TypeScript e Vite;
- organização baseada em features;
- React Router;
- componentes compartilhados;
- ESLint, Prettier, Vitest e EditorConfig.

#### Navegação e interface

- página inicial;
- listagem de Pokémon;
- página de detalhes;
- página para rotas inexistentes;
- navegação responsiva no Header;
- temas claro e escuro;
- persistência da preferência de tema;
- suporte à preferência do sistema;
- interface validada a partir de 320px;
- melhorias de acessibilidade e navegação por teclado.

#### Listagem

- carregamento inicial de Pokémon;
- carregamento progressivo;
- preservação das páginas anteriores;
- prevenção de resultados duplicados;
- contador de Pokémon carregados;
- loading inicial e adicional separados;
- erro adicional sem perda da listagem;
- tentativa novamente para páginas com falha;
- indicação de fim dos resultados.

#### Pesquisa

- filtragem local durante a digitação;
- pesquisa global exata por nome;
- pesquisa global exata por número;
- suporte a formatos como `25`, `025` e `#025`;
- normalização de nomes compostos, pontuação e símbolos;
- prioridade para correspondências locais;
- resultado remoto separado da paginação;
- tratamento específico para Pokémon inexistente;
- retry para erros técnicos;
- cancelamento e proteção contra respostas antigas.

#### Preservação de navegação

- manutenção dos Pokémon carregados ao abrir os detalhes;
- preservação do termo de pesquisa;
- preservação do resultado remoto;
- preservação do próximo offset;
- restauração do Pokémon selecionado ao retornar;
- suporte ao botão da aplicação e ao histórico do navegador.

#### Detalhes do Pokémon

- número e nome;
- arte oficial;
- tipos;
- altura e peso;
- habilidades comuns e ocultas;
- traduções de habilidades em português quando disponíveis;
- fallback formatado em inglês;
- estatísticas base;
- descrição da Pokédex;
- prioridade para descrição em português;
- fallback da descrição para inglês;
- tratamento de descrição indisponível;
- sprite frontal padrão;
- sprite frontal shiny;
- fallback individual para sprites ausentes.

#### Estados da aplicação

- carregamento;
- conteúdo vazio;
- erro;
- tentativa novamente;
- cancelamento de requisições;
- tratamento de dados opcionais;
- ausência de imagens quebradas.

### Entregas pendentes

Para concluir o Milestone 1:

- refinamentos finais da experiência;
- preparação para publicação.

### Limitações atuais

- a pesquisa parcial utiliza somente os Pokémon já carregados;
- a busca global funciona apenas para nome ou número exato;
- algumas descrições não estão disponíveis em português na PokéAPI;
- nem todas as habilidades possuem tradução local;
- o frontend consulta diretamente a PokéAPI;
- ainda não existe backend ou banco de dados.

### Critério de conclusão

O Milestone 1 será concluído quando:

- evoluções, formas e variações estiverem implementadas e validadas;
- o fluxo completo da Pokédex estiver validado;
- testes automatizados cobrirem os comportamentos mais importantes;
- não existirem erros bloqueadores;
- a aplicação estiver preparada para publicação.

## Sprint 3 — Expansão da Pokédex

### Objetivo

Expandir a listagem e a página de detalhes, corrigindo limitações de navegação e permitindo consultas globais exatas.

### Entregas implementadas

- paginação progressiva;
- preservação da listagem entre rotas;
- restauração do Pokémon selecionado;
- pesquisa global exata por nome ou número;
- normalização avançada dos termos de pesquisa;
- descrição obtida pelo endpoint de espécie;
- fallback de idioma;
- normalização das descrições;
- sprites padrão e shiny;
- tratamento individual de dados indisponíveis;
- reorganização da documentação em português.
- configuração inicial de testes automatizados com Vitest;
- testes unitários para normalização da pesquisa e mappers.

### Pendências para encerramento

- concluir a revisão documental;
- atualizar o Development Journal;
- executar as validações finais;
- realizar o code review consolidado;
- corrigir eventuais bloqueadores;
- integrar `sprint/sprint-3` à `main`;
- remover a branch da Sprint.

A Sprint somente será marcada como concluída após o code review e o merge.

## Sprint 4 — Evoluções e formas

### Objetivo

Expandir os detalhes da Pokédex com cadeias de evolução, formas e variações, preservando separação de responsabilidades, falhas parciais, cancelamento, acessibilidade, responsividade e cobertura automatizada.

### Cadeia de evolução — implementado

- revisão do tipo `PokemonApiSpeciesResponse`;
- utilização de `evolution_chain.url`;
- tipos da API para cadeias e condições;
- modelo de domínio recursivo;
- suporte a cadeias lineares e ramificadas;
- percurso recursivo da resposta;
- seleção de condições padrão;
- remoção de condições visualmente duplicadas;
- tratamento de condições associadas a formas alternativas;
- extração do ID pela URL da espécie;
- construção direta da URL dos sprites;
- ausência de requisições individuais para cada integrante;
- falha da espécie sem bloquear os dados principais;
- falha da cadeia sem remover a descrição;
- propagação de cancelamentos;
- organização visual por estágios;
- preservação da relação entre cada evolução e sua espécie anterior;
- layout horizontal responsivo;
- identificação do Pokémon atual;
- navegação entre integrantes da cadeia;
- fallback para sprites indisponíveis;
- testes automatizados do mapper;
- testes automatizados do service;
- testes do formatador de condições;
- testes da organização por estágios.

### Polimento da cadeia — implementado

- remoção dos blocos permanentes de requisitos;
- requisitos incorporados ao card do Pokémon resultante;
- exibição dos requisitos por hover;
- comportamento equivalente por foco de teclado;
- fallback para dispositivos sem hover;
- preservação do card inteiro como link;
- ausência de botões intermediários nos cards;
- ocultação da imagem durante hover e foco;
- padronização das dimensões dos cards;
- alinhamento dos conteúdos internos;
- centralização do Pokémon-base e dos conectores em cadeias ramificadas;
- agrupamento dos estágios por espécie anterior;
- preservação de grupos vazios quando uma ramificação termina antes das demais;
- revisão das cadeias de Eevee e Wurmple;
- remoção do card isolado em Pokémon sem evolução;
- mensagem específica para ausência de evoluções conhecidas;
- configuração do ambiente de testes com jsdom;
- integração da React Testing Library;
- testes automatizados do componente da cadeia;
- validação de links, foco, requisitos, badges e fallback de imagem;
- revisão em temas claro e escuro;
- revisão de responsividade.
- correção do foco do card-base sem requisitos;
- adaptação da altura dos cards em dispositivos sem hover;
- prevenção de corte em condições extensas;
- espaçamento uniforme entre cards responsivos;
- renderização efetiva dos grupos por espécie anterior;
- preservação de grupos vazios por múltiplos estágios;
- associação acessível dos requisitos com `aria-describedby`;
- normalização de URLs opcionais antes das requisições;
- ampliação dos testes do formatador de condições;
- correções identificadas durante o code review consolidado.

### Formas e variações — implementado

- estudo da relação entre `PokemonSpecies`, `Pokemon` e `PokemonForm`;
- referências de variações obtidas por `species.varieties`;
- referências de formas obtidas por `pokemon.forms`;
- identificação da variação padrão por `is_default`;
- contratos separados para API e domínio;
- utilitário compartilhado para extração segura de IDs;
- utilitário compartilhado para formatação de nomes;
- mapper de variações;
- mapper de referências de formas;
- mapper de detalhes da forma;
- descarte individual de referências inválidas;
- integração dos metadados da espécie aos detalhes;
- carregamento independente por meio de `getPokemonFormById` para `/pokemon-form/{formId}`;
- validação preventiva do ID da forma;
- hook independente `usePokemonForm`;
- cancelamento em troca de forma, Pokémon, retry e desmontagem;
- proteção contra respostas obsoletas;
- validação do Pokémon associado à forma;
- parser estrito da query `?form=`;
- validação da disponibilidade em `pokemon.forms`;
- estados base, query inválida, forma indisponível, loading, sucesso e erro;
- ausência de carregamento antecipado das formas;
- navegação acessível entre variações e formas;
- preservação do contexto de retorno à listagem;
- remoção da query ao navegar para outra variação;
- painel visual com tipos, características, metadados e sprites;
- loading, erro e retry locais;
- suporte aos temas claro e escuro;
- responsividade a partir de 320px;
- testes de utilitários, mappers, service, hook, componentes e integração da página;
- revisão consolidada de contratos, requisições, concorrência, acessibilidade e regressões.

## Milestone 2 — Coleção pessoal

### Objetivo

Transformar a Pokédex pública em uma experiência personalizada.

Entregas planejadas:

- backend próprio;
- API interna;
- banco de dados;
- autenticação;
- contas de usuário;
- coleção pessoal;
- favoritos;
- acompanhamento da Pokédex do usuário.

## Milestone 3 — Pokémon GO

### Objetivo

Permitir que o usuário registre e acompanhe seus Pokémon capturados.

Entregas planejadas:

- IV de ataque, defesa e stamina;
- CP;
- nível;
- shiny;
- sortudo;
- sombra e purificado;
- formas e fundos especiais;
- movesets;
- observações pessoais;
- filtros da coleção.

## Milestone 4 — Análises

### Objetivo

Ajudar o usuário a decidir quais Pokémon utilizar ou receber investimento.

Entregas planejadas:

- análises de PvP;
- análises de PvE;
- recomendações para raids;
- avaliação de movesets;
- comparação entre Pokémon;
- montagem de times;
- indicação de prioridade de investimento.

## Milestone 5 — Expansão

### Objetivo

Adicionar recursos que ampliem o uso da plataforma.

Possibilidades futuras:

- calendário de eventos;
- notícias;
- compartilhamento de coleções;
- notificações;
- recursos comunitários;
- suporte a outros jogos da franquia;
- aplicação móvel ou PWA.

Essas funcionalidades representam possibilidades futuras e não compromissos da versão atual.
