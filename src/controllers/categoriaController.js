// src/controllers/categoriaController.js<==

// Importamodel de categoria, contém a lógica de acesso direto ao banco de dados.
const categoriaModel = require('../models/categoriaModel');

// --- Funç. CRUD para Categoria ---
// As funções aqui orquestram a requisição/resposta e chamam as funções do model.
// 1. Lista todas as categorias
// GET /api/categorias
async function listarCategorias(req, res) {
  try {
    const categorias = await categoriaModel.getAllCategorias();
    return res.status(200).json(categorias);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao buscar categorias.' });
  }
}

// 2. Busca categoria por ID<==
// GET /api/categorias/:id
async function buscarCategoriaPorId(req, res) {
  const { id } = req.params;

  try {
    const categoria = await categoriaModel.getCategoriaById(id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    return res.status(200).json(categoria);
  } catch (error) {
    console.error('Erro ao buscar categoria por ID:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao buscar categoria.' });
  }
}

// 3. Cria nova categoria
// POST /api/categorias
async function criarCategoria(req, res) {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'O nome da categoria é obrigatório.' });
  }

  try {
    const novaCategoria = await categoriaModel.addCategoria({ nome });
    return res.status(201).json({ message: 'Categoria criada com sucesso!', categoria: novaCategoria });
  } catch (error) {
    // Código de erro do Prisma para violação de restrição 'unique'<==
    if (error.code === 'P2002' && error.meta?.target?.includes('nome')) {
      return res.status(409).json({ message: 'Esta categoria já existe.' });
    }
    console.error('Erro ao criar categoria:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao criar categoria.' });
  }
}

// 4. Atualiza categoria existente
// PUT /api/categorias/:id
async function atualizarCategoria(req, res) {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'O nome da categoria é obrigatório para atualização.' });
  }

  try {
    const categoriaAtualizada = await categoriaModel.updateCategoria(id, { nome });

    if (!categoriaAtualizada) {
      return res.status(404).json({ message: 'Categoria não encontrada para atualização.' });
    }
    return res.status(200).json({ message: 'Categoria atualizada com sucesso!', categoria: categoriaAtualizada });
  } catch (error) {
    if (error.code === 'P2025') { // Prisma Client error: Record to update not found.
      return res.status(404).json({ message: 'Categoria não encontrada para atualização.' });
    }
    if (error.code === 'P2002' && error.meta?.target?.includes('nome')) {
      return res.status(409).json({ message: 'Este nome de categoria já existe.' });
    }
    console.error('Erro ao atualizar categoria:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao atualizar categoria.' });
  }
}

//  5. Deleta  categoria
// DELETE /api/categorias/:id
async function deletarCategoria(req, res) {
  const { id } = req.params;

  try {
    await categoriaModel.deleteCategoria(id);
    return res.status(204).send(); // 204 No Content para indicar sucesso sem retorno de corpo
  } catch (error) {
    if (error.code === 'P2025') { // Prisma Client error: Record to delete not found.
      return res.status(404).json({ message: 'Categoria não encontrada para exclusão.' });
    }
    // Considerar erros de chave estrangeira (P2003) se houverem itens ligados a esta categoria.
    console.error('Erro ao deletar categoria:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao deletar categoria.' });
  }
}

// Exporta as funções para que possam ser usadas pelas rotas.
module.exports = {
  listarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
};
