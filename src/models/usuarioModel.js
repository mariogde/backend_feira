// src/models/usuarioModel.js<==
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ----------------------------------------
// Listar todos os usuários
// ----------------------------------------
async function getAllUsuarios() {
  return await prisma.usuario.findMany();
}

// ----------------------------------------
// Buscar usuário por ID
// ----------------------------------------
async function getUsuarioById(id) {
  return await prisma.usuario.findUnique({
    where: { id: Number(id) },
  });
}

// ----------------------------------------
// Buscar usuário pelo email
// ----------------------------------------
async function getUsuarioByEmail(email) {
  return await prisma.usuario.findUnique({
    where: { email },
  });
}

// ----------------------------------------
// Criar novo usuário
// ----------------------------------------
async function addUsuario(dados) {
  const { nome, email, senhaHash, cpf, telefone, endereco } = dados;
  return await prisma.usuario.create({
    data: {
      nome,
      email,
      senhaHash,
      cpf: cpf || null,
      telefone: telefone || null,
      endereco: endereco || null,
      // dataCadastro e ultimaAtividade são gerenciados automaticamente pelo Prisma
    },
  });
}

// ----------------------------------------
// Atualizar usuário
// ----------------------------------------
async function updateUsuario(id, dados) {
  return await prisma.usuario.update({
    where: { id: Number(id) },
    data: {
      ...dados,
      ultimaAtividade: new Date(), // atua... a última atividade
    },
  });
}

// ------------------------------------
// Deletar usuário
// ----------------------------------------
async function deleteUsuario(id) {
  return await prisma.usuario.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  getUsuarioByEmail,
  addUsuario,
  updateUsuario,
  deleteUsuario,
};
