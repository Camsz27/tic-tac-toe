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

const displayController = (() => {
  const clear = () => {
    document.querySelector(".playerSelection").remove();
  };

  const create = () => {
    const body = document.querySelector("body");
    const container = document.createElement("div");
    const list1 = document.createElement("ul");
    const list2 = document.createElement("ul");
    const player1Item = document.createElement("li");
    const player2Item = document.createElement("li");
    const humanItem1 = document.createElement("li");
    const aiItem1 = document.createElement("li");
    const humanItem2 = document.createElement("li");
    const aiItem2 = document.createElement("li");
    const buttonPlayer1Human = document.createElement("button");
    const buttonPlayer1Ai = document.createElement("button");
    const buttonPlayer2Human = document.createElement("button");
    const buttonPlayer2Ai = document.createElement("button");

    container.classList.add("playerSelection");
    list1.classList.add("playerOptions");
    player1Item.classList.add("player");
    player1Item.setAttribute("id", "player1");
    player1Item.textContent = "Player 1 (X)";
    humanItem1.classList.add("option");
    aiItem1.classList.add("option");
    buttonPlayer1Human.classList.add("option", "player1");
    buttonPlayer1Human.textContent = "Human";
    buttonPlayer1Ai.classList.add("option", "player1");
    buttonPlayer1Ai.textContent = "AI";
    humanItem1.append(buttonPlayer1Human);
    aiItem1.append(buttonPlayer1Ai);
    list1.append(player1Item, humanItem1, aiItem1);

    list2.classList.add("playerOptions");
    player2Item.classList.add("player");
    player2Item.setAttribute("id", "player2");
    player2Item.textContent = "Player 2 (O)";
    humanItem2.classList.add("option");
    aiItem2.classList.add("option");
    buttonPlayer2Human.classList.add("option", "player2");
    buttonPlayer2Human.textContent = "Human";
    buttonPlayer2Ai.classList.add("option", "player2");
    buttonPlayer2Ai.textContent = "AI";
    humanItem2.append(buttonPlayer2Human);
    aiItem2.append(buttonPlayer2Ai);
    list2.append(player2Item, humanItem2, aiItem2);

    container.append(list1, list2);
    body.append(container);
  };

  return { clear, create };
})();
