function medianaDasMedianas(vetor) {
  if(vetor.length == 1) {
    return vetor[0];
  }
  if(vetor.length < 3) {
    return vetor[1];
  }
  if(vetor.length<=5) {
    return vetor[2];
  }
  let vetor_medianas = [];

  const v_sort_eixo_x = (v1, v2) => v1.posicao[0] - v2.posicao[0]

  for(let i=0; i<vetor.length; i+=5) {
    // Passo 1 Dividir o Vetor em grupos de 5
    let v = vetor.slice(i, i+5);
    // Passo 2 Achar a Mediana de Cada grupo
    v.sort();

    if(v.length==5)
      v[0] = v[2];
    else if(v.length > 1)
      v[0] = v[1];
    vetor_medianas.push(v[0]);
  }
  // Passo 3 Achar a Mediana das Medianas
  let m = medianaDasMedianas(vetor_medianas);

  // Passo 4 Dividir o Vetor Original em torno de m
  let L = vetor_medianas.filter(v => v_sort_eixo_x(v, m) <= 0);
  let R = vetor_medianas.filter(v => v_sort_eixo_x(v, m) > 0);

  // Passo 5
  let k = Math.floor(vetor.length/2);
  if(L.length == k-1) {
    return m;
  }
  else if(L.length > k-1) {
    return medianaDasMedianas(L);
  }
  else {
    return medianaDasMedianas(R);
  }
}
