// Game start
var gameColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var playerPattern = [];

let gameStarted = false;
let level = 0;

$(document).on("keydown", () => {
  if (gameStarted == false) {
    gameStarted = true;
    nextPattern();
  }
});

// For touchscreens
$(document).on("click", () => {
  if (gameStarted == false) {
    gameStarted = true;
    nextPattern();
  }
});

// create pattern
function nextPattern() {
  level++;
  playerPattern = [];
  $("#level-title").html(`Level: ${level}`);
  let randomNumber = Math.floor(Math.random() * gameColors.length);
  let randomChosenColor = gameColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animateButton(randomChosenColor);
  playSound(randomChosenColor);
}

function animateButton(color) {
  $(`.${color}`).addClass("pressed");
  setTimeout(() => {
    $(`.${color}`).removeClass("pressed");
  }, "400");
}

function playSound(color) {
  let sound = new Audio(`sounds/${color}.mp3`);
  sound.play();
}

// Click button
$(".btn").on("click", (e) => {
  let buttonId = e.target.id; // To get the id of button clicked
  playerPattern.push(buttonId);
  playSound(buttonId);
  animateButton(buttonId);
  checkPattern(playerPattern.length - 1); // To compare playerPattern and gamePattern array values
});

// check answer
function checkPattern(currentLevel) {
  if (playerPattern[currentLevel] == gamePattern[currentLevel]) {
    // Comparing each index value of both arrays as each button is clicked
    if (playerPattern.length == gamePattern.length) {
      console.log("correct");
      console.log(gamePattern);
      setTimeout(playEntireGamePattern, 2000); // Wait for 2 seconds before executing playEntireGamePattern()
    }
  } else {
    gameOver();
  }
}

// Repeat previous values and add one more value
function playEntireGamePattern() {
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(() => {
      animateButton(gamePattern[i]);
      playSound(gamePattern[i]);
      console.log(`play game pattern ${gamePattern[i]}`);
    }, 800 * i);
  }
  setTimeout(nextPattern, gamePattern.length * 800); // next pattern plays after looping through array
}

function gameOver() {
  $("#level-title").fadeOut(250).fadeIn();
  $("#level-title").html(`Game Over At Level: ${level}`);
  $("body").addClass("game-over");
  playSound("wrong");
  setTimeout(resetGame, 4000);
}

// Reset Game
function resetGame() {
  gamePattern = [];
  playerPattern = [];
  level = 0;
  gameStarted = false;
  $("body").removeClass("game-over");
  $("#level-title").html(`Press A Key to Start`);
}
