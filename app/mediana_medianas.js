function medianaDasMedianas(vetor) {
  if(vetor.length<=5) {
    vetor.sort(eixo_x)
    if(vetor.length == 1) {
      return vetor[0];
    }
    return vetor[1];
  }

  let vetor_medianas = [];

  for(let i=0; i<vetor.length; i+=5) {
    // Passo 1 Dividir o Vetor em grupos de 5
    let v = vetor.slice(i, i+5);
    // Passo 2 Achar a Mediana de Cada grupo
    v.sort(eixo_x);

    if(v.length==5)
      v[0] = v[2];
    else if(v.length > 1)
      v[0] = v[1];
    vetor_medianas.push(v[0]);
  }
  // Passo 3 Achar a Mediana das Medianas
  let m = medianaDasMedianas(vetor_medianas);
  // Passo 4 Dividir o Vetor Original em torno de m
  let L = vetor_medianas.filter(v => eixo_x(v, m) <= 0);
  // Passo 5
  let k = Math.round(vetor.length/2);
  if(L.length/k<=0.3 || L.length < 10) {
    return m;
  }
  else if(L.length/k <= 0.6) {
    return medianaDasMedianas(L);
  }
  else {
    let R = vetor_medianas.filter(v => eixo_x(v, m) > 0);
    return medianaDasMedianas(R);
  }
}
