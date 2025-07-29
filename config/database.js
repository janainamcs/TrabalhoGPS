const { Sequelize } = require('sequelize');

// Cria uma nova instância do Sequelize com os dados do .env
const banco = new Sequelize(
  process.env.DB_NAME,      // Nome do banco
  process.env.DB_USER,      // Usuário
  process.env.DB_PASSWORD,  // Senha
  {
    host: process.env.DB_HOST, // Host do banco
    dialect: 'mysql'           // Tipo de banco
  }
);

module.exports = banco;
