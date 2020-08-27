"use strict";
import PopUp from "./popUp.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const gameBtn = document.querySelector(".game__button");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");

const carrotSize = 80;
const carrotCount = 5;
const bugCount = 5;

let started = false;
let score = 0;
let timer = undefined;
let sec = 5;

const gameBanner = new PopUp();
gameBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(carrotCount, bugCount);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  console.log("click");
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score == carrotCount) {
      finishGame(true);
    }
  } else if (item == "bug") {
    finishGame(false);
  }
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  sound.playBg();
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
  sound.stopBg();
  stopGameTimer();
  hideGameButton();
  gameBanner.showWithText("replay?");

  sound.playAlert();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  stopGameTimer();
  sound.stopBg();
  gameBanner.showWithText(win ? "YOU WON" : "YOU LOSE");
  console.log(score);
}

function showStopBtn() {
  const icon = document.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = sec;
  updateTimeText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(carrotCount === score);
      return;
    }
    updateTimeText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimeText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
  score = 0;
  gameScore.innerText = carrotCount;
  gameField.init();
}

function updateScoreBoard() {
  gameScore.innerText = carrotCount - score;
}
