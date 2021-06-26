const layout = document.querySelector(".layout");
const startButton = document.querySelector(".startbutton");
const startButton2 = document.querySelector(".startbutton2");
const themeButton = document.querySelector(".themebutton");
const gameTitle = document.querySelector(".gametitle");
const gameDesc = document.querySelector(".gamedescription");

/* Canvas */
const canvas = document.querySelector(".gamecontainer");
let ctx = canvas.getContext("2d");

/* Player 2 pop-up */
const player2Div = document.querySelector(".player2div");
player2Div.style.display = "none";

/* Local Storage */
const nameInput2 = document.querySelector(".nameinput2");
const playPongButton2 = document.querySelector(".playpongbutton2");
const highScores = document.querySelector(".highscores");
const pongWinners = document.querySelector(".pongwinners");

/* Arrows */
const up = document.querySelector(".up");
up.addEventListener("click", () => movePlayers({ code: "ArrowUp" }));
const down = document.querySelector(".down");
down.addEventListener("click", () => movePlayers({ code: "ArrowDown" }));
const up2 = document.querySelector(".up2");
up2.addEventListener("click", () => movePlayers({ code: "KeyW" }));
const down2 = document.querySelector(".down2");
down2.addEventListener("click", () => movePlayers({ code: "KeyS" }));

/* Creates things */
let themes = [
  {
    button: "Pet the cat",
    background: "",
    pawn: {
      image: "./images/Olga2.png",
      posX: canvas.width / 2 - 50,
      posY: canvas.height / 2 - 50,
      pawn: null,
    },
  },
  {
    button: "Jello war",
    background: "",
    pawn: {
      image: "./images/the-office-jello.png",
      posX: canvas.width / 2 - 50,
      posY: canvas.height / 2 - 50,
      pawn: null,
    },
  },
];

let activeTheme = 0;
let onePlayer = false;
let AICanMove = true;

let ball = {
  posX: canvas.width / 2 - 50,
  posY: canvas.height / 2 - 50,
  velocityX: -5, //olga speed
  velocityY: 0,
  image: "",
};
let oldBallY = canvas.height / 2 - 50;

const players = [
  {
    posX: 0,
    posY: canvas.height / 2 - 50,
    image: "./images/Hand.png",
    score0: 0,
  },
  {
    posX: canvas.width - 31,
    posY: canvas.height / 2 - 50,
    image: "./images/Hand2.png",
    score1: 0,
  },
];

function createPlayers() {
  players.forEach((player) => {
    let image = new Image();
    image.setAttribute("src", player.image);
    player.pawn = image;
  });
}

function createPawn(themes) {
  themes.forEach((item) => {
    let image = new Image();
    image.setAttribute("src", item.pawn.image);
    item.pawn.pawn = image;
  });
}

/* Draws things on canvas */
function drawGame(theme) {
  ctx.clearRect(0, 0, 9999, 9999);
  drawPlayers(players);
  drawScore();
}

function drawPlayers(players) {
  players.forEach((player) => {
    ctx.drawImage(player.pawn, player.posX, player.posY, 31, 70);
    //console.log(player.pawn, player.posX, player.posY, 31, 70);
  });
}

function drawPawn(pawn) {
  ctx.drawImage(pawn.pawn, pawn.posX, pawn.posY, 80, 80);
  //console.log(pawn.pawn, pawn.posX, pawn.posY, 80, 80);
}

function drawBall() {
  ctx.drawImage(
    themes[activeTheme].pawn.pawn,
    ball.posX + ball.velocityX,
    ball.posY + ball.velocityY,
    80,
    80
  );
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px 'Roboto'";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 7;
  ctx.fillText(players[0].score0, canvas.width / 4 - 7, canvas.height / 10);
  ctx.fillText(
    players[1].score1,
    (canvas.width / 4) * 3 - 7,
    canvas.height / 10
  );
}

/* Change theme */
themeButton.addEventListener("click", changeTheme);

