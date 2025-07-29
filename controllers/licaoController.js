const Licao = require('../models/Licao');
const ProgressoLicao = require('../models/ProgressoLicao');

// Listar todas as lições (para exibir na trilha)
exports.listarLicoes = async (req, res) => {
  try {
    const licoes = await Licao.findAll({ order: [['ordem', 'ASC']] });
    res.json(licoes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar lições', detalhes: erro.message });
  }
};

// Concluir lição e atualizar progresso
exports.concluirLicao = async (req, res) => {
  try {
    const { idUsuario } = req.body;
    const idLicao = req.params.id;

    await ProgressoLicao.upsert({
      usuario_id: idUsuario,
      licao_id: idLicao,
      concluido: true,
      data_conclusao: new Date()
    });

    res.json({ mensagem: 'Lição marcada como concluída' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao concluir lição', detalhes: erro.message });
  }
};
