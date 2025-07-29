const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/User');

// Controlador para registrar um novo usuário
exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaCriptografada });
    res.status(201).json({ mensagem: 'Usuário criado com sucesso', usuario: novoUsuario });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao registrar usuário' });
  }
};

// Controlador para login de usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};

// Controlador para retornar o perfil do usuário logado
exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.idUsuario, {
      attributes: ['id', 'nome', 'email']
    });
    res.json(usuario);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar perfil' });
  }
};
