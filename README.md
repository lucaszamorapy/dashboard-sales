# Dependências principais

npm install express sequelize pg pg-hstore

# Dependências de desenvolvimento (para usar TypeScript)

npm install typescript ts-node @types/node @types/express @types/sequelize --save-dev

# Execute o comando para criar uma nova migration no Sequelize

npx sequelize-cli migration:generate --name create-tabela-exemplo

# Execute o comando para aplicar as migrações

npx sequelize-cli db:migrate
