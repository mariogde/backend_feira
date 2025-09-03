// src/routes/categoriaRoutes.js<==
const express = require('express');
const router = express.Router();

// Import o controller de categoria, tem a lógica do negócio (""CRUD""").
const categoriaController = require('../controllers/categoriaController');

// ---Aqui Define as Rotas para Categorias ---
// Rota para listar todas as categorias
// GET /api/categorias<=
router.get('/', categoriaController.listarCategorias);

// Rota busca categoria por ID
// GET /api/categorias/:id<==
router.get('/:id', categoriaController.buscarCategoriaPorId);

// Rota cria nova categoria
// POST /api/categorias<==
router.post('/', categoriaController.criarCategoria);

// Rota atualiza categoria existente por ID
// PUT /api/categorias/:id<==
router.put('/:id', categoriaController.atualizarCategoria);

// Rota deleta categoria por ID
// DELETE /api/categorias/:id
router.delete('/:id', categoriaController.deletarCategoria);

// Exporta o router para que ele possa ser usado no app.js.
module.exports = router;
