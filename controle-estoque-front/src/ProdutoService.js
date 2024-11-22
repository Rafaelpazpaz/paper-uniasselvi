// C:\Users\rafae\OneDrive\Área de Trabalho\CURSO\Paper Uniasselvi\Novo projeto paper\controle-estoque-front\src\ProdutoService.js

import axios from 'axios';

class ProdutoService {
  // Função para obter produtos
  static async obterProdutos() {
    try {
      const response = await axios.get('http://localhost:3050/produtos');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      throw error;
    }
  }

  // Função para adicionar um novo produto
  static async adicionarProduto(novoProduto) {
    try {
      const response = await axios.post('http://localhost:3050/produtos', novoProduto);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error;
    }
  }

  // Função para remover um produto por ID
  static async removerProduto(id) {
    try {
      await axios.delete(`http://localhost:3050/produtos/${id}`);
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      throw error;
    }
  }

  // Função para reduzir a quantidade de um produto por ID
  static async reduzirProduto(id) {
    try {
      const response = await axios.patch(`http://localhost:3050/produtos/${id}/reduzir`);
      return response.data;
    } catch (error) {
      console.error('Erro ao reduzir produto:', error);
      throw error;
    }
  }
}

export default ProdutoService;
