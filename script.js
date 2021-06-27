const selectPlayer1 = document.querySelectorAll("button.player1");
const selectPlayer2 = document.querySelectorAll("button.player2");

console.log(selectPlayer1);
console.log(selectPlayer2);

selectPlayer1.forEach((button) =>
  button.addEventListener("click", player1Select)
);

selectPlayer2.forEach((button) =>
  button.addEventListener("click", player2Select)
);

function player1Select() {
  const branch = this.parentNode.parentNode;
  resetButtons(branch);
  this.classList.toggle("active");
  return 1;
}

function player2Select() {
  const branch = this.parentNode.parentNode;
  resetButtons(branch);
  this.classList.toggle("active");
  return 1;
}

function resetButtons(branch) {
  const playerContainer = branch.childNodes;
  for (let i = 1; i < playerContainer.length; i++) {
    const listItem = playerContainer[i];
    for (let j = 0; j < listItem.childNodes.length; j++) {
      console.log(typeof listItem.childNodes[j].classList);
      if (
        typeof listItem.childNodes[j].classList !== "undefined" &&
        listItem.childNodes[j].classList.contains("active")
      ) {
        listItem.childNodes[j].classList.remove("active");
      }
    }
  }
}

function playersSelected() {
  if (player1Select === 1 && player2Select === 1) {
    console.log("both have been pressed");
  }
}
