# calendario-backend

📅 **Calendário Backend**

Este é o backend de um sistema de gerenciamento de eventos, desenvolvido com Node.js, Express, TypeORM e MySQL.

## 📌 Funcionalidades

- Cadastro e autenticação de usuários (JWT)
- CRUD de eventos
- Convites para eventos
- Aceitar ou recusar convites
- Listagem de eventos (próprios e convidados)

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **TypeORM** - ORM para banco de dados SQL
- **MySQL** - Banco de dados relacional
- **JSON Web Token (JWT)** - Autenticação segura
- **Dotenv** - Gerenciamento de variáveis de ambiente
- **Cors** - Permite requisições entre diferentes domínios

## 📂 Estrutura do Projeto

📁 calendario-backend  
│-- 📂 src  
│   │-- 📂 controllers  
│   │-- 📂 entities  
│   │-- 📂 errors  
│   │-- 📂 interfaces  
│   │-- 📂 middlewares  
│   │-- 📂 migrations   
│   │-- 📂 config  
│   │-- 📂 repositories  
│   │-- 📂 routes  
│   │-- 📂 services  
│   └── ormconfig.ts  
│   └── server.ts  
│-- 📄 .env  
│-- 📄 package-lock.json  
│-- 📄 package.json  
│-- README.md  
└── 📄 tsconfig.json  

## 🎯 Pré-requisitos
Antes de rodar o projeto, certifique-se de ter instalado:

Node.js  
MySQL  
Postman (opcional, para testar as rotas)

⚙️ Configuração  
1️⃣ Clone o repositório:  
>git clone https://github.com/seu-usuario/seu-repositorio.git  
>cd calendario-backend

2️⃣ Instale as dependências:

>npm install

3️⃣ Configure o banco de dados

Crie um banco de dados no MySQL e configure o arquivo .env:

>DATABASE_HOST=localhost  
>DATABASE_USER=root  
>DATABASE_PASSWORD=sua_senha  
>DATABASE_NAME=calendario  
>JWT_SECRET=sua_chave_secreta

## 🏃 Rodando a aplicação

🔹 Rodar as migrações do banco:

>npm run typeorm migration:run

🔹 Iniciar o servidor:

> npm run dev


## 🔥 Endpoints Principais
### 🔑 Autenticação
|  Método |  Rota	|  Descrição  |  
| ------- | ------- |  ---------- | 
| POST	| /users    | Criação de usuário | 
| POST	| /session  | Login e geração de token |

Criação de usuário (POST): /users  
>{  
>&nbsp;&nbsp;&nbsp;"name": "fred",  
>&nbsp;&nbsp;&nbsp;"email": "fred@email.com",  
>&nbsp;&nbsp;&nbsp;"password": "123123"  
>}

Resposta 201:
>{  
>&nbsp;&nbsp;&nbsp;"name": "fred",  
>&nbsp;&nbsp;&nbsp;"email": "fred@email.com",  
>&nbsp;&nbsp;&nbsp;"password": "$2b10fUepE9Wnj.oDUTM8OpvmhOBE/FF9bDSQyy2ADPocrVD.vJLKlha3y"  
>}


Login e geração de token (POST): /session
>{   
>&nbsp;&nbsp;&nbsp;"email": "fred@email.com",  
>&nbsp;&nbsp;&nbsp;"password": "123123"  
>}


Resposta 201:
>{  
>&nbsp;&nbsp;&nbsp;"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxMTAxMzY3LCJleHAiOjE3NDExMDQ5Njd9.j-F77EU3hxWpmDnllPmtfq2F2BsPS-_QyBUXlVKmv7w"  
>}





### 📆 Eventos

|  Método |  Rota	      |  Descrição         |  
| ------- | -------       |  ----------        | 
| GET	  | /eventos/meus | Lista todos os eventos do usuário | 
| POST	  | /evento       | Criação de um novo evento |
| GET	  | /evento/:id   | listagem do evento com o id do parâmetro |
| GET	  | /eventos/convites   | listagem dos convidados para o evento |
| DELETE  | /evento/:id  | exclusão do evento com id do parâmetro |
| PUT	  | /evento/:id  | Atualização do evento com id do parâmetro (dados no body) |
| PATCH	  | /invite/:user_email/:evento_id  | convida o usuário do email passado no parâmetro para o evento de id também do parâmetro |
| PATCH	  | /invitedeny/:evento_id  | remove o usuário logado da lista de convidados do evento com id passado no parâmetro |
| PATCH  | /cancelinvite/:evento_id/:guest_id  | cancela o convite do usuário com id = guest_id para o evento com id = evento_id |



## 🛠 Possíveis Melhorias

📌 Implementação de testes automatizados

📩 Notificações por e-mail para convites

📊 Dashboard de estatísticas sobre eventos


## 📌 Contato
📧 Rafael Santos- rfhsantos@hotmail.com

[🔗 GitHub](https://github.com/rafaelfhsantos)

