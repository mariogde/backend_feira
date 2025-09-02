// src/models/categoriaModel.js<==

// Importa a instân. do Prisma Client que já foi criada e exportada
// é a porta de entrada para as interações com o banco de dados. 
const prisma = require('../prisma');

// --- Fun. Acesso a Dados (CRUD) para Categoria ---
// 1. Listar todas as categorias
// Retorna um de objetos, onde cada objeto é uma categoria.
async function getAllCategorias() {
  return prisma.categoria.findMany({
    // Ordena as categorias por nome em ordem alfabética.
    orderBy: {
      nome: 'asc'
    }
  });
}

// 2. Busca categoria por ID
// Se não for encontrada, retorna uma única categoria ou 'null'.
async function getCategoriaById(id) {
  return prisma.categoria.findUnique({
    where: { id: parseInt(id) }, // Garante que o ID é um número inteiro.
  });
}

// 3. Cria nova categoria
// Recebe um objeto com os dados da nova categoria e a insere no DB.
async function addCategoria(categoriaData) {
  return prisma.categoria.create({
    data: {
      nome: categoriaData.nome,
    },
  });
}

// 4. Atualiza  categoria existente
// Recebe o ID da categoria a ser atualizada e os dados novos.
async function updateCategoria(id, categoriaData) {
  return prisma.categoria.update({
    where: { id: parseInt(id) },
    data: {
      nome: categoriaData.nome,
    },
  });
}

// 5. Deletar uma categoria
// Recebe o ID da categoria que vai ser deletada.
async function deleteCategoria(id) {
  return prisma.categoria.delete({
    where: { id: parseInt(id) },
  });
}

// Exporta todas as funções para que possam ser importadas pelos controllers.
module.exports = {
  getAllCategorias,
  getCategoriaById,
  addCategoria,
  updateCategoria,
  deleteCategoria,
};
