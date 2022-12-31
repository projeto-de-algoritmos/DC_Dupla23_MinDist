function calculateDistance(positionA, positionB) {
  return Math.sqrt(
    Math.pow(positionB.posicao[0] - positionA.posicao[0], 2) + 
    Math.pow(positionB.posicao[1] - positionA.posicao[1], 2)
  )  
}

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
  let smallestDistance;

  if (vetor.length === 1) return;
  if (vetor.length === 2) return { distance: calculateDistance(vetor[0], vetor[1]), positionsA: vetor[0], positionsB: vetor[1] }
  if (vetor.length === 3) return minimumBetweenThree(vetor[0], vetor[1], vetor[2]);
  
  let MoM = medianaDasMedianas(vetor);

  if (MoM && adicionar.value == vetor.length) MoM.destacar(draw);

  const l = vetor.filter((v) => v.posicao[0] <= MoM.posicao[0]);
  const r = vetor.filter((v) => v.posicao[0] >= MoM.posicao[0]);
  const dl = closestPair(l);
  const dr = closestPair(r);
  
  if (dl.distance <= dr.distance) smallestDistance = dl;
  if (dl.distance > dr.distance) smallestDistance = dr;

  console.log('===========');
  console.log('vetor', vetor);
  console.log('MoM', MoM);
  console.log('smallestDistance', smallestDistance);
  const S = vetor.filter(v => 
    v.posicao[0] >= (MoM.posicao[0] - smallestDistance.distance) &&
    v.posicao[0] <= (MoM.posicao[0] + smallestDistance.distance)
  );
  console.log('PRE-SORT S', S);
  S.sort(eixo_y);
  console.log('POS-SORT S', S);

  for (let i = 0; i < S.length - 1; i++) {
    for (let j = i + 1; j < S.length; j++) {
      // Estão no mesmo lado
      if (S[i].posicao[0] < MoM.posicao[0] && S[j].posicao[0] < MoM.posicao[0]) continue
      if (S[i].posicao[0] > MoM.posicao[0] && S[j].posicao[0] > MoM.posicao[0]) continue
      
      if (
        S[j].posicao[0] > (S[i].posicao[0] - smallestDistance.distance) || 
        S[j].posicao[0] < (S[i].posicao[0] + smallestDistance.distance) &&
        S[j].posicao[1] < (S[i].posicao[1] + smallestDistance.distance)  
      ) {
        const currentDistance = calculateDistance(S[i], S[j])
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
