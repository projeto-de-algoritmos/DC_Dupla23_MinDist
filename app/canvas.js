let draw = canvas.getContext('2d');

function atualizarTela() {
  draw.fillStyle='lightgray';
  draw.clearRect(0, 0, canvas.width, canvas.height);
  draw.fillRect(0, 0, canvas.width, canvas.height);
  particulas.forEach(p => {
    p.mover(canvas.width, canvas.height)
    p.desenhar(draw);
  })
}

setInterval(atualizarTela, 1000/60);
