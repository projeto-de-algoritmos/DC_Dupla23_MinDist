function calculateDistance(positionA, positionB) {
  return Math.sqrt(
    Math.pow(positionB.posicao[0] - positionA.posicao[0], 2) + 
    Math.pow(positionB.posicao[1] - positionA.posicao[1], 2)
  )
};

function minimumBetweenThree(A, B, C) {
  const distanceAB = calculateDistance(A, B);
  const distanceAC = calculateDistance(A, C);
  const distanceBC = calculateDistance(B, C);
  const minimumDistance = Math.min(distanceAB, distanceAC, distanceBC);

  if (minimumDistance === distanceAB) return { distance: minimumDistance, positionsA: A, positionsB: B }
  if (minimumDistance === distanceAC) return { distance: minimumDistance, positionsA: A, positionsB: C }
  if (minimumDistance === distanceBC) return { distance: minimumDistance, positionsA: B, positionsB: C }
}

function closestPair(vetor) {
  console.trace();
  if (vetor.length === 2) return { distance: calculateDistance(vetor[0], vetor[1]), positionsA: vetor[0], positionsB: vetor[1] }
  if (vetor.length === 3) return minimumBetweenThree(vetor[0], vetor[1], vetor[2]);
  
  let MoM = medianaDasMedianas(vetor);
  if (MoM && adicionar.value == vetor.length) MoM.destacar(draw);

  const l = vetor.filter((v) => v.posicao[0] <= MoM.posicao[0]);
  const r = vetor.filter((v) => v.posicao[0] >= MoM.posicao[0]);
  const dl = closestPair(l);
  const dr = closestPair(r);
  
  if (dl.distance <= dr.distance) return dl;
  if (dl.distance > dr.distance) return dr;
}
