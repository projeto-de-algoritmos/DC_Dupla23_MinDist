function minimumBetweenThree(A, B, C) {
  // Obtem distancia entre A-B, A-C e B-C
  const distanceAB = A.distanciaEuclidiana(B);
  const distanceAC = A.distanciaEuclidiana(C);
  const distanceBC = B.distanciaEuclidiana(C);
  // Obtem menor distancia entre os tres
  const minimumDistance = Math.min(distanceAB, distanceAC, distanceBC);

  // Retorna o com menor distancia, assim como os dados dos dois pontos
  if (minimumDistance === distanceAB) return { distance: minimumDistance, positionsA: A, positionsB: B }
  if (minimumDistance === distanceAC) return { distance: minimumDistance, positionsA: A, positionsB: C }
  if (minimumDistance === distanceBC) return { distance: minimumDistance, positionsA: B, positionsB: C }
}

function closestPair(vetor) {
  let smallestDistance;

  // Caso exista somente uma particula, não haverá distancia para uma proxima
  if (vetor.length === 1) return;
  // Basta calcular a distancia euclidiana entre dois pontos
  if (vetor.length === 2) return { distance: vetor[0].distanciaEuclidiana(vetor[1]), positionsA: vetor[0], positionsB: vetor[1] }
  // Basta calcular a distancia euclidiana entre tres pontos
  if (vetor.length === 3) return minimumBetweenThree(vetor[0], vetor[1], vetor[2]);

  const eixoXVetor = vetor.map((a) => a.posicao[0]);
  if (vetor.length % 2 === 0) {
    const a = medianaDasMedianas(eixoXVetor, (eixoXVetor.length / 2) - 1)
    const b = medianaDasMedianas(eixoXVetor, eixoXVetor.length / 2)
    MoM = (a + b) / 2;
  } else {
    MoM = medianaDasMedianas(eixoXVetor, Math.floor(eixoXVetor.length / 2))
  }

  // console.log("=========");
  // console.log("MoM", MoM);
  // console.log("eixoXVetor", eixoXVetor);
  if (adicionar.value == vetor.length) {
    if (eixoXVetor.length % 2 !== 0) {
      const MoMParticle = vetor.find((v) => v.posicao[0] === MoM);
      MoMParticle.destacar(draw)
    } else {
      draw.beginPath();
      draw.lineWidth = 6;
      draw.moveTo(MoM, 0)
      draw.lineTo(MoM, canvas.height, 10);

      draw.strokeStyle = '#000000';
      draw.stroke()
    }
  }

  // Particulas a esquerda
  const l = vetor.filter((v) => v.posicao[0] <= MoM);
  // Particulas a direita
  const r = vetor.filter((v) => v.posicao[0] >= MoM);
  // Menor distancia a esquerda
  const dl = closestPair(l);
  // Menor distancia a direita
  const dr = closestPair(r);

  // Verifica qual possui menor distancia entre os dois lados
  if (dl.distance <= dr.distance) smallestDistance = dl;
  if (dl.distance > dr.distance) smallestDistance = dr;

  // Filtra os pontos que estão a uma distancia +menorDistancia e -menorDistancia da mediana
  const S = vetor.filter(v =>
    v.posicao[0] >= (MoM - smallestDistance.distance) &&
    v.posicao[0] <= (MoM + smallestDistance.distance)
  );
  // Ordena pelo eixo Y
  S.sort(eixo_y);

  // Verifica nos pontos filtrados entre a mediana por menor distancia
  for (let i = 0; i < S.length - 1; i++) {
    for (let j = i + 1; j < S.length; j++) {
      // Estão no mesmo lado, logo não poderiam ter a menor distancia
      if (S[i].posicao[0] < MoM && S[j].posicao[0] < MoM) continue
      if (S[i].posicao[0] > MoM && S[j].posicao[0] > MoM) continue

      // Verifica distancias horizontal e vertical. Estando dentro das possibilidades procede para o calculo da distancia euclidiana
      if (
        S[j].posicao[0] > (S[i].posicao[0] - smallestDistance.distance) ||
        S[j].posicao[0] < (S[i].posicao[0] + smallestDistance.distance) &&
        S[j].posicao[1] < (S[i].posicao[1] + smallestDistance.distance)
      ) {
        const currentDistance = S[i].distanciaEuclidiana(S[j]);
        // Sendo a distancia encontrada menor que a ultima registrada, atualiza o valor
        if (currentDistance < smallestDistance.distance) {
          smallestDistance = {
            distance: currentDistance,
            positionsA: S[i],
            positionsB: S[j]
          };
        }
      } else {
        break;
      }
    }
  }

  return smallestDistance;
}
