const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todas as categorias
async function getAllCategorias() {
  return await prisma.categoria.findMany();
}

// Buscar categoria por ID
async function getCategoriaById(id) {
  return await prisma.categoria.findUnique({
    where: { id: parseInt(id) }
  });
}

// Criar nova categoria
async function addCategoria(novaCategoria) {
  return await prisma.categoria.create({ data: novaCategoria });
}

// Atualizar categoria
async function updateCategoria(id, dados) {
  return await prisma.categoria.update({
    where: { id: parseInt(id) },
    data: dados,
  });
}

// Deletar categoria
async function deleteCategoria(id) {
  return await prisma.categoria.delete({
    where: { id: parseInt(id) }
  });
}

module.exports = {
  getAllCategorias,
  getCategoriaById,
  addCategoria,
  updateCategoria,
  deleteCategoria
};
