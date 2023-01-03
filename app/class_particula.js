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

  get massa() {
    return Math.PI*this.raio*this.raio;
  }

  get v() {
    return [this.velocidade[EIXO_X], this.velocidade[EIXO_Y]];
  }

  distanciaEuclidiana(other) {
    let x = this.posicao[EIXO_X] - other.posicao[EIXO_X];
    let y = this.posicao[EIXO_Y] - other.posicao[EIXO_Y];
    let dist = Math.sqrt(x*x+y*y);
    this.colide(other, dist);
    return dist;
  }

  colide(other, distancia) {
    if(this.raio+other.raio < distancia)
      return false;

    function rotate(v, theta) {
      return [
        v[EIXO_X] * Math.cos(theta) - v[EIXO_Y] * Math.sin(theta),
        v[EIXO_X] * Math.sin(theta) + v[EIXO_Y] * Math.cos(theta)];
    }
    let res = [
      this.velocidade[EIXO_X] - other.velocidade[EIXO_X],
      this.velocidade[EIXO_Y] - other.velocidade[EIXO_Y]
    ];

    if (res[EIXO_X] *(other.posicao[EIXO_X] - this.posicao[EIXO_X]) + res[EIXO_Y] * (other.posicao[EIXO_Y] - this.posicao[EIXO_Y]) >= EIXO_X ) {
      this.cor = [aleatorio(255, 128), aleatorio(255, 128), aleatorio(255, 128)];
      other.cor = [aleatorio(255, 128), aleatorio(255, 128), aleatorio(255, 128)];
      var m1 = this.massa
      var m2 = other.massa
      var theta = -Math.atan2(other.posicao[EIXO_Y] - this.posicao[EIXO_Y], other.posicao[EIXO_X] - this.posicao[EIXO_X]);
      var v1 = rotate(this.v, theta);
      var v2 = rotate(other.v, theta);
      var u1 = rotate([v1[EIXO_X] * (m1 - m2)/(m1 + m2) + v2[EIXO_X] * 2 * m2/(m1 + m2), v1[EIXO_Y]], -theta);
      var u2 = rotate([v2[EIXO_X] * (m2 - m1)/(m1 + m2) + v1[EIXO_X] * 2 * m1/(m1 + m2), v2[EIXO_Y]], -theta);

      this.vx = u1[EIXO_X];
      this.vy = u1[EIXO_Y];
      other.vx = u2[EIXO_X];
      other.vy = u2[EIXO_Y];
  }
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
