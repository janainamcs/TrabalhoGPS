const jwt = require('jsonwebtoken');

// Middleware para proteger rotas com autenticação JWT
module.exports = (req, res, next) => {
  const cabecalho = req.headers.authorization;
  if (!cabecalho) return res.status(401).json({ erro: 'Token não fornecido' });

  const token = cabecalho.split(' ')[1];
  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.idUsuario = decodificado.id;
    next(); // Continua para a próxima função
  } catch {
    res.status(401).json({ erro: 'Token inválido' });
  }
};
