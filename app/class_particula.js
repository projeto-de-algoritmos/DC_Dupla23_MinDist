const aleatorio = (raio, inicio=0) => inicio+Math.round(Math.random()*(raio-inicio));

class Particula {
  constructor(index, largura, altura, tamanho=false, cor=false) {
    this.index = index;
    this.tamanho = tamanho?tamanho:aleatorio(10);
    this.posicao = [
      aleatorio(largura-this.tamanho, this.tamanho),
      aleatorio(altura-this.tamanho,this.tamanho)
    ];
    this.velocidade = [(Math.random() * 10), (Math.random() * 10)];
    this.cor = cor?cor:[aleatorio(255), aleatorio(255), aleatorio(255)];
  }
  desenhar(draw) {
    let raio = this.tamanho/2;
    let x = this.posicao[0]+raio;
    let y = this.posicao[1]+raio;
    let rgb = `rgb(${this.cor[0]}, ${this.cor[1]}, ${this.cor[2]})`;
    draw.fillStyle = rgb;
    draw.beginPath();
    draw.arc(x, y, raio, 0, 2*Math.PI);
    draw.fill();
  }
  trocaDirecao(eixo_posicao, dimensao) {
    if((this.posicao[eixo_posicao]+this.tamanho >= dimensao)
    ||(this.posicao[eixo_posicao] <= 0)) {  this.velocidade[eixo_posicao]*=-1;
    }
    this.posicao[eixo_posicao] += this.velocidade[eixo_posicao];
  }
  mover(largura, altura) {
    this.trocaDirecao(0, largura);
    this.trocaDirecao(1, altura);
  }
}
