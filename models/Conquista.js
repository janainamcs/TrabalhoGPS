const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo de Conquista
const Conquista = sequelize.define('Conquista', {
  nome: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  tipo: DataTypes.ENUM('licoes', 'xp', 'streak'),
  alvo: DataTypes.INTEGER
}, {
  tableName: 'Conquistas',
  timestamps: false
});

module.exports = Conquista;
