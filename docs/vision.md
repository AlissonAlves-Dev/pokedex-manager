# Visão do produto

A Minha Pokédex é uma aplicação criada para centralizar informações sobre Pokémon e, futuramente, ajudar jogadores a organizar e analisar sua coleção pessoal.

O projeto começa como uma Pokédex moderna e evoluirá gradualmente para uma ferramenta voltada principalmente ao universo de Pokémon GO.

## Problema

Jogadores de Pokémon GO costumam utilizar diferentes sites, aplicativos e planilhas para:

- consultar informações sobre Pokémon;
- verificar tipos, atributos e habilidades;
- avaliar Pokémon para batalhas;
- acompanhar sua coleção;
- decidir onde investir recursos;
- organizar times e estratégias.

Essa fragmentação dificulta consultas rápidas e torna o gerenciamento da coleção mais trabalhoso.

## Proposta

A Minha Pokédex pretende reunir essas informações em uma única aplicação, com uma interface simples, responsiva e organizada.

A evolução do produto será incremental:

```text
Pokédex
→ coleção pessoal
→ dados de Pokémon GO
→ análises e recomendações
```

Cada etapa deve entregar valor próprio sem depender da implementação completa das etapas futuras.

## Público inicial

O público inicial é formado por jogadores de Pokémon GO que desejam:

- consultar Pokémon rapidamente;
- entender seus tipos, atributos e habilidades;
- conhecer formas, evoluções e variações;
- acompanhar informações relevantes para sua coleção;
- tomar decisões melhores sobre evolução e investimento.

A Pokédex também pode ser utilizada por pessoas interessadas na franquia Pokémon de forma geral.

## Objetivos do produto

- oferecer uma consulta clara e confiável de Pokémon;
- centralizar informações atualmente espalhadas entre diferentes ferramentas;
- permitir o gerenciamento de uma coleção pessoal;
- adicionar dados específicos de Pokémon GO;
- apoiar decisões relacionadas a PvP, PvE, raids e investimento de recursos;
- evoluir sem comprometer a simplicidade da experiência.

## Objetivos técnicos e de aprendizagem

O projeto também funciona como um produto de portfólio e uma aplicação prática de Engenharia de Software.

Ele deve demonstrar:

- desenvolvimento frontend com React e TypeScript;
- arquitetura organizada por responsabilidades;
- integração com APIs externas;
- desenvolvimento futuro de uma API própria;
- modelagem e persistência de dados;
- autenticação e autorização;
- testes;
- acessibilidade;
- responsividade;
- documentação;
- versionamento e fluxo de desenvolvimento.

As escolhas técnicas devem atender às necessidades reais do produto, evitando complexidade apenas para demonstrar tecnologias.

## Estado atual

A versão atual está concentrada no frontend e na experiência de Pokédex.

Atualmente, o usuário pode:

- navegar por uma lista progressiva de Pokémon;
- pesquisar por nome ou número;
- acessar informações detalhadas;
- visualizar arte oficial, tipos, atributos, habilidades, descrição e sprites;
- utilizar a aplicação em temas claro e escuro;
- navegar em dispositivos móveis e desktop.

O frontend consulta diretamente a PokéAPI.

Ainda não existem:

- backend próprio;
- banco de dados;
- autenticação;
- coleção pessoal;
- dados individuais de Pokémon capturados;
- análises de PvP e PvE.

## Direção futura

A evolução planejada inclui:

1. concluir a experiência da Pokédex;
2. implementar backend e banco de dados;
3. adicionar autenticação;
4. permitir o cadastro da coleção pessoal;
5. integrar informações específicas de Pokémon GO;
6. oferecer análises e recomendações;
7. expandir a aplicação conforme as necessidades dos usuários.

Funcionalidades futuras podem incluir:

- favoritos;
- acompanhamento da Pokédex pessoal;
- IV, CP e nível;
- avaliação de Pokémon;
- recomendações para raids;
- análises de PvP e PvE;
- montagem de times;
- comparação entre Pokémon;
- acompanhamento de eventos.

Essas funcionalidades representam a direção do produto, não compromissos da versão atual.

## Critério de sucesso

A Minha Pokédex será considerada bem-sucedida quando oferecer uma experiência útil e confiável para que o usuário possa:

- encontrar informações rapidamente;
- compreender melhor cada Pokémon;
- registrar sua própria coleção;
- identificar quais Pokémon merecem investimento;
- consultar dados relevantes sem depender de várias ferramentas diferentes.
