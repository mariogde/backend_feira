//import bcrypt e jsonwebton
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// src/controllers/usuarioController.js<=
const usuarioModel = require('../models/usuarioModel');

/*
  ===================INICIO DA FUNÇÃO AUXILIAR============
  =====================ASSINATURA DO TOKEN================
*/
function gerarToken(usuario){
  return jwt.sign(
    {
      sub:usuario.id,  //subject -> id do usuario
      email: usuario.email 

    },
    process.env.JWT_SECRET, // Chave secreta .env 
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d'} 
     
  );
}



/*
  ===================FIM DA FUNÇÃO AUXILIAR============
*/

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
/*
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
    res.status(500).json({ message: "Erro interno do servidor." })
  }
}*/
async function buscarUsuarioPorId(req, res) {
  try {
    const { id } = req.params;
    const idNum = Number(id);

    if (!id || isNaN(idNum)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    const usuario = await usuarioModel.getUsuarioById(idNum);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}


// ===================Criar novo usuário==============
async function criarUsuario(req, res) {
  try {
    const { nome, email, senha, cpf } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
    }

    //validar nome
    if(nome){
      const resultadoNome = await usuarioModel.validarNome(nome);
      if(!resultadoNome.valido){
        return res.status(400).json({message: resultadoNome.mensagem});
      }
    }

    // Validação de CPF antes de criar o usuário
    if (cpf) {
      const resultadoCpf = await usuarioModel.validarCPF(cpf);
      if (!resultadoCpf.valido) {
        return res.status(400).json({ message: resultadoCpf.mensagem });
      }
    }
    //verificar se CPF já existe
    console.log("DEBUG cpf recebido:", cpf);

    const CpfExistente = await usuarioModel.getUsuarioByCPF(cpf);
    console.log("DEBUG CpfExistente:", CpfExistente);

    if (CpfExistente) {
      return res.status(409).json({ message: "CPF já cadastrado." });
    }

    // Verifica se email já existe
    const usuarioExistente = await usuarioModel.getUsuarioByEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ message: "E-mail já cadastrado." });
    }

    //Gerar hash da senha
    
    const senhaCript = await bcrypt.hash(senha, 10);


    // Tenta criar o usuário
    let novoUsuario;
    try {
      novoUsuario = await usuarioModel.addUsuario({
     ...req.body,              // pega todos os outros campos
     senhaHash: senhaCript// substitui a senha pelo hash

      });
      
    } catch (error) {
      // Captura o erro de CPF duplicado
      if (error.code === 'P2002' && error.meta.target.includes('cpf')) {
        return res.status(409).json({ message: "CPF já cadastrado." });
      }
      throw error; // repassa outros erros
    }

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
    //validar cpf se for enviado
    if (req.body.cpf) {
      const resultado = await usuarioModel.validarCPF(req.body.cpf); 
      if (!resultado.valido) {
      return res.status(400).json({ message: resultado.mensagem });
      }

      const cpfExistente = await usuarioModel.getUsuarioByCPF(req.body.cpf);
      if (cpfExistente && cpfExistente.id !== Number(id)) {
      return res.status(409).json({ message: "CPF já cadastrado." });
  }
    }

    //validar nome 
    if(req.body.nome){
        const resultadoNome = await usuarioModel.validarNome(req.body.nome); // função do model
        if (!resultadoNome.valido) {
          return res.status(400).json({ message: resultadoNome.mensagem });
        }
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
  deletarUsuario,
  login
};


/*
  =============METODO DE LOGIN=============
  ================TIPO POST================
  POST/ usuario/login{email/senha}
  
*/

async function login(req, res) {
  const{email, senha} = req.body; 

  //validar presença dos campos
  if (!email || !senha) {
  return res.status(400).json({ erro: 'Email e senha obrigatórios' });
  }

  //Buscar úsuario no banco pelo email via model
  const usuario = await usuarioModel.getUsuarioByEmail(email);

  //Se não encontrou ou não tem hash se senha -> credenciais invalidas
  if(!usuario || !usuario.senhaHash){
    return res.status(400).json({erro: 'Credenciais inválidas.'});
  }

  //Comparar senha enviada com o hash armazenado
  const ok = await bcrypt.compare(senha,usuario.senhaHash);
  if(!ok){
    return res.status(400).json({erro: 'Credenciais inválidas.'});
  }

  //Gerar o token JWT

  const token = gerarToken(usuario);

  //Responder com token + dados 
  return res.json({
    token, 
    usuario:{
      id: usuario.id,
      email: usuario.email,
    }
  });

}


