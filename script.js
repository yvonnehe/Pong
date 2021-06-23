const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const ball2 = document.querySelector(".ball");
const layout = document.querySelector(".layout");
const gameContainer = document.querySelector(".gamecontainer");
const startButton = document.querySelector(".startbutton");
const themeButton = document.querySelector(".themebutton");

/* 
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

// canvas
const canvas = document.querySelector(".gamecontainer2");
let ctx = canvas.getContext("2d");

//eventlisteners
themeButton.addEventListener("click", changeTheme);

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

const players = [
  {
    posX: 0,
    posY: canvas.height / 2 - 50,
    image: "./images/Hand.png",
    score: 0,
  },
  {
    posX: canvas.width - 31,
    posY: canvas.height / 2 - 50,
    image: "./images/Hand2.png",
    score: 0,
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

function drawGame(theme) {
  ctx.clearRect(0, 0, 9999, 9999);
  //drawPawn(theme.pawn);
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

function changeTheme() {
  layout.classList.toggle("jellowarlayout");
  themeButton.classList.toggle("jellowarbtn");
  activeTheme = (activeTheme + 1) % themes.length;
  drawGame(themes[activeTheme]);
  themeButton.innerHTML = themes[(activeTheme + 1) % 2].button;
}

//game code
function checkIfWon() {
  if (players[0].score >= 11) {
  } else if (players[1].score >= 11) {
  }
}

function checkIfImpact() {
  console.log("fuck u");
  if (ball.x <= 0) {
    ball.velocityX = Math.random() > 0.5 ? -1.5 : 1.5;
    ball.velocityY = Math.random() > 0.5 ? Math.random() : -Math.random();
    players[0].posY = 200;
    players[1].posY = 200;
    (ball.x = 250), (ball.y = 250); //center
    players[1].score++;
    checkIfWon();
  } else if (ball.x > canvas.width) {
    ball.velocityX = Math.random() > 0.5 ? -1.5 : 1.5;
    ball.velocityY = Math.random() > 0.5 ? Math.random() : -Math.random();
    players[0].posY = 200;
    players[1].posY = 200;
    (ball.x = 250), (ball.y = 250); //center
    players[1].score++;
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

let ball = {
  x: canvas.width / 2 - 50,
  y: canvas.height / 2 - 50,
  velocityX: -3, //olga speed
  velocityY: 0,
  image: "",
};

function drawBall() {
  ctx.drawImage(
    themes[activeTheme].pawn.pawn,
    ball.x + ball.velocityX,
    ball.y + ball.velocityY,
    80,
    80
  );
}

function updateBall() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px serif";
  ctx.fillText(players[0].score, canvas.width / 4, canvas.height / 5);
  ctx.fillText(players[1].score, (canvas.width / 4) * 3, canvas.height / 5);
}

// start game
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
  createPawn(themes);
  createPlayers();
  renderGame();
}

//initializeGame();
//window.addEventListener("load", () => {
//initializeGame();
//});

// responsive shit
function responsiveGame() {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.9;
}

window.addEventListener("resize", () => {
  //responsiveGame();
});
