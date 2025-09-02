const prisma = require('../prisma.js');
const itemController = {
  getAllItems: async (req, res) => {
    try {
      const items = await prisma.item.findMany();
      res.status(200).json(items);
    } catch (error) {
      console.error('Erro ao obter itens:', error);
      res.status(500).json({ error: 'Erro ao obter os itens.' });
    }
  },

  getItemById: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await prisma.item.findUnique({
        where: { id: parseInt(id) },
      });
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado.' });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error('Erro ao obter item por ID:', error);
      res.status(500).json({ error: 'Erro ao obter o item.' });
    }
  },

  createItem: async (req, res) => {
    try {
      const { name, description, price } = req.body;
      if (!name || !price) {
        return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
      }
      const newItem = await prisma.item.create({
        data: {
          name,
          description,
          price: parseFloat(price)
        },
      });
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Erro ao criar item:', error);
      res.status(500).json({ error: 'Erro ao criar o item.' });
    }
  },

  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedItem = await prisma.item.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Item não encontrado.' });
      }
      res.status(500).json({ error: 'Erro ao atualizar o item.' });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.item.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Item deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Item não encontrado.' });
      }
      res.status(500).json({ error: 'Erro ao deletar o item.' });
    }
  }
};

module.exports = itemController;
