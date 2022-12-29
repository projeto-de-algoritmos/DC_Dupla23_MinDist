let draw = canvas.getContext('2d');

function atualizarTela() {
  draw.fillStyle='white';
  draw.clearRect(0, 0, canvas.width, canvas.height);
  draw.fillRect(0, 0, canvas.width, canvas.height);

  if(!particulas.length)
    return;

  particulas.forEach(p => {
    p.mover(canvas.width, canvas.height)
    p.desenhar(draw);
  })

  let copia_particulas = particulas.slice();
  let MoM = medianaDasMedianas(copia_particulas);
  if(MoM) {
    MoM.destacar(draw);
  }
}

setInterval(atualizarTela, 1000/60);
