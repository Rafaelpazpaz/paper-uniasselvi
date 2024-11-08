import axios from 'axios';

class ProdutoService {
  static async obterProdutos() {
    try {
      const response = await axios.get('http://localhost:3050/produtos');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      throw error;
    }
  }

  static async adicionarProduto(novoProduto) {
    try {
      const response = await axios.post('http://localhost:3050/produtos', novoProduto);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error;
    }
  }

  static async removerProduto(id) {
    try {
      await axios.delete(`http://localhost:3050/produtos/${id}`);
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      throw error;
    }
  }

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