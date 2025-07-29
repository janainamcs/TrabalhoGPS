const Questao = require('../models/Questao');
const Alternativa = require('../models/Alternativa');

// Lista todas as questões e alternativas de uma lição
exports.listarQuestoesDaLicao = async (req, res) => {
  try {
    const { idLicao } = req.params;
    const questoes = await Questao.findAll({
      where: { licao_id: idLicao },
      include: [{ model: Alternativa }]
    });
    res.json(questoes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar questões', detalhes: erro.message });
  }
};
