// C:\Users\rafae\OneDrive\Área de Trabalho\CURSO\DEVCLUB\Desafio do Felipão\Novo projeto paper\index.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let produtos = [];

app.post('/produtos', (req, res) => {
  const { nome, categoria, descricao, quantidade, validade } = req.body;
  
  // Converte 'quantidade' para número antes de salvar
  const novoProduto = {
    nome,
    categoria,
    descricao,
    quantidade: parseInt(quantidade), // <- conversão para número
    validade
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.listen(3050, () => {
  console.log('Backend rodando na porta 3050');
});

});