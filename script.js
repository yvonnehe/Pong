const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const ball = document.querySelector(".ball");
const layout = document.querySelector(".layout");
const gameContainer = document.querySelector(".gamecontainer");
const startButton = document.querySelector(".startbutton");
const themeButton = document.querySelector(".themebutton");

function changeTheme() {
  ball.classList.toggle("jellowarball");
  layout.classList.toggle("jellowarlayout");
  themeButton.classList.toggle("jellowarbtn");
  if (themeButton.innerHTML === "Jello War") {
    themeButton.innerHTML = "Pet the cat";
  } else {
    themeButton.innerHTML = "Jello War";
  }
}

themeButton.addEventListener("click", changeTheme);

//function startGame

//knapp.onclick {
//    startGame()
//}
