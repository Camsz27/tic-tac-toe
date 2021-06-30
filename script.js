const body = document.querySelector("body");
let turn = 1;
let tie = true;
let aiPlayer = 0;

const displayController = (() => {
  const clear = () => {
    document.querySelector(".playerSelection").remove();
  };

  const create = () => {
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
    buttonPlayer1Human.addEventListener("click", playerSelect);
    buttonPlayer1Ai.classList.add("option", "player1");
    buttonPlayer1Ai.textContent = "AI";
    buttonPlayer1Ai.addEventListener("click", playerSelect);
    buttonPlayer1Ai.addEventListener("click", computerPlay);
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
    buttonPlayer2Human.addEventListener("click", playerSelect);
    buttonPlayer2Ai.classList.add("option", "player2");
    buttonPlayer2Ai.textContent = "AI";
    buttonPlayer2Ai.addEventListener("click", playerSelect);
    buttonPlayer2Ai.addEventListener("click", computerPlay);
    humanItem2.append(buttonPlayer2Human);
    aiItem2.append(buttonPlayer2Ai);
    list2.append(player2Item, humanItem2, aiItem2);

    container.append(list1, list2);
    body.append(container);
  };

  const winningMessage = () => {
    const div = document.createElement("div");
    const container = document.createElement("div");
    const text = document.createElement("h2");
    const restartButton = document.createElement("button");
    div.classList.add("modal");
    container.classList.add("modalContent");
    restartButton.textContent = "Restart Game";
    restartButton.setAttribute("id", "restartButton");
    restartButton.addEventListener("click", create);
    restartButton.addEventListener("click", gameBoard.clear);
    restartButton.addEventListener("click", clearWinningMessage);
    if (tie === true) {
      text.textContent = "It is a Tie!!!";
    } else if (turn % 2 === 0) {
      text.textContent = "Player 2 is the Winner!!!";
    } else {
      text.textContent = "Player 1 is the Winner!!!";
    }
    container.append(text);
    container.append(restartButton);
    div.append(container);
    body.append(div);
  };

  const clearWinningMessage = () => {
    document.querySelector(".modal").remove();
  };

  const resetButtons = (branch) => {
    const playerContainer = branch.childNodes;
    for (let i = 1; i < playerContainer.length; i++) {
      const listItem = playerContainer[i];
      for (let j = 0; j < listItem.childNodes.length; j++) {
        if (
          typeof listItem.childNodes[j].classList !== "undefined" &&
          listItem.childNodes[j].classList.contains("active")
        ) {
          listItem.childNodes[j].classList.remove("active");
        }
      }
    }
  };

  const playerSelect = (e) => {
    const branch = e.target.parentNode.parentNode;
    resetButtons(branch);
    e.target.classList.toggle("active");
    checkSelect();
    return 1;
  };

  const checkSelect = () => {
    const playerContainer = document.querySelector(".playerSelection");
    const player1 = playerContainer.childNodes[0];
    const player2 = playerContainer.childNodes[1];
    if (
      (player1.childNodes[1].firstChild.classList.contains("active") ||
        player1.childNodes[2].firstChild.classList.contains("active")) &&
      (player2.childNodes[1].firstChild.classList.contains("active") ||
        player2.childNodes[2].firstChild.classList.contains("active"))
    ) {
      clear();
      gameBoard.create();
    }
  };

  const changeTurnText = () => {
    const container = document.querySelector("#turnContainer");
    if (turn % 2 !== 0) {
      container.firstChild.textContent = Player("Player1", "X").turnText();
    } else {
      container.firstChild.textContent = Player("Player2", "O").turnText();
    }
  };

  return { clear, create, winningMessage, changeTurnText };
})();

