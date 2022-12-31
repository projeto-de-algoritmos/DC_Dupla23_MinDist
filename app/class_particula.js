function aleatorio (raio, inicio=0) {
  return inicio+Math.round(Math.random()*(raio-inicio));
}

const EIXO_X = 0, EIXO_Y = 1;

class Particula {
  constructor(index, largura, altura, raio=false, cor=false) {
    this.index = index;
    this.raio = raio?raio:aleatorio(50,10);
    this.posicao = [
      aleatorio(largura-this.raio*2, this.raio*2),
      aleatorio(altura-this.raio*2, this.raio*2)
    ];
    this.velocidade = [aleatorio(10), aleatorio(10)];
    this.cor = cor?cor:[aleatorio(255, 128), aleatorio(255, 128), aleatorio(255, 128)];
  }

  distanciaEuclidiana(other) {
    let x = this.posicao[EIXO_X] - other.posicao[EIXO_X];
    let y = this.posicao[EIXO_Y] - other.posicao[EIXO_Y];
    return Math.sqrt(x*x+y*y);
  }

  colide(other, distancia) {
    if(this.raio+other.raio < distancia)
      return false;

    this.velocidade[EIXO_X] *= -1;
    this.velocidade[EIXO_Y] *= -1;
    this.mover()
    return true;
  }

  desenhar() {
    let x = this.posicao[EIXO_X]+this.raio;
    let y = this.posicao[EIXO_Y]+this.raio;
    let rgb = `rgb(${this.cor[0]}, ${this.cor[1]}, ${this.cor[2]})`;
    draw.fillStyle = rgb;
    draw.beginPath();
    draw.arc(x, y, this.raio, 0, 2*Math.PI);
    draw.fill();
  }

  destacar() {
    let x = this.posicao[EIXO_X]+this.raio;
    let y = this.posicao[EIXO_Y]+this.raio;
    draw.strokeStyle = '#FF8000';
    draw.lineWidth = 15;
    draw.beginPath();
    draw.arc(x, y, this.raio, 0, 2*Math.PI);
    draw.stroke();
  }

  trocaDirecao(eixo, dimensao) {
    if((this.posicao[eixo]+this.raio*2 >= dimensao)
      ||(this.posicao[eixo] <= 0)) {
      this.velocidade[eixo]*=-1;
    }
    this.posicao[eixo] += this.velocidade[eixo];
  }

  mover() {
    this.trocaDirecao(EIXO_X, canvas.width);
    this.trocaDirecao(EIXO_Y, canvas.height);
  }
}
