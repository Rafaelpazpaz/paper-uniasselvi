import React, { useState, useEffect } from 'react';
import ProdutoService from './ProdutoService';
import QuantidadeTotal from './QuantidadeTotal';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [validade, setValidade] = useState('');
  const [itemLista, setItemLista] = useState('');
  const [listaCompras, setListaCompras] = useState([]);

  // Carregar produtos do backend ou do localStorage
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const produtosSalvos = JSON.parse(localStorage.getItem('produtos'));
        const produtosObtidos = produtosSalvos ? produtosSalvos : await ProdutoService.obterProdutos();
        setProdutos(produtosObtidos);
        localStorage.setItem('produtos', JSON.stringify(produtosObtidos));
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    carregarProdutos();
  }, []);

  // Carregar lista de compras do localStorage
  useEffect(() => {
    const listaSalva = JSON.parse(localStorage.getItem('listaCompras'));
    if (listaSalva) setListaCompras(listaSalva);
  }, []);

  // Função para adicionar ou atualizar produto
  const adicionarProduto = async (e) => {
    e.preventDefault();
    const novoProduto = { nome, categoria, descricao, quantidade: parseInt(quantidade), validade };

    // Verifica se existe um produto com o mesmo nome, descrição e validade
    const indexProdutoExistente = produtos.findIndex(
      (produto) => produto.nome === novoProduto.nome && produto.descricao === novoProduto.descricao && produto.validade === novoProduto.validade
    );

    let produtosAtualizados;
    if (indexProdutoExistente !== -1) {
      // Se o produto já existe, atualiza a quantidade
      produtosAtualizados = [...produtos];
      produtosAtualizados[indexProdutoExistente].quantidade += novoProduto.quantidade;
    } else {
      // Se não existe, adiciona um novo produto
      produtosAtualizados = [...produtos, novoProduto];
    }

    try {
      const produtoAdicionado = await ProdutoService.adicionarProduto(novoProduto);
      setProdutos(produtosAtualizados);
      localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));

      // Limpa os campos do formulário
      setNome('');
      setCategoria('');
      setDescricao('');
      setQuantidade(1);
      setValidade('');
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  // Função para remover produto e atualizar localStorage
  const removerProduto = async (produtoParaRemover) => {
    try {
      await ProdutoService.removerProduto(produtoParaRemover.id);
      const produtosAtualizados = produtos.filter(produto => produto.id !== produtoParaRemover.id);
      setProdutos(produtosAtualizados);
      localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    }
  };

  // Adicionar item à lista de compras e atualizar localStorage
  const adicionarItemLista = (e) => {
    e.preventDefault();
    if (itemLista.trim()) {
      const novaLista = [...listaCompras, itemLista];
      setListaCompras(novaLista);
      localStorage.setItem('listaCompras', JSON.stringify(novaLista));
      setItemLista('');
    }
  };

  // Remover item da lista de compras e atualizar localStorage
  const removerItemLista = (itemParaRemover) => {
    const novaLista = listaCompras.filter(item => item !== itemParaRemover);
    setListaCompras(novaLista);
    localStorage.setItem('listaCompras', JSON.stringify(novaLista));
  };

  // Função para aumentar quantidade do produto
  const aumentarQuantidade = (id) => {
    const produtosAtualizados = produtos.map(produto => {
      if (produto.id === id) {
        return { ...produto, quantidade: produto.quantidade + 1 };
      }
      return produto;
    });
    setProdutos(produtosAtualizados);
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
  };

  // Função para diminuir quantidade do produto
  const diminuirQuantidade = (id) => {
    const produtosAtualizados = produtos.map(produto => {
      if (produto.id === id && produto.quantidade > 1) {
        return { ...produto, quantidade: produto.quantidade - 1 };
      }
      return produto;
    });
    setProdutos(produtosAtualizados);
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
  };

  return (
    <div>
      <h1>Controle de Estoque Residencial</h1>

      {/* Formulário para adicionar produtos */}
      <form onSubmit={adicionarProduto}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
            min="1"
          />
        </div>
        <div>
          <label>Validade:</label>
          <input
            type="date"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Produto</button>
      </form>

      {/* Lista de produtos no inventário */}
      <h2>Produtos no Inventário:</h2>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            <strong>{produto.nome}</strong> - {produto.categoria}: {produto.descricao}, Validade: {produto.validade}, Quantidade: {produto.quantidade}
            <button onClick={() => aumentarQuantidade(produto.id)}>+</button>
            <button onClick={() => diminuirQuantidade(produto.id)}>-</button>
            <button onClick={() => removerProduto(produto)}>Remover</button>
          </li>
        ))}
      </ul>

      {/* Quantidade Total usando o componente QuantidadeTotal */}
      <QuantidadeTotal produtos={produtos} />

      {/* Bloco de notas - Lista de Compras */}
      <h2>Lista de Compras</h2>
      <form onSubmit={adicionarItemLista}>
        <div>
          <label>Adicionar item:</label>
          <input
            type="text"
            value={itemLista}
            onChange={(e) => setItemLista(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar à lista</button>
      </form>

      <h3>Itens na lista:</h3>
      <ul>
        {listaCompras.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removerItemLista(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
