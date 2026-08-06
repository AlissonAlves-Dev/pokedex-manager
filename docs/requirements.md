# Requisitos

> Escopo atual: versão `v0.1` — Pokédex MVP.

Este documento define os comportamentos que a versão atual da Minha Pokédex deve entregar.

## Objetivo da versão

A versão `v0.1` deve permitir que o usuário consulte Pokémon, pesquise por nome ou número e acesse informações detalhadas por meio de uma interface responsiva.

Esta versão não utiliza autenticação, backend próprio ou persistência de dados.

## Status

| Status    | Significado                    |
| --------- | ------------------------------ |
| Concluído | Implementado e validado        |
| Pendente  | Planejado para a versão atual  |
| Futuro    | Fora do escopo da versão atual |

## Listagem

| ID     | Requisito                                                          | Status    |
| ------ | ------------------------------------------------------------------ | --------- |
| RF-001 | Exibir uma lista inicial de Pokémon.                               | Concluído |
| RF-002 | Permitir o carregamento progressivo de novos resultados.           | Concluído |
| RF-003 | Preservar os Pokémon carregados ao buscar uma nova página.         | Concluído |
| RF-004 | Impedir a duplicação de Pokémon durante a paginação.               | Concluído |
| RF-005 | Informar quantos Pokémon foram carregados.                         | Concluído |
| RF-006 | Indicar quando não existirem mais resultados.                      | Concluído |
| RF-007 | Manter a listagem visível quando um carregamento adicional falhar. | Concluído |
| RF-008 | Permitir repetir somente a página que falhou.                      | Concluído |

## Pesquisa

| ID     | Requisito                                                                        | Status    |
| ------ | -------------------------------------------------------------------------------- | --------- |
| RF-009 | Filtrar localmente os Pokémon carregados enquanto o usuário digita.              | Concluído |
| RF-010 | Pesquisar globalmente por nome exato.                                            | Concluído |
| RF-011 | Pesquisar globalmente pelo número da Pokédex.                                    | Concluído |
| RF-012 | Aceitar formatos como `25`, `025` e `#025`.                                      | Concluído |
| RF-013 | Normalizar nomes compostos, espaços, pontuação e símbolos de gênero.             | Concluído |
| RF-014 | Priorizar um resultado já disponível na listagem local.                          | Concluído |
| RF-015 | Consultar a PokéAPI somente quando não houver correspondência exata local.       | Concluído |
| RF-016 | Exibir separadamente o resultado obtido pela pesquisa remota.                    | Concluído |
| RF-017 | Tratar um Pokémon inexistente como resultado vazio, sem apresentar erro técnico. | Concluído |
| RF-018 | Permitir nova tentativa quando a pesquisa falhar por erro de rede ou servidor.   | Concluído |

A pesquisa parcial global não faz parte desta versão.

Termos como `pika`, `char` ou `saur` filtram somente os Pokémon que já foram carregados.

## Detalhes do Pokémon

| ID     | Requisito                                                           | Status    |
| ------ | ------------------------------------------------------------------- | --------- |
| RF-019 | Permitir abrir os detalhes de um Pokémon pela listagem ou pesquisa. | Concluído |
| RF-020 | Exibir número, nome e arte oficial.                                 | Concluído |
| RF-021 | Exibir os tipos do Pokémon.                                         | Concluído |
| RF-022 | Exibir altura e peso.                                               | Concluído |
| RF-023 | Exibir habilidades comuns e ocultas.                                | Concluído |
| RF-024 | Exibir traduções de habilidades quando disponíveis.                 | Concluído |
| RF-025 | Utilizar um nome formatado em inglês quando não houver tradução.    | Concluído |
| RF-026 | Exibir as estatísticas base.                                        | Concluído |
| RF-027 | Exibir uma descrição da Pokédex.                                    | Concluído |
| RF-028 | Priorizar descrições em português e utilizar inglês como fallback.  | Concluído |
| RF-029 | Exibir uma mensagem quando nenhuma descrição estiver disponível.    | Concluído |
| RF-030 | Exibir o sprite frontal padrão.                                     | Concluído |
| RF-031 | Exibir o sprite frontal shiny.                                      | Concluído |
| RF-032 | Tratar individualmente sprites ausentes.                            | Concluído |
| RF-033 | Exibir a cadeia de evolução.                                        | Concluído |
| RF-034 | Exibir formas e variações disponíveis.                              | Concluído |

## Navegação e preservação de estado

