// src/routes/itemRoutes.js<==
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// ----------------------------------------
// Rotas p/ CRUD de itens
// ----------------------------------------

// Lista todos os itens
router.get('/', itemController.listarItens);

// Buscar item por ID
router.get('/:id', itemController.buscarItemPorId);

// Cria novo item
router.post('/', itemController.criarItem);

// Atualiza item existente
router.put('/:id', itemController.atualizarItem);

// Deleta item
router.delete('/:id', itemController.deletarItem);

module.exports = router;
