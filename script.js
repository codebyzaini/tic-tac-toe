const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const startBtn = document.getElementById('startBtn');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');

let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

let players = {
  X: "Player X",
  O: "Player O"
};

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

startBtn.addEventListener('click', () => {
  const nameX = playerXInput.value.trim() || "Player X";
  const nameO = playerOInput.value.trim() || "Player O";
  players.X = nameX;
  players.O = nameO;

  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  gameActive = true;
  statusText.textContent = `🎯 ${players[currentPlayer]}'s turn`;
});

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    celebrateWin(currentPlayer);
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "😲 It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `🎯 ${players[currentPlayer]}'s turn`;
  }
}

function checkWin() {
  return winConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function celebrateWin(player) {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

  statusText.textContent = `🎉✨ ${players[player]} Wins! ✨🎉`;
  statusText.classList.add("celebrate");

  let emoji = document.createElement('div');
  emoji.innerHTML = player === "X" ? "🦄💖🎉" : "🌸🐰🎊";
  emoji.className = "emoji-float";
  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), 3000);
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `🎯 ${players[currentPlayer]}'s turn`;
  statusText.classList.remove("celebrate");
  cells.forEach(cell => cell.textContent = '');
}
