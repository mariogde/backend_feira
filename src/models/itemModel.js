// src/models/itemModel.js<=
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ------------------------
// Listar todos os itens
// --------------------------------
async function getAllItens() {
  return await prisma.item.findMany({
    include: {
      doador: true,
      beneficiario: true,
      categoria: true,
      mensagens: true,
    },
  });
}

// ------------
// Buscar item por ID
// --------------------------------------
async function getItemById(id) {
  return await prisma.item.findUnique({
    where: { id: Number(id) },
    include: {
      doador: true,
      beneficiario: true,
      categoria: true,
      mensagens: true,
    },
  });
}

// --------------
// Adicionar novo item
// -------------------------------------
async function addItem(dados) {
  const {
    titulo,
    descricao,
    endereco,
    status,
    doadorId,
    beneficiarioId,
    categoriaId,
  } = dados;

  return await prisma.item.create({
    data: {
      titulo,
      descricao,
      endereco: endereco || null,
      status: status || 'DISPONIVEL',
      doador: { connect: { id: Number(doadorId) } },
      beneficiario: beneficiarioId
        ? { connect: { id: Number(beneficiarioId) } }
        : undefined,
      categoria: { connect: { id: Number(categoriaId) } },
    },
    include: {
      doador: true,
      beneficiario: true,
      categoria: true,
      mensagens: true,
    },
  });
}

// --------------------------
// Atualizar item
// -------------------------------------
async function updateItem(id, dados) {
  const {
    titulo,
    descricao,
    endereco,
    status,
    doadorId,
    beneficiarioId,
    categoriaId,
  } = dados;

  return await prisma.item.update({
    where: { id: Number(id) },
    data: {
      titulo,
      descricao,
      endereco,
      status,
      doador: doadorId ? { connect: { id: Number(doadorId) } } : undefined,
      beneficiario: beneficiarioId
        ? { connect: { id: Number(beneficiarioId) } }
        : undefined,
      categoria: categoriaId ? { connect: { id: Number(categoriaId) } } : undefined,
      atualizadoEm: new Date(),
    },
    include: {
      doador: true,
      beneficiario: true,
      categoria: true,
      mensagens: true,
    },
  });
}

// Deletar item

async function deleteItem(id) {
  return await prisma.item.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  getAllItens,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
