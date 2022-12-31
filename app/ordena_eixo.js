function eixo_x (a, b){
  return a.posicao[EIXO_X] - b.posicao[EIXO_X];
}

function eixo_y (a, b) {
  return particulas[a].posicao[EIXO_Y] - particulas[b].posicao[EIXO_Y];
}
