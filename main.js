const playArea = document.getElementById("play-area");
const displayTime = document.getElementById("time");

const colorsArr = ["orange", "red", "green", "purple"];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createNewWidth = randomInt(30, 100);
const createNewHeight = randomInt(30, 100);

function removePx(pxStr) {
  return pxStr.substr(0, pxStr.indexOf("px"));
}

function createSquare(width, height) {

  const square = document.createElement("div");

  const startTime = new Date().getTime(); //getTime() returns the time in milliseconds

  square.style.display = "block";
  square.style.width = width + "px";
  square.style.height = height + "px";

  square.style.background = colorsArr[randomInt(0, colorsArr.length - 1)];
  square.style.position = 'absolute';

  square.style.top = (randomInt(0, playArea.offsetHeight)) + "px";
  square.style.left = (randomInt(0, playArea.offsetWidth)) + "px";

  //Recalculates the location of the square so it does not leave the play area
  let topLocOfSq = Number(removePx(square.style.top));
  let leftLocOfSq = Number(removePx(square.style.left));
  let sqHeight = Number(removePx(square.style.height));
  let sqWidth = Number(removePx(square.style.height));

  if (topLocOfSq < playArea.offsetHeight / 2) {
    console.log("top");
    topLocOfSq += sqHeight;
  }

  if (topLocOfSq > playArea.offsetHeight / 2) {
    console.log("bottom");
    topLocOfSq -= sqHeight;
  }

  if (leftLocOfSq > playArea.offsetWidth / 2) {
    console.log("left");
    leftLocOfSq -= sqWidth;
  }
  if (leftLocOfSq < playArea.offsetWidth / 2) {
    console.log("right");
    leftLocOfSq += sqWidth;
  }

  square.style.top = topLocOfSq + "px";
  square.style.left = leftLocOfSq + "px";


  square.zIndex = "100"; //makes sure nothing covers the square

//If the window has been resized then re-create a new square
  window.addEventListener("resize", function(e) {
    console.log("resized");
    playArea.removeChild(square);
    setTimeout(function() {
      playArea.appendChild(createSquare(randomInt(30, 100), randomInt(30, 100)));
    }, 1000);
  });

  square.addEventListener("click", function(e) {

    playArea.removeChild(square);

    if (playArea.hasChildNodes()) {
      const endTime = new Date().getTime();
      displayTime.textContent = endTime - startTime + " milliseconds";
    }

    playArea.appendChild(createSquare(createNewWidth, createNewHeight));
  });
  return square;
}

playArea.appendChild(createSquare(createNewWidth, createNewHeight));
