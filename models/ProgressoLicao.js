const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./User');
const Licao = require('./Licao');

// Modelo de ProgressoLicoes
const ProgressoLicao = sequelize.define('ProgressoLicao', {
  concluido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  data_conclusao: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'ProgressoLicoes',
  timestamps: false
});

ProgressoLicao.belongsTo(Usuario, { foreignKey: 'usuario_id' });
ProgressoLicao.belongsTo(Licao, { foreignKey: 'licao_id' });

module.exports = ProgressoLicao;
