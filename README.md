# Sistema Feira Solidária

### Feira Solidária 

Este repositório contém a estrutura inicial de back-end para um sistema de doações do projeto "Feira solidária", e está sendo desenvolvido como parte das disciplinas do curso de Desenvolvedor Fullstack da UECE/Atlântico Avanti. O objetivo principal é criar uma base de dados robusta e bem estruturada, que sirva como alicerce para a gestão de doações, itens disponíveis e a interação entre doadores e beneficiários.

### Ferramentas que usamos

* **Node.js**: Ambiente de execução JavaScript.
* **Prisma**: ORM (Object-Relational Mapper) para modelagem de dados e gerenciamento do banco de dados.
* **PostgreSQL**: Banco de dados relacional para armazenamento das informações.

### Estrutura do Projeto

O projeto segue uma estrutura de backend organizada, com foco na camada de dados.
* A pasta `prisma/` contém o arquivo `schema.prisma` que define o modelo de dados, as relações entre as entidades e os enums.
* A pasta `prisma/migrations/` armazena o histórico de migrações do banco de dados, garantindo que a estrutura do DB esteja sempre alinhada com o `schema.prisma`.

### Estrutura de Pastas

Abaixo, a estrutura de pastas principal do projeto:


.
├── .env                  # Variáveis de ambiente (ex: DATABASE_URL - IGNORADO pelo Git)
├── .gitignore            # Arquivo que lista o que o Git deve ignorar (ex: node_modules, .env)
├── package.json          # Metadados do projeto e lista de dependências
├── package-lock.json     # Garante versões exatas das dependências
├── prisma/               # Contém arquivos de configuração do Prisma
│   ├── migrations/       # Histórico de migrações do banco de dados
│   │   └── 20250815030254_init/ # Exemplo: Sua primeira migração (o nome da pasta varia)
│   │       └── migration.sql # Script SQL da migração
│   └── schema.prisma     # Definição do modelo de dados (tabelas, relações, enums)
└── README.md             # Este arquivo de documentação

*Note: A pasta `node_modules/` existe localmente, mas é ignorada pelo `.gitignore` e não é versionada no Git.*

### Modelo de Dados (`schema.prisma`)

O modelo de dados foi projetado para ser dinâmico e flexível, seguindo o feedback da professora. As principais entidades são:

* `Usuario`: Representa tanto doadores quanto beneficiários, com papéis definidos pelas relações.
* `Categoria`: Para classificar os itens (ex: Alimentos, Roupas).
* `Item`: O objeto central da doação, com status que evolui ao longo do processo.
* `Mensagem`: Para comunicação entre usuários sobre os itens.

### Como Executar o Projeto Localmente

Para rodar este projeto em sua máquina e replicar a estrutura do banco de dados:

1.  **Clone o repositório:**
    `git clone <https://github.com/mariogde/backend_feira.git>`

2.  **Entre na pasta do projeto:**
    `cd nome-do-projeto`

3.  **Instale as dependências:**
    `npm install`

4.  **Configure o Banco de Dados:**
    * Crie um banco de dados relacional (ex: PostgreSQL) com o nome `feirasol`.
    * Crie um arquivo `.env` na raiz do projeto com a sua `DATABASE_URL`.
    * Exemplo: `DATABASE_URL="postgresql://[seu_usuario]:[sua_senha]@localhost:5432/feirasol?schema=public"`

5.  **Rode as Migrações do Prisma:**
    * `npx prisma migrate dev --name init_db`

6.  **Gere o Prisma Client:**
    * `npx prisma generate`
  
### Divisão de tarefas

    **13/08: Modelo de dados (ER + Prisma Schema):**
    *Mário Gomes (Modelagem ER)
    *Lizangelo (Schema Prisma)
    
    **01/09: API inicial com CRUD:**
    *Mário Gomes 
    *Lizangelo

    
    **08/09: Autenticação JWT e validações:**
    *Raimunda Nonata*
    *Nayla Moraes*
    
    **15/09: Integração final backend-frontend com testes completos**
    *Nayla Moraes*
    *Raimunda Nonata*
    

### Autores

* [Lizangelo Vasconcelos](<https://github.com/LizangeloVasconcelos>)
* [Mário Gomes]

---
_Nota: Na estrutura e planejamento do projeto optamos por alguns momentos usar IA para auxiliar, pois tal ferramenta de IA generativa contribui otimização do processo de setup e documentação._
