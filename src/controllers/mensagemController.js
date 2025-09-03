// src/controllers/mensagemController.js<=
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar nova mensagem
exports.createMensagem = async (req, res) => {
  try {
    const { conteudo, remetenteId, destinatarioId, itemId } = req.body;

    // Verificar se os usuários existem
    const remetente = await prisma.usuario.findUnique({ where: { id: remetenteId } });
    const destinatario = await prisma.usuario.findUnique({ where: { id: destinatarioId } });

    if (!remetente || !destinatario) {
      return res.status(400).json({ error: 'Remetente ou destinatário não encontrado.' });
    }

    // Verificar se o item existe, se informado
    let item = null;
    if (itemId) {
      item = await prisma.item.findUnique({ where: { id: itemId } });
      if (!item) {
        return res.status(400).json({ error: 'Item informado não encontrado.' });
      }
    }

    // Criar a mensagem
    const novaMensagem = await prisma.mensagem.create({
      data: {
        conteudo,
        remetenteId,
        destinatarioId,
        itemId: item ? item.id : null,
      },
    });

    res.status(201).json(novaMensagem);

  } catch (error) {
    console.error('Erro ao criar mensagem:', error);
    res.status(500).json({ error: 'Erro ao criar mensagem.' });
  }
};

// Listar todas as mensagens
exports.listMensagens = async (req, res) => {
  try {
    const mensagens = await prisma.mensagem.findMany({
      include: {
        remetente: true,
        destinatario: true,
        item: true,
      },
      orderBy: { enviadoEm: 'desc' },
    });
    res.status(200).json(mensagens);
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).json({ error: 'Erro ao listar mensagens.' });
  }
};

// Buscar conversas entre dois usuários
exports.getConversas = async (req, res) => {
  try {
    const { remetenteId, destinatarioId } = req.params;

    const mensagens = await prisma.mensagem.findMany({
      where: {
        OR: [
          { remetenteId: Number(remetenteId), destinatarioId: Number(destinatarioId) },
          { remetenteId: Number(destinatarioId), destinatarioId: Number(remetenteId) },
        ],
      },
      include: {
        remetente: true,
        destinatario: true,
        item: true,
      },
      orderBy: { enviadoEm: 'asc' },
    });

    res.status(200).json(mensagens);
  } catch (error) {
    console.error('Erro ao buscar conversas:', error);
    res.status(500).json({ error: 'Erro ao buscar conversas.' });
  }
};

// Deletar mensagem
exports.deleteMensagem = async (req, res) => {
  try {
    const { id } = req.params;

    const mensagem = await prisma.mensagem.findUnique({ where: { id: Number(id) } });
    if (!mensagem) {
      return res.status(404).json({ error: 'Mensagem não encontrada.' });
    }

    await prisma.mensagem.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Mensagem deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error);
    res.status(500).json({ error: 'Erro ao deletar mensagem.' });
  }
};
