function medianaDasMedianas(vetor, pos) {
  // Sendo um vetor de tamanho menor que 5, ordena e retorna o valor contido em pos
  if (vetor.length <= 5) {
    vetor.sort(eixo_x);
    return vetor[pos];
  }

  // Passo 1 Dividir o Vetor em grupos de 5
  const vetor_medianas = [];
  for (let i = 0; i < vetor.length; i += 5) {
    vetor_medianas.push(vetor.slice(i, i + 5));
  }

  // Passo 2 Achar a Mediana de Cada grupo
  const medians = [];
  for (let item of vetor_medianas) {
    item.sort(eixo_x);
    let median = item[Math.floor(item.length / 2)];
    medians.push(median);
  }

  // Passo 3 Achar a Mediana das Medianas
  const m = medianaDasMedianas(medians, Math.floor(medians.length / 2));

  // Passo 4 Dividir o Vetor Original em torno de m. Para isso sera feito a montagem dos vetores L e R com base no valor de m
  const L = [];
  const R = [];
  for (let k = 0; k < vetor.length; k++) {
    if (vetor[k] < m) L.push(vetor[k]);
    else if (vetor[k] > m) R.push(vetor[k]);
  }

  // Se o valor de m (pivo) for igual a pos, retorna ele
  if (pos === L.length) return m;
  // Se o valor de pos for menor que o tamanho de L, procurar dentro de L
  if (pos < L.length) return medianaDasMedianas(L, pos);

  // Caso não tenha sido encontrado, procurar no vetor R
  return medianaDasMedianas(R, pos - L.length - 1);
}