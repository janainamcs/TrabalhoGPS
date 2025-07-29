// Carrega variáveis de ambiente
require('dotenv').config();

// Importa o Express
const express = require('express');
const app = express();

// Importa as rotas de autenticação
const rotasAutenticacao = require('./routes/authRoutes');

// Middleware para permitir requisições com corpo em JSON
app.use(express.json());

// Define o prefixo /api para as rotas
app.use('/api', rotasAutenticacao);

// Exporta o app para uso em server.js
module.exports = app;
