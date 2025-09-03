// src/models/mensagemModel.js<=
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todas as mensagens
async function getAllMensagens() {
  return await prisma.mensagem.findMany({
    include: { remetente: true, destinatario: true, item: true }
  });
}

// Buscar conversas entre dois usuários
async function getConversas(remetenteId, destinatarioId) {
  return await prisma.mensagem.findMany({
    where: {
      OR: [
        { remetenteId, destinatarioId },
        { remetenteId: destinatarioId, destinatarioId: remetenteId }
      ]
    },
    orderBy: { enviadoEm: 'asc' },
    include: { remetente: true, destinatario: true, item: true }
  });
}

// Criar nova mensagem
async function addMensagem(novaMensagem) {
  return await prisma.mensagem.create({ data: novaMensagem });
}

// Deletar mensagem
async function deleteMensagem(id) {
  return await prisma.mensagem.delete({ where: { id } });
}

module.exports = {
  getAllMensagens,
  getConversas,
  addMensagem,
  deleteMensagem
};
