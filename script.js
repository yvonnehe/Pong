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
      image: "./images/olga.png",
      posX: canvas.width / 2 - 25,
      posY: canvas.height / 2 - 25,
      pawn: null,
    },
  },
  {
    button: "Jello war",
    background: "",
    pawn: {
      image: "./images/the-office-jello.png",
      posX: canvas.width / 2 - 25,
      posY: canvas.height / 2 - 25,
      pawn: null,
    },
  },
];

let activeTheme = 0;

function createPawn(themes) {
  themes.forEach((item) => {
    let image = new Image();
    image.setAttribute("src", item.pawn.image);
    item.pawn.pawn = image;
  });
}

function drawGame(theme) {
  ctx.clearRect(0, 0, 9999, 9999);
  drawPawn(theme.pawn);
}

function drawPawn(pawn) {
  ctx.drawImage(pawn.pawn, pawn.posX, pawn.posY, 120, 40);
}

function changeTheme() {
  layout.classList.toggle("jellowarlayout");
  themeButton.classList.toggle("jellowarbtn");
  activeTheme = (activeTheme + 1) % themes.length;
  drawGame(themes[activeTheme]);
  themeButton.innerHTML = themes[(activeTheme + 1) % 2].button;
}

//start game
createPawn(themes);
drawGame(themes[0]);
window.addEventListener("load", () => {
  createPawn(themes);
  drawGame(themes[0]);
});
