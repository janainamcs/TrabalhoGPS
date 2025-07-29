const Usuario = require('../models/User');
const ProgressoLicao = require('../models/ProgressoLicao');
const Licao = require('../models/Licao');
const { Sequelize } = require('sequelize');

// Gera ranking global por XP somando progresso concluído
exports.rankingGlobal = async (req, res) => {
  try {
    const ranking = await Usuario.findAll({
      attributes: ['id', 'nome', 'email', 'avatar', [
        Sequelize.literal(`(
          SELECT COALESCE(SUM(Licoes.xp), 0)
          FROM ProgressoLicoes
          JOIN Licoes ON Licoes.id = ProgressoLicoes.licao_id
          WHERE ProgressoLicoes.usuario_id = Usuario.id
            AND ProgressoLicoes.concluido = 1
        )`), 'xpTotal'
      ]],
      order: [[Sequelize.literal('xpTotal'), 'DESC']],
      limit: 10
    });

    res.json(ranking);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao gerar ranking', detalhes: erro.message });
  }
};
