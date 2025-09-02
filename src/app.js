// src/app.js
const express = require('express');
const cors = require('cors');

// Importa as rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const itemRoutes = require('./routes/itemRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');

// Inicia a aplicação do Express <==
const app = express();

// --- Configuração dos Middlewares --- <==
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// --- Uso das Rotas ---
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/itens', itemRoutes);
app.use('/api/mensagens', mensagemRoutes);

// --- Rotas de Teste e API Base ---
app.get('/', (req, res) => {
  res.status(200).send('API da Feira Solidária funcionando!');
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Bem-vindo à API da Feira Solidária!',
    endpoints: {
      usuarios: '/api/usuarios',
      categorias: '/api/categorias',
      itens: '/api/itens',
      mensagens: '/api/mensagens'
    }
  });
});

// Exporta a instância 'app' para que possa ser usada por 'server.js' ou testes.<==
module.exports = app;
