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

* Definição da arquitetura inicial do PokéDex Manager.
* Elaboração da documentação de planejamento do projeto.
* Organização da documentação por responsabilidade.
* Revisão e padronização da estrutura dos documentos Markdown.
* Definição do fluxo de trabalho para manter o **Development Journal** atualizado ao final de cada sessão de desenvolvimento.
* Padronização das datas do diário no formato **YYYY/MM/DD**.

### Observações

O foco do dia foi consolidar a base documental e a organização do projeto. A estrutura definida facilitará o desenvolvimento, a manutenção da documentação e o acompanhamento da evolução do PokéDex Manager ao longo do tempo.

---

## 2026/07/13

### Objetivo

Definir a estrutura técnica do PokéDex Manager e estabelecer a base de documentação para o desenvolvimento do projeto.

### Atividades realizadas

* Elaboração da arquitetura inicial do PokéDex Manager.
* Definição da estrutura e responsabilidades dos módulos do sistema.
* Criação do Roadmap do projeto, estabelecendo as versões, funcionalidades e evolução planejada.
* Definição do modelo de banco de dados da versão **0.1**.
* Planejamento do modelo de banco de dados para versões futuras, visando escalabilidade e novas funcionalidades.
* Definição das convenções de nomenclatura (Naming Conventions).
* Definição da estratégia de migração (Migration Strategy).
* Revisão e aprovação da documentação de planejamento.

### Observações

O foco do dia foi estabelecer uma base sólida para o desenvolvimento do PokéDex Manager. Com a arquitetura, o roadmap e a modelagem inicial do banco de dados definidos, o projeto passa a contar com uma documentação consistente que servirá como referência para as próximas etapas de implementação.

---

## 2026/07/16

### Objetivo

Iniciar oficialmente a **Fase 2 – Desenvolvimento**, configurando o ambiente de desenvolvimento e estabelecendo a arquitetura inicial do monorepositório.

### Atividades realizadas

* Início da **Sprint 0 – Configuração do Projeto**.
* Inicialização do arquivo `package.json` na raiz do monorepositório.
* Configuração do projeto utilizando **npm Workspaces**.
* Definição das informações principais do projeto (`name`, `version`, `description`, `author` e `engines`).
* Criação e configuração da licença **MIT**.
* Atualização do `README.md` para incluir as informações da licença.
* Configuração do projeto como pacote privado do npm (`private: true`).
* Definição da estrutura inicial do monorepositório, contendo os diretórios `frontend` e `backend`.
* Documentação da finalidade do `package.json` da raiz dentro da arquitetura de monorepositório.
* Definição do **React** como framework oficial do frontend.
* Definição do **TypeScript** como linguagem oficial do frontend.
* Definição do **ESLint** como linter oficial do projeto.
* Inicialização do frontend utilizando **Vite 8.1.5** com o template **React + TypeScript**.
* Análise da estrutura inicial gerada pelo Vite e documentação da finalidade de seus principais arquivos e diretórios.
* Confirmação da utilização da **Feature-Based Architecture**, conforme definido na documentação de arquitetura.
* Definição da metodologia de adoção de novas tecnologias durante o desenvolvimento:

  * Compreender a tecnologia.
  * Justificar sua adoção.
  * Explicar como ela se integra à arquitetura do projeto.
  * Implementar.
  * Validar o resultado.
* Decisão de remover o diretório temporário `database` do repositório, concentrando futuramente todos os recursos relacionados ao banco de dados dentro do `backend`.

### Observações

O foco do dia foi preparar o ambiente de desenvolvimento e estabelecer os padrões técnicos que servirão de base para as próximas etapas do projeto. Com a configuração inicial do monorepositório concluída e o frontend criado, o PokéDex Manager está pronto para iniciar a implementação de funcionalidades.

---
