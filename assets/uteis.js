/*export function OrdenaPosicaoDeUmArray(a, b) {
    if (parseInt(a.posicao) < parseInt(b.posicao)) {
        return -1;
    } else
    if (parseInt(a.posicao) > parseInt(b.posicao)) {
        return 1;
    }
    // são idênticos
    return 0;
}*/

export function OrdenaPosicaoDeUmArray(a, b) {
    if (a.posicao < b.posicao) {
        return -1;
    } else
    if (a.posicao > b.posicao) {
        return 1;
    }
    // são idênticos
    return 0;
}