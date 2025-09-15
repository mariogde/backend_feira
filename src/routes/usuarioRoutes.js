const express = require('express');
const router = express.Router();

// Importar o controller de usuário que tem a lógica de negócio (CRUD).
const usuarioController = require('../controllers/usuarioController');

// --- Para Definir Rotas para Usuários ---

// Rota pra listar todos os usuários
// GET /api/usuarios (... /api/usuarios está definido em app.js)
router.get('/', usuarioController.listarUsuarios);

// Rota buscar usuário por ID
// GET /api/usuarios/:id
router.get('/:id', usuarioController.buscarUsuarioPorId);

// Rota criação de novo usuário
// POST /api/usuarios
router.post('/', usuarioController.criarUsuario);

// Rota atualiza um usuário existente por ID
// PUT /api/usuarios/:id
router.put('/:id', usuarioController.atualizarUsuario);

// Rota delete usuário por ID
// DELETE /api/usuarios/:id
router.delete('/:id', usuarioController.deletarUsuario);


//--Rota de login--
router.post('/login',usuarioController.login);

// Exporta o router pra usar no app.js.
module.exports = router;
