# GrowTwitter - API e Banco de Dados

Este projeto faz parte da Atividade Final do curso Banco de Dados II da Growdev, com o objetivo de aplicar os conhecimentos adquiridos sobre modelagem de bancos de dados, integração com Prisma e desenvolvimento de APIs RESTful usando Express.

## Sobre o Projeto

O GrowTwitter é uma API que simula uma rede social no estilo do Twitter, permitindo:
- Cadastro de usuários.
- Publicação de tweets pelos usuários.
- Implementação de curtidas (likes) em tweets.
- Autenticação de usuários via username/email e senha.

Este projeto é desenvolvido utilizando:
- **Prisma ORM** para modelagem e manipulação do banco de dados PostgreSQL.
- **Express.js** para criação de uma API REST que suporta as operações CRUD.
- Autenticação de usuários para garantir acesso seguro a certas funcionalidades.

## Funcionalidades Implementadas

- **Usuários**: Cadastro, atualização, busca e remoção de usuários.
- **Tweets**: Publicação de tweets por usuários, incluindo respostas (replies).
- **Likes**: Curtidas em tweets por usuários.
- **Autenticação**: Login de usuários via username/email e senha.

## Requisitos de Execução
- **Node.js** (v14 ou superior)
- **PostgreSQL** como banco de dados
- **Prisma** instalado no projeto

## Como Executar

1. Clone o repositório:
   ```bash
   git clone <link-do-repositorio>
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure a variável de ambiente `DATABASE_URL` para apontar para o seu banco de dados PostgreSQL.
4. Rode as migrações para criar as tabelas necessárias no banco de dados:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto
- **Prisma**: Modelos do banco de dados e migrações.
- **Express.js**: Roteamento e implementação das rotas de CRUD para usuários, tweets e likes.

## Regras de Negócio
- Um usuário pode seguir outro usuário (seguidores).
- Tweets podem ser de dois tipos: tweet comum ou resposta (reply).
- Um usuário pode curtir tweets, mas não pode curtir o mesmo tweet mais de uma vez.

## Contribuições
Sinta-se à vontade para abrir issues e enviar pull requests para melhorar o projeto!

## Licença
Este projeto é propriedade da Growdev e é destinado para fins de aprendizado.

