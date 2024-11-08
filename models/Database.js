const sqlite3 = require('sqlite3').verbose();
const Produto = require('./Produto');

class Database {
    constructor() {
        this.db = new sqlite3.Database('./estoque.db', (err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err.message);
            } else {
                console.log('Conectado ao banco de dados SQLite');
            }
        });
    }

    init() {
        this.db.serialize(() => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS produtos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    categoria TEXT,
                    descricao TEXT,
                    quantidade INTEGER,
                    validade TEXT
                )
            `);
        });
    }

    getAllProdutos(callback) {
        const sql = 'SELECT * FROM produtos';
        this.db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            const produtos = rows.map(row => new Produto(row.id, row.nome, row.categoria, row.descricao, row.quantidade, row.validade));
            callback(produtos);
        });
    }

    addProduto(produto, callback) {
        const { nome, categoria, descricao, quantidade, validade } = produto;
        const sql = `INSERT INTO produtos (nome, categoria, descricao, quantidade, validade) VALUES (?, ?, ?, ?, ?)`;
        this.db.run(sql, [nome, categoria, descricao, quantidade, validade], function(err) {
            if (err) {
                console.error('Erro ao adicionar produto:', err.message);
                callback(null, err);
            } else {
                callback({ id: this.lastID, ...produto });
            }
        });
    }

    deleteProduto(id, callback) {
        const sql = `DELETE FROM produtos WHERE id = ?`;
        this.db.run(sql, id, function(err) {
            if (err) {
                console.error('Erro ao deletar produto:', err.message);
                callback(err);
            } else {
                callback(null);
            }
        });
    }
}

module.exports = Database;
