# Minha Pokédex

Aplicação web para consultar Pokémon, explorar informações detalhadas e, futuramente, gerenciar uma coleção pessoal voltada principalmente para jogadores de Pokémon GO.

> O projeto está em desenvolvimento. A versão atual está concentrada na experiência de Pokédex no frontend.

## Funcionalidades atuais

### Listagem

- carregamento progressivo de Pokémon;
- preservação dos resultados já carregados;
- contador de resultados;
- tratamento separado para carregamento inicial e adicional;
- tentativa novamente em falhas de paginação;
- indicação de fim da listagem.

### Pesquisa

- filtro local durante a digitação;
- pesquisa global exata por nome;
- pesquisa global exata por número da Pokédex;
- suporte a formatos como `25`, `025` e `#025`;
- normalização de nomes compostos e símbolos;
- resultado remoto separado da paginação.

A pesquisa parcial considera apenas os Pokémon já carregados. Consultas globais são realizadas somente para nomes ou números exatos.

### Detalhes do Pokémon

- número e nome;
- arte oficial;
- tipos;
- altura e peso;
- habilidades comuns e ocultas;
- traduções de habilidades em português quando disponíveis;
- estatísticas base;
- descrição da Pokédex;
- fallback da descrição para inglês;
- sprite frontal padrão;
- sprite frontal shiny;
- mensagens individuais para dados indisponíveis.

### Interface

- navegação responsiva;
- temas claro e escuro;
- persistência da preferência de tema;
- suporte à preferência do sistema;
- estados de loading, erro, retry e conteúdo vazio;
- cancelamento de requisições com `AbortController`;
- preservação da listagem ao navegar para os detalhes;
- restauração do Pokémon selecionado ao retornar;
- interface validada a partir de 320px.

## Tecnologias atuais

### Frontend

- React;
- TypeScript;
- Vite;
- React Router;
- CSS;
- Fetch API.

### Ferramentas

- npm Workspaces;
- ESLint;
- Prettier;
- Vitest;
- EditorConfig;
- Git;
- GitHub.

## Tecnologias planejadas

As tecnologias abaixo ainda não fazem parte da aplicação em funcionamento:

- Node.js;
- Express;
- Prisma;
- PostgreSQL;
- Docker;
- GitHub Actions.

O backend e o banco de dados serão introduzidos em versões futuras.

## Fonte de dados

O frontend consulta atualmente a [PokéAPI](https://pokeapi.co/).

Os dados recebidos são transformados antes de chegarem aos componentes visuais:

```text
PokéAPI
→ services
→ API types
→ mappers
→ domain models
→ hooks
→ pages and components
```

## Estrutura do projeto

```text
pokedex-manager/
├── frontend/
├── backend/
├── docs/
├── .vscode/
├── .editorconfig
├── .gitignore
├── .prettierignore
├── LICENSE
├── package.json
├── package-lock.json
└── README.md
```

O frontend utiliza uma organização baseada em features:

```text
frontend/src/
├── app/
├── assets/
├── features/
├── pages/
├── shared/
└── styles/
```

## Como executar

### Pré-requisitos

- Node.js;
- npm;
- Git.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/AlissonAlves-Dev/pokedex-manager.git
```

Entre na pasta:

```bash
cd pokedex-manager
```

Instale as dependências:

```bash
npm install
```

Inicie o frontend:

```bash
npm run dev:frontend
```

O Vite exibirá no terminal o endereço local da aplicação.

## Scripts

```bash
npm run dev:frontend
npm run format
npm run lint
npm run build
npm test
npm run test:watch
```

| Script         | Finalidade                                   |
| -------------- | -------------------------------------------- |
| `dev:frontend` | Inicia o frontend em modo de desenvolvimento |
| `format`       | Formata os arquivos com Prettier             |
| `lint`         | Executa as verificações do ESLint            |
| `build`        | Gera a versão de produção                    |
| `test`         | Executa os testes automatizados uma vez      |
| `test:watch`   | Executa os testes em modo de observação      |

## Documentação

A documentação completa está disponível em [`docs/README.md`](docs/README.md).

Principais documentos:

- [Visão do produto](docs/vision.md);
- [Requisitos](docs/requirements.md);
- [Arquitetura](docs/architecture.md);
- [Banco de dados](docs/database.md);
- [Roadmap](docs/roadmap.md);
- [Guia de contribuição](docs/contributing.md);
- [Development Journal](docs/development-journal.md).

## Próximas entregas do MVP

- cadeia de evolução;
- formas e variações;
- refinamentos finais da experiência de Pokédex;
- ampliação da cobertura de testes automatizados;
- preparação para publicação.

O progresso detalhado está registrado no [Roadmap](docs/roadmap.md).

## Licença

Este projeto é distribuído sob a licença MIT.

Consulte o arquivo [LICENSE](LICENSE).
