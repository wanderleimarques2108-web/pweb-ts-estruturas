function calcularTotal(valor: number, parcelas: number): number {
  return parcelas >= 4 ? valor * 1.02 ** parcelas : valor;
}

function simularParcelamento(preco: number, entrada?: number): string {
  const financiado = typeof entrada !== 'undefined' ? preco - entrada : preco;
  let linhas = '';

  for (let parcelas = 1; parcelas <= 12; parcelas++) {
    if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
      continue;
    }

    const total = calcularTotal(financiado, parcelas);
    const valorParcela = total / parcelas;

    if (valorParcela < 50) {
      break;
    }

    const juros = parcelas >= 4 ? '2% a.m.' : 'sem juros';
    linhas += `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td><td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
  }

  return linhas;
}

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botao = document.getElementById('simular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;
const corpoTabela = document.getElementById('parcelas') as HTMLElement;

botao.addEventListener('click', () => {
  const preco = Number(campoPreco.value);
  const textoEntrada = campoEntrada.value;

  corpoTabela.innerHTML = '';

  if (textoEntrada === '') {
    saida.textContent = `Valor financiado: R$ ${preco.toFixed(2)}`;
    corpoTabela.innerHTML = simularParcelamento(preco);
    return;
  }

  const entrada = Number(textoEntrada);

  if (entrada >= preco) {
    saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
    return;
  }

  const financiado = preco - entrada;
  saida.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
  corpoTabela.innerHTML = simularParcelamento(preco, entrada);
});
