const corretPlayer = document.querySelector(".corretPlayer");

let select;
let player = "X";

let positions = [ //armazena as posições possiveis para ter um ganhador
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init(){
    select = [];//função inicial

    corretPlayer.innerHTML = `Jogador da vez: ${player}`; //armazena o player que o inicial é o X

    document.querySelectorAll(".velhota button").forEach((item) => {
        item.innerHTML = ""; //todo botao quando for inicializado vai começar com o innerHTML vazio
        item.addEventListener("click", newMove);
    });
}

init();

function newMove(e){
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    e.target.removeEventListener("click", newMove);
    select[index] = player;

    setTimeout(() => {
        check();
    },  [100]);

    player = player === "X" ? "O" : "X";
    corretPlayer.innerHTML = `Jogador da vez: ${player}`;
}

function check() {
    let playerLasMove = player === "X" ? "O" : "X";

    const items = select
    .map((item, i) => [item, i])
    .filter((item) => item[0] ===playerLasMove)
    .map((item) => item[1]);

    for (pos of positions) {
        if (pos.every((item) => items.includes(item))){
            alert("O JOGADOR '" + playerLasMove + "' GANHOU");
            init();
            return;
        }
    }

    if (select.filter((item) => item).length === 9){
        alert ("EMPATE");
        init();
        return;
    }
}