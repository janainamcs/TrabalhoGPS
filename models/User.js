const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo de Usuário
const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Usuarios',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: false
});

module.exports = Usuario;