function changeTheme() {
  layout.classList.toggle("jellowarlayout");
  themeButton.classList.toggle("jellowarbtn");
  startButton.classList.toggle("jellowarbtn");
  startButton2.classList.toggle("jellowarbtn");
  playPongButton2.classList.toggle("jellowarbtn");
  activeTheme = (activeTheme + 1) % themes.length;
  themeButton.innerHTML = themes[(activeTheme + 1) % 2].button;
  switch (activeTheme) {
    case 0:
      gameDesc.innerHTML =
        "Meet Olga - she is a very nice cat! She is very loud and chatty. She kind of looks like baby yoda when she's happy, with her ears sticking out. Enjoy her game.";
      break;
    case 1:
      gameDesc.innerHTML =
        "Welcome to Dwight and Jim's eternal battle. Any true The Office fan would know - they are always at each other. This time putting stuff in Jello. Who will win?";
      break;
  }
  if (gameTitle.innerHTML === "Pet the Cat") {
    gameTitle.innerHTML = "Jello War";
  } else {
    gameTitle.innerHTML = "Pet the Cat";
  }
}

/* Game code */
function checkIfWon() {
  if (players[0].score0 >= 11) {
    alert("Player 1 wins!");
    //localStorage.getItem("name");
    const nameOfPlayer = localStorage.getItem("name");
    winners.unshift(nameOfPlayer);
    console.log(nameOfPlayer);
    scores.unshift("11");
    console.log(winners);
    console.log(scores);
    totalWinners.push(winners[0] + " " + date);
    localStorage.setItem("winners", JSON.stringify(totalWinners));
    stopGame();
    ctx.clearRect(0, 0, 9999, 9999);
  } else if (players[1].score1 >= 11) {
    alert("Player 2 wins!");
    const nameOfPlayer2 = localStorage.getItem("name2");
    winners.unshift(nameOfPlayer2);
    console.log(nameOfPlayer2);
    scores.unshift("11");
    console.log(winners);
    console.log(scores);
    stopGame();
    ctx.clearRect(0, 0, 9999, 9999);
  }
}

function checkIfImpact() {
  if (ball.posX <= 0) {
    ball.velocityX = Math.random() > 0.5 ? -1.5 : 1.5;
    ball.velocityY = Math.random() > 0.5 ? Math.random() : -Math.random();
    players[0].posY = 200;
    players[1].posY = 200;
    (ball.posX = 250), (ball.posY = 250); //center
    players[1].score1++;
    checkIfWon();
  } else if (ball.posX > canvas.width) {
    ball.velocityX = Math.random() > 0.5 ? -1.5 : 1.5;
    ball.velocityY = Math.random() > 0.5 ? Math.random() : -Math.random();
    players[0].posY = 200;
    players[1].posY = 200;
    (ball.posX = 250), (ball.posY = 250); //center
    players[0].score0++;
    checkIfWon();
  } else if (ball.posY <= 0) {
    ball.velocityY = -ball.velocityY;
  } else if (ball.posY >= canvas.height - 80) {
    ball.velocityY = -ball.velocityY;
  } else if (
    ball.posX <= 31 &&
    ball.posY >= players[0].posY - 70 &&
    ball.posY <= players[0].posY + 70
  ) {
    ball.velocityY = (ball.posY - players[0].posY) * 0.05;
    ball.velocityX = -ball.velocityX; //olga speed
  } else if (
    ball.posX >= 420 &&
    ball.posY >= players[1].posY - 70 &&
    ball.posY <= players[1].posY + 70
  ) {
    ball.velocityY = (ball.posY - players[1].posY) * 0.05;
    ball.velocityX = -ball.velocityX; //olga speed
  }
}

function movePlayers(e) {
  if (
    e.code === "ArrowUp" ||
    e.code === "ArrowDown" ||
    e.code === "KeyW" ||
    e.code === "KeyS"
  ) {
    e.preventDefault();
    switch (e.code) {
      case "ArrowUp":
        players[1].posY -= 30;
        break;

      case "ArrowDown":
        players[1].posY += 30;
        break;

      case "KeyW":
        !onePlayer && (players[0].posY -= 30);
        break;

      case "KeyS":
        !onePlayer && (players[0].posY += 30);
        break;
    }
  }
}

