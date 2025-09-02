// src/server.js
// Importa a instância do Express que foi criada e configurada no app.js
const app = require('./app');

// Define a porta do servidor, usando a variável de ambiente ou a porta 3000 por padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor usando a instância importada de 'app.js'
app.listen(PORT, () => {
  console.log(`\nServidor rodando em http://localhost:${PORT}`);
  console.log(`\nPara parar o servidor, pressione CTRL + C`);
});
