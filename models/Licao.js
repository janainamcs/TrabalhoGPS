const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo de Lição
const Licao = sequelize.define('Licao', {
  titulo: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  ordem: DataTypes.INTEGER,
  xp: DataTypes.INTEGER
}, {
  tableName: 'Licoes',
  timestamps: false
});

module.exports = Licao;
