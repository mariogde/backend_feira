// src/server.js
const app = require('./app'); // importa o app.js<==
const PORT = 3000; // ou process.env.PORT, se usar variáveis de ambiente

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
