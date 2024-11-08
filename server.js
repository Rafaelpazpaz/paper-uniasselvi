const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3050; // Porta onde o servidor vai rodar

// Permitir CORS
app.use(cors());
app.use(express.json());

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database('./estoque.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Rota Raiz (Root) para teste
app.get('/', (req, res) => {
  res.send('API de Controle de Estoque está funcionando');
});

// Rota GET para listar todos os produtos
app.get('/produtos', (req, res) => {
  const sql = 'SELECT * FROM produtos';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota POST para adicionar um novo produto
app.post('/produtos', (req, res) => {
  const { nome, categoria, descricao, quantidade, validade } = req.body;
  const sql = `INSERT INTO produtos (nome, categoria, descricao) VALUES (?, ?, ?)`;
  const params = [nome, categoria, descricao];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      nome,
      categoria,
      descricao,
      quantidade,
      validade
    });
  });
});

// Rota DELETE para remover um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produtos WHERE id = ?';
  db.run(sql, id, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(204).send();
  });
});

// Configurando o servidor para escutar na porta 3050
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
