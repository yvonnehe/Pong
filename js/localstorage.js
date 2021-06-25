/* Local Storage */
const nameInput = document.querySelector(".nameinput");
const playPongButton = document.querySelector(".playpongbutton");
const highScores = document.querySelector(".highscores");

/* Local Storage/High scores */
playPongButton.addEventListener("click", saveName);

function saveName() {
  const name = nameInput.value;
  console.log(name);
  localStorage.setItem("name", name);
  window.location.href = "game.html";
}

/*
for (let i = 0; i < localStorage.length; i++) {
  const name = localStorage.key(i);
}

function getName() {
  const nameOfPlayer = localStorage.getItem("name");
  console.log(nameOfPlayer);
}

*/
