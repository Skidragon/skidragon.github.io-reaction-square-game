const playArea = document.getElementById("play-area");
const displayTime = document.getElementById("time");

const colorsArr = ["orange", "red", "green", "purple"];


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function removePx(pxStr) {
  return pxStr.substr(0, pxStr.indexOf("px"));
}

function createSquare(width, height) {

  if(width === undefined) {
    width = randomInt(30,100);
  }
  if(height === undefined) {
    height = randomInt(30,100);
  }

  const square = document.createElement("div");

  const startTime = new Date().getTime(); //getTime() returns the time in milliseconds

  square.style.display = "block";

  square.style.width = width + "px";
  square.style.height = height + "px";

  square.style.background = colorsArr[randomInt(0, colorsArr.length - 1)];

  //sets a random starting location for the square
  square.style.position = "absolute";
  square.style.top = (randomInt(0, playArea.offsetHeight)) + "px";
  square.style.left = (randomInt(0, playArea.offsetWidth)) + "px";

  //Recalculates the location of the square so it does not leave the play area
  let topLocOfSq = Number(removePx(square.style.top));
  let leftLocOfSq = Number(removePx(square.style.left));
  let sqHeight = Number(removePx(square.style.height));
  let sqWidth = Number(removePx(square.style.height));


  if (topLocOfSq+sqHeight > playArea.offsetHeight) {
    console.log("bottom");
    topLocOfSq -= sqHeight;
  }

  if (leftLocOfSq+sqWidth > playArea.offsetWidth) {
    console.log("left");
    leftLocOfSq -= sqWidth;
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

  //when the square is clicked then calculate the time plus remove the old square and add a new square
  square.addEventListener("click", function(e) {

    playArea.removeChild(square);

      const endTime = new Date().getTime();
      displayTime.textContent = endTime - startTime + " milliseconds";

    playArea.appendChild(createSquare(randomInt(30,100), randomInt(30,100)));
  });
  return square;
}

function initGame() {
playArea.appendChild(createSquare(randomInt(30,100), randomInt(30,100)));
}

initGame();
