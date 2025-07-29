const bcrypt = require('bcryptjs');
const Usuario = require('../models/User');

// Controlador de cadastro de usuário
exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaCriptografada });

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhes: erro.message });
  }
};

// Controlador de login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida' });
    }

    res.json({ mensagem: 'Login bem-sucedido', usuario });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao fazer login', detalhes: erro.message });
  }
};
