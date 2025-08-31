// src/app.js

// módulo 'express' para criar o servidor web.<=
const express = require('express');
// Importar o módulo 'dotenv' pra usar nas variáveis de ambiente do arquivo .env.
// A linha do 'dontenv' deve ser uma das primeiras a ser executada pois vai carregar as variáveis.
require('dotenv').config();

// Importado o middleware 'cors' para por causa requisições de diferentes origens (frontend).
const cors = require('cors');

// Para inicializa a aplicação do Express. 'app' vai ser o nosso servidor principal.
const app = express();

// --- Esta é a Configuração CORS ---
//Aqui é onde permite que o frontend (ex: rodando em http://localhost:5173) se comunique com este backend.<=
// É uma configuração de segurança importante para evitar bloqueios do navegador.<=
app.use(cors({
  origin: 'http://localhost:5173', // Definir a URL do frontend (ex: local:5173 para Vite/React)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP que são permitidos para o CRUD
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos para autenticação/tipo de dados
}));

// Middleware para o Express entender requisições com corpo em JSON.
app.use(express.json());

// --- Importação das Rotas Específicas ---
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const itemRoutes = require('./routes/itemRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');


// --- Rotas de Teste e API Base ---
// Rota GET na URL raiz (http://localhost:3000/). Vai verificar se o servidor está online.
app.get('/', (req, res) => {
  res.status(200).send('API da Feira Solidária funcionando! Acesse /api para explorar os endpoints.');
});

// Rota de API Base (http://localhost:3000/api). Visão geral dos endpoints.
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Bem-vindo à API da Feira Solidária!',
    endpoints: {
      usuarios: '/api/usuarios',    // CRUD para o Modelo 'Usuario'
      categorias: '/api/categorias',  // CRUD para o Modelo 'Categoria'
      itens: '/api/itens',          // CRUD para o Modelo 'Item'
      mensagens: '/api/mensagens'   // CRUD para o Modelo 'Mensagem'
    }
  });
});

// --- Uso das Rotas Específicas (caminho base da API) ---
// Todas as rotas dentro de cada arquivo serão prefixadas com seu respectivo caminho base.
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/itens', itemRoutes);
app.use('/api/mensagens', mensagemRoutes);


// --- Início do Servidor ---
// Define a porta em que o servidor irá rodar.
// Tenta usar a variável de ambiente PORT (se definida no .env).
// Se não encontrar (ou .env não tiver PORT), port 3000 como padrão.
const PORT = process.env.PORT || 3000;

// Inicia o servidor Express e o faz "escutar" requisições na porta especificada.
app.listen(PORT, () => {
  console.log(`Servidor da Feira Solidária rodando em http://localhost:${PORT}`);
  console.log('Pressione CTRL+C para parar o servidor.');
});

// Exporta a instância 'app' para que possa ser usada em testes ou outros módulos, se preciso.
// A instância do Prisma Client já é exportada de src/prisma.js e será importada pelos controllers.
module.exports = app;
