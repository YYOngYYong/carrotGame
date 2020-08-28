"use strict";
import Field from "./field.js";
import * as sound from "./sound.js";

export default class Game {
  constructor(sec, carrotCount, bugCount) {
    this.gameBtn = document.querySelector(".game__button");
    this.gameScore = document.querySelector(".game__score");
    this.gameTimer = document.querySelector(".game__timer");

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.sec = sec;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (this.score == this.carrotCount) {
        this.finishGame(true);
      }
    } else if (item == "bug") {
      this.finishGame(false);
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    sound.playBg();
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
  }

  stop() {
    this.started = false;
    sound.stopBg();
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop("cancel");
    sound.playAlert();
  }

  finishGame(win) {
    this.started = false;
    this.hideGameButton();
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    this.stopGameTimer();
    sound.stopBg();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }

  showStopBtn() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.sec;
    this.updateTimeText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finishGame(this.carrotCount === this.score);
        return;
      }
      this.updateTimeText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimeText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }
}
