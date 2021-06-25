const ball2 = document.querySelector(".ball");
const layout = document.querySelector(".layout");
const startButton = document.querySelector(".startbutton");
const startButton2 = document.querySelector(".startbutton2");
const themeButton = document.querySelector(".themebutton");
const gameTitle = document.querySelector(".gametitle");
const gameDesc = document.querySelector(".gamedescription");

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

let activeTheme = 0;

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
    ctx.clearRect(0, 0, 9999, 9999);
    restartGame();
  } else if (players[1].score1 >= 11) {
    alert("Player 2 wins!");
    ctx.clearRect(0, 0, 9999, 9999);
    restartGame();
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
  startButton2.style.display = "none";
  createPawn(themes);
  createPlayers();
  renderGame();
}

/* Restart game */
function restartGame() {
  ball = { ...ball, x: 250, y: 250, velocityX: 0, velocityY: 0 };

  players = { ...players, score0: 0, score1: 0 };
  //startButton.style.display = "inline-block";
}

/* COMPUTER VS PLAYER CODE */
const computerAndPlayer = [
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

function createPlayers2() {
  computerAndPlayer.forEach((player) => {
    let image = new Image();
    image.setAttribute("src", player.image);
    player.pawn = image;
  });
}

function drawPlayers2(computerAndPlayer) {
  computerAndPlayer.forEach((player) => {
    ctx.drawImage(player.pawn, player.posX, player.posY, 31, 70);
    //console.log(player.pawn, player.posX, player.posY, 31, 70);
  });
}

function drawGame2(theme) {
  ctx.clearRect(0, 0, 9999, 9999);
  drawPlayers2(players);
  drawScore();
}

/* AI Computer */
let computerLevel = 0.1;

computerAndPlayer[0].y +=
  (ball.y - (computerAndPlayer[0].y + computerAndPlayer[0].height / 2)) *
  computerLevel;

/* Game code */
function checkIfWon2() {
  if (computerAndPlayer[0].score0 >= 11) {
    alert("Player 1 wins!");
    ctx.clearRect(0, 0, 9999, 9999);
    restartGame();
  } else if (computerAndPlayer[1].score1 >= 11) {
    alert("Player 2 wins!");
    ctx.clearRect(0, 0, 9999, 9999);
    restartGame();
  }
}

function checkIfImpact2() {
  if (ball.x <= 0) {
    ball.velocityX = Math.random() > 0.5 ? -1.5 : 1.5;
    ball.velocityY = Math.random() > 0.5 ? Math.random() : -Math.random();
    computerAndPlayer[0].posY = 200;
    computerAndPlayer[1].posY = 200;
    (ball.x = 250), (ball.y = 250); //center
    computerAndPlayer[1].score1++;
    checkIfWon2();
  } else if (ball.x > canvas.width) {
    ball.velocityX = Math.random() > 0.5 ? -1.5 : 1.5;
    ball.velocityY = Math.random() > 0.5 ? Math.random() : -Math.random();
    computerAndPlayer[0].posY = 200;
    computerAndPlayer[1].posY = 200;
    (ball.x = 250), (ball.y = 250); //center
    computerAndPlayer[0].score0++;
    checkIfWon2();
  } else if (ball.y <= 0) {
    ball.velocityY = -ball.velocityY;
  } else if (ball.y >= canvas.height - 80) {
    ball.velocityY = -ball.velocityY;
  } else if (
    ball.x <= 31 &&
    ball.y >= computerAndPlayer[0].posY - 70 &&
    ball.y <= computerAndPlayer[0].posY + 70
  ) {
    ball.velocityY = (ball.y - computerAndPlayer[0].posY) * 0.05;
    ball.velocityX = -ball.velocityX; //olga speed
  } else if (
    ball.x >= 420 &&
    ball.y >= computerAndPlayer[1].posY - 70 &&
    ball.y <= computerAndPlayer[1].posY + 70
  ) {
    ball.velocityY = (ball.y - computerAndPlayer[1].posY) * 0.05;
    ball.velocityX = -ball.velocityX; //olga speed
  }
}

function movePlayers2(e) {
  if (e.code === "ArrowUp" || e.code === "ArrowDown") {
    e.preventDefault();
    switch (e.code) {
      case "ArrowUp":
        players[1].posY -= 30;
        break;

      case "ArrowDown":
        players[1].posY += 30;
        break;
    }
  }
}

/* Start game 2 */
startButton2.addEventListener("click", initializeGame2);

function renderGame2() {
  ctx.clearRect(0, 0, 9999, 9999);
  drawGame2(themes[0]);
  drawBall();
  updateBall();
  checkIfImpact2();
  window.requestAnimationFrame(renderGame);
}

function initializeGame2() {
  console.log("fuck u");
  startButton.style.display = "none";
  startButton2.style.display = "none";
  createPawn(themes);
  createPlayers2();
  renderGame2();
  window.addEventListener("keydown", (e) => movePlayers2(e));
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
