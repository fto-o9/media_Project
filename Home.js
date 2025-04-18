const startSound = new Audio("mp3/na.mp3");

function startGame() {
  const player1 = document.getElementById('player1').value.trim();
  const player2 = document.getElementById('player2').value.trim();
  const selectedTheme = document.getElementById('theme').value;

  if (!player1 || !player2) {
    alert("يرجى إدخال اسماء اللاعبين");
    return;
  }

  localStorage.setItem("player1", player1);
  localStorage.setItem("player2", player2);
  localStorage.setItem("theme", selectedTheme);

  startSound.play();

  setTimeout(() => {
    window.location.href = "Game.html";
  }, 600);
}

document.getElementById("theme").addEventListener("change", function () {
  document.body.className = this.value + "-theme";
});
