class Produto {
    constructor(id, nome, categoria, descricao, quantidade, validade) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.validade = validade;
    }
}

module.exports = Produto;
