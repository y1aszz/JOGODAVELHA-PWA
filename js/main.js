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

function newMove(e){ //criando a função newMove referente ao botão
    const index = e.target.getAttribute("data-i");//esta pegando o atributo declarado no html
    e.target.innerHTML = player; //passando para o innerHTML a informação do player
    e.target.removeEventListener("click", newMove);//removendo o evento click do botão, para que não possa clicar duas vezes no mesmo lugar
    select[index] = player;//armazenando

    setTimeout(() => {
        check();//sera executada depois que o restante
    },  [100]);

    player = player === "X" ? "O" : "X";//se tiver o X selecionado vai ser o X senão será O
    corretPlayer.innerHTML = `Jogador da vez: ${player}`;//a cada movimento troca a mensagem 
}

function check() {
    let playerLasMove = player === "X" ? "O" : "X";//executa depois que o de cima e pega o ultimo player que jogou 

    const items = select
    .map((item, i) => [item, i]) //mapeia os itens selecionados
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