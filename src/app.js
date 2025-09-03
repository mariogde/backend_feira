// src/app.js<=
const express = require('express');
const cors = require('cors');

// Importa as rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const itemRoutes = require('./routes/itemRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');

// Cria a aplicação Express
const app = express();

// --- Middlewares Globais ---
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // ajuste se necessário
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// --- Rotas de Base ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem-vindo à API da Feira Solidária!' });
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

// --- Rotas da Aplicação ---
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/itens', itemRoutes);
app.use('/api/mensagens', mensagemRoutes);

// --- Exporta a aplicação para server.js ---
module.exports = app;
