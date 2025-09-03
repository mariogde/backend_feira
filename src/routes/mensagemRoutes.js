const express = require('express');
const router = express.Router();
const mensagemController = require('../controllers/mensagemController.js');

// Cria mensagem
router.post('/', mensagemController.createMensagem);

// Lista todas as mensagens
router.get('/', mensagemController.listMensagens);

// Buscar conversas entre dois usuários<==
router.get('/conversa/:remetenteId/:destinatarioId', mensagemController.getConversas);

// Deletar mensagem
router.delete('/:id', mensagemController.deleteMensagem);

module.exports = router;
