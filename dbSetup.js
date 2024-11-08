// Caminho do arquivo: C:\Users\rafae\OneDrive\Área de Trabalho\CURSO\DEVCLUB\Desafio do Felipão\Novo projeto paper\dbSetup.js
const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database('./estoque.db', (err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
      } else {
        console.log('Conectado ao banco de dados.');
      }
    });
  }

  criarTabelas() {
    this.db.serialize(() => {
      // Criação da tabela Produtos
      this.db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          categoria TEXT,
          descricao TEXT
        )
      `);

      // Criação da tabela Lotes
      this.db.run(`
        CREATE TABLE IF NOT EXISTS lotes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          produto_id INTEGER,
          validade DATE,
          quantidade INTEGER,
          FOREIGN KEY (produto_id) REFERENCES produtos(id)
        )
      `);

      // Criação da tabela Inventário do Consumidor
      this.db.run(`
        CREATE TABLE IF NOT EXISTS inventario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          produto_id INTEGER,
          quantidade INTEGER,
          data_adicao DATE,
          FOREIGN KEY (produto_id) REFERENCES produtos(id)
        )
      `);
    });

    console.log('Tabelas criadas com sucesso!');
  }

  fecharConexao() {
    this.db.close((err) => {
      if (err) {
        console.error('Erro ao fechar o banco de dados:', err);
      } else {
        console.log('Conexão com o banco de dados fechada.');
      }
    });
  }
}

module.exports = Database;

// Inicializar e usar a classe
const db = new Database();
db.criarTabelas();
db.fecharConexao();