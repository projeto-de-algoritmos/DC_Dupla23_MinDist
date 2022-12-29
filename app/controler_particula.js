let canvas = document.querySelector('canvas');
let btn_adicionar = document.getElementById('add_particula');
let btn_remover = document.getElementById('rm_particula');
let adicionar = document.getElementById('adicionar');
let quantidade = document.getElementById('quantidade');

adicionar.value = 10;
let particulas = [];

btn_adicionar.addEventListener('click', () => {
  let novas_particulas = adicionar.value;
  while(novas_particulas--) {
    let particula = new Particula(particulas.length, canvas.width, canvas.height);
    particulas.push(particula);
  }
  quantidade.innerHTML = particulas.length;
});

btn_remover.addEventListener('click', () => {
  while(particulas.length)
    particulas.pop();
  quantidade.innerHTML = particulas.length;
})
