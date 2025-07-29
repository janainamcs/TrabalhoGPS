const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Questao = require('./Questao');

// Modelo de Alternativas
const Alternativa = sequelize.define('Alternativa', {
  texto: DataTypes.TEXT,
  correta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'Alternativas',
  timestamps: false
});

Alternativa.belongsTo(Questao, { foreignKey: 'questao_id' });

module.exports = Alternativa;
