const selectBoxes = document.querySelectorAll("[class*=box]");

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
  const placeMarker = () =>
    selectBoxes.forEach((box) =>
      box.addEventListener("click", (e) => {
        changeText();
        index = e.target.dataset.nr;
        console.log(gameBoard.markers);
        if (gameBoard.markers.every((element) => element === "")) {
          gameBoard.markers[index] = crosses.marker;
        } else gameBoard.markers[index] = currentMarker;
        console.log(currentMarker);
        changeMarker();
        changeText();
        console.log(currentMarker);
        gameBoard.populate();
        console.log(gameBoard.markers);
      })
    );
  const changeMarker = () => {
    if (currentMarker === crosses.marker) {
      return (currentMarker = circles.marker);
    } else currentMarker = crosses.marker;
  };
  const changeText = () => {
    const text = document.querySelector(".playerText");
    text.innerHTML = currentMarker;
  };
  return { placeMarker, changeText };
})();
gameFlow.placeMarker();
gameFlow.changeText();
