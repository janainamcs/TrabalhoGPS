const ConquistaUsuario = require('../models/ConquistaUsuario');
const Conquista = require('../models/Conquista');

// Lista conquistas desbloqueadas de um usuário
exports.listarConquistasDoUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const conquistas = await ConquistaUsuario.findAll({
      where: { usuario_id: idUsuario },
      include: [Conquista]
    });
    res.json(conquistas);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar conquistas', detalhes: erro.message });
  }
};
