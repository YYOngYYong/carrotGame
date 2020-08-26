"use strict";
import PopUp from "./popUp.js";
import Field from "./field.js";

const gameBtn = document.querySelector(".game__button");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");

const carrotSize = 80;
const carrotCount = 5;
const bugCount = 5;

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
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

function onItemClick(event) {
  if (!started) {
    return;
  }

  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score == carrotCount) {
      finishGame(true);
    }
  } else if (item === "bug") {
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
  playSound(bgSound);
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
  stopSound(bgSound);
  stopGameTimer();
  hideGameButton();
  gameBanner.showWithText("replay?");

  playSound(alertSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
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
  gameScore.innerText = carrotCount;
  gameField.init();
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
function updateScoreBoard() {
  gameScore.innerText = carrotCount - score;
}