const gameBoard = (() => {
  const create = () => {
    turn = 1;
    tie = true;
    const turnContainer = document.createElement("div");
    const boardContainer = document.createElement("div");
    const playerTurn = document.createElement("h2");
    const boardList = document.createElement("ul");

    turnContainer.setAttribute("id", "turnContainer");
    boardContainer.setAttribute("id", "boardContainer");
    playerTurn.setAttribute("id", "playerTurn");
    boardList.classList.add("gameContainer");

    playerTurn.textContent = "Player1's (X) turn";
    turnContainer.append(playerTurn);

    for (let i = 0; i < 9; i++) {
      const tile = document.createElement("li");
      tile.classList.add("tile");
      tile.setAttribute("id", i);
      tile.addEventListener("click", mark);
      tile.addEventListener("click", displayController.changeTurnText);
      boardList.append(tile);
    }
    boardContainer.append(boardList);

    body.append(turnContainer);
    body.append(boardContainer);
    if (aiPlayer === 10) {
      markComputer();
      turn = 2;
      displayController.changeTurnText();
    }
  };

  const clear = () => {
    document.querySelector("#turnContainer").remove();
    document.querySelector("#boardContainer").remove();
  };

  const mark = (e) => {
    const image = document.createElement("img");
    if (turn % 2 === 0) {
      image.setAttribute("src", "Images/circle.png");
      e.target.classList.add("o");
    } else {
      image.setAttribute("src", "Images/close.png");
      e.target.classList.add("x");
    }
    checkWon();
    turn++;
    e.target.append(image);
    e.target.removeEventListener("click", mark);
    if ((aiPlayer === 5 || aiPlayer === 10) && tie === true) {
      markComputer();
    }
  };

  const checkWon = () => {
    const mark = turn % 2 === 0 ? "o" : "x";
    checkColumn(mark);
    checkRow(mark);
    checkDiagonal(mark);
    if (tie === false) {
      displayController.winningMessage();
    } else if (turn === 9 && tie === true) {
      displayController.winningMessage();
    }
  };

  const checkColumn = (sign) => {
    const id = 0;
    const tiles = document.querySelectorAll(".tile");
    if (
      (tiles[id].classList.contains(sign) &&
        tiles[id + 3].classList.contains(sign) &&
        tiles[id + 6].classList.contains(sign)) ||
      (tiles[id + 1].classList.contains(sign) &&
        tiles[id + 4].classList.contains(sign) &&
        tiles[id + 7].classList.contains(sign)) ||
      (tiles[id + 2].classList.contains(sign) &&
        tiles[id + 5].classList.contains(sign) &&
        tiles[id + 8].classList.contains(sign))
    ) {
      tie = false;
    }
  };

  const checkRow = (sign) => {
    const id = 0;
    const tiles = document.querySelectorAll(".tile");
    if (
      (tiles[id].classList.contains(sign) &&
        tiles[id + 1].classList.contains(sign) &&
        tiles[id + 2].classList.contains(sign)) ||
      (tiles[id + 3].classList.contains(sign) &&
        tiles[id + 4].classList.contains(sign) &&
        tiles[id + 5].classList.contains(sign)) ||
      (tiles[id + 6].classList.contains(sign) &&
        tiles[id + 7].classList.contains(sign) &&
        tiles[id + 8].classList.contains(sign))
    ) {
      tie = false;
    }
  };

  const checkDiagonal = (sign) => {
    const id = 0;
    const tiles = document.querySelectorAll(".tile");
    if (
      (tiles[id].classList.contains(sign) &&
        tiles[id + 4].classList.contains(sign) &&
        tiles[id + 8].classList.contains(sign)) ||
      (tiles[id + 2].classList.contains(sign) &&
        tiles[id + 4].classList.contains(sign) &&
        tiles[id + 6].classList.contains(sign))
    ) {
      tie = false;
    }
  };

  return {
    create,
    clear,
    mark,
    checkColumn,
    checkDiagonal,
    checkRow,
    checkWon,
  };
})();

const Player = (name, mark) => {
  const turnText = () => {
    return `${name}'s (${mark}) turn`;
  };
  return { turnText };
};

displayController.create();

function possibleMoves() {
  const tiles = document.querySelectorAll(".tile");
  let moves = [];
  for (let i = 0; i < 9; i++) {
    if (
      !tiles[i].classList.contains("x") &&
      !tiles[i].classList.contains("o")
    ) {
      moves.push(tiles[i]);
    }
  }
  return moves;
}

function moveScore(turn, maximizing) {
  const mark = turn % 2 === 0 ? "o" : "x";
  let moves = possibleMoves();
  let bestScore;
  let bestTile;
  if (maximizing) {
    bestScore = -Infinity;
  } else {
    bestScore = Infinity;
  }
  if (moves === [] || tie === false || turn === 10) {
    console.log("the end");
    if (mark === "o" && tie === false) {
      console.log("x has won");
      score = 1;
    } else if (mark === "x" && tie === false) {
      console.log("o has won");
      score = -1;
    } else {
      console.log("Tie");
      score = 0;
    }
    tie = true;
    return score;
  }
  for (let i = 0; i < moves.length; i++) {
    console.log(mark);
    console.log(tie);
    console.log(turn);
    console.log(moves);
    console.group(moves[i]);
    moves[i].classList.add(mark);
    gameBoard.checkColumn(mark);
    gameBoard.checkRow(mark);
    gameBoard.checkDiagonal(mark);
    if (maximizing) {
      bestScore = Math.max(bestScore, moveScore(turn + 1, !maximizing));
      bestTile = moves[i];
    } else {
      bestScore = Math.min(bestScore, moveScore(turn + 1, !maximizing));
    }
    moves[i].classList.remove(mark);
  }
  return [bestScore, bestTile];
}

function randomMove() {
  const moves = possibleMoves();
  return moves[Math.floor(Math.random() * moves.length)];
}

function markComputer() {
  const image = document.createElement("img");
  const move = randomMove();
  if (turn % 2 === 0) {
    image.setAttribute("src", "Images/circle.png");
    move.classList.add("o");
  } else {
    image.setAttribute("src", "Images/close.png");
    move.classList.add("x");
  }
  gameBoard.checkWon();
  turn++;
  move.append(image);
  move.removeEventListener("click", gameBoard.mark);
}

function computerPlay(e) {
  if (e.target.classList.contains("player2")) {
    aiPlayer = 5;
  } else if (e.target.classList.contains("player1")) {
    aiPlayer = 10;
  }
}
