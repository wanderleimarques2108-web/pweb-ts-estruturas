function formatarReal(valor) {
    return `R$ ${valor.toFixed(2)}`;
}
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (const linha of linhas) {
        const linhaLimpa = linha.trim();
        if (linhaLimpa === '') {
            continue;
        }
        const preco = Number(linhaLimpa.replace(',', '.'));
        if (isNaN(preco) || preco <= 0) {
            ignorados++;
            continue;
        }
        precos.push(preco);
        if (precos.length >= 20) {
            break;
        }
    }
    return { precos, ignorados };
}
function somarItens(...precos) {
    let soma = 0;
    for (const preco of precos) {
        soma += preco;
    }
    return soma;
}
function calcularDesconto(total, valor) {
    if (typeof valor === 'number') {
        return (total * valor) / 100;
    }
    switch (valor.toUpperCase()) {
        case 'BEMVINDO':
            return total * 0.10;
        case 'PROMO20':
            return total * 0.20;
        case 'MENOS15':
            return total >= 100 ? 15 : 0;
        default:
            return 0;
    }
}
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const { precos, ignorados } = lerPrecos(campoItens.value);
    if (precos.length === 0) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    const subtotal = somarItens(...precos);
    const textoCupom = campoCupom.value.trim();
    const descontoCupom = textoCupom === '' ? 0 : calcularDesconto(subtotal, textoCupom);
    const valorAposCupom = subtotal - descontoCupom;
    const descontoFidelidade = campoFidelidade.checked ? calcularDesconto(valorAposCupom, 5) : 0;
    const total = valorAposCupom - descontoFidelidade;
    const linhas = [];
    const sufixoIgnorados = ignorados > 0 ? ` (${ignorados} linha${ignorados > 1 ? 's' : ''} ignorada${ignorados > 1 ? 's' : ''})` : '';
    linhas.push(`Itens: ${precos.length}${sufixoIgnorados}`);
    linhas.push(`Subtotal: ${formatarReal(subtotal)}`);
    if (textoCupom !== '') {
        if (descontoCupom > 0) {
            linhas.push(`Cupom ${textoCupom.toUpperCase()}: - ${formatarReal(descontoCupom)}`);
        }
        else {
            linhas.push('Cupom inválido ou não aplicável');
        }
    }
    if (descontoFidelidade > 0) {
        linhas.push(`Fidelidade (5%): - ${formatarReal(descontoFidelidade)}`);
    }
    linhas.push(`Total a pagar: ${formatarReal(total)}`);
    saida.textContent = linhas.join('\n');
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex05.js.map