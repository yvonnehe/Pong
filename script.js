const ball2 = document.querySelector(".ball");
const layout = document.querySelector(".layout");
const startButton = document.querySelector(".startbutton");
const themeButton = document.querySelector(".themebutton");
const gameTitle = document.querySelector(".gametitle");

/* Canvas */
const canvas = document.querySelector(".gamecontainer");
let ctx = canvas.getContext("2d");

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

let ball = {
  x: canvas.width / 2 - 50,
  y: canvas.height / 2 - 50,
  velocityX: -3, //olga speed
  velocityY: 0,
  image: "",
};

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

let activeTheme = 0;

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
    ball.x + ball.velocityX,
    ball.y + ball.velocityY,
    80,
    80
  );
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px 'Roboto'";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 7;
  ctx.fillText(players[0].score0, canvas.width / 4, canvas.height / 5);
  ctx.fillText(players[1].score1, (canvas.width / 4) * 3, canvas.height / 5);
}

/* Change theme */
themeButton.addEventListener("click", changeTheme);

function changeTheme() {
  layout.classList.toggle("jellowarlayout");
  themeButton.classList.toggle("jellowarbtn");
  startButton.classList.toggle("jellowarbtn");
  activeTheme = (activeTheme + 1) % themes.length;
  themeButton.innerHTML = themes[(activeTheme + 1) % 2].button;
  if (gameTitle.innerHTML === "Pet the Cat") {
    gameTitle.innerHTML = "Jello War";
  } else {
    gameTitle.innerHTML = "Pet the Cat";
  }
}

/* Game code */
function checkIfWon() {
  if (players[0].score0 >= 11) {
  } else if (players[1].score1 >= 11) {
  }
}

function checkIfImpact() {
  if (ball.x <= 0) {
    ball.velocityX = Math.random() > 0.5 ? -1.5 : 1.5;
    ball.velocityY = Math.random() > 0.5 ? Math.random() : -Math.random();
    players[0].posY = 200;
    players[1].posY = 200;
    (ball.x = 250), (ball.y = 250); //center
    players[1].score1++;
    checkIfWon();
  } else if (ball.x > canvas.width) {
    ball.velocityX = Math.random() > 0.5 ? -1.5 : 1.5;
    ball.velocityY = Math.random() > 0.5 ? Math.random() : -Math.random();
    players[0].posY = 200;
    players[1].posY = 200;
    (ball.x = 250), (ball.y = 250); //center
    players[0].score0++;
    checkIfWon();
  } else if (ball.y <= 0) {
    ball.velocityY = -ball.velocityY;
  } else if (ball.y >= canvas.height - 80) {
    ball.velocityY = -ball.velocityY;
  } else if (
    ball.x <= 31 &&
    ball.y >= players[0].posY - 70 &&
    ball.y <= players[0].posY + 70
  ) {
    ball.velocityY = (ball.y - players[0].posY) * 0.05;
    ball.velocityX = -ball.velocityX; //olga speed
  } else if (
    ball.x >= 420 &&
    ball.y >= players[1].posY - 70 &&
    ball.y <= players[1].posY + 70
  ) {
    ball.velocityY = (ball.y - players[1].posY) * 0.05;
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
        players[0].posY -= 30;
        break;

      case "KeyS":
        players[0].posY += 30;
        break;
    }
  }
}

window.addEventListener("keydown", (e) => movePlayers(e));

function updateBall() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
}

/* Start game */
startButton.addEventListener("click", initializeGame);

function renderGame() {
  ctx.clearRect(0, 0, 9999, 9999);
  drawGame(themes[0]);
  drawBall();
  updateBall();
  checkIfImpact();
  window.requestAnimationFrame(renderGame);
}

function initializeGame() {
  startButton.style.display = "none";
  createPawn(themes);
  createPlayers();
  renderGame();
}

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
