function formatarReal(valor) {
    return `R$ ${valor.toFixed(2)}`;
}
function formatarMeses(totalMeses) {
    if (totalMeses < 12) {
        return `${totalMeses} meses`;
    }
    const anos = Math.floor(totalMeses / 12);
    const mesesRestantes = totalMeses % 12;
    const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    if (mesesRestantes === 0) {
        return textoAnos;
    }
    return `${textoAnos} e ${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
}
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let depositado = 0;
    let meses = 0;
    let atingiu = false;
    while (true) {
        meses++;
        const depositoDoMes = meses % 12 === 0 ? deposito * 2 : deposito;
        saldo = saldo * (1 + taxa / 100) + depositoDoMes;
        depositado += depositoDoMes;
        if (saldo >= meta) {
            atingiu = true;
            break;
        }
        if (meses >= 600) {
            break;
        }
    }
    return { meses, saldo, depositado, atingiu };
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const meta = Number(campoMeta.value);
    const deposito = Number(campoDeposito.value);
    if (meta <= 0 || deposito <= 0) {
        saida.textContent = 'Informe valores positivos';
        saida.className = 'erro';
        return;
    }
    const textoTaxa = campoTaxa.value;
    const resultado = textoTaxa === '' ? calcularMeses(meta, deposito) : calcularMeses(meta, deposito, Number(textoTaxa));
    if (!resultado.atingiu) {
        saida.textContent = `Meta inalcançável em 50 anos. Saldo após 600 meses: ${formatarReal(resultado.saldo)}`;
        saida.className = 'erro';
        return;
    }
    saida.textContent = [
        `Você atinge a meta em ${resultado.meses} meses (${formatarMeses(resultado.meses)}).`,
        exibirValor('Saldo final', resultado.saldo, formatarReal),
        exibirValor('Total depositado', resultado.depositado, formatarReal),
        exibirValor('Rendimento', resultado.saldo - resultado.depositado, formatarReal),
    ].join('\n');
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex04.js.map