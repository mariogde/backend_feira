// src/controllers/usuarioController.js<=
const usuarioModel = require('../models/usuarioModel');

// Listar todos os usuários
async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

// Buscar um usuário por ID
async function buscarUsuarioPorId(req, res) {
  try {
    const { id } = req.params;
    const usuario = await usuarioModel.getUsuarioById(Number(id));

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

// Criar novo usuário
async function criarUsuario(req, res) {
  try {
    const { nome, email, senhaHash } = req.body;

    if (!nome || !email || !senhaHash) {
      return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
    }

    const usuarioExistente = await usuarioModel.getUsuarioByEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ message: "E-mail já cadastrado." });
    }

    const novoUsuario = await usuarioModel.addUsuario(req.body);
    res.status(201).json({
      message: "Usuário criado com sucesso!",
      usuario: novoUsuario
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

// Atualizar usuário
async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const usuarioExistente = await usuarioModel.getUsuarioById(Number(id));

    if (!usuarioExistente) {
      return res.status(404).json({ message: "Usuário não encontrado para atualização." });
    }

    const usuarioAtualizado = await usuarioModel.updateUsuario(Number(id), req.body);
    res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      usuario: usuarioAtualizado
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

// Deletar usuário
async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;
    const usuarioExistente = await usuarioModel.getUsuarioById(Number(id));

    if (!usuarioExistente) {
      return res.status(404).json({ message: "Usuário não encontrado para exclusão." });
    }

    await usuarioModel.deleteUsuario(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};
