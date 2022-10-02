const selectBoxes = document.querySelectorAll("[class*=box]");
const playerText = document.querySelector(".playerText");
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
    // console.log(gameBoard.markers);
    if (gameBoard.markers.every((element) => element === "")) {
      gameBoard.markers[marker] = crosses.marker;
    } else gameBoard.markers[marker] = currentMarker;
    // console.log(currentMarker);
    changeMarker();
    changeText();
    // console.log(currentMarker);
    gameBoard.populate();
    // console.log(gameBoard.markers);
    const currentBox = e.target;
    currentBox.removeEventListener("click", placeMarker);
    checkWinConditions();
  };
  const changeMarker = () => {
    if (currentMarker === crosses.marker) {
      return (currentMarker = circles.marker);
    } else currentMarker = crosses.marker;
  };
  const changeText = () => {
    playerText.innerHTML = currentMarker;
  };
  const restart = () => {
    const resetGrid = () => {
      gameBoard.markers.fill("");
      gameBoard.populate();
      currentMarker = crosses.marker;
      playerText.innerHTML = currentMarker;
      selectBoxes.forEach((box) => box.addEventListener("click", placeMarker));
    };
    resetButton.addEventListener("click", resetGrid);
  };
  const checkWinConditions = () => {
    const winPattern = [
      [1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 1, 0, 1, 0, 1, 0, 0],
    ];
    const winningIndexesArray = (() => {
      const patterns = () => {
        winPattern.forEach((pattern) => {
          const patternReduced = () => {
            pattern.reduce((winningConditionIndexes, filter, winningIndex) => {
              if (filter === 1) winningConditionIndexes.push(winningIndex);
              return winningConditionIndexes;
            }, []);
            return patternReduced;
          };
        });
      };
      return { patterns };
    })();
    console.log(winningIndexesArray.patterns());

    // const currentPlayerIndexesArray = gameBoard.markers.reduce(
    //   (currentIndexes, filter, currentIndex) => {
    //     if (filter === "X") currentIndexes.push(currentIndex);
    //     return currentIndexes;
    //   },
    //   []
    // );
    // console.log(currentPlayerIndexesArray);

    // if (
    //   currentPlayerIndexesArray.includes(
    //     winningIndexesArray[0] &&
    //       winningIndexesArray[1] &&
    //       winningIndexesArray[2]
    //   ) &&
    //   currentPlayerIndexesArray.length >= 3
    // ) {
    //   console.log("WIN");
    // } else console.log("NOT WIN");
  };
  return { chooseBox, changeText, restart };
})();
gameFlow.chooseBox();
gameFlow.changeText();
gameFlow.restart();
