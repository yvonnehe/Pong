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

/* Choose speed */
const speedDiv = document.querySelector(".speeddiv");
const speedSelector = document.querySelector("#speedSelector");
speedSelector.addEventListener("change", setDifficulty);

/* Arrows */
const up = document.querySelector(".up");
up.addEventListener("click", () => movePlayers({ code: "ArrowUp" }));
const down = document.querySelector(".down");
down.addEventListener("click", () => movePlayers({ code: "ArrowDown" }));
const up2 = document.querySelector(".up2");
up2.addEventListener("click", () => movePlayers({ code: "KeyW" }));
const down2 = document.querySelector(".down2");
down2.addEventListener("click", () => movePlayers({ code: "KeyS" }));

/* Select */
const selectSelected = document.querySelector(".select-selected");
const selectItems = document.querySelector(".select-items");

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
  posX: canvas.width / 2 - 50,
  posY: canvas.height / 2 - 50,
  velocityX: -3, //olga speed
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

let onePlayer = false;
let AICanMove = true;

const defaultSpeed = 5;
let difficultyLevel = 1;

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
  drawNames();
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
  ctx.textAlign = "center";
  ctx.fillText(players[0].score0, canvas.width / 4 - 7, canvas.height / 8);
  ctx.fillText(
    players[1].score1,
    (canvas.width / 4) * 3 - 7,
    canvas.height / 8
  );
}

function drawNames() {
  ctx.fillStyle = "white";
  ctx.font = "16px 'Roboto'";
  ctx.shadowColor = "black";
  ctx.textAlign = "center";
  ctx.shadowBlur = 7;
  const nameOfPlayer = localStorage.getItem("name");
  const nameOfPlayer2 = localStorage.getItem("name2");
  !onePlayer &&
    ctx.fillText(nameOfPlayer, canvas.width / 4 - 7, canvas.height / 15);
  ctx.fillText(nameOfPlayer2, (canvas.width / 4) * 3 - 7, canvas.height / 15);
  onePlayer &&
    ctx.fillText(nameOfPlayer, (canvas.width / 4) * 3 - 7, canvas.height / 15);
}

/* Change theme */
themeButton.addEventListener("click", changeTheme);

function changeTheme() {
  layout.classList.toggle("jellowarlayout");
  themeButton.classList.toggle("jellowarbtn");
  startButton.classList.toggle("jellowarbtn");
  startButton2.classList.toggle("jellowarbtn");
  playPongButton2.classList.toggle("jellowarbtn");
  selectSelected.classList.toggle("select-selected-jello");
  selectItems.classList.toggle("select-items-jello");
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
    !onePlayer && alert("Player 1 wins!");
    onePlayer && alert("Computer wins!");
    const nameOfPlayer = localStorage.getItem("name");
    !onePlayer && winners.unshift(nameOfPlayer);
    console.log(nameOfPlayer);
    scores.unshift("11");
    console.log(winners);
    console.log(scores);
    !onePlayer && totalWinners.unshift(winners[0] + " " + date);
    !onePlayer && localStorage.setItem("winners", JSON.stringify(totalWinners));
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
    ball.velocityX = Math.random() > 0.4 ? -defaultSpeed - 3 : defaultSpeed - 3;
    ball.velocityY = Math.random() > 0.4 ? Math.random() : -Math.random();
    players[0].posY = 200;
    players[1].posY = 200;
    (ball.posX = 250), (ball.posY = 250); //center
    players[1].score1++;
    checkIfWon();
  } else if (ball.posX > canvas.width) {
    ball.velocityX = Math.random() > 0.4 ? defaultSpeed - 3 : -defaultSpeed - 3;
    ball.velocityY = Math.random() > 0.4 ? -Math.random() : Math.random();
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
    ball.velocityX =
      (defaultSpeed - Math.abs(ball.velocityY)) * (0.5 + 0.5 * difficultyLevel); //olga speed
  } else if (
    ball.posX >= 420 &&
    ball.posY >= players[1].posY - 70 &&
    ball.posY <= players[1].posY + 70
  ) {
    ball.velocityY = (ball.posY - players[1].posY) * 0.05;
    ball.velocityX =
      (-defaultSpeed - Math.abs(ball.velocityY)) *
      (0.5 + 0.5 * difficultyLevel);
  }
}

function movePlayers(e) {
  console.log(e.type);
  if (
    e.code === "ArrowUp" ||
    e.code === "ArrowDown" ||
    e.code === "KeyW" ||
    e.code === "KeyS"
  ) {
    if (e.type === "keypress" || e.type === "keydown") {
      e.preventDefault();
    }
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

playPongButton2.addEventListener("click", initializeGame);

function moveAI() {
  /* AI Computer */
  let difficultyLevel = 1;
  //console.log(ball.posY)
  if (
    AICanMove &&
    Math.abs(players[0].posY - ball.posY) > 15 / difficultyLevel
  ) {
    setTimeout(() => {
      players[0].posY = (ball.posY - 70 / 2) * (Math.random() * 0.6 + 1);
    }, 2000 / difficultyLevel);
    //console.log(players[0].posY);
    AICanMove = false;
    setTimeout(() => {
      AICanMove = true;
    }, 450 / (difficultyLevel * 1.2));
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
    velocityX: -3, //olga speed
    velocityY: 0,
  };
  players[0].score0 = 0;
  players[1].score1 = 0;
}

function addPlayer2() {
  startButton.style.display = "none";
  startButton2.style.display = "none";
  player2Div.style.display = "block";
  onePlayer = false;
  if (window.innerWidth < 760) {
    up2.style.display = "block";
    down2.style.display = "block";
  }
}

function setDifficulty(e) {
  difficultyLevel = parseFloat(e.target.value);
  console.log(difficultyLevel);
}

/* Local Storage/High scores */

function saveName2() {
  const name2 = nameInput2.value;
  console.log(name2);
  localStorage.setItem("name2", name2);
  player2Div.style.display = "none";
}

let winners = [];
let scores = [];

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

/* Custom select from w3schools */
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

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
