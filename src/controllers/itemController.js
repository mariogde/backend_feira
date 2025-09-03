// src/controllers/itemController.js<=
const itemModel = require('../models/itemModel');

// ----------------------------------------
// Listar todos os itens
// ----------------------------------------
async function listarItens(req, res) {
  try {
    const itens = await itemModel.getAllItens();
    res.status(200).json(itens);
  } catch (error) {
    console.error("Erro ao listar itens:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

// ----------------------------------------
// Buscar item por ID
// ----------------------------------------
async function buscarItemPorId(req, res) {
  try {
    const { id } = req.params;
    const item = await itemModel.getItemById(Number(id));

    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado.' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Erro ao buscar item por ID:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

// ----------------------------------------
// Criar novo item
// ----------------------------------------
async function criarItem(req, res) {
  try {
    const { titulo, descricao, endereco, status, doadorId, beneficiarioId, categoriaId } = req.body;

    // Verificações básicas de obrigatoriedade
    if (!titulo || !descricao || !doadorId || !categoriaId) {
      return res.status(400).json({ message: "Título, descrição, doadorId e categoriaId são obrigatórios." });
    }

    const novoItem = await itemModel.addItem(req.body);
    res.status(201).json({
      message: "Item criado com sucesso!",
      item: novoItem,
    });
  } catch (error) {
    console.error("Erro ao criar item:", error);
    res.status(500).json({ message: "Erro ao criar item." });
  }
}

// ----------------------------------------
// Atualizar item
// ----------------------------------------
async function atualizarItem(req, res) {
  try {
    const { id } = req.params;
    const itemExistente = await itemModel.getItemById(Number(id));

    if (!itemExistente) {
      return res.status(404).json({ message: "Item não encontrado para atualização." });
    }

    const itemAtualizado = await itemModel.updateItem(Number(id), req.body);
    res.status(200).json({
      message: "Item atualizado com sucesso!",
      item: itemAtualizado,
    });
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    res.status(500).json({ message: "Erro ao atualizar item." });
  }
}

// ----------------------------------------
// Deletar item
// ----------------------------------------
async function deletarItem(req, res) {
  try {
    const { id } = req.params;
    const itemExistente = await itemModel.getItemById(Number(id));

    if (!itemExistente) {
      return res.status(404).json({ message: "Item não encontrado para exclusão." });
    }

    await itemModel.deleteItem(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    res.status(500).json({ message: "Erro ao deletar item." });
  }
}

module.exports = {
  listarItens,
  buscarItemPorId,
  criarItem,
  atualizarItem,
  deletarItem,
};
