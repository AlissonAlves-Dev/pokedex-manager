# Documentação da Minha Pokédex

Esta pasta reúne a documentação funcional, técnica e histórica do projeto.

Cada documento possui uma responsabilidade específica para evitar repetição e facilitar a manutenção.

## Documentos

| Documento                                     | Finalidade                                                                                     |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Visão do produto](vision.md)                 | Explica por que o projeto existe, para quem ele é desenvolvido e qual direção pretende seguir. |
| [Requisitos](requirements.md)                 | Define o que a versão atual deve entregar e quais comportamentos são esperados.                |
| [Arquitetura](architecture.md)                | Descreve como o projeto está organizado e como os dados percorrem a aplicação.                 |
| [Banco de dados](database.md)                 | Registra o planejamento da futura camada de persistência.                                      |
| [Roadmap](roadmap.md)                         | Acompanha milestones, Sprints, entregas concluídas e próximos incrementos.                     |
| [Contribuição](contributing.md)               | Define o fluxo de desenvolvimento, Git, validações e documentação.                             |
| [Development Journal](development-journal.md) | Mantém o histórico diário das sessões de desenvolvimento.                                      |

## Estado atual

A aplicação ainda está concentrada no frontend.

O frontend utiliza diretamente a PokéAPI por meio de uma camada de serviços e mappers.

O backend, o banco de dados, a autenticação e a coleção pessoal continuam planejados para versões futuras.

## Regras de manutenção

- A documentação textual deve ser escrita em português brasileiro.
- Código, comandos, nomes de arquivos, branches e identificadores técnicos permanecem em inglês.
- Cada informação deve ficar no documento mais adequado, evitando duplicação.
- O estado atual da aplicação deve ser claramente separado do planejamento futuro.
- Mudanças relevantes de comportamento, arquitetura ou processo devem atualizar a documentação correspondente.
- O Development Journal deve registrar o que aconteceu em cada sessão.
- Entradas antigas do Journal não devem ser reescritas retroativamente.
- O histórico de versões dos documentos é fornecido pelo Git.

## Ordem recomendada de leitura

Para conhecer o projeto:

1. [README principal](../README.md);
2. `vision.md`;
3. `requirements.md`;
4. `roadmap.md`.

Para contribuir tecnicamente:

1. `architecture.md`;
2. `contributing.md`;
3. `database.md`, quando a tarefa envolver persistência.
