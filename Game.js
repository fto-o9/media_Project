let player1 = localStorage.getItem("player1");
let player2 = localStorage.getItem("player2");
let theme = localStorage.getItem("theme") || "light";

document.getElementById('player1Name').textContent = player1;
document.getElementById('player2Name').textContent = player2;
document.getElementById('currentTurn').textContent = `${player1} (X)`;

document.body.classList.add(`${theme}-theme`);

const moveSound = new Audio("x and o.mp3");
const winSound = new Audio("fo.mp3");
const drawSound = new Audio("ta.mp3");
const buttonSound = new Audio("na.mp3");

let currentPlayer = "X";
let gameOver = false;
let board = ["", "", "", "", "", "", "", "", ""];

function makeMove(cell, index) {
    if (gameOver || board[index] !== "") return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    moveSound.play();

    const winCombo = checkWinner();
    if (winCombo) {
        highlightWinner(winCombo);
        document.getElementById('gameResult').textContent = `${currentPlayer === "X" ? player1 : player2} فاز`;
        winSound.play();
        gameOver = true;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById('gameResult').textContent = "تعادل";
        drawSound.play();
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById('currentTurn').textContent = `${currentPlayer === "X" ? player1 : player2} (${currentPlayer})`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
            return combo;
        }
    }
    return null;
}

function highlightWinner(combo) {
    combo.forEach(index => {
        document.querySelectorAll('.cell')[index].classList.add('win-highlight');
    });
}

function resetGame() {
    buttonSound.play();
    board = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('win-highlight');
    });
    gameOver = false;
    currentPlayer = "X";
    document.getElementById('currentTurn').textContent = `${player1} (X)`;
    document.getElementById('gameResult').textContent = "";
}

function goBackHome() {
    buttonSound.play();
    setTimeout(() => {
        window.location.href = "Home.html";
    }, 600);
}
