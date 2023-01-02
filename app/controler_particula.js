adicionar.value = 1;
let particulas = [];
let indexes = [];
let is_paused = false;

btn_adicionar.addEventListener('click', () => {
  let novas_particulas = adicionar.value;
  while(novas_particulas--) {
    particulas.push(new Particula(
      particulas.length,
      canvas.width,
      canvas.height
    ));
    indexes.push(indexes.length);
  }
  quantidade.innerHTML = particulas.length;
});

btn_remover.addEventListener('click', () => {
  while(particulas.length)
    particulas.pop();
  quantidade.innerHTML = particulas.length;
});

btn_pause.addEventListener('click', () => {
  is_paused = !is_paused;
});

function atualizarTela() {
  if(is_paused || !particulas.length)
    return;

  draw.fillStyle='white';
  draw.clearRect(0, 0, canvas.width, canvas.height);
  draw.fillRect(0, 0, canvas.width, canvas.height);

  particulas.forEach((particula, i) => {
    particula.mover(canvas.width, canvas.height)
    particula.desenhar(draw);
  });

  // particulas.forEach((particula, i) => {
  //   for(let j=i+1; particulas.length; j++) {
  //     let outra_particula = particula[j];
  //     let dist = particula.distanciaEuclidiana(outra_particula);
  //     particula.colide(outra_particula, dist);
  //   }
  // });

  const d = closestPair(particulas);
  if (d) {
    draw.beginPath();
    draw.moveTo(d.positionsA.posicao[0] + d.positionsA.raio, d.positionsA.posicao[1] + d.positionsA.raio)
    draw.lineTo(d.positionsB.posicao[0] + d.positionsB.raio, d.positionsB.posicao[1] + d.positionsB.raio, 6);
  
    draw.strokeStyle = '#000000';
    draw.stroke()
  }
}

setInterval(atualizarTela, 1000/30);