| ID     | Requisito                                                                         | Status    |
| ------ | --------------------------------------------------------------------------------- | --------- |
| RF-035 | Preservar os Pokémon carregados ao navegar para os detalhes.                      | Concluído |
| RF-036 | Preservar o termo e o resultado da pesquisa.                                      | Concluído |
| RF-037 | Preservar o próximo offset e o estado da paginação.                               | Concluído |
| RF-038 | Restaurar visualmente o Pokémon selecionado ao retornar.                          | Concluído |
| RF-039 | Utilizar o histórico de navegação quando os detalhes forem abertos pela listagem. | Concluído |
| RF-040 | Retornar para `/pokemon` quando os detalhes forem acessados diretamente.          | Concluído |

## Interface

| ID     | Requisito                                                                   | Status    |
| ------ | --------------------------------------------------------------------------- | --------- |
| RF-041 | Disponibilizar navegação entre a página inicial e a Pokédex.                | Concluído |
| RF-042 | Permitir alternar entre os temas claro e escuro.                            | Concluído |
| RF-043 | Persistir a escolha manual de tema.                                         | Concluído |
| RF-044 | Utilizar a preferência do sistema quando não existir uma escolha manual.    | Concluído |
| RF-045 | Exibir estados de carregamento, erro, tentativa novamente e conteúdo vazio. | Concluído |
| RF-046 | Exibir uma página adequada para rotas inexistentes.                         | Concluído |

## Requisitos não funcionais

| ID      | Requisito                                                                         | Status    |
| ------- | --------------------------------------------------------------------------------- | --------- |
| RNF-001 | Utilizar React e TypeScript no frontend.                                          | Concluído |
| RNF-002 | Consumir dados externos por meio da PokéAPI.                                      | Concluído |
| RNF-003 | Separar os modelos da API dos modelos de domínio.                                 | Concluído |
| RNF-004 | Manter transformações de dados fora dos componentes visuais.                      | Concluído |
| RNF-005 | Cancelar requisições quando o fluxo correspondente for desmontado ou substituído. | Concluído |
| RNF-006 | Impedir que respostas antigas substituam uma pesquisa mais recente.               | Concluído |
| RNF-007 | Funcionar em dispositivos móveis e desktop.                                       | Concluído |
| RNF-008 | Manter o layout utilizável a partir de 320px.                                     | Concluído |
| RNF-009 | Evitar transbordamento e rolagem horizontal indevida.                             | Concluído |
| RNF-010 | Oferecer navegação por teclado e indicadores de foco visíveis.                    | Concluído |
| RNF-011 | Utilizar textos alternativos adequados nas imagens.                               | Concluído |
| RNF-012 | Manter contraste adequado nos temas claro e escuro.                               | Concluído |
| RNF-013 | Ser compatível com navegadores modernos.                                          | Pendente  |
| RNF-014 | Cobrir os comportamentos críticos da aplicação com testes automatizados.          | Concluído |

## Regras de comportamento

### Paginação

- O carregamento adicional não deve remover os resultados existentes.
- O botão de carregamento não deve iniciar requisições simultâneas.
- Uma página com erro deve poder ser solicitada novamente.
- O contador representa os Pokémon carregados pela paginação.
- Resultados obtidos por pesquisa remota não alteram o contador ou o próximo offset.

### Pesquisa

- A filtragem durante a digitação utiliza somente os Pokémon carregados.
- A consulta remota ocorre apenas após a confirmação da pesquisa.
- Uma correspondência exata local evita uma nova requisição.
- Um resultado remoto permanece separado da listagem paginada.
- `404` representa Pokémon inexistente.
- Falhas de rede ou servidor representam erro técnico.

### Detalhes

