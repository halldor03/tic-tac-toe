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
  const placeMarker = () =>
    selectBoxes.forEach((box) => box.addEventListener("click", selectMarker));
  const selectMarker = (e) => {
    index = e.target.dataset.nr - 1;
    console.log(gameBoard.markers);
    gameBoard.markers[index] = circles.marker;
    gameBoard.populate();
  };
  return { placeMarker };
})();
gameFlow.placeMarker();
