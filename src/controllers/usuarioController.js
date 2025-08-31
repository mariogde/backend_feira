// src/controllers/usuarioController.js

const usuarioModel = require('../models/usuarioModel');

// ----------------------------------------
// Função para listar todos os usuários
// ----------------------------------------
async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuarioModel.getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}

// ----------------------------------------
// Função para buscar um usuário por ID
// ----------------------------------------
async function buscarUsuarioPorId(req, res) {
    try {
        const { id } = req.params;
        
        // --- CORREÇÃO IMPORTANTE: CONVERTE A ID PARA NÚMERO ---
        const usuario = await usuarioModel.getUsuarioById(parseInt(id));

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}

// ----------------------------------------
// Função para criar um novo usuário
// ----------------------------------------
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
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                dataCadastro: novoUsuario.dataCadastro
            }
        });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}

// ----------------------------------------
// Função para atualizar um usuário
// ----------------------------------------
async function atualizarUsuario(req, res) {
    try {
        const { id } = req.params;
        
        const usuarioExistente = await usuarioModel.getUsuarioById(parseInt(id)); // CORREÇÃO
        if (!usuarioExistente) {
            return res.status(404).json({ message: "Usuário não encontrado para atualização." });
        }
        
        const usuarioAtualizado = await usuarioModel.updateUsuario(parseInt(id), req.body);
        res.status(200).json({ 
            message: "Usuário atualizado com sucesso!",
            usuario: usuarioAtualizado 
        });

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}

// ----------------------------------------
// Função para deletar um usuário
// ----------------------------------------
async function deletarUsuario(req, res) {
    try {
        const { id } = req.params;
        
        const usuarioExistente = await usuarioModel.getUsuarioById(parseInt(id)); // CORREÇÃO
        if (!usuarioExistente) {
            return res.status(404).json({ message: "Usuário não encontrado para exclusão." });
        }
        
        await usuarioModel.deleteUsuario(parseInt(id));
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
