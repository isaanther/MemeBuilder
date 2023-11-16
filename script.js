const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("turnover")) return;
  // "turnover" is simply an identifier for the action of comparison
  // -----this section shows color to be shown on selected items------
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList;

  // if the second card and first card are not equal to the same classList then make the currentCard null.
  if (!card1 || !card2) {
    currentCard.classList.add("turnover");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let correctCard1 = card1.className;
    let correctCard2 = card2.className;
    // we are turning them into correctCard1 and correctCard2 because if we dont the  returnoverEventListener will select even the ones that are selected accurately.
    if (correctCard1 === correctCard2) {
      // cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      // allows for there to be clicking afterwards, like continuous guessing.
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      // if the cards are not === then change the "turnover" back.
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("turnover");
        card2.classList.remove("turnover");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }
}
// console.log(currentCard);

// when the DOM loads
createDivsForColors(shuffledColors);

// WHY NOT USE THE TOGGLE??
