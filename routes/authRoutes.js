const express = require('express');
const router = express.Router();
const controladorAutenticacao = require('../controllers/authController');
const verificarToken = require('../middlewares/authMiddleware');

// Rotas de autenticação
router.post('/register', controladorAutenticacao.registrar);
router.post('/login', controladorAutenticacao.login);
router.get('/profile', verificarToken, controladorAutenticacao.perfil);

module.exports = router;