window.addEventListener("keydown", (e) => movePlayers(e));

function updateBall() {
  ball.posX += ball.velocityX;
  ball.posY += ball.velocityY;
  oldBallY = ball.posX += ball.velocityX;
}

/* Start game */
startButton.addEventListener("click", addPlayer2);
startButton2.addEventListener("click", () => {
  onePlayer = true;
  initializeGame();
});

function moveAI() {
  /* AI Computer */
  let computerLevel = 1;
  //console.log(ball.posY)
  if (AICanMove && Math.abs(players[0].posY - ball.posY) > 15) {
    setTimeout(() => {
      players[0].posY = (ball.posY - 70 / 2) * (Math.random() * 0.6 + 1);
    }, 2000 / computerLevel);
    //console.log(players[0].posY);
    AICanMove = false;
    setTimeout(() => {
      AICanMove = true;
    }, 400 / computerLevel);
  }
}

function renderGame() {
  if (onePlayer) {
    moveAI();
    up2.style.display = "none";
    down2.style.display = "none";
  }

  ctx.clearRect(0, 0, 9999, 9999);
  drawGame(themes[0]);
  drawBall();
  updateBall();
  checkIfImpact();

  window.requestAnimationFrame(renderGame);
}

function initializeGame() {
  startButton.style.display = "none";
  startButton2.style.display = "none";
  saveName2();
  createPawn(themes);
  createPlayers();
  renderGame();
  ball = {
    ...ball,
    posX: canvas.width / 2 - 50,
    posY: canvas.height / 2 - 50,
    velocityX: -5, //olga speed
    velocityY: 0,
  };
  players[0].score0 = 0;
  players[1].score1 = 0;
}

function addPlayer2() {
  startButton.style.display = "none";
  startButton2.style.display = "none";
  player2Div.style.display = "block";
  if (window.innerWidth < 760) {
    up2.style.display = "block";
    down2.style.display = "block";
  }
}

/* Local Storage/High scores */
playPongButton2.addEventListener("click", initializeGame);

function saveName2() {
  const name2 = nameInput2.value;
  console.log(name2);
  localStorage.setItem("name2", name2);
  player2Div.style.display = "none";
}

let winners = [];
let scores = [];

function saveArrays() {
  Storage.prototype.setObj = function (winnersobj, winners) {
    return this.setItem(winnersobj, JSON.stringify(winners));
  };
  // Storage.prototype.getObj = function(key) {
  //     return JSON.parse(this.getItem(key))
  // }
}

let totalWinners = [];

const winnerFromLocalStorage = JSON.parse(localStorage.getItem("winners"));
if (winnerFromLocalStorage !== null) {
  totalWinners = winnerFromLocalStorage;
}

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
var date =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  today.getDate() +
  " " +
  time;

// function getHighScores() {
//   winners.forEach((winner) => {
//     pongWinners.innerHTML += `<p class="score">${winner}</p>`;
//   });
//   scores.forEach((score) => {
//     highScores.innerHTML += `<p class="score">${score}</p>`;
//   });
// }

/* Stop game */
function stopGame() {
  ball = {
    ...ball,
    posX: canvas.width / 2 - 50,
    posY: canvas.height / 2 - 50,
    velocityX: 0,
    velocityY: 0,
  };

  ctx.clearRect(0, 0, 9999, 9999);
  startButton.style.display = "inline-block";
  startButton2.style.display = "inline-block";
}

/*

/* Change theme function not in use
function changeTheme() {
  ball2.classList.toggle("jellowarball");
  layout.classList.toggle("jellowarlayout");
  themeButton.classList.toggle("jellowarbtn");
  if (themeButton.innerHTML === "Jello War") {
    themeButton.innerHTML = "Pet the cat";
  } else {
    themeButton.innerHTML = "Jello War";
  }
}

themeButton.addEventListener("click", changeTheme);

*/

/* 

Maybe useful?? 

var md = new MobileDetect(window.navigator.userAgent);
if( md.tablet() || !md.phone() ) {
    // your code here
}

*/
