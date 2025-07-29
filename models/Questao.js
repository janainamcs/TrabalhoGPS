const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Licao = require('./Licao');

// Modelo de Questão
const Questao = sequelize.define('Questao', {
  enunciado: DataTypes.TEXT,
  codigo_exemplo: DataTypes.TEXT
}, {
  tableName: 'Questoes',
  timestamps: false
});

Questao.belongsTo(Licao, { foreignKey: 'licao_id' });

module.exports = Questao;
