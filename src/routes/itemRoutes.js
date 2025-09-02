const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');

// Define as rotas para as operações CRUD (Create, Read, Update, Delete) em itens.

// Rota para obter todos os itens
// Mapeia para a função getAllItems no controlador
router.get('/', itemController.getAllItems);

// Rota para obter um item por ID
// Mapeia para a função getItemById no controlador
router.get('/:id', itemController.getItemById);

// Rota para criar um novo item
// Mapeia para a função createItem no controlador
router.post('/', itemController.createItem);

// Rota para atualizar um item por ID
// Mapeia para a função updateItem no controlador
router.put('/:id', itemController.updateItem);

// Rota para deletar um item por ID
// Mapeia para a função deleteItem no controlador
router.delete('/:id', itemController.deleteItem);

module.exports = router;
