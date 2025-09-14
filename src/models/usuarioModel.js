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

//validar CPF

const validarCPF = async (cpf) => {
  if (!cpf) {
    return { valido: true, mensagem: 'CPF não informado (opcional)' };
  }

  const cpfLimpo = cpf.replace(/\D/g, '');

  if (cpfLimpo.length !== 11) {
    return { valido: false, mensagem: 'CPF deve ter 11 dígitos' };
  }

  if (/^(\d)\1+$/.test(cpfLimpo)) {
    return { valido: false, mensagem: 'CPF inválido' };
  }

  
  // Verificar se já existe no banco
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { cpf: cpfLimpo },
  });

  if (usuarioExistente) {
    return { valido: false, mensagem: 'CPF já está em uso' };
  }

  return { valido: true, mensagem: 'CPF válido e disponível' };
};

//----------------------------------------------
//Validar Nome
//----------------------------------------------

async function validarNome(nome) {
  if(nome.length < 3){
    return {valido:false,mensagem:"Nome muito curto. Mínimo 3 caracteres"};
  }

  if(nome.length > 50){
    return {valido:false,mensagem:"Nome muito Longo. Máximo 50 caractere "};
  }

  return {valido:true,mensagem:"Nome válido"};
  
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
  validarCPF,
  validarNome,
};
