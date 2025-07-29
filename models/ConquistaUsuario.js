const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./User');
const Conquista = require('./Conquista');

// Modelo de ConquistaUsuario
const ConquistaUsuario = sequelize.define('ConquistaUsuario', {}, {
  tableName: 'ConquistasUsuarios',
  timestamps: true,
  createdAt: 'data_desbloqueio',
  updatedAt: false
});

ConquistaUsuario.belongsTo(Usuario, { foreignKey: 'usuario_id' });
ConquistaUsuario.belongsTo(Conquista, { foreignKey: 'conquista_id' });

module.exports = ConquistaUsuario;
