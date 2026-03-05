console.log("Puzzle cargado");

let tauler = [
  [1,2,3],
  [4,5,6],
  [7,8,0]
];

const boxes = document.querySelectorAll(".box");

// buscar dónde está el 0
function trobarBuit(){
  for(let r=0; r<3; r++){
    for(let c=0; c<3; c++){
      if(tauler[r][c] === 0){
        return {r,c};
      }
    }
  }
}

// buscar una pieza en la matriz
function trobarPeca(valor){
  for(let r=0; r<3; r++){
    for(let c=0; c<3; c++){
      if(tauler[r][c] === valor){
        return {r,c};
      }
    }
  }
}

// comprobar si puede moverse
function potMoure(r,c){
  const buit = trobarBuit();

  const df = Math.abs(r - buit.r);
  const dc = Math.abs(c - buit.c);

  return df + dc === 1;
}

// mover pieza
function moure(valor){

  const pos = trobarPeca(valor);
  const buit = trobarBuit();

  if(potMoure(pos.r,pos.c)){

    tauler[buit.r][buit.c] = valor;
    tauler[pos.r][pos.c] = 0;

    pintar();
  }
}

// actualizar tablero
function pintar(){

  boxes.forEach(box => {

    const valor = Number(box.dataset.value);

    if(valor === 0) return;

    const pos = trobarPeca(valor);

    const index = pos.r * 3 + pos.c;

    boxes[index].appendChild(box.querySelector("img"));

  });

}

// click en piezas
boxes.forEach(box => {

  box.addEventListener("click", () => {

    const valor = Number(box.dataset.value);

    if(valor !== 0){
      moure(valor);
    }

  });

});