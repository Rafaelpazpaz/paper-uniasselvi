import React from 'react';

const QuantidadeTotal = ({ produtos }) => {
  const calcularQuantidadeTotal = (nome) => {
    return produtos
      .filter(produto => produto.nome === nome)
      .reduce((total, produto) => total + produto.quantidade, 0);
  };

  return (
    <div>
      <h3>Quantidades Totais:</h3>
      {produtos.length > 0 ? (
        <ul>
          {Array.from(new Set(produtos.map(produto => produto.nome))).map(nomeUnico => (
            <li key={nomeUnico}>
              Quantidade total de {nomeUnico}: {calcularQuantidadeTotal(nomeUnico)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto no inventário.</p>
      )}
    </div>
  );
};

export default QuantidadeTotal;