- Os dados da espécie são consultados por meio de `species.url`.
- A descrição deve ser normalizada antes de chegar ao componente.
- Uma falha técnica na consulta da espécie não deve interromper a exibição dos demais detalhes.
- Quando a consulta da espécie falhar, a descrição deve ser tratada como indisponível.
- A ausência de uma descrição válida não interrompe a página.
- Os sprites utilizam a resposta principal de `/pokemon/{id}` e não geram novas requisições.
- A resposta da espécie fornece a URL da cadeia por meio de `evolution_chain.url`.
- A cadeia deve ser carregada sem realizar uma requisição individual para cada integrante.
- A quantidade de integrantes da cadeia não altera a quantidade de requisições JSON.
- Cadeias lineares e ramificadas devem ser representadas por uma estrutura recursiva.
- Uma falha exclusiva da cadeia de evolução não deve remover a descrição já carregada.
- Uma falha na espécie torna descrição e cadeia indisponíveis, mas preserva os dados principais.
- Os integrantes da cadeia devem permitir navegação para suas respectivas páginas de detalhes.
- O Pokémon atualmente aberto deve permanecer identificado e não deve funcionar como link para si mesmo.
- Imagens ausentes ou com falha de carregamento devem apresentar fallback sem alterar as dimensões dos cards.
- A visualização inicial da cadeia deve apresentar somente o resumo dos integrantes.
- Os requisitos de evolução devem permanecer dentro do card do Pokémon resultante.
- Em dispositivos com mouse, os requisitos devem substituir o resumo durante o hover.
- Ao receber foco pelo teclado, o card deve apresentar os mesmos requisitos exibidos no hover.
- Em dispositivos sem hover, resumo e requisitos devem permanecer disponíveis no próprio card.
- O card inteiro dos integrantes que não representam o Pokémon atual deve funcionar como link para os detalhes.
- A imagem do integrante deve ser ocultada durante o hover ou foco para ampliar o espaço dos requisitos.
- Todos os cards de uma mesma cadeia devem utilizar dimensões e alinhamentos consistentes.
- A organização por estágios deve preservar o agrupamento de cada evolução por sua espécie anterior.
- Cadeias ramificadas que continuam em estágios posteriores devem preservar a relação visual entre pais e descendentes.
- Quando a cadeia possuir somente o próprio Pokémon, o card isolado não deve ser exibido.
- Pokémon sem evolução conhecida devem apresentar somente uma mensagem informativa.
- O agrupamento por espécie anterior deve participar efetivamente da estrutura renderizada, sem achatar os integrantes do estágio.
- Grupos de ramificações encerradas devem permanecer representados enquanto outras ramificações continuarem evoluindo.
- Em dispositivos sem hover, os cards devem adaptar sua altura ao conteúdo e não podem ocultar condições de evolução.
- Cards com requisitos extensos devem manter todas as condições acessíveis.
- O foco do card-base não deve ocultar seu resumo quando não existirem requisitos associados.
- Os requisitos devem ser associados programaticamente ao link ou ao card atual.
- URLs de recursos vazias ou formadas apenas por espaços não devem gerar requisições.
- Uma URL de espécie ausente deve preservar os dados principais e tornar descrição e cadeia indisponíveis.
- Uma URL de cadeia ausente deve preservar a descrição e tornar somente a cadeia indisponível.
- As variações devem ser obtidas por meio de `pokemon-species.varieties`.
- As formas devem ser obtidas por meio de `pokemon.forms`.
- Variações e formas não devem ser inferidas por sufixos existentes nos nomes.
- A variação padrão deve ser identificada pelo campo oficial `is_default`.
- A abertura inicial dos detalhes não deve realizar requisições individuais para todas as formas.
- Uma forma somente deve ser carregada após seleção explícita do usuário.
- A seleção de uma forma deve utilizar a query canônica `?form={formId}`.
- O parâmetro `form` deve aceitar somente um inteiro positivo, seguro e sem zeros à esquerda.
- Parâmetros repetidos, vazios ou sintaticamente inválidos não devem gerar requisições.
- Um ID de forma que não exista em `pokemon.forms` deve ser tratado como indisponível sem iniciar uma requisição.
- A resposta de uma forma deve pertencer ao Pokémon atualmente aberto.
- O carregamento, erro e retry da forma devem permanecer locais e não remover os detalhes principais.
- A troca de Pokémon, forma ou tentativa deve cancelar a requisição anterior.
- Respostas antigas não devem substituir a forma atualmente selecionada.
- Links de variações devem remover qualquer query de forma anterior.
- A navegação entre dados principais, formas e variações deve utilizar links reais.
- A variação atual deve utilizar `aria-current="page"`.
- A forma atual e os dados principais devem utilizar `aria-current="true"`.
- Queries inválidas ou formas indisponíveis devem preservar a URL e oferecer um caminho para retornar aos dados principais.

---

### Dados indisponíveis

- URLs vazias ou formadas apenas por espaços devem ser tratadas como ausentes.
- Dados opcionais não devem gerar imagens quebradas ou erros de renderização.
- A interface deve apresentar uma mensagem adequada quando um conteúdo não estiver disponível.

## Restrições da versão

A versão `v0.1`:

- não exige autenticação;
- não armazena dados do usuário;
- não possui backend próprio;
- não utiliza banco de dados;
- não permite cadastrar uma coleção pessoal;
- utiliza a PokéAPI diretamente no frontend;
- oferece somente informações públicas e de leitura.

## Fora do escopo

As seguintes funcionalidades não fazem parte da versão atual:

- contas de usuário;
- coleção pessoal;
- favoritos;
- IV, CP e nível;
- dados individuais de Pokémon capturados;
- rankings de PvP;
- análises de PvE;
- recomendações para raids;
- montagem de times;
- simulador de batalhas;
- eventos e notícias;
- funcionalidades comunitárias.

Essas capacidades serão tratadas em versões futuras.

## Critério de conclusão

A versão `v0.1` será considerada concluída quando:

- todos os requisitos marcados como pendentes forem implementados ou formalmente movidos para uma versão futura;
- o fluxo completo da Pokédex estiver validado;
- não existirem erros bloqueadores;
- as validações técnicas forem aprovadas;
- a documentação representar o comportamento final da versão.
