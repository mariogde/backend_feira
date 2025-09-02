// src/models/usuarioModel.js

// Este array em memória  simula um banco de dados.
// Vai ser substituído por um banco de dados real em um projeto maior.
let usuarios = [
    {
        "id": 4,
        "nome": "Carol Ximenez",
        "email": "carol.oliver@email.com",
        "cpf": "789.470.330-41",
        "telefone": "85988784159",
        "endereco": "Rua das Flores, 900 - Varjota",
        "dataCadastro": new Date("2025-08-31T01:20:42.441Z"),
        "ultimaAtividade": new Date("2025-08-31T01:20:42.441Z")
    },
    {
        "id": 1,
        "nome": "Carla Oliveira",
        "email": "carla.oliveira@email.com",
        "cpf": "111.222.333-44",
        "telefone": "85999887766",
        "endereco": "Rua das Flores, 789 - Varjota",
        "dataCadastro": new Date("2025-08-29T04:14:44.553Z"),
        "ultimaAtividade": new Date("2025-08-29T04:14:44.553Z")
    }
];

let proximoId = 5;

// Fun. pra buscar todos os usuários
async function getAllUsuarios() {
    return usuarios;
}

// ----------------------------------------
// Fun. buscar um usuário por ID
// ----------------------------------------
async function getUsuarioById(id) {
    // --- Usei parseInt para "TRATAR A ID COMO NÚMERO" ---
    // Função .find() usada para encontrar um item no array.
    // O === faz a verificação estrita de valor e tipo,
    // pra garantir que a ID do usuário (um número) seja comparada com o ID passado
    // pelo controller (que agora é um número graças ao parseInt()).
    return usuarios.find(usuario => usuario.id === id);
}

// Fun. buscar usuário por email
async function getUsuarioByEmail(email) {
    return usuarios.find(usuario => usuario.email === email);
}

// Função para adicionar um novo usuário
async function addUsuario(novoUsuario) {
    const usuario = {
        id: proximoId++,
        ...novoUsuario,
        dataCadastro: new Date(),
        ultimaAtividade: new Date()
    };
    usuarios.push(usuario);
    return usuario;
}

// Fun atualizar um usuário
async function updateUsuario(id, dados) {
    const index = usuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...dados, ultimaAtividade: new Date() };
        return usuarios[index];
    }
    return null;
}

// Fun. deletar um usuário
async function deleteUsuario(id) {
    const index = usuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
        usuarios.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    addUsuario,
    updateUsuario,
    deleteUsuario
};
