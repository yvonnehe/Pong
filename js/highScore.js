const highScores = document.querySelector(".highscores");
const pongWinners = document.querySelector(".pongwinners");
const winner = JSON.parse(localStorage.getItem("winners"));

function getHighScores() {
  winner.forEach((winner) => {
    console.log(winner);
    pongWinners.innerHTML += `<p class="score">${winner}</p> `;
  });
}

getHighScores();
