# contact_manager
Contact_List_Api
Sistema de Gerenciamento de Clientes e Contatos

Descrição
O Projeto é um sistema de gerenciamento de clientes e contatos, construído utilizando NodeJS e TypeScript. Ele fornece uma API RESTful que permite a criação, edição e exclusão de clientes e seus respectivos contatos. O projeto utiliza o banco de dados PostgreSQL para armazenar os dados e o TypeORM como ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados. As requisições são autenticadas usando tokens gerados através do endpoint /login.

Tecnologias
O projeto foi desenvolvido utilizando as seguintes tecnologias:

NodeJS
Nest
TypeScript
PostgreSQL
Prisma
Instalação e Uso
Requisitos:
NodeJS
Npm ou Yarn
Banco de dados PostgreSQL

1. Clone o projeto em sua máquina e instale as dependências com o seguinte comando:
`yarn install`
`npm install`


2.Crie um arquivo `.env`, copiando o formato do arquivo `.env.example`:

3.Execute as migrações para criar as tabelas no banco de dados:
`npx prisma migrate dev`
`yarn prisma migrate dev`
