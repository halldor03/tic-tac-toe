const selectBoxes = document.querySelectorAll("[class*=box]");
const gameText = document.querySelector(".gameText");
const resetButton = document.querySelector(".restartButton");

const player = (name, marker) => {
  return { name, marker };
};
const circles = player("circles", "O");
const crosses = player("crosses", "X");

const gameBoard = (() => {
  const markers = ["", "", "", "", "", "", "", "", ""];
  const populate = () => {
    selectBoxes.forEach((box, index) => {
      box.innerHTML = markers[index];
    });
  };
  return { markers, populate };
})();
gameBoard.populate();

const gameFlow = (() => {
  let currentMarker = crosses.marker;
  const chooseBox = () =>
    selectBoxes.forEach((box) => box.addEventListener("click", placeMarker));
  const placeMarker = (e) => {
    changeText();
    const marker = e.target.dataset.nr;
    if (gameBoard.markers.every((element) => element === "")) {
      gameBoard.markers[marker] = crosses.marker;
    } else gameBoard.markers[marker] = currentMarker;
    changeMarker();
    changeText();
    gameBoard.populate();
    const currentBox = e.target;
    currentBox.removeEventListener("click", placeMarker);
    winConditions.check();
  };
  const changeMarker = () => {
    if (currentMarker === crosses.marker) {
      return (currentMarker = circles.marker);
    } else currentMarker = crosses.marker;
  };
  const changeText = () => {
    gameText.innerHTML = "Player " + currentMarker + ", please make your move";
  };
  const restart = () => {
    const resetGrid = () => {
      gameBoard.markers.fill("");
      gameBoard.populate();
      currentMarker = crosses.marker;
      gameText.innerHTML =
        "Player " + currentMarker + ", please make your move";
      changeText();
      selectBoxes.forEach((box) => box.addEventListener("click", placeMarker));
    };
    resetButton.addEventListener("click", resetGrid);
  };
  return { chooseBox, changeText, restart };
})();
gameFlow.chooseBox();
gameFlow.changeText();
gameFlow.restart();

const winConditions = (() => {
  const combination1 = [0, 1, 2];
  const combination2 = [3, 4, 5];
  const combination3 = [6, 7, 8];
  const combination4 = [0, 3, 6];
  const combination5 = [1, 4, 7];
  const combination6 = [2, 5, 8];
  const combination7 = [0, 4, 8];
  const combination8 = [2, 4, 6];

  const check = () => {
    const XPlayerIndexes = gameBoard.markers.reduce(
      (currentIndexes, filter, currentIndex) => {
        if (filter === "X") currentIndexes.push(currentIndex);
        return currentIndexes;
      },
      []
    );
    const OPlayerIndexes = gameBoard.markers.reduce(
      (currentIndexes, filter, currentIndex) => {
        if (filter === "O") currentIndexes.push(currentIndex);
        return currentIndexes;
      },
      []
    );

    if (
      combination1.every((element) => XPlayerIndexes.includes(element)) ||
      combination2.every((element) => XPlayerIndexes.includes(element)) ||
      combination3.every((element) => XPlayerIndexes.includes(element)) ||
      combination4.every((element) => XPlayerIndexes.includes(element)) ||
      combination5.every((element) => XPlayerIndexes.includes(element)) ||
      combination6.every((element) => XPlayerIndexes.includes(element)) ||
      combination7.every((element) => XPlayerIndexes.includes(element)) ||
      combination8.every((element) => XPlayerIndexes.includes(element))
    ) {
      gameText.innerHTML = "Player X won! Press restart to play again";
    } else if (
      combination1.every((element) => OPlayerIndexes.includes(element)) ||
      combination2.every((element) => OPlayerIndexes.includes(element)) ||
      combination3.every((element) => OPlayerIndexes.includes(element)) ||
      combination4.every((element) => OPlayerIndexes.includes(element)) ||
      combination5.every((element) => OPlayerIndexes.includes(element)) ||
      combination6.every((element) => OPlayerIndexes.includes(element)) ||
      combination7.every((element) => OPlayerIndexes.includes(element)) ||
      combination8.every((element) => OPlayerIndexes.includes(element))
    ) {
      gameText.innerHTML = "Player O won! Press restart to play again";
    } else if (OPlayerIndexes.length + XPlayerIndexes.length === 9) {
      gameText.innerHTML = "It's tie! Press restart to play again";
    }
  };
  return { check };
})();
